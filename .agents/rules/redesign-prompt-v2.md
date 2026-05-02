# Redesign Prompt — Full UI Overhaul
# Outfit Matters — Pure Monochrome Editorial

Paste this entire prompt to the agent. This replaces all previous design instructions.

---

## Design Philosophy
Think: Celine, The Row, System Magazine. Pure black and white. No decorative elements, no gold, no gradients, no gimmicks. Every element earns its place through typography and spacing alone. Cold, sharp, intentional.

## Color Palette — Strict, No Exceptions
- Background: `#080808`
- Primary text: `#EEEEEE`
- Secondary/muted text: `rgba(238,238,238,0.35)`
- Borders: `rgba(238,238,238,0.08)` default — `rgba(238,238,238,0.25)` on hover/active
- Accent: `rgba(238,238,238,0.06)` for subtle surface tints only
- NO gold, NO warm tones, NO color whatsoever — pure monochrome only

---

## Typography
Import from Google Fonts:
- `Playfair Display` — headline only
- `Inter` — everything else

Rules:
- Hero headline "OUTFIT MATTERS": Playfair Display. "OUTFIT" in weight 300 italic, "MATTERS" in weight 700. Two words, two lines, two weights. Creates tension.
- All section labels: Inter, 10px, uppercase, letter-spacing 4px, color `rgba(238,238,238,0.35)`
- Body and chat text: Inter, 13px, line-height 1.75, color `rgba(238,238,238,0.85)`
- Never use monospace or system fonts

---

## Fixed Vertical Side Texts
These are fixed to the viewport edges, always visible, very subtle.

**Left side — fixed, vertical:**
```
position: fixed
left: 18px
top: 50%
transform: translateX(-50%) rotate(-90deg)
transform-origin: center center
font: Inter 9px, letter-spacing: 4px, uppercase
color: rgba(238,238,238,0.18)
white-space: nowrap
z-index: 10
```
Text: `NANDRA IS ALWAYS WATCHING`

**Right side — fixed, vertical:**
```
position: fixed
right: 18px
top: 50%
transform: translateX(50%) rotate(90deg)
transform-origin: center center
font: Inter 9px, letter-spacing: 4px, uppercase
color: rgba(238,238,238,0.18)
white-space: nowrap
z-index: 10
```
Text: `YOUR FIT. HIS VERDICT.`

---

## Page Layout

### Navbar
- Left: `OUTFIT MATTERS` — Inter, 11px, weight 500, letter-spacing 5px, uppercase
- Right: `NO JUDGMENT ZONE. LOL JK.` — Inter, 9px, letter-spacing 2px, color `rgba(238,238,238,0.3)`, italic
- Bottom border: `1px solid rgba(238,238,238,0.06)`
- Padding: `16px 48px`

### Hero Section
- Full width, centered
- Top padding: `60px`
- Headline layout:
  ```
  OUTFIT        ← Playfair Display, weight 300, italic, font-size clamp(72px, 10vw, 140px)
  MATTERS       ← Playfair Display, weight 700, font-size clamp(72px, 10vw, 140px)
  ```
  Both lines centered, line-height 0.95, letter-spacing -3px
- Below headline: `— no judgment zone. lol jk. —` in Inter 11px italic, muted, centered, margin-top 16px

### NANDRA Character — Center Focal Point
- Centered below headline
- Character image: `height: clamp(200px, 28vh, 320px)`, `object-fit: contain`
- NO background behind character, NO glow, NO border — he stands alone on black
- Speech bubble ABOVE character, centered:
  - Background: `rgba(238,238,238,0.04)`
  - Border: `1px solid rgba(238,238,238,0.12)`
  - Border-radius: `8px 8px 8px 2px`
  - Padding: `8px 14px`
  - Font: Inter 12px italic, color `rgba(238,238,238,0.7)`
  - Text: `"upload your fit. i won't lie to you."`
  - Small triangle pointer at bottom center pointing down toward NANDRA

### Thin Divider
`1px solid rgba(238,238,238,0.06)` — full width, margin `0 48px`

---

## Main Section — Two Columns

Layout: CSS Grid, `grid-template-columns: 1fr 1fr`, gap `1px` (the gap itself is the divider — use `background: rgba(238,238,238,0.06)` on a div between them), padding `48px`

### Left Column — Upload
- Label at top: `[ SUBJECT ]` — Inter, 10px, letter-spacing 4px, uppercase, muted
- Margin below label: `20px`

