// DecorativeLayer.tsx
// Premium ethnic gifting decorative background layer.
// All motifs are hand-built inline SVGs (no icon libraries) so the linework,
// proportions and "toy" character match a festive/ethnic gifting aesthetic.
//
// Colour model: every motif draws in `currentColor`. The ambient colour is
// set once on the wrapper (DEFAULT_INK) and individual placements can
// override it with a Tailwind `text-[...]` class, which is how the palette
// mix in the composition below is achieved without hardcoding colours
// inside any single SVG.

import React from "react";

const DEFAULT_INK = "#B98A32";

/* ------------------------------------------------------------------ */
/* Individual motif components                                         */
/* Each accepts className (position/size/opacity/rotation/colour) and   */
/* style (inline placement) so they can be scattered freely from the    */
/* composition below. All linework uses currentColor so colour is fully */
/* controlled by the Tailwind text-colour class applied at the call     */
/* site.                                                                */
/* ------------------------------------------------------------------ */

type IconProps = {
    className?: string;
    style?: React.CSSProperties;
};

function GiftBoxIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <rect x="10" y="26" width="44" height="30" rx="2" strokeWidth="1.4" />
            <rect x="6" y="18" width="52" height="10" rx="2" strokeWidth="1.4" />
            <line x1="32" y1="18" x2="32" y2="56" strokeWidth="1.4" />
            <path d="M32 18c-6-2-12-8-9-14 3-5 9-1 9 14z" strokeWidth="1.3" fill="none" />
            <path d="M32 18c6-2 12-8 9-14-3-5-9-1-9 14z" strokeWidth="1.3" fill="none" />
            <path d="M14 36h8M14 42h6M42 36h8M44 42h6" strokeWidth="1" opacity="0.6" />
        </svg>
    );
}

function ShoppingBagIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M14 22h36l-3 34a3 3 0 01-3 3H20a3 3 0 01-3-3z" strokeWidth="1.4" />
            <path d="M22 22c0-9 4-15 10-15s10 6 10 15" strokeWidth="1.4" />
            <circle cx="24" cy="30" r="1.6" fill="currentColor" stroke="none" />
            <circle cx="40" cy="30" r="1.6" fill="currentColor" stroke="none" />
            <path d="M20 40c4 3 20 3 24 0" strokeWidth="1" opacity="0.6" />
            <path d="M32 15v44" strokeWidth="0.8" opacity="0.4" strokeDasharray="1 4" />
        </svg>
    );
}

function LanternIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M24 8h16" strokeWidth="1.4" />
            <path d="M32 8v6" strokeWidth="1.4" />
            <path d="M20 16h24l-4 6H24z" strokeWidth="1.3" />
            <path d="M18 22h28c2 8 2 20 0 28H18c-2-8-2-20 0-28z" strokeWidth="1.3" />
            <path d="M22 22c-3 9-3 19 0 28M42 22c3 9 3 19 0 28" strokeWidth="1" opacity="0.6" />
            <path d="M18 30h28M18 42h28" strokeWidth="0.9" opacity="0.5" />
            <path d="M24 50h16l-3 6h-10z" strokeWidth="1.3" />
            <line x1="32" y1="56" x2="32" y2="62" strokeWidth="1.2" />
        </svg>
    );
}

function ElephantIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M14 40c-3-10 2-20 14-22 10-2 20 3 22 12 1 6-2 9-6 9-1 4-1 8 1 12h-6c-1-3-1-6-1-9-4 1-9 1-13 0 0 3-1 6-2 9h-6c1-4 1-8-1-11-3 0-2-1-2 0z"
                strokeWidth="1.3"
            />
            <path d="M40 30c3 1 6 4 5 9-1 4-4 5-6 4" strokeWidth="1.2" />
            <circle cx="34" cy="28" r="1.4" fill="currentColor" stroke="none" />
            <path d="M18 40c-2 3-2 8 0 12" strokeWidth="1" opacity="0.6" />
            <path d="M17 52a10 10 0 0016 0" strokeWidth="1" opacity="0.5" />
            <circle cx="19" cy="58" r="2.4" strokeWidth="1" />
            <circle cx="30" cy="58" r="2.4" strokeWidth="1" />
            <path d="M22 22c2-3 6-4 8-2" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

function GiraffeIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <ellipse cx="30" cy="46" rx="14" ry="8" strokeWidth="1.3" />
            <path d="M38 42c4-14 2-26 6-32" strokeWidth="1.3" />
            <ellipse cx="45" cy="9" rx="5" ry="4" strokeWidth="1.2" />
            <path d="M41 6l-2-4M49 6l2-4" strokeWidth="1" />
            <circle cx="47" cy="8" r="1" fill="currentColor" stroke="none" />
            <path d="M20 52l-3 8M28 54l-2 8M36 52l3 8M40 50l4 7" strokeWidth="1.2" />
            <circle cx="22" cy="42" r="1" fill="currentColor" stroke="none" />
            <circle cx="30" cy="45" r="1" fill="currentColor" stroke="none" />
            <circle cx="37" cy="40" r="1" fill="currentColor" stroke="none" />
            <path d="M14 44c-3 1-3 5 0 6" strokeWidth="1" opacity="0.6" />
            <ellipse cx="6" cy="46" rx="9" ry="2.4" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

function RockingHorseIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M8 50c10 5 38 5 48 0" strokeWidth="1.4" />
            <path d="M12 50c1-3 5-3 6 0M46 50c1-3 5-3 6 0" strokeWidth="1.2" />
            <path
                d="M20 46c-2-10 2-20 10-24 6-3 14-2 16 4-6 0-11 3-13 8 4 0 7 2 8 6-4 2-9 2-13 1-1 3-1 6 0 9z"
                strokeWidth="1.3"
            />
            <path d="M40 22c2-3 6-4 8-2" strokeWidth="1" opacity="0.6" />
            <circle cx="34" cy="20" r="1.2" fill="currentColor" stroke="none" />
            <path d="M20 30l-8 4M22 38l-9 1" strokeWidth="1.1" />
            <path d="M26 46v8M34 46v8" strokeWidth="1.2" />
            <path d="M18 20c4-6 8-2 6 4" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

function TeddyBearIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <circle cx="20" cy="14" r="6" strokeWidth="1.3" />
            <circle cx="44" cy="14" r="6" strokeWidth="1.3" />
            <circle cx="32" cy="24" r="14" strokeWidth="1.4" />
            <circle cx="27" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="37" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <path d="M28 28c2 2 6 2 8 0" strokeWidth="1.1" />
            <circle cx="32" cy="24" r="4" strokeWidth="1" opacity="0.6" />
            <path
                d="M18 38c-6 2-9 8-6 14 2 4 6 5 8 3M46 38c6 2 9 8 6 14-2 4-6 5-8 3"
                strokeWidth="1.3"
            />
            <ellipse cx="32" cy="46" rx="16" ry="14" strokeWidth="1.4" />
            <ellipse cx="32" cy="49" rx="7" ry="6" strokeWidth="1" opacity="0.6" />
            <ellipse cx="20" cy="56" rx="4" ry="3" strokeWidth="1.1" />
            <ellipse cx="44" cy="56" rx="4" ry="3" strokeWidth="1.1" />
        </svg>
    );
}

function DiyaIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M28 34c-6 8 0 15 4 21 4-6 10-13 4-21-1 3-3 4-4 2-1 2-3 1-4-2z"
                strokeWidth="1.3"
                opacity="0.85"
            />
            <path d="M10 44c6 6 16 9 22 9s16-3 22-9c-2 6-10 12-22 12S12 50 10 44z" strokeWidth="1.4" />
            <path d="M18 44c4 3 10 4 14 4s10-1 14-4" strokeWidth="1" opacity="0.6" />
            <circle cx="14" cy="42" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="50" cy="42" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    );
}

function LotusIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M32 54c-10 0-16-8-16-16 6 2 12 6 16 12 4-6 10-10 16-12 0 8-6 16-16 16z"
                strokeWidth="1.3"
            />
            <path
                d="M32 54c-6-2-10-8-9-15 5 3 8 8 9 15zM32 54c6-2 10-8 9-15-5 3-8 8-9 15z"
                strokeWidth="1.1"
                opacity="0.7"
            />
            <path d="M32 40c-2-8 0-16 0-20M32 40c-6-4-10-10-9-16M32 40c6-4 10-10 9-16" strokeWidth="1.1" />
            <circle cx="32" cy="18" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    );
}

function KiteIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M32 4l20 24-20 30-20-30z" strokeWidth="1.3" />
            <line x1="32" y1="4" x2="32" y2="58" strokeWidth="1" opacity="0.6" />
            <line x1="12" y1="28" x2="52" y2="28" strokeWidth="1" opacity="0.6" />
            <path
                d="M32 58c1 3 4 4 3 7-1-2-3-2-3-1 0-1-2-1-3 1-1-3 2-4 3-7z"
                strokeWidth="1"
            />
        </svg>
    );
}

function MandalaKeychainIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <circle cx="32" cy="10" r="4" strokeWidth="1.3" />
            <path d="M32 14v8" strokeWidth="1.2" />
            <circle cx="32" cy="38" r="16" strokeWidth="1.3" />
            <circle cx="32" cy="38" r="10" strokeWidth="1" opacity="0.6" />
            <circle cx="32" cy="38" r="4" strokeWidth="1" opacity="0.6" />
            {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 360) / 12;
                return (
                    <line
                        key={i}
                        x1="32"
                        y1="38"
                        x2="32"
                        y2="22"
                        strokeWidth="0.8"
                        opacity="0.5"
                        transform={`rotate(${a} 32 38)`}
                    />
                );
            })}
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Floral vine (refined)                                                */
/* Thinner stem, more organic sweep, softer leaves, smaller flowers,    */
/* fewer repeated elements — a lighter, more botanical-illustration     */
/* feel rather than a dense repeating pattern.                          */
/* ------------------------------------------------------------------ */

function FloralVineIcon({ className, style }: IconProps) {
    return (
        <svg
            viewBox="0 0 220 70"
            className={className}
            style={style}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Main stem — thin, organic sweep */}
            <path
                d="M6 40
           C40 14 66 58 100 34
           C134 12 158 56 214 30"
                strokeWidth="1"
            />

            {/* Leaves — softer, natural shape with a single vein */}
            {(
                [
                    [32, 20, -28],
                    [78, 50, 32],
                    [128, 18, -30],
                    [180, 40, 26],
                ] as const
            ).map(([x, y, r], i) => (
                <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                    <path d="M0 0 C4 -10 14 -10 20 -2 C14 6 4 6 0 0Z" strokeWidth="0.9" />
                    <path d="M1 -1 C7 -3 13 -3 18 -2" strokeWidth="0.5" opacity="0.6" />
                </g>
            ))}

            {/* Small flowers — fewer, smaller */}
            {[58, 158].map((cx, i) => (
                <g key={i} transform={`translate(${cx} 34)`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                        <g key={j} transform={`rotate(${j * 72})`}>
                            <ellipse cx="0" cy="-5" rx="1.7" ry="4" strokeWidth="0.8" />
                        </g>
                    ))}
                    <circle r="1.4" fill="currentColor" stroke="none" />
                </g>
            ))}

            {/* Single hanging bud for accent */}
            <path d="M108 36 C108 46 111 52 109 58" strokeWidth="0.8" />
            <path d="M109 58 C106 53 112 53 109 58Z" strokeWidth="0.8" />

            {/* Tiny filler dots */}
            {(
                [
                    [46, 26],
                    [96, 22],
                    [190, 24],
                ] as const
            ).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.1" fill="currentColor" stroke="none" opacity="0.7" />
            ))}
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Corner mandala (redesigned)                                          */
/* Fewer, larger lotus petals with generous negative space, a delicate  */
/* bead ring, and two clean concentric circles — closer to luxury       */
/* Indian wedding stationery than a dense geometric motif.              */
/* ------------------------------------------------------------------ */

function CornerMandala({ className, style }: IconProps) {
    return (
        <svg
            viewBox="0 0 320 320"
            className={className}
            style={style}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Decorative bead ring */}
            {Array.from({ length: 28 }).map((_, i) => {
                const a = (Math.PI * 2 * i) / 28;
                return (
                    <circle
                        key={`bead-${i}`}
                        cx={160 + Math.cos(a) * 128}
                        cy={160 + Math.sin(a) * 128}
                        r="1.8"
                        fill="currentColor"
                        stroke="none"
                        opacity="0.8"
                    />
                );
            })}

            {/* Outer ring */}
            <circle cx="160" cy="160" r="112" strokeWidth="1" opacity="0.7" />

            {/* Lotus petals — fewer, larger, generous negative space */}
            {Array.from({ length: 10 }).map((_, i) => {
                const angle = (360 / 10) * i;
                return (
                    <g key={`petal-${i}`} transform={`rotate(${angle} 160 160)`}>
                        <path
                            d="M160 62
                 C148 84 146 104 160 122
                 C174 104 172 84 160 62Z"
                            strokeWidth="1.3"
                        />
                    </g>
                );
            })}

            {/* Inner ring */}
            <circle cx="160" cy="160" r="46" strokeWidth="1" opacity="0.7" />

            {/* Inner lotus bud detail */}
            {Array.from({ length: 6 }).map((_, i) => (
                <g key={`bud-${i}`} transform={`rotate(${i * 60} 160 160)`}>
                    <path
                        d="M160 128
               C155 138 155 148 160 156
               C165 148 165 138 160 128Z"
                        strokeWidth="1.1"
                    />
                </g>
            ))}

            {/* Centre */}
            <circle cx="160" cy="160" r="6" fill="currentColor" stroke="none" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Additional motifs (density pass)                                     */
/* New inline SVGs added to broaden the wallpaper vocabulary. Same       */
/* linework language as the originals: currentColor stroke, occasional   */
/* filled dots/accents, viewBox 0 0 64 64 (0 0 32 32 for the tiniest      */
/* fillers). These get reused across many placements with different      */
/* sizes/rotations/mirrors/colours rather than each needing to be unique. */
/* ------------------------------------------------------------------ */

function RibbonBowIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M32 30c-4-10-16-14-22-8-5 5 0 14 12 14 4 0 8-2 10-6z" strokeWidth="1.3" />
            <path d="M32 30c4-10 16-14 22-8 5 5 0 14-12 14-4 0-8-2-10-6z" strokeWidth="1.3" />
            <circle cx="32" cy="30" r="4" strokeWidth="1.2" />
            <path d="M28 33l-6 24M36 33l6 24" strokeWidth="1.1" />
            <path d="M22 57l-4-6M42 57l4-6" strokeWidth="0.9" opacity="0.6" />
        </svg>
    );
}

function GiftTagIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M10 30l16-16h28a4 4 0 014 4v16L38 54a4 4 0 01-6 0L10 32a4 4 0 010-2z" strokeWidth="1.3" />
            <circle cx="30" cy="20" r="3" strokeWidth="1.1" />
            <path d="M42 26l6 6M46 22l6 6" strokeWidth="0.9" opacity="0.6" />
            <path d="M30 20l-14 14" strokeWidth="0.8" opacity="0.4" strokeDasharray="1 3" />
        </svg>
    );
}

function EnvelopeIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <rect x="8" y="16" width="48" height="34" rx="2" strokeWidth="1.3" />
            <path d="M8 18l24 18 24-18" strokeWidth="1.2" />
            <circle cx="32" cy="36" r="3.4" strokeWidth="1" opacity="0.7" />
        </svg>
    );
}

function WaxSealIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <circle cx="32" cy="32" r="17" strokeWidth="1.3" />
            {Array.from({ length: 10 }).map((_, i) => (
                <line
                    key={i}
                    x1="32"
                    y1="32"
                    x2="32"
                    y2="15"
                    strokeWidth="0.9"
                    opacity="0.5"
                    transform={`rotate(${i * 36} 32 32)`}
                />
            ))}
            <circle cx="32" cy="32" r="6" strokeWidth="1.1" />
            <path d="M32 27c2 2 2 6 0 8-2-2-2-6 0-8z" strokeWidth="0.9" />
        </svg>
    );
}

function TeaCupIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M12 26h32v10c0 8-7 14-16 14s-16-6-16-14z" strokeWidth="1.3" />
            <path d="M44 30c6-2 10 2 8 8-2 5-7 6-10 4" strokeWidth="1.1" />
            <path d="M18 20c0-4 3-6 3-9M28 20c0-4-3-6-3-9" strokeWidth="0.9" opacity="0.5" />
            <ellipse cx="28" cy="50" rx="18" ry="3" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

function TeaPotIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M14 34c0-8 8-14 18-14s18 6 18 14-8 14-18 14-18-6-18-14z" strokeWidth="1.3" />
            <path d="M10 30c-6-2-8 4-4 8 2 2 5 2 7 0" strokeWidth="1.1" />
            <path d="M46 28c6-4 12-2 12 2s-4 6-9 4" strokeWidth="1.1" />
            <path d="M28 20V12M24 12h8" strokeWidth="1.2" />
            <ellipse cx="32" cy="50" rx="20" ry="3" strokeWidth="1" opacity="0.5" />
        </svg>
    );
}

function DecorativeBoxIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <rect x="12" y="28" width="40" height="26" rx="2" strokeWidth="1.3" />
            <path d="M8 20h48l-4 8H12z" strokeWidth="1.3" />
            <path d="M20 28v26M44 28v26" strokeWidth="1" opacity="0.5" />
            <circle cx="32" cy="20" r="4" strokeWidth="1.1" />
            <path d="M18 40h10M18 46h6M36 40h10M38 46h8" strokeWidth="0.9" opacity="0.5" />
        </svg>
    );
}

function PaisleyIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M40 12c10 4 14 16 8 26-4 7-12 10-19 8-9-3-13-13-8-20 3-5 10-6 13-2 3 4-1 9-5 7"
                strokeWidth="1.2"
            />
            <circle cx="24" cy="34" r="1.4" fill="currentColor" stroke="none" />
            <path d="M32 20c4 2 6 7 4 11" strokeWidth="0.9" opacity="0.5" />
        </svg>
    );
}

function LeafSprigIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M32 8v48" strokeWidth="1" opacity="0.6" />
            <path
                d="M32 16c8-4 14 2 12 8-8-2-12-3-12-8zM32 16c-8-4-14 2-12 8 8-2 12-3 12-8z"
                strokeWidth="1.1"
            />
            <path
                d="M32 30c8-4 14 2 12 8-8-2-12-3-12-8zM32 30c-8-4-14 2-12 8 8-2 12-3 12-8z"
                strokeWidth="1.1"
            />
            <path d="M32 44c6-3 10 1 9 6-6-1-9-2-9-6z" strokeWidth="1" />
        </svg>
    );
}

function BellIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path
                d="M32 10a4 4 0 014 4v2c7 2 11 8 11 16v10l4 6H13l4-6V32c0-8 4-14 11-16v-2a4 4 0 014-4z"
                strokeWidth="1.3"
            />
            <circle cx="32" cy="54" r="4" strokeWidth="1.1" />
            <path d="M24 22c2-2 5-3 8-3" strokeWidth="0.9" opacity="0.5" />
        </svg>
    );
}

function SpinningTopIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M18 14h28l-4 10H22z" strokeWidth="1.3" />
            <path d="M22 24h20l-6 22c-2 6-6 6-8 0z" strokeWidth="1.3" />
            <path d="M30 46l2 10 2-10" strokeWidth="1.1" />
            <path d="M22 30h20M24 36h16" strokeWidth="0.9" opacity="0.5" />
        </svg>
    );
}

function PullToyDuckIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <ellipse cx="28" cy="38" rx="18" ry="14" strokeWidth="1.3" />
            <circle cx="46" cy="24" r="9" strokeWidth="1.3" />
            <path d="M54 24h6l-3 3z" strokeWidth="1.1" />
            <circle cx="49" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="16" cy="50" r="3" strokeWidth="1.1" />
            <circle cx="36" cy="50" r="3" strokeWidth="1.1" />
            <path d="M10 40l-8 4" strokeWidth="1" opacity="0.6" />
            <circle cx="2" cy="44" r="2" strokeWidth="1" opacity="0.6" />
        </svg>
    );
}

function MiniMandalaIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor">
            <circle cx="32" cy="32" r="14" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="8" strokeWidth="1" opacity="0.6" />
            {Array.from({ length: 8 }).map((_, i) => (
                <line
                    key={i}
                    x1="32"
                    y1="18"
                    x2="32"
                    y2="12"
                    strokeWidth="1"
                    transform={`rotate(${i * 45} 32 32)`}
                />
            ))}
            <circle cx="32" cy="32" r="2.2" fill="currentColor" stroke="none" />
        </svg>
    );
}

function SparkleIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 32 32" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M16 2c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z" strokeWidth="1.1" />
        </svg>
    );
}

function StarIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 32 32" className={className} style={style} fill="none" stroke="currentColor">
            <path d="M16 3l3.5 8 8.5 1-6.4 5.8 1.9 8.4L16 22l-7.5 4.2 1.9-8.4L4 12l8.5-1z" strokeWidth="1" />
        </svg>
    );
}

function CurlIcon({ className, style }: IconProps) {
    return (
        <svg
            viewBox="0 0 40 24"
            className={className}
            style={style}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
        >
            <path d="M2 18c8 6 16-2 12-8-3-5-9-3-8 2 1 4 6 5 9 3" strokeWidth="1.1" />
        </svg>
    );
}

