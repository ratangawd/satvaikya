import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAnnouncements } from "@/services/announcement.service";
import type { Announcement } from "@/types/announcement";

export default function AnnouncementBar() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        async function loadAnnouncements() {
            const data = await getAnnouncements();
            setAnnouncements(data);
            setActiveIndex(0);
        }

        loadAnnouncements();
    }, []);

    // Change every 5 seconds
    useEffect(() => {
        if (announcements.length <= 1 || paused) return;

        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % announcements.length);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [announcements.length, paused]);

    if (announcements.length === 0) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-10 overflow-hidden text-white"
            style={{
                backgroundImage: "url('/green-texture.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1], // smooth luxury easing
                    }}
                    className="absolute inset-0 flex items-center justify-center px-4"
                >
                    <div className="flex items-center justify-center gap-3 text-sm font-medium text-center">
                        <span className="text-white/50">•</span>

                        <span>{announcements[activeIndex].title}</span>

                        <span className="text-white/50">•</span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}