**Upload Zone:**
- Border: `1px solid rgba(238,238,238,0.1)`
- Border-radius: `2px`
- Padding: `40px 20px`
- Background: transparent
- On hover: border becomes `rgba(238,238,238,0.25)`, transition `0.2s ease`
- On drag-over: border becomes `rgba(238,238,238,0.4)`
- Center content:
  - Icon: simple upload arrow SVG, `rgba(238,238,238,0.25)`, size 24px
  - Text: `drop image here` — Inter 12px, muted
  - Subtext: `or click to browse` — Inter 10px, very muted `rgba(238,238,238,0.2)`
- After image selected: show preview inside the zone, image fills the box with `object-fit: cover`, keep same border

**CTA Button:**
- Margin-top: `12px`
- Width: `100%`
- Background: `#EEEEEE`
- Color: `#080808`
- Padding: `14px`
- Font: Inter, 11px, weight 600, letter-spacing 3px, uppercase
- Border-radius: `2px`
- Text: `LET NANDRA JUDGE`
- Hover: background `rgba(238,238,238,0.85)`, transition `0.15s ease`
- Disabled state (no image uploaded): background `rgba(238,238,238,0.1)`, color `rgba(238,238,238,0.3)`, cursor not-allowed

### Right Column — Chat Output
- Label at top: `[ VERDICT ]` — same style as left label
- Margin below label: `20px`

**Chat Container:**
- Height: `420px`
- Border: `1px solid rgba(238,238,238,0.08)`
- Border-radius: `2px`
- Padding: `20px`
- Overflow-y: auto
- Custom scrollbar: `width: 2px`, track `transparent`, thumb `rgba(238,238,238,0.15)`
- Background: transparent

**Empty State (before upload):**
- Centered vertically and horizontally inside container
- Text: `awaiting subject...` — Inter 11px, italic, `rgba(238,238,238,0.2)`, letter-spacing 2px

**Typing Indicator:**
- Three dots, 5px each, `rgba(238,238,238,0.4)` color
- Staggered opacity pulse animation, 0.5s cycle
- Shown before each bubble appears

**Chat Bubbles — NANDRA's messages:**
- Layout: flex row, align-items flex-start, gap 10px
- Left: NANDRA avatar circle, 28px, border `1px solid rgba(238,238,238,0.15)`, background `rgba(238,238,238,0.04)`
  - Inside: `N` in Inter 10px weight 500, centered
- Right: bubble div
  - Background: `rgba(238,238,238,0.04)`
  - Border: `1px solid rgba(238,238,238,0.1)`
  - Border-radius: `2px 10px 10px 10px`
  - Padding: `10px 14px`
  - Font: Inter 13px, line-height 1.75, color `rgba(238,238,238,0.85)`
- Animation on appear: `fadeSlideUp` — from `opacity: 0, translateY: 8px` to `opacity: 1, translateY: 0`, duration `0.35s ease`
- Each bubble appears with `1000ms` delay after the previous one finishes
- Bubbles scroll into view automatically as they appear (`scrollIntoView({ behavior: 'smooth' })`)
- Gap between bubbles: `14px`

---

## Animations

### Page Load Sequence
1. Navbar fades in: `opacity 0 → 1`, `0.3s ease`, delay `0s`
2. Headline slides up: `translateY(24px) → translateY(0)`, `opacity 0 → 1`, `0.5s ease`, delay `0.15s`
3. NANDRA character slides up: `translateY(20px) → 0`, `opacity 0 → 1`, `0.5s ease`, delay `0.3s`
4. Speech bubble fades in: `opacity 0 → 1`, `0.3s ease`, delay `0.55s`
5. Two columns fade in: `opacity 0 → 1`, `0.4s ease`, delay `0.5s`

### CSS Keyframe to add in globals.css:
```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes typingPulse {
  0%, 100% { opacity: 0.2; }
  50%       { opacity: 0.8; }
}
```

---

## Footer
- `1px solid rgba(238,238,238,0.06)` top border
- Padding: `14px 48px`
- Flex, space-between
- Left: `OUTFIT MATTERS © 2026` — Inter 9px, `rgba(238,238,238,0.2)`, letter-spacing 2px
- Right: `BY NANDRA` — same style

---

## What to Remove Completely
- All gold (`#C9A84C`) — gone
- All warm tones — gone
- All gradient backgrounds — gone
- Dashed borders — replace with solid thin borders
- "NANDRA TERMINAL" label — replace with `[ VERDICT ]`
- "UPLOAD SUBJECT" label — replace with `[ SUBJECT ]`
- Any monospace font styling on the chat area
- Heavy background colors on any section

---

## Final Vibe Check
After this redesign, someone should open the page and think: "this looks like a real product." Clean, sharp, confident. NANDRA is the center of attention. The typography does the heavy lifting. Nothing is decorative — everything is intentional.
