# Design QA

## Comparison Target

- Source visual truth: `/Users/tomoyahasegawa/Downloads/TEST2026年8月22日 15_01_24.png`
- Implementation: `http://localhost:4173/`
- Implementation screenshot: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/outputs/shift-puzzle-landing/implementation-desktop.png`
- Full-view comparison: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/design-qa-comparison.jpg`
- Focused top comparison: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/design-qa-top.jpg`
- Focused bottom comparison: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/design-qa-bottom.jpg`
- Supplied-image placement comparison: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/image-placement-qa.jpg`
- Wide-layout verification: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/fullwidth-desktop.jpg`
- Proportional-scale desktop capture: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/proportional-scale-1440.jpg`
- Proportional-scale mobile capture: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/proportional-scale-mobile.jpg`
- Proportional-scale comparison: `/Users/tomoyahasegawa/Documents/Codex/2026-08-28/html-tailwind-css/work/proportional-scale-qa.jpg`
- Viewport: 724 × 1000 CSS px; full document captured at 724 × 2173 px
- Source dimensions: 724 × 2172 px
- Implementation dimensions: 724 × 2173 px
- Density normalization: browser `devicePixelRatio: 1`; both full-page images compared at the same 724 px width with no resizing
- State: desktop, light theme, page at initial/default state

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: Japanese system sans stack closely matches the source weight and hierarchy. Headline, section title, body, caption, and form-label scales preserve the source hierarchy and wrapping.
- Spacing and layout rhythm: the implementation matches the source width exactly and differs by only 1 px in total document height. Hero, problem cards, blue feature banner, mechanism cards, demo block, flow, award, CTA, form, footer, and bottom CTA keep the source order and proportions.
- Colors and visual tokens: coral CTA, cool blue feature panel, green/orange/blue/purple semantic accents, pale warning background, border colors, and soft shadows visually align with the reference.
- Image quality and asset fidelity: the user-supplied 1537 × 1023 image is used in the Hero and the supplied 1448 × 1086 portrait is used in the blue feature banner. Both retain their native resolution and use slot-specific `object-fit: cover` positioning. Remaining screenshot and photo regions stay as requested placeholders.
- Copy and content: all visible Japanese headings, supporting copy, labels, CTA text, flow steps, and form labels are represented.
- Residual P3: browser and OS font rasterization can vary slightly. The award mark uses the closest matching library icon instead of the photographed laurel artwork.

## Focused Region Evidence

- Top region: navigation, Hero, floating status cards, four-value strip, problem cards, warning strip, and blue feature banner were compared together at 724 px. The supplied Hero image renders at 384 × 272 px and the second supplied image at 231 × 160 px, with the intended subjects visible and undistorted.
- Bottom region: participation flow, award, closing CTA, application form, legal footer, and bottom CTA were compared together. Form row geometry, CTA placement, footer spacing, and page termination match the source structure.

## Interaction Verification

- Header and CTA anchor links navigate to their page sections.
- Demo thumbnail opens a modal; the close control dismisses it.
- Required application fields, checkbox validation, submit action, and local success confirmation work.
- The generated `standalone.html` was opened independently; its demo modal and form-success behavior both passed.
- Bottom CTA close control works.
- Responsive check at 390 × 844 CSS px: no horizontal overflow (`scrollWidth: 390`).
- Supplied-image responsive check: the Hero renders at 390 × 272 px on mobile and the second image at approximately 121 × 160 px; both preserve `object-fit: cover`, focal positioning, and sharpness.
- Image/text boundary check: the Hero uses an 84 px horizontal white-to-image fade on desktop and a 52 px vertical fade on mobile; the blue banner uses a 94 px blue-to-image fade. Each transition also applies a subtle 2 px backdrop blur.
- Wide-browser proportional-scale checks: 1280 px uses 1.7680×, 1440 px uses 1.9890×, and 1920 px uses 2.6519×. At every width the 724 px layout canvas, typography, images, spacing, radii, and fade layers scale together; the page root and bottom CTA exactly span the viewport with no side gutters or horizontal overflow.
- At 1920 px the Hero image measures approximately 1017.6 × 721.3 px, which is the 724 px reference slot multiplied by 2.6519 rather than a horizontally stretched slot.
- Browser console checked after desktop, modal, form, and mobile tests: no warnings or errors.
- Production build passed.
- Sites packaging tests passed: 4/4.

## Comparison History

1. Initial comparison found the blue feature banner's placeholder participating in normal flow and obscuring the text (P1). The placeholder positioning was corrected and the banner was recaptured; the focused top comparison shows the text on the left and placeholder on the right.
2. Mobile verification found the persistent CTA title wrapping at 390 px (P2). Mobile padding, button width, gap, and nowrap behavior were adjusted; the final mobile capture has no horizontal overflow.
3. The miniature product screenshots were converted from coded approximations to explicit image placeholders to follow the user's asset instruction. The final comparison shows consistent placeholder treatment across all image regions.
4. The visible capture scrollbar was removed as P3 polish and the final desktop screenshot was recaptured from three non-overlapping browser-rendered regions.
5. The Hero and blue-banner placeholders were replaced with the two user-supplied images. Desktop and mobile captures showed no stretching, broken assets, horizontal overflow, or console errors; no P0/P1/P2 issues were introduced.
6. Soft fade-and-blur layers were added where copy meets each supplied image, including a mobile-specific vertical transition for the stacked Hero.
7. An interim full-width reflow removed the side gutters but stretched sections independently; it was superseded by the proportional canvas approach below.
8. The full-width reflow was replaced with proportional canvas scaling. The 724 px composition is now the desktop source of truth and is enlarged uniformly above that width; the existing responsive layout remains active at and below 724 px.
9. Standalone export now embeds the same resize calculation and mounts its demo modal inside the scaled canvas, keeping the standalone deliverable behavior consistent with the React build.

## Follow-up Polish

- Replace the remaining neutral placeholders with production photography and product screenshots when assets are available.
- Replace the generic award icon with the official award/laurel artwork if supplied.

final result: passed
