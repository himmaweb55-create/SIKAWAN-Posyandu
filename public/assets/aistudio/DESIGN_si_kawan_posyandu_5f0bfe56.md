---
name: SI-KAWAN Posyandu
colors:
  surface: '#e6fff4'
  surface-dim: '#bde2d3'
  surface-bright: '#e6fff4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#d6fced'
  surface-container: '#d0f6e7'
  surface-container-high: '#cbf1e1'
  surface-container-highest: '#c5ebdc'
  on-surface: '#002018'
  on-surface-variant: '#3e4942'
  inverse-surface: '#13362c'
  inverse-on-surface: '#d3f9ea'
  outline: '#6e7a72'
  outline-variant: '#bdcac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#71daab'
  secondary: '#326853'
  on-secondary: '#ffffff'
  secondary-container: '#b5efd4'
  on-secondary-container: '#386e59'
  tertiary: '#805200'
  on-tertiary: '#ffffff'
  tertiary-container: '#a16800'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8ef7c6'
  primary-fixed-dim: '#71daab'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#b5efd4'
  secondary-fixed-dim: '#9ad3b8'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#17503c'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb957'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#e6fff4'
  on-background: '#002018'
  surface-variant: '#c5ebdc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a friendly-institutional healthcare portal tailored for community health workers (kader Posyandu), subdistrict administrators, and public health coordinators in Kecamatan Kepanjen, Kabupaten Malang. 

The aesthetic merges the structured clarity of Google Workspace and Notion productivity consoles with the calming, trustworthy humanism of a modern digital healthcare environment. Rather than appearing as a rigid, bureaucratic government registry, the interface projects clarity, warmth, order, and approachability. 

Key principles:
- **Calm Utility:** Workspaces eliminate cognitive fatigue through generous breathing space, soft-contrast dividers, and deliberate visual hierarchies designed for prolonged daily administrative use.
- **Approachable Authority:** Institutional dignity is expressed through deep forest greens and precise typography, balanced by refreshing mint surfaces and tactile rounded cards that welcome volunteer health workers of all digital literacy levels.
- **Data Transparency & State Candor:** Critical statuses—from routine growth tracking logs to pending Google Sheets synchronizations—are signaled with unmistakable semantic clarity and compassionate color coding.

## Colors

The palette balances clinical precision with natural botanical calm. It establishes a dedicated functional hierarchy where colors directly map to operational roles and alert states.

### Palette Architecture
- **Primary Brand (`#2F9E73`):** Active interactive elements, verified operational states, key callouts, and progress highlights.
- **Forest Navigation (`#17503C`):** Persistent structural surfaces (navigation sidebars, top headers, institutional credentials, and deep-ground anchors).
- **Background Canvas:** Subtle mint gradient transitions spanning `#E8F7F0` to `#F7FCFA`, softening glare and mitigating the clinical starkness of pure white monitors.
- **Surface Layer (`#FFFFFF`):** Work panels, data grid cards, dialogs, and interactive modals.
- **Text & Borders:**
  - `text-primary`: `#12352B` — Deep bio-forest tone ensuring strict WCAG AAA legibility against white and mint grounds.
  - `text-muted`: `#5B7A70` — Subdued vegetative grey for secondary metadata, column descriptors, and timestamps.
  - `border-subtle`: `#D6EBE1` — Soft mint-infused border that structures containers without visually segmenting the viewport.

### Operational Feedback System
- **Success / Available:** Fill `#DCFCE7`, text `#166534`, border `#BBF7D0`. Used for synchronized Google Sheets links, verified maternal-infant logs, and active cadres.
- **Warning / Needs Checking:** Fill `#FEF3C7`, text `#92400E`, border `#FDE68A`. Used for incomplete records, delayed sync states, and overdue infant vaccinations.
- **Danger / Critical:** Fill `#FEE2E2`, text `#991B1B`, border `#FECACA`. Used for severe health metric anomalies (e.g., stunting warnings) and connection timeouts.
- **Disabled / Data Belum Tersedia:** Fill `#F1F5F9`, text `#475569`, border `#CBD5E1`. Used for empty sheet cells, inactive villages, and uninitialized records.

## Typography

The typographic system utilizes **Inter** for all narrative, editorial, and structural controls to guarantee optimal legibility across varying screen calibrations found in community clinics and mobile tablets. **JetBrains Mono** is reserved exclusively for tabular identifiers, registration IDs, sheet reference codes, and synchronization hashes (e.g., `KPN-001`, `RW-04/RT-02`).

### Typographic Rules
- **Hierarchical Anchoring:** Major page titles use `headline-xl` set at 700 weight with tight tracking (-0.02em) to maintain crisp definition.
- **Data Density:** Section summaries and metric labels utilize `label-md` (Inter 500) paired with numeric readings set in `headline-lg` (Inter 600).
- **Code & Identifier Alignment:** Any administrative ID, postal coordinate, or Posyandu index string must invoke `label-code` (JetBrains Mono) with monospaced tabular figures enabled (`font-variant-numeric: tabular-nums`) to ensure vertical alignment across data lists.

## Layout & Spacing