function TinyFlowerIcon({ className, style }: IconProps) {
    return (
        <svg viewBox="0 0 32 32" className={className} style={style} fill="none" stroke="currentColor">
            {Array.from({ length: 5 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 72} 16 16)`}>
                    <ellipse cx="16" cy="9" rx="2.6" ry="6" strokeWidth="0.9" />
                </g>
            ))}
            <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

type Placement = {
    Icon: React.ComponentType<IconProps>;
    style: React.CSSProperties;
    className?: string;
};

// Curated colour mix so the wallpaper reads with depth rather than a flat
// wash of a single gold. Assigned by hand per motif for an editorial feel,
// not cycled mechanically.
const INK_1 = "text-[#B98A32]"; // warm gold (base)
const INK_2 = "text-[#8C6423]"; // deep antique gold
const INK_3 = "text-[#7B5A3A]"; // umber
const INK_4 = "text-[#7A8452]"; // sage

const placements: Placement[] = [
    // Gift boxes
    { Icon: GiftBoxIcon, style: { top: "9%", left: "7%", width: 56 }, className: `opacity-70 -rotate-6 ${INK_1}` },
    { Icon: GiftBoxIcon, style: { top: "71%", left: "83%", width: 44 }, className: `opacity-55 rotate-12 ${INK_3}` },
    { Icon: GiftBoxIcon, style: { top: "37%", left: "5%", width: 34 }, className: `opacity-50 rotate-2 ${INK_2}` },
    { Icon: GiftBoxIcon, style: { top: "89%", left: "39%", width: 40 }, className: `opacity-55 -rotate-12 ${INK_1}` },

    // Shopping bags
    { Icon: ShoppingBagIcon, style: { top: "17%", left: "71%", width: 48 }, className: `opacity-60 rotate-6 ${INK_2}` },
    { Icon: ShoppingBagIcon, style: { top: "59%", left: "11%", width: 38 }, className: `opacity-50 -rotate-6 ${INK_4}` },
    { Icon: ShoppingBagIcon, style: { top: "5%", left: "45%", width: 30 }, className: `opacity-45 rotate-3 ${INK_1}` },

    // Lanterns
    { Icon: LanternIcon, style: { top: "23%", left: "51%", width: 40 }, className: `opacity-55 ${INK_1}` },
    { Icon: LanternIcon, style: { top: "81%", left: "5%", width: 46 }, className: `opacity-55 rotate-3 ${INK_3}` },
    { Icon: LanternIcon, style: { top: "3%", left: "89%", width: 36 }, className: `opacity-50 -rotate-3 ${INK_2}` },

    // Wooden elephant
    { Icon: ElephantIcon, style: { top: "45%", left: "89%", width: 54 }, className: `opacity-60 ${INK_1}` },
    { Icon: ElephantIcon, style: { top: "65%", left: "33%", width: 42 }, className: `opacity-40 -rotate-6 ${INK_4}` },

    // Pull-toy giraffe
    { Icon: GiraffeIcon, style: { top: "7%", left: "25%", width: 46 }, className: `opacity-50 rotate-3 ${INK_2}` },
    { Icon: GiraffeIcon, style: { top: "83%", left: "61%", width: 40 }, className: `opacity-50 -rotate-3 ${INK_1}` },

    // Rocking horse
    { Icon: RockingHorseIcon, style: { top: "33%", left: "17%", width: 48 }, className: `opacity-55 rotate-6 ${INK_3}` },
    { Icon: RockingHorseIcon, style: { top: "93%", left: "85%", width: 40 }, className: `opacity-45 -rotate-6 ${INK_2}` },

    // Teddy bear
    { Icon: TeddyBearIcon, style: { top: "55%", left: "59%", width: 50 }, className: `opacity-55 ${INK_1}` },
    { Icon: TeddyBearIcon, style: { top: "13%", left: "63%", width: 34 }, className: `opacity-40 rotate-6 ${INK_4}` },

    // Diya
    { Icon: DiyaIcon, style: { top: "29%", left: "79%", width: 32 }, className: `opacity-65 ${INK_2}` },
    { Icon: DiyaIcon, style: { top: "73%", left: "47%", width: 28 }, className: `opacity-55 ${INK_1}` },
    { Icon: DiyaIcon, style: { top: "51%", left: "5%", width: 26 }, className: `opacity-45 ${INK_3}` },

    // Lotus
    { Icon: LotusIcon, style: { top: "19%", left: "37%", width: 32 }, className: `opacity-55 ${INK_4}` },
    { Icon: LotusIcon, style: { top: "67%", left: "73%", width: 28 }, className: `opacity-50 ${INK_1}` },
    { Icon: LotusIcon, style: { top: "95%", left: "15%", width: 26 }, className: `opacity-45 ${INK_2}` },

    // Kite
    { Icon: KiteIcon, style: { top: "11%", left: "9%", width: 30 }, className: `opacity-50 rotate-12 ${INK_1}` },
    { Icon: KiteIcon, style: { top: "61%", left: "93%", width: 34 }, className: `opacity-45 -rotate-12 ${INK_3}` },

    // Mandala keychain
    { Icon: MandalaKeychainIcon, style: { top: "41%", left: "43%", width: 30 }, className: `opacity-40 ${INK_2}` },
    { Icon: MandalaKeychainIcon, style: { top: "79%", left: "25%", width: 26 }, className: `opacity-35 rotate-6 ${INK_4}` },
];

const vinePlacements: { style: React.CSSProperties; className: string }[] = [
    { style: { top: "4%", left: "14%", width: 260 }, className: `opacity-50 ${INK_1}` },
    { style: { top: "28%", right: "6%", width: 220 }, className: `opacity-40 rotate-12 ${INK_3}` },
    { style: { top: "54%", left: "8%", width: 260 }, className: `opacity-35 ${INK_4}` },
    { style: { top: "78%", right: "12%", width: 240 }, className: `opacity-40 -rotate-6 ${INK_2}` },
    { style: { bottom: "3%", left: "34%", width: 300 }, className: `opacity-50 rotate-180 ${INK_1}` },
];

/* ------------------------------------------------------------------ */
/* Density pass — generated placements                                 */
/* The hand-placed `placements` / `vinePlacements` arrays above are      */
/* untouched. Everything below is additive: a small seeded-random        */
/* generator scatters many more motifs across four size tiers (large /   */
/* medium / small / tiny) plus a micro-dot texture layer, so the page    */
/* reads as continuous wallpaper instead of isolated icons.              */
/*                                                                       */
/* Positions come from a jittered grid — cells are shuffled and each      */
/* placed icon is nudged by a random offset within its cell — which      */
/* avoids both a visible grid AND uncontrolled random overlap. Rotation,  */
/* mirroring (scaleX(-1)), size, opacity and ink colour are all randomised */
/* per placement so the same handful of icons reused many times still      */
/* reads as varied.                                                      */
/*                                                                       */
/* The generator is deterministic (seeded), so the layout is stable       */
/* across renders/SSR — it just looks hand-composed.                     */
/* ------------------------------------------------------------------ */

const INK_HEX: Record<string, string> = {
    [INK_1]: "#B98A32",
    [INK_2]: "#8C6423",
    [INK_3]: "#7B5A3A",
    [INK_4]: "#7A8452",
};
const INKS = [INK_1, INK_2, INK_3, INK_4];

// Small seeded PRNG (mulberry32) so the "random" composition is stable
// between renders instead of reshuffling on every mount.
function mulberry32(seed: number) {
    return function random() {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type Tier = {
    icons: React.ComponentType<IconProps>[];
    count: number;
    sizeMin: number;
    sizeMax: number;
    opacityMin: number;
    opacityMax: number;
    marginPercent: number;
    seed: number;
};

function generateTier(tier: Tier): Placement[] {
    const rng = mulberry32(tier.seed);

    // Lay out a grid a little larger than the target count, then shuffle
    // and take the first N cells — this gives full-page coverage without
    // the rigid look of an untouched grid once jitter is applied.
    const cols = Math.max(4, Math.ceil(Math.sqrt(tier.count * 1.7)));
    const rows = Math.max(4, Math.ceil(tier.count / cols));
    const cellW = (100 - tier.marginPercent * 2) / cols;
    const cellH = (100 - tier.marginPercent * 2) / rows;

    const cells: { row: number; col: number }[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) cells.push({ row: r, col: c });
    }
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    return cells.slice(0, Math.min(tier.count, cells.length)).map(({ row, col }) => {
        const Icon = tier.icons[Math.floor(rng() * tier.icons.length)];
        const jitterX = (rng() - 0.5) * cellW * 0.75;
        const jitterY = (rng() - 0.5) * cellH * 0.75;
        const left = tier.marginPercent + col * cellW + cellW / 2 + jitterX;
        const top = tier.marginPercent + row * cellH + cellH / 2 + jitterY;
        const size = tier.sizeMin + rng() * (tier.sizeMax - tier.sizeMin);
        const rotation = Math.round((rng() - 0.5) * 70); // -35deg .. 35deg
        const mirror = rng() > 0.5;
        const opacity = tier.opacityMin + rng() * (tier.opacityMax - tier.opacityMin);
        const ink = INKS[Math.floor(rng() * INKS.length)];

        return {
            Icon,
            className: ink,
            style: {
                top: `${top.toFixed(2)}%`,
                left: `${left.toFixed(2)}%`,
                width: Math.round(size),
                height: "auto",
                opacity: Number(opacity.toFixed(2)),
                transform: `rotate(${rotation}deg)${mirror ? " scaleX(-1)" : ""}`,
            },
        };
    });
}

// Layer 3 — large motifs, 55-70px.
const largeTierIcons = [
    GiftBoxIcon,
    ShoppingBagIcon,
    LanternIcon,
    ElephantIcon,
    GiraffeIcon,
    RockingHorseIcon,
    TeddyBearIcon,
    TeaPotIcon,
    EnvelopeIcon,
    WaxSealIcon,
    DecorativeBoxIcon,
    PullToyDuckIcon,
];
const generatedLarge = generateTier({
    icons: largeTierIcons,
    count: 42,
    sizeMin: 55,
    sizeMax: 70,
    opacityMin: 0.35,
    opacityMax: 0.6,
    marginPercent: 3,
    seed: 1001,
});

// Layer 4 — medium motifs, 35-45px.
const mediumTierIcons = [
    DiyaIcon,
    LotusIcon,
    KiteIcon,
    MandalaKeychainIcon,
    RibbonBowIcon,
    GiftTagIcon,
    TeaCupIcon,
    BellIcon,
    SpinningTopIcon,
    PaisleyIcon,
];
const generatedMedium = generateTier({
    icons: mediumTierIcons,
    count: 50,
    sizeMin: 35,
    sizeMax: 45,
    opacityMin: 0.3,
    opacityMax: 0.55,
    marginPercent: 2,
    seed: 2002,
});

// Layer 5 (part 1) — small fillers, 18-28px.
const smallTierIcons = [
    DiyaIcon,
    LotusIcon,
    PaisleyIcon,
    BellIcon,
    LeafSprigIcon,
    MiniMandalaIcon,
    GiftTagIcon,
    RibbonBowIcon,
];
const generatedSmall = generateTier({
    icons: smallTierIcons,
    count: 120,
    sizeMin: 18,
    sizeMax: 28,
    opacityMin: 0.25,
    opacityMax: 0.5,
    marginPercent: 1,
    seed: 3003,
});

// Layer 5 (part 2) — tiny fillers, 8-14px, occupying leftover negative space.
const tinyTierIcons = [SparkleIcon, StarIcon, CurlIcon, TinyFlowerIcon, LeafSprigIcon];
const generatedTiny = generateTier({
    icons: tinyTierIcons,
    count: 100,
    sizeMin: 8,
    sizeMax: 14,
    opacityMin: 0.2,
    opacityMax: 0.45,
    marginPercent: 0.5,
    seed: 4004,
});

// Layer 6 — micro dots, the finest texture pass.
function generateMicroDots(count: number, seed: number) {
    const rng = mulberry32(seed);
    return Array.from({ length: count }).map(() => ({
        top: rng() * 100,
        left: rng() * 100,
        size: 1.5 + rng() * 2.5,
        opacity: 0.2 + rng() * 0.35,
        ink: INKS[Math.floor(rng() * INKS.length)],
    }));
}
const microDots = generateMicroDots(150, 5005);

export default function DecorativeLayer() {
    return (
        // Purely decorative background: sits behind content (z-0), never
        // intercepts pointer events, and is clipped to its own bounds so
        // nothing spills past the page edges or into a navbar above it.
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            style={{ color: DEFAULT_INK }}
            aria-hidden="true"
        >
            {/* Corner mandalas */}
            <CornerMandala className="absolute -left-24 -top-24 w-64 opacity-55 text-[#B98A32]" />
            <CornerMandala className="absolute -right-20 -top-20 w-52 rotate-90 opacity-40 text-[#7B5A3A]" />
            <CornerMandala className="absolute -left-20 -bottom-20 w-56 -rotate-90 opacity-40 text-[#7A8452]" />
            <CornerMandala className="absolute -right-24 -bottom-24 w-72 rotate-180 opacity-55 text-[#B98A32]" />

            {/* Scattered ethnic gifting motifs */}
            {placements.map(({ Icon, style, className }, i) => (
                <Icon
                    key={i}
                    className={`absolute ${className ?? ""}`}
                    style={{ ...style, height: "auto" }}
                />
            ))}

            {/* Floral vine flourishes */}
            {vinePlacements.map(({ style, className }, i) => (
                <FloralVineIcon key={`vine-${i}`} className={`absolute ${className}`} style={style} />
            ))}

            {/* Decorative dots for texture (original) */}
            {Array.from({ length: 26 }).map((_, i) => (
                <span
                    key={`dot-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: 4,
                        height: 4,
                        left: `${5 + (i * 5) % 90}%`,
                        top: `${8 + ((i * 13) % 85)}%`,
                        backgroundColor: `${DEFAULT_INK}99`,
                    }}
                />
            ))}

            {/* Density pass — Layer 3: large generated motifs (55-70px) */}
            {generatedLarge.map(({ Icon, style, className }, i) => (
                <Icon key={`gl-${i}`} className={`absolute ${className ?? ""}`} style={style} />
            ))}

            {/* Density pass — Layer 4: medium generated motifs (35-45px) */}
            {generatedMedium.map(({ Icon, style, className }, i) => (
                <Icon key={`gm-${i}`} className={`absolute ${className ?? ""}`} style={style} />
            ))}

            {/* Density pass — Layer 5a: small fillers (18-28px) */}
            {generatedSmall.map(({ Icon, style, className }, i) => (
                <Icon key={`gs-${i}`} className={`absolute ${className ?? ""}`} style={style} />
            ))}

            {/* Density pass — Layer 5b: tiny fillers (8-14px) for leftover negative space */}
            {generatedTiny.map(({ Icon, style, className }, i) => (
                <Icon key={`gt-${i}`} className={`absolute ${className ?? ""}`} style={style} />
            ))}

            {/* Density pass — Layer 6: micro dots, the finest texture */}
            {microDots.map((dot, i) => (
                <span
                    key={`micro-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: dot.size,
                        height: dot.size,
                        left: `${dot.left.toFixed(2)}%`,
                        top: `${dot.top.toFixed(2)}%`,
                        opacity: dot.opacity,
                        backgroundColor: INK_HEX[dot.ink],
                    }}
                />
            ))}
        </div>
    );
}