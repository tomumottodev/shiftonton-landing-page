import { useEffect, useState } from "react";
import {
  ArrowRight, Award, Scale, CalendarCheck2, CheckCircle2,
  ClipboardPenLine, Heart, Image as ImageIcon, Mail,
  MessageCircleMore, Monitor, Play, Send, Sparkles, TriangleAlert,
  UserRound, UsersRound, X,
} from "lucide-react";

const coral = "#ff5d64";
const BASE_DESIGN_WIDTH = 724;

function Button({ children, variant = "primary", href = "#entry", onClick, className = "" }) {
  const base = "inline-flex whitespace-nowrap h-[34px] items-center justify-center gap-2 rounded-full px-6 text-[11px] font-bold tracking-[.03em] transition focus:outline-none focus:ring-2 focus:ring-[#ff5d64]/35";
  const styles = variant === "primary"
    ? "bg-[#ff5d64] text-white shadow-[0_8px_18px_rgba(255,93,100,.2)] hover:bg-[#ef4e56]"
    : "border border-[#cfd3d6] bg-white text-[#252a2d] hover:border-[#ff5d64] hover:text-[#ff5d64]";
  return <a className={`${base} ${styles} ${className}`} href={href} onClick={onClick}>{children}</a>;
}

function PhotoPlaceholder({ label, className = "", compact = false }) {
  return (
    <div role="img" aria-label={`${label}の画像プレースホルダー`} className={`flex overflow-hidden bg-[#e9edef] text-[#879195] ${className}`}>
      <div className="m-auto flex flex-col items-center gap-1 text-center">
        <ImageIcon size={compact ? 20 : 28} strokeWidth={1.5} />
        <span className={`${compact ? "text-[8px]" : "text-[9px]"} font-semibold tracking-[.12em]`}>IMAGE</span>
        {!compact && <span className="text-[9px]">{label}</span>}
      </div>
    </div>
  );
}

function Feature({ icon: Icon, color, children }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-3 border-r border-[#eceeef] px-3 last:border-r-0 max-sm:justify-start max-sm:border-r-0">
      <Icon size={28} color={color} strokeWidth={1.8} />
      <span className="text-[10px] font-bold leading-[1.65] text-[#404649]">{children}</span>
    </div>
  );
}

function MiniBoard({ mode = "table" }) {
  const labels = { table: "シフト一覧画面", compare: "複数パターン比較画面", history: "変更履歴画面" };
  return <PhotoPlaceholder label={labels[mode]} className="h-[102px] rounded border border-[#e6e8e9]" compact />;
}

