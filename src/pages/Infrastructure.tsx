import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import infra from "@/assets/infrastructure.png";
import manufacture from "@/assets/manufacture.png";
import production from "@/assets/production.png";
import raw from "@/assets/raw.png";
import packaging from "@/assets/packaging.png";
import warehouse from "@/assets/warehouse.png";


const infrastructure = [
    {
        title: "Our Manufacturing Facility",
        category: "FACILITY",
        description:
            "Our manufacturing facility combines modern technology with skilled craftsmanship to create beautifully finished wooden products.",
        image: manufacture,
    },
    {
        title: "Production Unit",
        category: "PRODUCTION",
        description:
            "Our production unit combines modern machinery and skilled craftsmanship to create high-quality wooden products with precision and consistency.",
        image: production,
    },
    {
        title: "Raw Material Storage",
        category: "STORAGE",
        description:
            "Our raw material storage area keeps quality wood and essential materials organized, protected and ready for efficient production.",
        image: raw,
            
    },

    {
        title: "Quality Control",
        category: "QUALITY",
        description:
            "Our quality control process ensures every wooden product meets our standards for precision, finish, durability and overall craftsmanship.",
        image: "/images/infrastructure/quality-control.jpg",
    },
    {
        title: "Packaging Unit",
        category: "PACKAGING",
        description:
            "Our packaging unit ensures every product is carefully finished, securely packed and ready to reach customers in perfect condition.",
        image: packaging,
    },
    {
        title: "Warehouse",
        category: "WAREHOUSE",
        description:
            "Our warehouse provides organized and secure storage for finished products, ensuring efficient inventory management and timely dispatch.",
        image: warehouse,
    },
];

