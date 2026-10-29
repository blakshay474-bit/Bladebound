---
name: Dark Tactical Fantasy
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#e6bdb8'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#ac8884'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#bf0715'
  secondary: '#ffb77d'
  on-secondary: '#4d2600'
  secondary-container: '#d97707'
  on-secondary-container: '#432100'
  tertiary: '#ffb3ac'
  on-tertiary: '#680008'
  tertiary-container: '#d33533'
  on-tertiary-container: '#fff5f4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb3ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#930010'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-hero:
    fontFamily: Cinzel Decorative
    fontSize: 64px
    fontWeight: '900'
    lineHeight: 72px
    letterSpacing: 0.08em
  display-hero-mobile:
    fontFamily: Cinzel Decorative
    fontSize: 38px
    fontWeight: '900'
    lineHeight: 44px
    letterSpacing: 0.06em
  headline-xl:
    fontFamily: Cinzel Decorative
    fontSize: 42px
    fontWeight: '700'
    lineHeight: 50px
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Cinzel Decorative
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: 0.04em
  headline-md:
    fontFamily: Cinzel Decorative
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.04em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.08em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  label-tactical:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.14em
  stat-mono:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.06em
  caption-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-desktop: 1.5rem
  margin-desktop: 3rem
  gutter-mobile: 0.75rem
  margin-mobile: 1rem
---

## Brand & Style
The design system delivers an intense, visceral, high-stakes dark medieval fantasy gaming experience tailored for AAA action-RPG players, collectors, and competitive tacticians. It evokes dread, martial prestige, ancient relics, and the raw tension of survival on a ruined battlefield. 

Drawing from a hybrid movement of **Gothic Brutalism** and **Tactical HUD Glassmorphism**, the aesthetic fuses cold chiseled geometry, weathered metallic filigree, and razor-sharp interfaces. Panels evoke forged obsidian and temper-treated dark steel slabs, cut at sharp 45-degree tactical chamfers rather than passive curves. Visual tension is sustained through deep void blacks punctuated by the smoldering glow of dying embers and bloodstone crimson warnings. The UI feels like an interactive physical artifact—an arcane forged relic humming with dark energy and combat telemetry.

## Colors
The palette balances void darkness with martial metals, punctuated by high-lethality alerts and heroic relics:

- **Primary & Bloodstone Accents (`#DC2626`, `#990011`):** Represents visceral energy, health pools, critical damage spikes, execute prompts, and lethal status. Used selectively to drive instinctual urgency.
- **Secondary & Antique Gold (`#D97706`, `#F59E0B`):** Represents ancient mastery, legendary loot tiers, heroic telemetry, and active interactive borders.
- **Steel & Gunmetal Neutral Continuum:**
  - `void-black` (`#08080A`): Canvas depth, immersive backing.
  - `charcoal-slate` (`#121316`): Base card backgrounds, structural frames.
  - `gunmetal-plate` (`#1F232B`): Raised surfaces, slot headers, interactive panels.
  - `weathered-steel` (`#363D49`): Structural low-contrast metallic dividers.
  - `burnished-edge` (`#5A6475`): Outer metallic highlight borders.
- **Embers & Fire Tints (`#FF4D00`, `#781D00`):** Ambient atmospheric illumination and underglow states.

Surfaces rely heavily on dark translucent layers (`rgba(14, 16, 20, 0.82)`) overlaid against scorched battle groundplates and ember particles. Never introduce pure white text; high-tier values and headers use bleached bone (`#F3F4F6`) and silvered mail (`#9CA3AF`).

## Typography
The typographic hierarchy merges ancient heraldic grandeur with cold military precision:

- **Display & Section Headers (`Cinzel Decorative`):** Used strictly for titles, heroic banners, boss designations, and chapter titles. All caps are standard for level headers, often accented with gold gradient text clipping (`linear-gradient(180deg, #FDE68A 0%, #D97706 70%, #78350F 100%)`).
- **Tactical Subheads, Status & Telemetry (`Space Grotesk`):** Delivers clean combat intelligence, attribute labels, item grades, and tier tags. Always rendered in uppercase with expanded letter-spacing to reinforce precision HUD optics.
- **Narrative & System Copy (`Plus Jakarta Sans`):** Ensures high-legibility combat descriptions, patch notes, and lore entries against deep dark backgrounds without causing eye strain.

## Layout & Spacing
The layout adheres to a strict 12-column tactical combat grid with an expansive 1440px desktop ceiling, collapsing to 8 columns on tablet and 4 columns on mobile.

Spacing enforces sharp militaristic rhythm: dense information clusters for hero stats and loadouts, juxtaposed with breathing room across cinematic set pieces. Grid containers use a 1px inner hairline stroke with 45-degree cutouts on primary quadrants.

