# Design System: AWS Student Builder Tech Superpower & Cloud Sandbox

## 1. Visual Theme & Atmosphere
A bespoke, $150k+ agency-level portfolio and interactive cloud engineering sandbox. It communicates architectural authority, engineering craftsmanship, and high taste without standard student clichés or template fatigue.
- **Density:** Daily App Balanced (Density: 4) — High breathing room (`py-24` to `py-36` section gaps), generous card margins, and focused typography hierarchy.
- **Variance:** Artsy Asymmetric (Variance: 8) — Asymmetric bento grids, off-grid terminal placement, staggered interactive architecture canvas, and diagonal particle drifts.
- **Motion:** Cinematic Choreography (Motion: 7) — Particle background canvas, magnetic hover physics, spring-damped modal sheets, and smooth cubic-bezier transitions.

## 2. Color Palette & Roles
- **Obsidian Blue** (`#050811`) — Primary page surface, deep cyber-navy depth
- **Substrate Slate** (`#0c1222`) — Outer bezel enclosure shell and container substrate
- **Machined Core** (`#111a30`) — Inner card surface, code viewer backgrounds, and modal dialogues
- **Electric Cyan** (`#06b6d4`) — Primary brand accent, glowing connector wires, active pills
- **Ice Cyan** (`#22d3ee`) — Hover accent and high-contrast typographic highlights
- **AWS Amber** (`#f59e0b`) — Cloud certification badges and architecture validation success highlights
- **Ghost Hairline** (`rgba(255, 255, 255, 0.08)`) — Concentric 1px border rings
- **Glass Specular** (`rgba(255, 255, 255, 0.14)`) — Inner top edge highlight simulating real physical glass refraction

*(Rule: Strictly one primary cyber accent. No purple/blue AI gradient wash. No pure black.)*

## 3. Typography Rules
- **Display / Headers:** `Plus Jakarta Sans`, 800 ExtraBold to 900 Black with `tracking-tight` and `leading-[1.08]`. Headlines are heavy, confident, and punctuated with subtle italic brand keywords.
- **Body:** `Plus Jakarta Sans`, 400 Regular to 500 Medium, `leading-relaxed`, max 65ch per column.
- **Code & CLI:** `JetBrains Mono` for terminal prompts, CDK TypeScript generation, and certification scoring bounds.
- **Banned:** Default Inter, Times New Roman, Roboto, unstyled system sans.

## 4. Component Stylings
- **The "Double-Bezel" (Doppelrand):**
  - *Outer Enclosure:* `p-2 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]`
  - *Inner Core:* `rounded-[calc(2rem-0.5rem)] bg-[#0c1222]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] p-6 md:p-8`
- **Floating Island Navigation:**
  - Detached glass pill (`mt-6 max-w-4xl mx-auto rounded-full border border-white/10 bg-[#050811]/80 backdrop-blur-2xl px-6 py-3 shadow-2xl`).
  - Active anchor indicators with smooth pill transitions and live status ping.
- **Nested CTA "Button-in-Button":**
  - Primary button: `rounded-full px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all duration-300`.
  - Trailing icon wrapper: `w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform`.
- **Interactive Terminal:**
  - Mac/UNIX acrylic bar with red/yellow/green traffic lights, command completion suggestions, and glowing cursor animation.
- **Cloud Architecture Sandbox:**
  - Interactive grid canvas with SVG bezier flow connectors, node drag/drop cards, live validation badge, and tabbed CDK/CloudFormation code synthesizer.

## 5. Layout Principles
- **Hero Viewport Discipline:** Fits inside `min-h-[100dvh]` without requiring scroll to find primary CTAs. Headline max 2 lines, value proposition max 20 words.
- **Bento Grid Cell Count:** Asymmetric cells (e.g. `col-span-8` next to `col-span-4`) with exactly as many cells as there is rich content. No blank placeholder tiles.
- **Macro-Whitespace:** `py-24 md:py-36` between major sections to let the interface breathe.
- **Mobile Collapse (< 768px):** All asymmetric bento grids collapse to single-column (`grid-cols-1`) with full width (`w-full`) and safe tap targets (≥ 44px).

## 6. Motion Philosophy
- Hardware-accelerated transforms: `transform` and `opacity` only.
- Spring physics: `stiffness: 100, damping: 20` for modals and interactive drawer panels.
- Particle mesh: Canvas particle simulation responding to cursor movement with fluid damping.

## 7. Anti-Patterns (Banned)
- ❌ No default AI purple-to-pink gradient slop
- ❌ No 3 identical card columns across every section
- ❌ No buzzword cliches ("Elevate", "Seamless", "Next-Gen")
- ❌ No fake round numbers — authentic AWS exam scores and benchmark metrics
- ❌ No dead links or unhandled form error states

