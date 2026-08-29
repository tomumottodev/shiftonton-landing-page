# シフトパズル LP

添付画像を 724px 幅の基準で再現した Tailwind CSS 実装です。Heroと青い訴求セクションには支給画像を使用し、そのほかの製品画面・写真欄は画像プレースホルダーに置き換えています。

## ファイル

- `standalone/index.html` — 編集しやすい分割版のHTML
- `standalone/css/styles.css` — 分割版のデザイン設定
- `standalone/js/app.js` — 分割版の画面操作
- `standalone/assets/` — 分割版で使用する画像
- `standalone.html` — 画像・CSS・JavaScriptをすべて埋め込んだ持ち運び用の単一ファイル版
- `src/App.jsx` — コンポーネント版のHTML構造・Tailwindユーティリティ
- `src/styles.css` — Tailwind読み込みと最小限の全体設定
- `design-qa.md` — 原画像との比較・動作検証レポート

## ローカル起動

```bash
npm install
npm run dev
```

## HTMLの再生成

次の操作で、単一ファイル版の`standalone.html`と分割版の`standalone/`が両方更新されます。

```bash
npm run build
npm run export:html
```
