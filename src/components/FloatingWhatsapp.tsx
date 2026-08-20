import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919866410523";

const WHATSAPP_MESSAGE =
    "Hi Satvaikya! I would like to know more about your products and services.";

export default function FloatingWhatsApp() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE
    )}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="
    whatsapp-float
    fixed right-4 bottom-4
    sm:right-5 sm:bottom-5
    md:right-6 md:bottom-6
    z-[9999]
    flex items-center justify-center
    w-14 h-14
    md:w-16 md:h-16
    rounded-full
    bg-[#25D366]
    text-white
    transition-transform duration-300
    hover:scale-110
    active:scale-95
  "
        >
            <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
        </a>
    );
}