The interface operates on an 8px base rhythmic grid system designed around a flexible dashboard workbench structure.

### Layout Mechanics
- **Desktop (1024px and above):** Fixed-width collateral sidebar (280px) in deep forest `#17503C`, anchored to an adaptive workspace grid. The main content area utilizes a fluid 12-column layout with 24px (`1.5rem`) gutters and 32px (`2rem`) outer margins.
- **Tablet (768px - 1023px):** Sidebar collapses to an icon-only dock (72px) or transforms into an off-canvas drawer. Outer canvas padding adjusts to 24px (`1.5rem`) with 16px (`1rem`) gutters.
- **Mobile (Below 768px):** Single-column layout. Horizontal margin reduces to 16px (`1rem`) to maximize card surface area. Sticky navigation transitions to a compact top bar and bottom quick-action utility bar.

### Spacing Principles
- Spacing inside data cells and form fields strictly conforms to `space-sm` (8px) and `space-md` (16px).
- Complex health data blocks and card containers maintain `space-lg` (24px) padding to isolate functional clusters clearly.

## Elevation & Depth

Depth is established through soft, botanical ambient shadows combined with low-contrast structural outlines rather than heavy skeuomorphic drop shadows or harsh flat lines.

### Tonal Stratification
1. **Canvas Ground (Level 0):** Mint ambient gradient (`#E8F7F0` to `#F7FCFA`).
2. **Structural Baseline (Level 1):** Solid white `#FFFFFF` cards, lists, and panels enclosed by a 1px border of `#D6EBE1`.
3. **Resting Floating Elements (Level 2):** Primary cards, filter toolbars, and search bars use ambient tinted shadow:
   `box-shadow: 0 4px 16px rgba(23, 80, 60, 0.08)`.
4. **Hover & Interactive Focus (Level 3):** Lifted cards and action bars:
   `box-shadow: 0 8px 24px rgba(23, 80, 60, 0.12)`.
5. **Overlay System (Level 4):** Contextual dropdowns, Google Sheets sync notifications, and alert modals:
   `box-shadow: 0 16px 36px rgba(18, 53, 43, 0.16)`.

## Shapes

The geometric framework balances human-friendly curves with administrative structure.

- **Cards & Data Groups:** Set at `1rem` (16px, `rounded-lg`), creating approachable, card-based workspaces that soften high-density metrics.
- **Interactive Controls (Inputs, Selectors, Action Buttons):** Form elements and trigger buttons are specified at 10px corner radius to deliver a precise, tactile interaction surface.
- **Pills & Badges:** Status tags, Posyandu identifiers, and state indicators utilize a 9999px fully rounded pill shape (`rounded-full`) for instant scannability.

## Components

### Buttons
- **Primary:** Background `#2F9E73`, text `#FFFFFF`, border-radius 10px, font weight 600, padding 10px 18px. Hover state deepens to `#268762`.
- **Secondary / Subdued:** Background `#FFFFFF`, text `#17503C`, border 1px solid `#D6EBE1`, border-radius 10px. Hover background `#E8F7F0`.
- **Destructive:** Background `#FEE2E2`, text `#991B1B`, border 1px solid `#FECACA`. Hover background `#FCDAD7`.

### Status Badges & Chips
- Rendered in full pill radius (`9999px`) with 4px vertical, 10px horizontal padding.
- Must display a leading 6px colored indicator dot along with `label-code` or `caption` text.
- Types:
  - *Synced / Aktif:* `#DCFCE7` ground, `#166534` text.
  - *Perlu Cek:* `#FEF3C7` ground, `#92400E` text.
  - *Belum Ada Data:* `#F1F5F9` ground, `#475569` text, `#CBD5E1` border.
  - *Kritis / Peringatan:* `#FEE2E2` ground, `#991B1B` text.

### Data Cards
- Pure white `#FFFFFF` surface, 16px border-radius, 1px solid `#D6EBE1`, and tinted ambient shadow (`0 4px 16px rgba(23,80,60,0.08)`).
- Padding strictly fixed to `space-lg` (24px) for dashboard metric cards, and `space-md` (16px) for compact list views.

### Input Fields & Search Bars
- Background `#FFFFFF`, border 1.5px solid `#D6EBE1`, border-radius 10px, text `#12352B`.
- Placeholder text in `#5B7A70`. Focus state applies a border of `#2F9E73` and a 3px ring of `rgba(47, 158, 115, 0.15)`.
- System ID fields (e.g., Posyandu Code) utilize JetBrains Mono with light tint fill `#F7FCFA`.

### Checkboxes & Radio Buttons
- 18px square (checkbox) or circle (radio) with 1.5px `#D6EBE1` border and 4px radius on checkboxes.
- Checked state transitions to `#2F9E73` solid fill with crisp white checkmark/dot.

### Google Sheets Portal Link Strip (Specialized Component)
- Embedded action strip indicating Google Sheets connectivity:
  - White surface with left 4px accent bar in `#2F9E73` (Synced) or `#F5A524` (Pending Sync).
  - Displays village code (`label-code` in JetBrains Mono), last edit timestamp, quick-access sheet icon, and a button to launch external spreadsheet view.