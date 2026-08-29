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

  modal.querySelector('[aria-label="閉じる"]').addEventListener("click", () => modal.remove());

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
  ?.addEventListener("click", (event) => event.currentTarget.parentElement.remove());
