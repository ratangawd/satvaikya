// CraftedDecorativeLayer.tsx
// Decorative background layer built specifically for the "Why SatvAikya"
// ("Crafted for the way you live") section — the four motifs below map
// 1:1 to that section's four feature cards, so nothing here is generic
// filler:
//
//   Sustainable Wood        -> leaf sprig + tree-ring cross-section
//   Handcrafted Quality     -> hand plane / carving chisel
//   Design-led               -> pencil + set-square
//   Pan-India Shipping      -> delivery truck + map pin
//
// This is intentionally sparse — a handful of hand-placed motifs, not a
// dense wallpaper — so it reads as a quiet editorial flourish behind the
// section (in the spirit of Herman Miller / Muuto / Studio McGee print
// collateral) rather than a busy background pattern. It is a separate,
// standalone component: it does not import from or modify the site-wide
// <DecorativeLayer />.
//
// Colour model: every motif draws in `currentColor`. The ambient colour
// is set once on the wrapper and individual placements override it with
// a Tailwind `text-[...]` class, exactly as in DecorativeLayer.tsx.

import React from "react";

const DEFAULT_INK = "#B98A32";

/* ------------------------------------------------------------------ */
/* Individual motif components                                         */
/* Each accepts className (position/size/opacity/rotation/colour) and   */
/* style (inline placement). All linework uses currentColor.            */
/* ------------------------------------------------------------------ */

type IconProps = {
    className?: string;
    style?: React.CSSProperties;
};

/** Sustainable Wood — a simple leaf sprig with a center vein. */
function LeafSprigIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M32 8c14 4 20 16 16 30-4 14-16 18-16 18s-12-4-16-18C12 24 18 12 32 8z"
                strokeWidth="1.3"
            />
            <path d="M32 8v48" strokeWidth="1" opacity="0.6" />
            <path d="M32 20c-4 2-7 5-8 9M32 34c5 2 9 5 11 9M32 20c4 2 7 5 8 9M32 34c-5 2-9 5-11 9" strokeWidth="0.9" opacity="0.5" />
        </svg>
    );
}

/** Sustainable Wood (alt) — a tree cross-section showing growth rings. */
function WoodRingIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <circle cx="32" cy="32" r="24" strokeWidth="1.3" />
            <circle cx="32" cy="32" r="17" strokeWidth="1" opacity="0.7" />
            <circle cx="32" cy="32" r="10" strokeWidth="1" opacity="0.6" />
            <circle cx="32" cy="32" r="3.4" strokeWidth="1" opacity="0.7" />
            <path d="M32 8v6M32 50v6M8 32h6M50 32h6" strokeWidth="0.9" opacity="0.4" />
            <path d="M20 15l3 4M44 15l-3 4M20 49l3-4M44 49l-3-4" strokeWidth="0.8" opacity="0.35" />
        </svg>
    );
}

/** Handcrafted Quality — a hand plane / spokeshave shaping wood. */
function HandPlaneIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M8 44h34c6 0 11-4 12-10l2-6h-8l-3 6H8z" strokeWidth="1.3" />
            <path d="M18 44v6M28 44v6" strokeWidth="1.2" />
            <path d="M14 44c0-8 5-14 12-14h6" strokeWidth="1.1" opacity="0.7" />
            <path d="M40 28c2-2 5-3 8-2" strokeWidth="1" opacity="0.5" />
            <path d="M4 46c6 3 10 3 14 0" strokeWidth="0.9" opacity="0.45" />
        </svg>
    );
}

/** Handcrafted Quality (alt) — a carving chisel with a wood shaving. */
function ChiselIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M10 54l26-26" strokeWidth="1.4" />
            <path d="M32 32l8-8 10 10-8 8z" strokeWidth="1.3" />
            <path d="M44 20l6-6" strokeWidth="1.3" />
            <path d="M46 12l6 6" strokeWidth="1.2" />
            <path d="M10 54c-2 2-3 5-2 7 2 1 5 0 7-2" strokeWidth="1" opacity="0.6" />
            <path d="M18 40c4 2 6 6 4 10" strokeWidth="0.9" opacity="0.4" />
        </svg>
    );
}

/** Design-led — a pencil paired with a set-square / ruler. */
function PencilSquareIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M14 50l28-28 8 8-28 28-9 1z" strokeWidth="1.3" />
            <path d="M38 26l6-6 8 8-6 6" strokeWidth="1.2" />
            <path d="M13 51l2-9 7 2z" strokeWidth="1" opacity="0.7" />
            <path d="M8 20v24h10" strokeWidth="1.1" opacity="0.55" />
            <path d="M8 20h24" strokeWidth="1.1" opacity="0.55" />
            <path d="M12 26h4M12 32h4M12 38h4" strokeWidth="0.8" opacity="0.4" />
        </svg>
    );
}