export default function Infrastructure() {
    return (
        <PageTransition>
            <SEO
                title="Infrastructure | SatvAikya"
                description="Explore the infrastructure, facilities, production capabilities and quality-focused processes behind SatvAikya."
                path="/infrastructure"
            />

            {/* HERO */}
            <section className="pt-12 pb-14 md:pt-16 md:pb-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                        Infrastructure
                    </span>

                    <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight">
                        Built with care,
                        <br />
                        designed for quality
                    </h1>

                    <p className="mt-5 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                        Take a look inside our facilities, production spaces and
                        infrastructure that support the quality and consistency behind
                        everything we create.
                    </p>
                </div>
            </section>

            {/* FEATURED INFRASTRUCTURE */}
            <section className="pb-16 md:pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-card group">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* IMAGE */}
                            <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                                <img
                                    src={infra}
                                    alt="SatvAikya infrastructure"
                                    width={1200}
                                    height={900}
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="flex items-center p-7 md:p-10 lg:p-14">
                                <div>
                                    <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                                        Our Infrastructure
                                    </span>

                                    <h2 className="mt-3 font-display text-3xl md:text-4xl">
                                        Where ideas become reality
                                    </h2>

                                    <p className="mt-5 text-muted-foreground leading-relaxed">
                                        Our infrastructure brings together thoughtful design, skilled craftsmanship, and modern manufacturing to create sustainable wooden décor for contemporary Indian homes. From sacred art and gifting to DIY kits, wall art, and everyday objects, every product takes shape with care and attention to detail.
                                    </p>

                                    <p className="mt-4 text-muted-foreground leading-relaxed">
                                        Our facility is organized across dedicated areas for raw material storage, precision cutting, production, finishing, quality inspection, packaging, and warehousing. This structured process helps us maintain consistency while preserving the craftsmanship and character behind every SatvAikya creation.
                                    </p>

                                    <p className="mt-4 text-muted-foreground leading-relaxed">
                                        With the right tools, responsible material practices, and a passionate team, we transform creative ideas into beautifully crafted wooden products made to last.
                                    </p>

                                   

                                    <div className="mt-7 flex flex-wrap gap-3">

                                        <div className="rounded-full border border-border px-4 py-2 text-sm">
                                            Precision Craftsmanship
                                        </div>
                                        <div className="rounded-full border border-border px-4 py-2 text-sm">
                                            Quality Focused
                                        </div>

                                        <div className="rounded-full border border-border px-4 py-2 text-sm">
                                            Organized Production
                                        </div>

                                        <div className="rounded-full border border-border px-4 py-2 text-sm">
                                            Efficient Operations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="py-14 md:py-20 bg-muted/30">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                        Inside Our Facility
                    </span>

                    <h2 className="mt-3 font-display text-3xl md:text-5xl">
                        Infrastructure that supports excellence
                    </h2>

                    <p className="mt-5 text-muted-foreground leading-relaxed">
                        Every part of our facility has a purpose. From the handling of
                        materials to the final packaging of products, our infrastructure
                        enables our team to work efficiently while maintaining attention
                        to detail.
                    </p>
                </div>
            </section>

            {/* INFRASTRUCTURE GRID */}
            <section className="py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {infrastructure.map((item) => (
                            <article
                                key={item.title}
                                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
                            >
                                {/* IMAGE */}
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        width={800}
                                        height={500}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5">
                                    <div className="text-[11px] uppercase tracking-widest text-gold">
                                        {item.category}
                                    </div>

                                    <h3 className="mt-2 font-display text-xl group-hover:text-brand transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="mt-4 h-px w-10 bg-brand transition-all duration-500 group-hover:w-16" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCTION PROCESS */}
            <section className="py-14 md:py-20 bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
                        {/* LEFT */}
                        <div>
                            <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                                Our Process
                            </span>

                            <h2 className="mt-3 font-display text-3xl md:text-5xl">
                                From material
                                <br />
                                to finished product
                            </h2>

                            <p className="mt-5 text-muted-foreground leading-relaxed">
                                Our infrastructure supports a systematic workflow where each
                                stage is connected to the next, helping us maintain quality
                                throughout the production journey.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-0">
                            <div className="border-t border-border py-6">
                                <div className="flex gap-5">
                                    <span className="font-display text-2xl text-gold">01</span>

                                    <div>
                                        <h3 className="font-display text-xl">
                                            Raw Material Handling
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            Materials are received, checked and organized before
                                            entering the production process.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border py-6">
                                <div className="flex gap-5">
                                    <span className="font-display text-2xl text-gold">02</span>

                                    <div>
                                        <h3 className="font-display text-xl">
                                            Production & Processing
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            Dedicated production areas allow our team to carry out
                                            each stage with care and consistency.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-border py-6">
                                <div className="flex gap-5">
                                    <span className="font-display text-2xl text-gold">03</span>

                                    <div>
                                        <h3 className="font-display text-xl">
                                            Quality Inspection
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            Products are inspected at key stages to ensure they meet
                                            our required standards.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-b border-border py-6">
                                <div className="flex gap-5">
                                    <span className="font-display text-2xl text-gold">04</span>

                                    <div>
                                        <h3 className="font-display text-xl">
                                            Packaging & Dispatch
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            Finished products are securely packaged and prepared for
                                            delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            {/* <section className="py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">
                            Gallery
                        </span>

                        <h2 className="mt-3 font-display text-3xl md:text-5xl">
                            A closer look
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Explore the spaces and people behind our work.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                        <div className="col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl">
                            <img
                                src="/images/infrastructure/gallery-1.jpg"
                                alt="Infrastructure gallery"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="aspect-square overflow-hidden rounded-2xl">
                            <img
                                src="/images/infrastructure/gallery-2.jpg"
                                alt="Production facility"
                                loading="lazy"
                                width={600}
                                height={600}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="aspect-square overflow-hidden rounded-2xl">
                            <img
                                src="/images/infrastructure/gallery-3.jpg"
                                alt="Manufacturing facility"
                                loading="lazy"
                                width={600}
                                height={600}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="aspect-square overflow-hidden rounded-2xl">
                            <img
                                src="/images/infrastructure/gallery-4.jpg"
                                alt="Quality control"
                                loading="lazy"
                                width={600}
                                height={600}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="aspect-square overflow-hidden rounded-2xl">
                            <img
                                src="/images/infrastructure/gallery-5.jpg"
                                alt="Warehouse"
                                loading="lazy"
                                width={600}
                                height={600}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-brand text-white px-6 py-12 md:px-12 md:py-16 text-center">
                        <span className="text-xs uppercase tracking-[0.25em] opacity-80">
                            Let's Work Together
                        </span>

                        <h2 className="mt-3 font-display text-3xl md:text-5xl">
                            Have a project in mind?
                        </h2>

                        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base opacity-80 leading-relaxed">
                            Get in touch with our team to learn more about our capabilities,
                            products and facilities.
                        </p>

                        <Link
                            to="/contact"
                            className="inline-flex mt-7 rounded-full bg-white text-brand px-6 py-3 text-sm font-medium hover:opacity-90 transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
}