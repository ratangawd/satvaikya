import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";
import NotFound from "./NotFound";
import { blogs, findBlog } from "@/data/blogs";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = findBlog(slug);
  if (!post) return <NotFound />;
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <PageTransition>
      <SEO
        title={`${post.title} | SatvAikya Journal`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.cover,
          author: { "@type": "Organization", name: post.author },
          dateactive: post.date,
        }}
      />
      <article className="pt-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-brand">Journal</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate">{post.title}</span>
          </nav>
          <div className="mt-6 text-[11px] uppercase tracking-widest text-gold">{post.category} · {post.readTime}</div>
          <h1 className="mt-2 font-display text-3xl md:text-5xl leading-tight">{post.title}</h1>
          <p className="mt-3 text-muted-foreground">{post.date} — by {post.author}</p>
        </div>
        <div className="mt-8 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" width={1600} height={900} />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-lg leading-relaxed text-foreground/90">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <section className="py-16 bg-[oklch(0.95_0.01_85)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl">More from the journal</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((b) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.cover} alt={b.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-widest text-gold">{b.category}</div>
                  <h3 className="mt-1 font-display text-lg group-hover:text-brand transition">{b.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}