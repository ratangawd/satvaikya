export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
  cover: string;
}

import c1 from "@/assets/hero-lifestyle.jpg";
import c2 from "@/assets/cat-pooja.jpg";
import c3 from "@/assets/cat-diy.jpg";
import c4 from "@/assets/cat-tray.jpg";
import c5 from "@/assets/cat-wall.jpg";
import c6 from "@/assets/cat-return.jpg";
import c7 from "@/assets/cat-home.jpg";
import c8 from "@/assets/cat-corporate.jpg";

export const blogs: BlogPost[] = [
  {
    slug: "styling-wooden-decor-modern-homes",
    title: "Styling Wooden Decor in Modern Homes",
    excerpt:
      "How to bring warmth, texture and heritage into contemporary interiors without losing minimalism.",
    category: "Home Styling",
    date: "March 12, 2026",
    readTime: "6 min read",
    author: "The SatvAikya Studio",
    cover: c1,
    content: [
      "Wooden decor doesn't have to feel traditional. Layered thoughtfully against clean-lined furniture, matte walls and soft linen, hand-crafted wood introduces a quiet warmth that mass-produced pieces can never replicate.",
      "Start with one anchor piece — a carved mandir, a peacock tray, a sculptural wall hanging — and let it lead the palette of the room. Everything else can stay quiet.",
      "Balance is the whole game. If the piece is intricate, keep its surroundings still. If the piece is quiet, allow it a little breathing room and it will speak for itself.",
    ],
  },
  {
    slug: "art-of-pooja-decor",
    title: "The Art of Pooja Room Decor",
    excerpt:
      "From diya stands to foldable backdrops, small choices that transform the daily ritual of worship.",
    category: "Sacred Spaces",
    date: "March 5, 2026",
    readTime: "5 min read",
    author: "The SatvAikya Studio",
    cover: c2,
    content: [
      "A pooja room is a room of ritual, not display. The décor should support the practice — never distract from it.",
      "Layered lighting from a stepped diya stand adds depth without adding noise. A foldable mandir backdrop lets the space adapt through the year — from daily worship to Diwali celebrations.",
      "The best sacred decor is the kind you barely notice until you need it. Then it feels essential.",
    ],
  },
  {
    slug: "diy-kits-for-slow-evenings",
    title: "Why DIY Kits Belong in Every Home",
    excerpt:
      "Screen-free creativity for the whole family — and a genuinely mindful way to spend an evening.",
    category: "DIY & Craft",
    date: "February 24, 2026",
    readTime: "4 min read",
    author: "The SatvAikya Studio",
    cover: c3,
    content: [
      "The most under-appreciated luxury today is an evening spent making something with your hands.",
      "Our DIY kits are designed to be finished in a single sitting — long enough to feel like an achievement, short enough that a child can stay with it.",
      "Keep a shelf of two or three ready-to-go kits at home. The next time you need to slow down, you'll be glad it's there.",
    ],
  },
  {
    slug: "festival-gifting-guide",
    title: "A Thoughtful Festival Gifting Guide",
    excerpt:
      "Move past the standard sweet box. Handcrafted, meaningful gifts that get remembered.",
    category: "Gifting",
    date: "February 18, 2026",
    readTime: "7 min read",
    author: "The SatvAikya Studio",
    cover: c4,
    content: [
      "The best festival gifts are the ones that outlive the festival. A wooden tray, a sacred figurine, a hand-finished box — these stay in the home long after the sweets are gone.",
      "Pair a small ritual object with a personal note. Suddenly a return gift becomes an heirloom.",
      "Order early. The nicer the piece, the more time it deserves to be finished properly.",
    ],
  },
  {
    slug: "wall-art-that-tells-your-story",
    title: "Wall Art That Tells Your Story",
    excerpt:
      "Wooden wall hangings, key holders and quotes — the fastest way to make a house feel like yours.",
    category: "Home Styling",
    date: "February 10, 2026",
    readTime: "5 min read",
    author: "The SatvAikya Studio",
    cover: c5,
    content: [
      "Walls are the loudest part of a home. If they don't reflect you, no cushion arrangement will save the room.",
      "Start with something you actually love — a favourite quote, a childhood memory, a symbol that means something to your family. Then commit to it.",
      "The three-piece elephant hanging works because the eye sees it as one object. Group your wall art like this and small pieces become powerful.",
    ],
  },
  {
    slug: "wedding-return-gifts",
    title: "Wedding Return Gifts People Actually Keep",
    excerpt:
      "Handcrafted haldi kumkum boxes, chowkis and keepsakes that don't end up in a drawer.",
    category: "Gifting",
    date: "January 30, 2026",
    readTime: "6 min read",
    author: "The SatvAikya Studio",
    cover: c6,
    content: [
      "The average return gift is opened once and put away. It doesn't have to be that way.",
      "Choose something that lives in the daily ritual — a haldi kumkum box, a small chowki, a keepsake tray. These are the pieces that stay on shelves for years.",
      "For weddings of 100+ guests, plan the order at least 45 days ahead so every piece is finished the way it should be.",
    ],
  },
  {
    slug: "small-kitchen-organisation",
    title: "Small Kitchen? Big Ideas.",
    excerpt:
      "Wooden organisers, spice racks and stackable trays that turn cramped counters into calm ones.",
    category: "Home Styling",
    date: "January 18, 2026",
    readTime: "5 min read",
    author: "The SatvAikya Studio",
    cover: c7,
    content: [
      "A cluttered kitchen doesn't mean you own too much. It usually means the storage isn't shaped for how you actually cook.",
      "A three-step spice rack is a small change that returns square inches to the counter every day.",
      "Warm wood next to stainless steel softens the whole room. Add one wooden piece and see.",
    ],
  },
  {
    slug: "diwali-corporate-gifting",
    title: "Corporate Diwali Gifting, Done Well",
    excerpt:
      "Elegant plaques, keepsake boxes and mindful hampers for teams and clients who notice the details.",
    category: "Gifting",
    date: "January 6, 2026",
    readTime: "6 min read",
    author: "The SatvAikya Studio",
    cover: c8,
    content: [
      "The best corporate gifts are personal enough to matter and universal enough to work for every recipient.",
      "Skip the cliché branded merchandise. A hand-finished wooden appreciation plaque or a keepsake box outlives every calendar.",
      "For orders above 50 pieces, we co-design the finish and packaging with your brand. Reach out at least 30 days ahead.",
    ],
  },
];

export const findBlog = (slug: string) => blogs.find((b) => b.slug === slug);