### Breakpoints & Adaptive Reflow
- **Desktop (1200px+):** Full multi-pane tactical split. Hero loadout displays left (4 cols), 3D interactive viewport center (5 cols), and combat ledger/stat matrix right (3 cols).
- **Tablet (768px – 1199px):** Stacks 3D viewport on top (full width), moving stat telemetry and inventory matrix into a responsive 2-column secondary pane.
- **Mobile (320px – 767px):** Full-bleed vertically stacked deck with sliding horizontal HUD trays for weapon gear, collapsible accordions for lore entries, and sticky primary action triggers pinned to the viewport floor.

## Elevation & Depth
Elevation is realized not by soft modern drop shadows, but through chiseled physical layers, metallic light catches, and burning atmospheric underglows:

- **Layer 0 (The Abyss):** Base canvas in `#08080A` textured with subtle procedural grit and drifting ambient ember specks.
- **Layer 1 (Forged Chassis):** Large cards and panels built with semi-translucent steel glass (`background: rgba(18, 19, 22, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(89, 99, 117, 0.25)`).
- **Layer 2 (Combat Plate):** Nested tactical modules, loadout nodes, and stat meters (`background: #191B20; border-top: 1px solid rgba(255, 255, 255, 0.12); border-bottom: 2px solid #0A0A0D`).
- **Layer 3 (Active Threat / Legendary Focus):** Hover states and active items project an incandescent back-glow:
  - Bloodstone State: `box-shadow: 0 0 24px -4px rgba(220, 38, 38, 0.45), inset 0 0 12px rgba(153, 0, 17, 0.3);`
  - Relic Gold State: `box-shadow: 0 0 28px -4px rgba(217, 119, 6, 0.4), inset 0 0 10px rgba(245, 158, 11, 0.2);`
- **Edges & Borders:** Chamfered corners with micro 1px metallic rivets (`::before` / `::after` diamond pseudo-elements) to simulate armor plate construction.

## Shapes
Shapes are unapologetically sharp, predatory, and angular. Curves are prohibited (`border-radius: 0px`).

Panels, modals, and buttons rely on **tactical chamfers** (45-degree angle clipped corners) rendered via CSS `clip-path`:
- **Micro Chamfer (4px):** Applied to badges, chips, and stat pips (`polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)`).
- **Structural Chamfer (10px - 14px):** Applied to game cards, HUD dialogs, inventory cells, and primary action buttons.
- **Notched Frame Accents:** Corners feature decorative geometric brackets resembling crosshairs or rune brackets.

## Components

### Buttons & Action Triggers
- **Primary Execution Button:** Bloodstone fill with top-down linear gradient (`#DC2626` to `#990011`), 10px dual chamfered corners, 1px antique gold border highlight, bold spaced uppercase text (`Space Grotesk`). Hover triggers an intense crimson ember bloom with a swift white-gold rim sheen animation.
- **Secondary Relic Button:** Dark gunmetal translucent core with a double-line weathered bronze border (`#D97706`). On hover, the inner frame fills with faint amber flame gradients.
- **Ghost Tactical Trigger:** 1px charcoal border, completely transparent interior, with corner tick marks that turn crimson upon hover.

### Game-Styled Cards & HUD Panels
- Built with dark frosted glass (`rgba(18, 20, 24, 0.88)`), framed by 1px burnished steel edge strokes. Top headers feature an integrated bevel bar holding weapon tier badges, class heraldry, and slot rarity identifiers.

### Warrior Stat Bars & Attribute Meters
- Segmented meter channels encased in cold steel troughs with 1px dark dividers every 10% interval.
- **Health / Blood Meter:** Molten crimson fill with inner glowing core line and intermittent spark pulse.
- **Stamina / Ancient Power Meter:** Burnished amber-gold fill with numeric stat readout on the right in `Space Grotesk`.

### High-Contrast Glowing Badges & Tier Chips
- Sharp diamond or clipped-rectangle badges.
- Legendary: Amber border with gold core typography and faint particle illumination.
- Cursed / Executioner: Obsidian fill, crimson edge stroke, skull or rune iconography.

### Form Inputs & Selectors
- Gunmetal recessed troughs (`#0E1013`) with chiseled inner shadows. 
- Focus state instantly ignites a 1px bloodstone border flanked by dual corner crosshair brackets. Placeholder copy is muted iron (`#4B5563`).

### Tactical Checkboxes & Toggle Seals
- Square checkbox replaced with a 45-degree rotated diamond seal. Unchecked: Hollow weathered steel diamond. Checked: Bloodstone crimson core with a molten gold cross within.