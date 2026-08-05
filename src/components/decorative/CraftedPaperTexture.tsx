import craftedPaper from "@/assets/textures/crafted-paper.webp";

/**
 * CraftedPaperTexture
 * ---------------------------------------------------------------------
 * A dedicated, premium paper-grain background used ONLY for the
 * "Crafted for the way you live" and "Contact Us" sections.
 *
 * This is intentionally separate from the site-wide <PaperTexture />
 * component — it uses its own asset, its own (much lower) opacity,
 * and a warmer, finer, more "handmade cotton / washi paper" grain
 * intended to read like a page from a luxury furniture catalogue
 * (Herman Miller / Vitra / Muuto / Studio McGee / RH / AD), rather
 * than the more generic decorative texture used elsewhere.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <CraftedPaperTexture />
 *     <div className="relative z-10">...section content...</div>
 *   </section>
 *
 * The component is purely decorative: it is absolutely positioned,
 * fills its nearest positioned ancestor, never intercepts pointer
 * events, and sits at z-0 so real content (given z-10) always stacks
 * above it. No negative z-index is used, which keeps it compatible
 * with parents that don't establish a stacking context.
 */
export default function CraftedPaperTexture() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
            {/* Base warm ivory wash — sits under the paper grain so the
          fibers below always resolve to a warm, premium neutral even
          before the texture image finishes decoding. */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "#F8F4ED" }}
            />

            {/* Fine handmade cotton / washi paper grain. Extremely subtle —
          multiply blend + low opacity so it only ever reads as a soft
          tactile surface, never as a visible pattern. */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${craftedPaper})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "700px auto",
                    backgroundPosition: "center",
                    opacity: 0.16,
                    mixBlendMode: "multiply",
                    willChange: "auto",
                }}
            />

            {/* Soft warm gradient overlay — a gentle diagonal wash that adds
          depth and warmth, the way light falls across a printed page
          in a catalogue photograph. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(248,244,237,0.55) 0%, rgba(246,241,232,0.25) 45%, rgba(244,239,230,0.5) 100%)",
                }}
            />

            {/* Subtle edge vignette — keeps the very edges of the section a
          touch deeper so content reads as though it sits on a
          material page rather than a flat digital background. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0) 55%, rgba(60,45,25,0.05) 100%)",
                }}
            />
        </div>
    );
}