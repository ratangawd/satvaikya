import paperTexture from "../../assets/textures/handmade-paper.webp"; export default function PaperTexture() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none select-none -z-10"
            style={{
                backgroundImage: `url(${paperTexture})`,
                backgroundRepeat: "repeat",
                backgroundSize: "900px auto",
                backgroundPosition: "center",
                opacity: 0.72,
                filter: "brightness(1.12) contrast(0.94)",
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(rgba(255,252,245,.35), rgba(255,250,242,.4))",
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    boxShadow:
                        "inset 0 0 180px rgba(8,5,0,.03), inset 0 0 80px rgba(255,255,255,.25)",
                }}
            />
        </div>
    );
}