/** Design-led (alt) — a drafting compass. */
function CompassIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M32 10l16 44M32 10L16 54" strokeWidth="1.3" />
            <circle cx="32" cy="10" r="3" strokeWidth="1.2" />
            <path d="M20 44h24" strokeWidth="1" opacity="0.55" />
            <circle cx="32" cy="34" r="1.3" fill="currentColor" stroke="none" />
            <path d="M27 6l5-4 5 4" strokeWidth="1" opacity="0.6" />
        </svg>
    );
}

/** Pan-India Shipping — a delivery truck. */
function DeliveryTruckIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M6 20h30v24H6z" strokeWidth="1.3" />
            <path d="M36 28h12l10 8v8H36z" strokeWidth="1.3" />
            <circle cx="17" cy="48" r="5" strokeWidth="1.2" />
            <circle cx="46" cy="48" r="5" strokeWidth="1.2" />
            <path d="M22 48h19" strokeWidth="1" opacity="0.55" />
            <path d="M40 28v16" strokeWidth="0.9" opacity="0.4" />
            <path d="M6 26h30" strokeWidth="0.8" opacity="0.35" />
        </svg>
    );
}

/** Pan-India Shipping (alt) — a location pin marking a delivery point. */
function MapPinIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M32 58c12-14 18-24 18-33a18 18 0 10-36 0c0 9 6 19 18 33z" strokeWidth="1.3" />
            <circle cx="32" cy="25" r="7" strokeWidth="1.2" />
            <path d="M32 4v5M8 25h5M51 25h5" strokeWidth="0.8" opacity="0.4" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* A small, hand-placed set — four themes, matched to the section's     */
/* four feature cards, kept sparse and low-opacity so it reads as a      */
/* quiet material texture rather than a pattern competing with content.  */
/* ------------------------------------------------------------------ */

type Placement = {
    Icon: React.ComponentType<IconProps>;
    style: React.CSSProperties;
    className?: string;
};

const INK_GOLD = "text-[#B98A32]"; // warm gold
const INK_UMBER = "text-[#7B5A3A]"; // walnut / umber
const INK_SAGE = "text-[#7A8452]"; // sage
const INK_DEEP = "text-[#8C6423]"; // deep antique gold

const placements: Placement[] = [
    // Sustainable Wood
    { Icon: LeafSprigIcon, style: { top: "8%", left: "6%", width: 46 }, className: `opacity-25 -rotate-6 ${INK_SAGE}` },
    { Icon: WoodRingIcon, style: { top: "70%", left: "3%", width: 40 }, className: `opacity-20 rotate-3 ${INK_UMBER}` },

    // Handcrafted Quality
    { Icon: HandPlaneIcon, style: { top: "12%", left: "89%", width: 48 }, className: `opacity-25 rotate-6 ${INK_UMBER}` },
    { Icon: ChiselIcon, style: { top: "78%", left: "93%", width: 38 }, className: `opacity-20 -rotate-12 ${INK_GOLD}` },

    // Design-led
    { Icon: PencilSquareIcon, style: { top: "4%", left: "47%", width: 40 }, className: `opacity-20 rotate-3 ${INK_DEEP}` },
    { Icon: CompassIcon, style: { top: "88%", left: "42%", width: 34 }, className: `opacity-18 -rotate-6 ${INK_GOLD}` },

    // Pan-India Shipping
    { Icon: DeliveryTruckIcon, style: { top: "40%", left: "94%", width: 46 }, className: `opacity-22 ${INK_SAGE}` },
    { Icon: MapPinIcon, style: { top: "46%", left: "2%", width: 34 }, className: `opacity-20 rotate-6 ${INK_DEEP}` },

    // A few small filler accents so the corners don't feel empty, still
    // drawn only from the same four themes.
    { Icon: LeafSprigIcon, style: { top: "92%", left: "18%", width: 26 }, className: `opacity-15 rotate-12 ${INK_SAGE}` },
    { Icon: MapPinIcon, style: { top: "18%", left: "26%", width: 22 }, className: `opacity-15 -rotate-6 ${INK_UMBER}` },
    { Icon: ChiselIcon, style: { top: "58%", left: "50%", width: 24 }, className: `opacity-12 rotate-12 ${INK_GOLD}` },
    { Icon: WoodRingIcon, style: { top: "6%", left: "72%", width: 22 }, className: `opacity-14 ${INK_DEEP}` },
];

export default function CraftedDecorativeLayer() {
    return (
        // Purely decorative background: sits behind content (z-0), never
        // intercepts pointer events, and is clipped to its own bounds.
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            style={{ color: DEFAULT_INK }}
            aria-hidden="true"
        >
            {placements.map(({ Icon, style, className }, i) => (
                <Icon
                    key={i}
                    className={`absolute ${className ?? ""}`}
                    style={{ ...style, height: "auto" }}
                />
            ))}
        </div>
    );
}