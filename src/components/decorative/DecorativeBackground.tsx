export default function PaperTexture() {
    return (
        <>
            {/* Base Handmade Paper */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at 18% 22%, rgba(255,255,255,0.28) 0%, transparent 22%),
            radial-gradient(circle at 82% 28%, rgba(255,255,255,0.18) 0%, transparent 18%),
            radial-gradient(circle at 28% 82%, rgba(214,189,142,0.14) 0%, transparent 26%),
            radial-gradient(circle at 78% 72%, rgba(196,170,124,0.10) 0%, transparent 22%),

            linear-gradient(
              180deg,
              #FAF6EE 0%,
              #F7F2E7 30%,
              #F4ECDC 65%,
              #F2E7D4 100%
            )
          `,
                }}
            />

            {/* Fine Cotton Fibres */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(
              22deg,
              transparent 0px,
              transparent 12px,
              rgba(255,255,255,0.08) 13px,
              transparent 14px
            ),

            repeating-linear-gradient(
              -18deg,
              transparent 0px,
              transparent 14px,
              rgba(182,154,118,0.05) 15px,
              transparent 16px
            )
          `,
                }}
            />

            {/* Tiny Paper Grain */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `
            radial-gradient(rgba(120,96,60,.12) .4px, transparent .5px),
            radial-gradient(rgba(255,255,255,.18) .4px, transparent .5px)
          `,
                    backgroundSize: "16px 16px, 22px 22px",
                    backgroundPosition: "0 0, 8px 8px",
                }}
            />

            {/* Soft Handmade Blotches */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    background: `
            radial-gradient(circle at 14% 18%, rgba(220,194,146,.25), transparent 24%),
            radial-gradient(circle at 82% 70%, rgba(233,221,194,.30), transparent 28%),
            radial-gradient(circle at 48% 48%, rgba(255,255,255,.18), transparent 22%),
            radial-gradient(circle at 65% 18%, rgba(208,184,144,.18), transparent 20%)
          `,
                    filter: "blur(30px)",
                }}
            />

            {/* Handmade Edge Tint */}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: `
            inset 0 0 140px rgba(162,126,84,0.08),
            inset 0 0 220px rgba(255,255,255,0.12)
          `,
                }}
            />
        </>
    );
}