function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === "undefined" ? BASE_DESIGN_WIDTH : window.innerWidth);
  const issueCards = [
    { icon: CalendarCheck2, color: coral, title: "希望休と必要人数の\n両立が難しい", body: "希望を尊重しつつ、必要人数を満たすシフトを組むのが大変です。" },
    { icon: Scale, color: "#f8a51b", title: "公平に考えたいのに、\n判断が偏ってしまう", body: "公平に組んでいるつもりだけど、スタッフの不満が溜まっていないか心配です。" },
    { icon: UserRound, color: "#49bd8c", title: "毎回、ひとりで\n悩み続けてしまう", body: "最終判断は自分。いつも時間と精神的コストがかかっています。" },
  ];

  useEffect(() => {
    let frameId;
    const updateViewportWidth = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => setViewportWidth(window.innerWidth));
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  const scale = viewportWidth > BASE_DESIGN_WIDTH ? viewportWidth / BASE_DESIGN_WIDTH : 1;
  const scaledLayout = viewportWidth > BASE_DESIGN_WIDTH;
  const mechanisms = [
    { n: "01", title: "見える化", body: "条件や希望を整理し、視覚的にわかりやすくします。\n", mode: "table" },
    { n: "02", title: "伴走AI", body: "複数パターンを比較・提案し、\n判断の材料を増やします。", mode: "compare" },
    { n: "03", title: "すべての履歴", body: "変更の履歴や理由を残せるから、\n試行錯誤がスムーズになります。", mode: "history" },
  ];
  const steps = [
    { n: "01", title: "応募", sub: "フォームから\nご応募ください", icon: ClipboardPenLine, color: coral },
    { n: "02", title: "ヒアリング", sub: "課題や現状を\nお伺いします", icon: MessageCircleMore, color: "#f4a51b" },
    { n: "03", title: "ご案内", sub: "お試し方法を\nご案内します", icon: Mail, color: "#49bd8c" },
    { n: "04", title: "お試し利用", sub: "実際の現場で\nお試しください", icon: Monitor, color: "#438ed4" },
    { n: "05", title: "フィードバック", sub: "ご意見・ご感想を\nお聞かせください", icon: Sparkles, color: "#8e66d2" },
  ];

  function handleSubmit(event) { event.preventDefault(); setSubmitted(true); }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f6f4]">
      <div
        className="min-h-screen bg-[#f6f6f4] pb-[43px] text-[#252a2d]"
        data-layout-scale={scale.toFixed(4)}
        style={{ width: scaledLayout ? `${BASE_DESIGN_WIDTH}px` : "100%", zoom: scale }}
      >
      <div className="w-full overflow-hidden bg-white">
        <header className="relative z-40 flex h-[46px] items-center border-b border-[#eceeef] bg-white px-[24px]">
          <a href="#top" className="text-[15px] font-black tracking-[.08em]">シフトントン</a>
          <nav className="ml-auto flex items-center gap-8 text-[9px] font-bold max-sm:hidden">
            <a href="#features" className="hover:text-[#ff5d64]">特徴</a><a href="#demo" className="hover:text-[#ff5d64]">デモ</a><a href="#entry" className="hover:text-[#ff5d64]">モニター募集</a><a href="#flow" className="hover:text-[#ff5d64]">導入の流れ</a>
          </nav>
          <Button className="ml-9 h-[28px] px-5 text-[9px] max-sm:ml-auto">モニターに応募する</Button>
        </header>

        <main id="top">
          <section className="grid min-h-[272px] grid-cols-[47%_53%] max-sm:grid-cols-1">
            <div className="z-10 flex flex-col justify-center bg-white px-[34px] py-7 max-sm:px-6">
              <h1 className="whitespace-nowrap text-[26px] font-black leading-tight tracking-[.05em] max-sm:text-[24px]">試行錯誤の一日 <span className="mx-1">→</span> <span className="text-[#ff5d64]">納得の一枚</span></h1>
              <p className="mt-3 text-[13px] font-bold">シフト作成者の試行錯誤を支える伴走型AI</p>
              <p className="mt-5 text-[10px] font-medium leading-[1.9] text-[#596165]">希望休、必要人数、公平感——<br />シフトは、さまざまな条件や思いの中で組み立てられます。<br />シフトントンは、その迷いや試行錯誤に寄り添い、<br />納得できる「一枚」を一緒につくります。</p>
              <div className="mt-5 flex gap-3"><Button>モニターに応募する <ArrowRight size={13} /></Button><Button variant="outline" href="#demo">デモを見る</Button></div>
            </div>
            <div className="relative min-h-[272px] max-sm:h-[250px]">
              <img src="/assets/hero-shift-planning.png" alt="明るいオフィスでシフト作成に取り組む女性" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[84px] bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.78)_38%,rgba(255,255,255,0)_100%)] backdrop-blur-[2px] sm:block" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[52px] bg-[linear-gradient(180deg,#fff_0%,rgba(255,255,255,.62)_42%,rgba(255,255,255,0)_100%)] backdrop-blur-[2px] sm:hidden" />
              <div className="absolute right-7 top-8 space-y-4">
                <div className="flex w-[126px] items-center gap-3 rounded-2xl bg-white/95 px-3 py-3 text-[9px] font-bold leading-relaxed shadow-[0_8px_24px_rgba(22,44,52,.12)]"><CalendarCheck2 size={22} color="#438ed4" />希望休を考慮<br />しています</div>
                <div className="flex w-[126px] items-center gap-3 rounded-2xl bg-white/95 px-3 py-3 text-[9px] font-bold leading-relaxed shadow-[0_8px_24px_rgba(22,44,52,.12)]"><UsersRound size={23} color="#f4a51b" />必要人数を<br />満たしています</div>
                <div className="flex w-[126px] items-center gap-3 rounded-2xl bg-white/95 px-3 py-3 text-[9px] font-bold leading-relaxed shadow-[0_8px_24px_rgba(22,44,52,.12)]"><Scale size={22} color="#49bd8c" />公平性を<br />見える化</div>
              </div>
            </div>
          </section>

          <section id="features" className="px-[22px] py-[17px]">
            <div className="grid h-[61px] grid-cols-4 rounded-lg border border-[#e0e3e4] bg-white shadow-sm max-sm:h-auto max-sm:grid-cols-2 max-sm:gap-y-5 max-sm:p-5">
              <Feature icon={CalendarCheck2} color={coral}>希望休も。</Feature><Feature icon={UsersRound} color="#f4a51b">必要人数も。</Feature><Feature icon={Heart} color="#49bd8c">スタッフへの配慮も。</Feature><Feature icon={Scale} color="#c9903d">シフト作成の答えは<br />一つではありません。</Feature>
            </div>
          </section>

          <section className="px-[42px] pb-[18px] pt-[3px] max-sm:px-6">
            <h2 className="text-center text-[14px] font-black tracking-[.12em]">こんな状態になっていませんか？</h2>
            <div className="mt-[17px] grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {issueCards.map(({ icon: Icon, color, title, body }) => (
                <article key={title} className="min-h-[110px] rounded-lg border border-[#e5e7e8] bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3"><Icon size={29} color={color} strokeWidth={1.8} /><h3 className="whitespace-pre-line text-[11px] font-black leading-[1.55]">{title}</h3></div>
                  <p className="mt-3 text-[8px] font-medium leading-[1.75] text-[#626a6e]">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-[17px] flex h-[38px] items-center justify-center gap-3 rounded-md bg-[#fff1f1] text-[12px] font-bold tracking-[.04em] text-[#ff5d64]"><TriangleAlert size={20} fill="#ff5d64" color="#ff5d64" />AIに全部任せるだけでは、納得感は生まれないことも。</div>
          </section>

          <section className="px-[12px] pb-[17px]">
            <div className="relative h-[160px] overflow-hidden rounded-xl bg-[#579bd0] text-white">
              <img src="/assets/ai-companion.png" alt="シフト作成者に寄り添うサポート担当者" loading="lazy" className="absolute right-0 top-0 h-full w-[33%] object-cover object-[72%_center]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[63%] z-[2] w-[94px] bg-[linear-gradient(90deg,#579bd0_0%,rgba(87,155,208,.82)_38%,rgba(87,155,208,0)_100%)] backdrop-blur-[2px]" />
              <div className="relative z-10 max-w-[80%] px-[64px] pt-[28px] max-sm:max-w-[76%] max-sm:px-6">
                <h2 className="text-[21px] font-bold tracking-[.06em]">自動作成ではなく、判断の過程を支える。</h2>
                <p className="mt-3 text-[11px] font-bold tracking-[.07em]">シフトントンは、シフト作成者の思考を支えるAIです。</p>
                <p className="mt-3 text-[10px] font-semibold leading-[1.85]">条件や思いを整理し、複数案や根拠を提示。<br />納得できる一枚にたどり着くまで、伴走します。</p>
              </div>
            </div>
          </section>

          <section className="px-[34px] pb-[16px] max-sm:px-6">
            <h2 className="text-center text-[20px] font-black tracking-[.13em]">3つの仕組み</h2>
            <div className="mt-3 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {mechanisms.map((item) => (
                <article key={item.n} className="min-h-[226px] rounded-lg border border-[#e1e4e5] bg-white p-[14px] shadow-sm">
                  <h3 className="flex items-baseline gap-2 text-[14px] font-black"><span className="text-[19px] text-[#5a9bd0]">{item.n}</span>{item.title}</h3>
                  <p className="mt-2 min-h-[42px] whitespace-pre-line text-[9px] font-semibold leading-[1.7]">{item.body}</p><MiniBoard mode={item.mode} />
                </article>
              ))}
            </div>
          </section>

          <section id="demo" className="grid grid-cols-2 gap-5 px-[34px] pb-[17px] max-sm:grid-cols-1 max-sm:px-6">
            <article className="rounded-lg border border-[#e4e7e8] bg-[#fbfbfb] p-[14px] text-center shadow-sm">
              <h2 className="text-[16px] font-black">デモで流れを見る</h2>
              <button onClick={() => setDemoOpen(true)} className="group relative mt-2 block h-[135px] w-full overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5d64]">
                <PhotoPlaceholder label="シフト管理画面のデモ" className="absolute inset-0" compact />
                <span className="absolute left-1/2 top-1/2 grid h-[47px] w-[47px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-105"><Play size={20} fill="#ff777d" color="#ff777d" /></span>
              </button><p className="mt-2 text-[9px]">動画でわかるシフトントンの使い方（約2分）</p>
            </article>
            <article className="rounded-lg border border-[#eadfdd] bg-[#fffaf8] p-[14px_24px] shadow-sm">
              <h2 className="text-center text-[16px] font-black">モニター募集中</h2>
              <p className="mt-2 text-[10px] font-semibold leading-[1.7]">シフトントンを実際の現場で試し、<br />一緒により良いプロダクトに育てていきませんか？</p>
              <ul className="mt-3 space-y-1 text-[10px] font-bold">{["無料でお試し利用", "オンラインサポート", "アンケートにご協力"].map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 size={14} fill="#43bd87" color="#43bd87" />{item}</li>)}</ul>
              <Button className="mt-4 w-full">応募フォームへ進む <ArrowRight size={13} /></Button>
            </article>
          </section>

          <section id="flow" className="px-[34px] pb-[18px] max-sm:px-6">
            <h2 className="text-center text-[16px] font-black tracking-[.08em]">モニター参加の流れ</h2>
            <div className="mt-3 grid min-h-[128px] grid-cols-5 rounded-lg border border-[#e3e6e7] bg-white px-6 py-4 shadow-sm max-sm:grid-cols-1 max-sm:gap-5">
              {steps.map(({ n, title, sub, icon: Icon, color }, index) => (
                <div key={n} className="relative flex flex-col items-center text-center max-sm:flex-row max-sm:gap-4 max-sm:text-left">
                  <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border border-[#e6e9ea] bg-white shadow-sm"><Icon size={26} color={color} strokeWidth={1.8} /></div>
                  <div><p className="mt-2 text-[10px] font-black" style={{ color }}>{n} <span className="text-[#363c3f]">{title}</span></p><p className="mt-1 whitespace-pre-line text-[7px] font-medium leading-[1.5] text-[#687075]">{sub}</p></div>
                  {index < steps.length - 1 && <ArrowRight size={18} className="absolute -right-[13px] top-4 text-[#aab1b4] max-sm:hidden" />}
                </div>
              ))}
            </div>
          </section>

          <section className="px-[136px] pb-[16px] max-sm:px-6">
            <h2 className="text-center text-[15px] font-black tracking-[.14em]">取り組み・実績</h2>
            <div className="mt-3 flex h-[90px] items-center rounded-lg border border-[#e0e3e4] bg-white px-6 shadow-sm">
              <Award size={62} color="#d09b22" strokeWidth={1.25} className="shrink-0" />
              <div className="ml-7 border-l border-[#eceeef] pl-7"><h3 className="text-[15px] font-black">LEAN LAUNCHPAD 受賞実績</h3><p className="mt-1 text-[9px] font-semibold leading-[1.65]">シフトントンは、現場の課題に寄り添い、<br />持続可能な価値づくりに取り組んでいます。</p></div>
            </div>
          </section>

          <section className="grid min-h-[160px] grid-cols-[54%_46%] bg-[#f3f1ed] max-sm:grid-cols-1">
            <div className="flex flex-col justify-center px-[48px] max-sm:px-6 max-sm:py-8"><h2 className="text-[20px] font-black tracking-[.08em]">シフト作成を、ひとりで抱え込まない。</h2><p className="mt-3 text-[10px] font-semibold leading-[1.8]">私たちは、あなたの悩みや思いに寄り添い、<br />納得できる「一枚」を一緒につくるパートナーです。</p><Button className="mt-4 w-[194px]">モニターに応募する <ArrowRight size={13} /></Button></div>
            <PhotoPlaceholder label="導入を支援するスタッフ" className="min-h-[160px]" />
          </section>

          <section id="entry" className="px-[48px] pb-[10px] pt-[14px] max-sm:px-6">
            <form onSubmit={handleSubmit} className="rounded-lg border border-[#dfe3e4] bg-white px-[20px] py-[13px] shadow-sm">
              <h2 className="text-center text-[16px] font-black tracking-[.08em]">モニター応募フォーム</h2>
              <div className="mt-3 space-y-2">
                {[["お名前", "例）山田 太郎", "text"], ["施設・店舗名", "例）○○株式会社", "text"], ["メールアドレス", "例）yamada@example.com", "email"]].map(([label, placeholder, type]) => (
                  <label key={label} className="grid grid-cols-[140px_1fr] items-center text-[8px] font-bold max-sm:grid-cols-1 max-sm:gap-1"><span>{label}<b className="ml-3 rounded-sm bg-[#ff686e] px-1 py-[2px] text-[6px] text-white">必須</b></span><input required type={type} placeholder={placeholder} className="h-[24px] rounded border border-[#dfe3e4] px-3 text-[8px] font-medium outline-none placeholder:text-[#a6adb0] focus:border-[#ff6c72]" /></label>
                ))}
                <label className="grid grid-cols-[140px_1fr] items-center text-[8px] font-bold max-sm:grid-cols-1 max-sm:gap-1"><span>現在のシフト作成の悩み<b className="ml-3 rounded-sm bg-[#ff686e] px-1 py-[2px] text-[6px] text-white">必須</b></span><input required placeholder="例）希望休との調整に時間がかかる、公平性に不安がある など" className="h-[24px] rounded border border-[#dfe3e4] px-3 text-[8px] font-medium outline-none placeholder:text-[#a6adb0] focus:border-[#ff6c72]" /></label>
              </div>
              <label className="mt-2 flex items-center justify-center gap-2 text-[8px]"><input required type="checkbox" className="accent-[#ff5d64]" /><a href="#privacy" className="font-semibold text-[#478ecb] underline">プライバシーポリシー</a>に同意する</label>
              <button type="submit" className="mx-auto mt-2 flex h-[29px] w-[220px] items-center justify-center gap-2 rounded-full bg-[#ff5d64] text-[10px] font-black text-white shadow-[0_6px_16px_rgba(255,93,100,.2)] hover:bg-[#ef4e56]">応募する <Send size={12} /></button>
              {submitted && <p className="mt-2 text-center text-[9px] font-bold text-[#32a977]">ありがとうございます。応募を受け付けました。</p>}
            </form>
          </section>
        </main>

        <footer className="flex h-[48px] items-center px-[32px] pb-[5px] text-[7px] font-medium text-[#626a6e]"><span className="font-black text-[#252a2d]">シフトントン</span><button className="ml-8 rounded border border-[#cfd4d6] px-3 py-1 text-[6px]">お問い合わせ</button><div className="ml-auto flex gap-12"><a id="privacy" href="#privacy">プライバシーポリシー</a><a href="#terms">利用規約（仮）</a><span>© 2026 長岡LLPチーム・バブリーチ</span></div></footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[43px] w-full items-center bg-[#ff5d64] px-[34px] text-white shadow-[0_-8px_20px_rgba(255,93,100,.2)] max-sm:px-3"><span className="whitespace-nowrap text-[13px] font-black tracking-[.09em] max-sm:text-[11px] max-sm:tracking-normal">モニターについてのお問い合わせ受付中</span><span className="ml-7 text-[10px] font-semibold max-sm:hidden">モニターをご希望の方は、お問い合わせからご連絡ください。</span><a href="mailto:contact@example.com" className="ml-auto flex h-[29px] w-[194px] items-center justify-center gap-8 rounded bg-white text-[10px] font-black text-[#ff5d64] max-sm:w-[185px] max-sm:gap-4">お問い合わせ <ArrowRight size={14} /></a><button aria-label="バナーを閉じる" className="ml-7 text-white/80 hover:text-white max-sm:ml-2" onClick={(e) => e.currentTarget.parentElement.remove()}><X size={15} /></button></div>

      {demoOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-6" onMouseDown={() => setDemoOpen(false)}>
          <div className="w-full max-w-[620px] rounded-xl bg-white p-4 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}><div className="flex items-center justify-between"><h2 className="text-base font-black">シフトントン デモ</h2><button aria-label="閉じる" onClick={() => setDemoOpen(false)}><X /></button></div><PhotoPlaceholder label="デモ動画" className="mt-4 aspect-video rounded-lg" /><p className="mt-3 text-sm text-[#596165]">実際の画面では、希望条件の整理から複数案の比較までをご覧いただけます。</p></div>
        </div>
      )}
      </div>
    </div>
  );
}

export { App };
