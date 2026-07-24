import sacred from "@/assets/cat-sacred.jpg";
import pooja from "@/assets/cat-pooja.jpg";
import tray from "@/assets/cat-tray.jpg";
import home from "@/assets/cat-home.jpg";
import diy from "@/assets/cat-diy.jpg";
import kids from "@/assets/cat-kids.jpg";
import ret from "@/assets/cat-return.jpg";
import wall from "@/assets/cat-wall.jpg";
import corporate from "@/assets/cat-corporate.jpg";
import bank from "@/assets/cat-bank.jpg";

export interface Product {
  slug: string;
  code: string;
  name: string;
  price: number;
  short: string;
  long: string;
  specs: { label: string; value: string }[];
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  products: Product[];
}

const specs = (material = "Premium MDF & Solid Wood", finish = "Hand-polished matte") => [
  { label: "Material", value: material },
  { label: "Finish", value: finish },
  { label: "Origin", value: "Handcrafted in India" },
  { label: "Care", value: "Wipe with dry cloth" },
];

export const categories: Category[] = [
  {
    slug: "sacred-decor",
    name: "Sacred Decor",
    tagline: "For divine spaces",
    description:
      "Thoughtfully crafted deity figurines and altar pieces that bring blessings, beauty and lasting memories to your celebrations.",
    image: sacred,
    products: [
      {
        slug: "ashtalakshmi-set",
        code: "A001",
        name: "Ashtalakshmi — Set of 8",
        price: 4499,
        short: "Set of 8 Ashtalakshmi idols on wooden bases.",
        long: "A complete Ashtalakshmi set representing the eight forms of Goddess Lakshmi, each mounted on a hand-finished wooden base. Perfect for the home altar, temple room, or as a devotional gift for auspicious occasions.",
        specs: specs("Resin idols on solid wood bases", "Antique bronze finish"),
        image: sacred,
      },
      {
        slug: "navadurga-set",
        code: "A002",
        name: "Navadurga — Set of 9",
        price: 4999,
        short: "Set of 9 Navadurga idols on wooden bases.",
        long: "Nine sacred forms of Goddess Durga, each cast with intricate detail and displayed on individually crafted wooden bases. A powerful centerpiece for Navaratri and daily worship.",
        specs: specs("Resin idols on solid wood bases", "Antique bronze finish"),
        image: sacred,
      },
      {
        slug: "dashavataram-set",
        code: "A003",
        name: "Dashavataram — Set of 10",
        price: 5499,
        short: "Set of 10 Dashavataram idols on wooden bases.",
        long: "The ten avatars of Lord Vishnu, meticulously sculpted and presented as a museum-quality collection. Each piece honors the epic legacy of Sanatan Dharma.",
        specs: specs("Resin idols on solid wood bases", "Antique bronze finish"),
        image: sacred,
      },
    ],
  },
  {
    slug: "pooja-decor",
    name: "Pooja Decor",
    tagline: "Traditions, thoughtfully made",
    description:
      "Diya stands, mandir backdrops and pooja essentials inspired by classic temple architecture — designed to elevate every ritual.",
    image: pooja,
    products: [
      {
        slug: "7-step-diya-stand",
        code: "A005",
        name: "7-Step MDF Diya Stand",
        price: 1499,
        short: "Seven-step temple-inspired diya stand.",
        long: "Inspired by traditional temple hill structures, this seven-step diya stand symbolizes prosperity and spiritual elevation. Ideal for Lakshmi Pooja, Venkateshwara Vratam and festive décor.",
        specs: specs("Laser-cut MDF", "Hand-painted lacquer"),
        image: pooja,
      },
      {
        slug: "foldable-mandir-backdrop",
        code: "A024",
        name: "Foldable Mandir Backdrop",
        price: 1899,
        short: "24\"x18\" foldable backdrop stand for daily worship.",
        long: "A versatile foldable mandir backdrop that transforms any surface into a sacred space. Use vertically or horizontally for Ganpati, Durga Puja, Navaratri and daily worship at home or office.",
        specs: specs("MDF with hardwood hinges", "Traditional printed inlay"),
        image: pooja,
      },
      {
        slug: "ashtotaram-stand",
        code: "A013",
        name: "Ashtotaram Flower Stand",
        price: 899,
        short: "Elegant stand for chanting the 108 names.",
        long: "The Ashtotaram stand holds fresh flowers for the ritual chanting of a deity's 108 names. Beautifully hand-finished in traditional blue or red, it becomes a lasting keepsake of devotion.",
        specs: specs("Solid pine", "Hand-lacquered finish"),
        image: pooja,
      },
    ],
  },
  {
    slug: "tray-decor",
    name: "Tray Decor",
    tagline: "Serve every moment beautifully",
    description:
      "Statement wooden trays with peacock, floral and temple motifs — designed for entertaining, gifting and elevated everyday styling.",
    image: tray,
    products: [
      {
        slug: "peacock-motif-tray",
        code: "A030",
        name: "Peacock Motif Wooden Tray",
        price: 1799,
        short: "Signature peacock-print serving tray.",
        long: "A conversation-starting tray featuring an heirloom-inspired peacock motif rendered in soft ink tones on natural MDF. Perfect for chai service, gifting hampers or console styling.",
        specs: specs("MDF with laminate print", "Sealed matte finish"),
        image: tray,
      },
      {
        slug: "temple-red-tray",
        code: "A046",
        name: "Temple Series Tray",
        price: 1599,
        short: "Rectangular tray with red temple fabric insert and diya.",
        long: "A rectangular wooden tray with a red fabric insert featuring a traditional temple design and a single brass lamp — an heirloom piece for the pooja room or festive gifting.",
        specs: specs("Solid wood frame", "Fabric-lined base"),
        image: tray,
      },
      {
        slug: "ganesha-illustration-tray",
        code: "A039",
        name: "Ganesha Illustration Tray",
        price: 1699,
        short: "Auspicious Ganesha-print serving tray.",
        long: "A serene Ganesha illustration hand-printed onto a durable wooden tray, framed by delicate floral borders. Auspicious for housewarmings and thoughtful gifting.",
        specs: specs("MDF with print inlay", "Sealed matte finish"),
        image: tray,
      },
    ],
  },
  {
    slug: "home-decor",
    name: "Home Decor",
    tagline: "Everyday elegance",
    description:
      "From spice organizers to double-sided coasters and multipurpose remote holders — quiet luxury for modern homes.",
    image: home,
    products: [
      {
        slug: "spice-rack-organizer",
        code: "A098",
        name: "3-Step Spice Rack Organizer",
        price: 2299,
        short: "Polished wooden spice rack for the kitchen.",
        long: "Keep your kitchen neat and clutter-free with this hand-polished three-step spice rack. Fits standard masala bottles and elevates any modular kitchen.",
        specs: specs("Solid pine", "Food-safe lacquer"),
        image: home,
      },
      {
        slug: "coasters-set-of-6",
        code: "A102",
        name: "Set of 6 Double-Sided Coasters",
        price: 799,
        short: "Six unique motivational designs, double-sided.",
        long: "A set of six double-sided MDF coasters, each face uniquely designed with motivational quotes and refined patterns. A thoughtful pick-me-up for your table.",
        specs: specs("MDF with cork base", "Matte print finish"),
        image: home,
      },
      {
        slug: "multipurpose-remote-holder",
        code: "A105",
        name: "Tree Design Remote Holder",
        price: 999,
        short: "Sculptural multipurpose remote holder.",
        long: "A sculptural wooden remote holder featuring a delicate tree silhouette. Doubles as a stationery caddy or bedside catch-all.",
        specs: specs("Laser-cut wood", "Natural oil finish"),
        image: home,
      },
    ],
  },
  {
    slug: "diy-kits",
    name: "DIY Kits",
    tagline: "Create it your way",
    description:
      "Complete DIY wooden painting kits that build creativity, focus and confidence — designed for kids and creative adults alike.",
    image: diy,
    products: [
      {
        slug: "giraffe-paint-kit",
        code: "A063",
        name: "Wooden Giraffe Paint Kit",
        price: 699,
        short: "DIY arts and crafts kit for kids.",
        long: "A complete DIY wooden giraffe kit designed for children's arts and crafts activities. Includes wooden cutouts, brushes and non-toxic paints — everything needed for an afternoon of creative joy.",
        specs: specs("Plywood cutouts", "Water-based paints included"),
        image: diy,
      },
      {
        slug: "owl-paint-kit",
        code: "A066",
        name: "Wooden Owl Bird Paint Kit",
        price: 699,
        short: "Complete DIY owl painting activity.",
        long: "Introduce little artists to the joy of painting with this owl-themed wooden kit. Beautifully pre-cut, easy to assemble, and safe for all ages.",
        specs: specs("Plywood cutouts", "Water-based paints included"),
        image: diy,
      },
      {
        slug: "mandala-art-kit",
        code: "A071",
        name: "DIY Mandala Art Kit",
        price: 899,
        short: "Meditative mandala painting activity.",
        long: "A meditative DIY mandala kit featuring layered wooden shapes, a curated paint set and a step-by-step guide. Perfect for mindful evenings and family time.",
        specs: specs("Layered MDF shapes", "Acrylic paints & brushes"),
        image: diy,
      },
    ],
  },
  {
    slug: "kids-collection",
    name: "Kids Collection",
    tagline: "Play, learn, grow",
    description:
      "Playful pen holders and maze games that develop motor skills, hand-eye coordination and problem-solving in style.",
    image: kids,
    products: [
      {
        slug: "crocodile-pen-holder",
        code: "A056",
        name: "Crocodile Pen Holder",
        price: 549,
        short: "Cheerful animal-themed pen holder.",
        long: "A cheerful crocodile-shaped wooden pen holder that keeps desks tidy and children smiling. Hand-painted with non-toxic colors.",
        specs: specs("Plywood", "Non-toxic paint"),
        image: kids,
      },
      {
        slug: "tiger-pen-holder",
        code: "A058",
        name: "Tiger Pen Holder",
        price: 549,
        short: "Bold tiger-themed desk companion.",
        long: "Bring wild imagination to the study desk with this bold tiger-shaped pen holder — a sturdy, joyful addition to any child's workspace.",
        specs: specs("Plywood", "Non-toxic paint"),
        image: kids,
      },
      {
        slug: "bear-maze-game",
        code: "A061",
        name: "Bear Maze Game for Toddlers",
        price: 799,
        short: "Develops motor skills and focus.",
        long: "This bear-themed wooden maze develops motor skills, hand-eye coordination and problem-solving abilities. A screen-free favourite for ages 3 and up.",
        specs: specs("Plywood + steel ball", "Rounded child-safe edges"),
        image: kids,
      },
    ],
  },
  {
    slug: "return-gifts",
    name: "Return Gifts",
    tagline: "Gratitude, handcrafted",
    description:
      "Meaningful return-gift collections for weddings, housewarmings and pooja celebrations — MOQ 50 to 100 pieces.",
    image: ret,
    products: [
      {
        slug: "peacock-haldi-kumkum-box",
        code: "A017",
        name: "Peacock Haldi Kumkum Box",
        price: 249,
        short: "Peacock-shaped haldi kumkum box. MOQ 100.",
        long: "A delicate peacock-shaped wooden haldi kumkum box, thoughtfully designed as a wedding or pooja return gift. Minimum order of 100 pieces.",
        specs: specs("Solid wood", "Hand-painted"),
        image: ret,
      },
      {
        slug: "leaf-haldi-kumkum-box",
        code: "A018",
        name: "Leaf Haldi Kumkum Box",
        price: 249,
        short: "Leaf-shaped haldi kumkum box. MOQ 100.",
        long: "A refined leaf-shaped haldi kumkum box crafted from solid wood — perfect for auspicious wedding and pooja return gifting. Minimum order of 100 pieces.",
        specs: specs("Solid wood", "Hand-painted"),
        image: ret,
      },
      {
        slug: "elephant-chowki-set",
        code: "A022",
        name: "Chowki Set of 2 — Elephant Motif",
        price: 449,
        short: "Two green chowkis with elephant motifs. MOQ 100.",
        long: "Traditional chowkis for the pooja platter, hand-detailed with graceful elephant motifs. Sold as pairs. Minimum order of 100 sets.",
        specs: specs("Plywood", "Hand-painted"),
        image: ret,
      },
    ],
  },
  {
    slug: "wall-decor",
    name: "Wall Decor",
    tagline: "Beautiful walls begin here",
    description:
      "Wooden MDF wall hangings and key holders that transform your walls into moments of joy, positivity and welcome.",
    image: wall,
    products: [
      {
        slug: "positive-vibes-hanging",
        code: "A088",
        name: "\"Positive Vibes Only\" Wall Hanging",
        price: 1299,
        short: "Wooden MDF wall hanging with uplifting quote.",
        long: "Set the tone of your home with this hand-finished MDF wall hanging featuring the timeless message \"Positive Vibes Only\". A gentle daily reminder in warm wood tones.",
        specs: specs("MDF", "Warm walnut stain"),
        image: wall,
      },
      {
        slug: "elephant-wall-hanging",
        code: "A092",
        name: "Elephant Wall Hanging",
        price: 1499,
        short: "Three-piece wooden elephant wall art.",
        long: "A striking three-piece wooden elephant wall composition, individually finished for depth and dimension. An heirloom-worthy focal point for the living room.",
        specs: specs("MDF, three pieces", "Warm walnut stain"),
        image: wall,
      },
      {
        slug: "krishna-key-holder",
        code: "A096",
        name: "Krishna Wall Key Holder",
        price: 899,
        short: "Decorative Krishna key holder.",
        long: "Enhance your entryway with this decorative Krishna wooden key holder — practical, auspicious and beautifully carved.",
        specs: specs("MDF", "Hand-painted"),
        image: wall,
      },
    ],
  },
  {
    slug: "corporate-gifts",
    name: "Corporate Gifts",
    tagline: "Moments, made special",
    description:
      "Premium acrylic plaques with wooden bases, elegant appreciation sets and inspirational desk décor for teams and clients.",
    image: corporate,
    products: [
      {
        slug: "mom-appreciation-plaque",
        code: "A077",
        name: "\"To My Mom\" Acrylic Plaque",
        price: 1299,
        short: "Inspirational plaque with wooden base.",
        long: "A heartfelt \"To My Mom\" acrylic plaque mounted on a hand-finished wooden base. A meaningful desk companion or gift for milestone birthdays and Mother's Day.",
        specs: specs("Clear acrylic + solid wood", "UV-printed message"),
        image: corporate,
      },
      {
        slug: "teacher-appreciation-plaque",
        code: "A080",
        name: "Teacher Appreciation Plaque",
        price: 1299,
        short: "Inspirational plaque with wooden base.",
        long: "An inspirational teacher appreciation acrylic plaque with a wooden base — the perfect thank you for educators and mentors who shape lives.",
        specs: specs("Clear acrylic + solid wood", "UV-printed message"),
        image: corporate,
      },
      {
        slug: "love-box-with-tokens",
        code: "A076",
        name: "Wooden Love Box with 20 Heart Tokens",
        price: 1899,
        short: "Love box, photo frame & display stand.",
        long: "A wooden keepsake box containing 20 hand-finished heart tokens, a photo frame and a display stand. Personalise it with memories or messages for the people you love most.",
        specs: specs("Solid wood", "Warm oil finish"),
        image: corporate,
      },
    ],
  },
  {
    slug: "money-banks",
    name: "Money Banks",
    tagline: "Grow the saving habit",
    description:
      "Playful wooden money banks with printed goal trackers — designed to make saving a beautiful daily ritual.",
    image: bank,
    products: [
      {
        slug: "unicorn-money-bank",
        code: "A048",
        name: "Unicorn Money Bank",
        price: 1099,
        short: "With ₹1 Lakh savings tracker. MOQ 50.",
        long: "A unicorn-themed wooden money bank with a pre-printed ₹1,00,000 savings tracker on the side. Makes saving a joyful ritual for children and adults alike.",
        specs: specs("Plywood", "Non-toxic print"),
        image: bank,
      },
      {
        slug: "world-map-money-bank",
        code: "A049",
        name: "World Map Money Bank",
        price: 1199,
        short: "Travel-inspired wooden bank. MOQ 50.",
        long: "Save for the next big adventure with this world-map wooden money bank. Pre-printed grid tracks your journey to ₹1,00,000 in style.",
        specs: specs("Plywood", "Laser-etched map"),
        image: bank,
      },
      {
        slug: "travel-suitcase-bank",
        code: "A050",
        name: "Travel Suitcase Money Bank",
        price: 1099,
        short: "Suitcase-shaped travel savings bank. MOQ 50.",
        long: "A charming travel-suitcase-shaped money bank designed to build the saving habit for kids and adults. Sits beautifully on any shelf or study table.",
        specs: specs("Plywood", "Hand-painted"),
        image: bank,
      },
    ],
  },
];

export const findCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const findProduct = (categorySlug: string, productSlug: string) => {
  const cat = findCategory(categorySlug);
  return cat?.products.find((p) => p.slug === productSlug);
};

export const allProducts = categories.flatMap((c) =>
  c.products.map((p) => ({ ...p, categorySlug: c.slug, categoryName: c.name })),
);