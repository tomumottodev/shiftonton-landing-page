import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { format } from "prettier";

const root = process.cwd();
const imageNames = ["hero-shift-planning.png", "ai-companion.png"];

const modalTemplate = `
<template id="demo-modal-template">
  <div class="w-full max-w-[620px] rounded-xl bg-white p-4 shadow-2xl">
    <div class="flex items-center justify-between">
      <h2 class="text-base font-black">シフトパズル デモ</h2>
      <button type="button" aria-label="閉じる" class="text-2xl">×</button>
    </div>
    <div class="mt-4 flex aspect-video items-center justify-center rounded-lg bg-[#e9edef] text-[#879195]">
      <span class="text-sm font-semibold tracking-[.12em]">IMAGE / デモ動画</span>
    </div>
    <p class="mt-3 text-sm text-[#596165]">
      実際の画面では、希望条件の整理から複数案の比較までをご覧いただけます。
    </p>
  </div>
</template>`;

const interactionJavaScript = `
const baseDesignWidth = 724;
const scaleShell = document.querySelector("[data-layout-scale]");

const updateLayoutScale = () => {
  const isWideScreen = window.innerWidth > baseDesignWidth;
  const scale = isWideScreen ? window.innerWidth / baseDesignWidth : 1;

  scaleShell.style.width = isWideScreen ? baseDesignWidth + "px" : "100%";
  scaleShell.style.zoom = scale;
  scaleShell.dataset.layoutScale = scale.toFixed(4);
};

updateLayoutScale();
window.addEventListener("resize", updateLayoutScale);

const demoButton = document
  .querySelector('[role="img"][aria-label*="シフト管理画面のデモ"]')
  ?.closest("button");

demoButton?.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.id = "demo-modal";
  modal.className = "fixed inset-0 z-[70] grid place-items-center bg-black/60 p-6";
  modal.innerHTML = document.querySelector("#demo-modal-template").innerHTML;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });

  modal
    .querySelector('[aria-label="閉じる"]')
    .addEventListener("click", () => modal.remove());

  scaleShell.appendChild(modal);
});

document.querySelector("form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;

  let message = event.currentTarget.querySelector("[data-success]");

  if (!message) {
    message = document.createElement("p");
    message.dataset.success = "true";
    message.className = "mt-2 text-center text-[9px] font-bold text-[#32a977]";
    message.textContent = "ありがとうございます。応募を受け付けました。";
    event.currentTarget.appendChild(message);
  }
});

document
  .querySelector('button[aria-label="バナーを閉じる"]')
  ?.addEventListener("click", (event) => event.currentTarget.parentElement.remove());`;

const documentHead = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="シフト作成者の試行錯誤を支える伴走型AI、シフトパズルのモニター募集ページ" />
  <title>シフトパズル｜納得の一枚をつくる伴走型AI</title>`;

const prettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  singleAttributePerLine: false,
};

const server = await createServer({
  root,
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true, hmr: false },
});

try {
  const { App } = await server.ssrLoadModule("/src/App.jsx");
  const appMarkup = renderToStaticMarkup(React.createElement(App));
  const compiledAssetsDirectory = path.join(root, "dist/client/assets");
  const cssFile = (await readdir(compiledAssetsDirectory)).find((file) =>
    file.endsWith(".css"),
  );

  if (!cssFile) {
    throw new Error(
      "Built Tailwind CSS asset was not found. Run npm run build first.",
    );
  }

  const css = await readFile(
    path.join(compiledAssetsDirectory, cssFile),
    "utf8",
  );
  let embeddedAppMarkup = appMarkup;

  for (const imageName of imageNames) {
    const bytes = await readFile(path.join(root, "public/assets", imageName));
    const dataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
    embeddedAppMarkup = embeddedAppMarkup.replaceAll(
      `/assets/${imageName}`,
      dataUrl,
    );
  }

  const embeddedHtml = await format(
    `<!doctype html>
<html lang="ja">
<head>
${documentHead}
  <style>${css}</style>
</head>
<body>
${embeddedAppMarkup}
${modalTemplate}
<script>${interactionJavaScript}</script>
</body>
</html>`,
    { ...prettierOptions, parser: "html" },
  );

  await writeFile(path.join(root, "standalone.html"), embeddedHtml, "utf8");

  const standaloneDirectory = path.join(root, "standalone");
  const cssDirectory = path.join(standaloneDirectory, "css");
  const jsDirectory = path.join(standaloneDirectory, "js");
  const imageDirectory = path.join(standaloneDirectory, "assets");

  await Promise.all([
    mkdir(cssDirectory, { recursive: true }),
    mkdir(jsDirectory, { recursive: true }),
    mkdir(imageDirectory, { recursive: true }),
  ]);

  const readableAppMarkup = appMarkup.replaceAll("/assets/", "./assets/");
  const readableHtml = await format(
    `<!doctype html>
<html lang="ja">
<head>
${documentHead}
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
${readableAppMarkup}
${modalTemplate}
<script src="./js/app.js"></script>
</body>
</html>`,
    { ...prettierOptions, parser: "html" },
  );

  const [readableCss, readableJavaScript] = await Promise.all([
    format(css, { ...prettierOptions, parser: "css" }),
    format(interactionJavaScript, { ...prettierOptions, parser: "babel" }),
  ]);

  await Promise.all([
    writeFile(
      path.join(standaloneDirectory, "index.html"),
      readableHtml,
      "utf8",
    ),
    writeFile(path.join(cssDirectory, "styles.css"), readableCss, "utf8"),
    writeFile(path.join(jsDirectory, "app.js"), readableJavaScript, "utf8"),
    ...imageNames.map((imageName) =>
      copyFile(
        path.join(root, "public/assets", imageName),
        path.join(imageDirectory, imageName),
      ),
    ),
  ]);

  console.log("Created standalone.html and the readable standalone/ folder.");
} finally {
  await server.close();
}
