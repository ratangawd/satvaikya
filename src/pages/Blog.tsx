import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import { blogs } from "@/data/blogs";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))], []);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const inCat = cat === "All" || b.category === cat;
      const inQ = !query || (b.title + b.excerpt).toLowerCase().includes(query.toLowerCase());
      return inCat && inQ;
    });
  }, [query, cat]);

  return (
    <PageTransition>
      <SEO
        title="Journal | SatvAikya"
        description="Articles on wooden decor, festival gifting, home styling, DIY kits and thoughtful design — from the SatvAikya studio."
        path="/blog"
      />
      <section className="pt-12 pb-10 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-medium">Journal</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Stories from the studio</h1>
          <p className="mt-4 text-muted-foreground">Design ideas, gifting guides, festival notes and slow evenings.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:border-brand"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
          
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${cat === c
                    ? "text-white border-[#97B002]"
                    : "bg-card border-border text-muted-foreground hover:border-[#97B002] hover:text-[#97B002]"
                  }`}
                style={cat === c ? { backgroundColor: "#97B002" } : undefined}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <Link key={b.slug} to={`/blog/${b.slug}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={b.cover} alt={b.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-widest text-gold">{b.category} · {b.readTime}</div>
                <h2 className="mt-2 font-display text-xl group-hover:text-brand transition">{b.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                <div className="mt-4 text-xs text-muted-foreground">{b.date}</div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center py-12 text-muted-foreground">No articles match your search.</p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}