import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAnnouncements } from "@/services/announcement.service";
import type { Announcement } from "@/types/announcement";

export default function AnnouncementBar() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        async function loadAnnouncements() {
            const data = await getAnnouncements();
            setAnnouncements(data);
        }

        loadAnnouncements();
    }, []);

    const [paused, setPaused] = useState(false);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-10 bg-[#94AB11] text-white flex items-center overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={paused ? {} : { x: ["0%", "-50%"] }}
                transition={{
                    duration: 18,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...announcements, ...announcements].map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-8 text-sm font-medium"
                    >
                        <span>{item.title}</span>
                        <span className="text-white/40">•</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}