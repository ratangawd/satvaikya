import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="Page not found | SatvAikya" description="The page you are looking for doesn't exist." path="/404" />
      <section className="pt-40 pb-32 text-center">
        <div className="mx-auto max-w-xl px-4">
          <div className="font-display text-8xl text-brand">404</div>
          <h1 className="mt-4 font-display text-3xl">Page not found</h1>
          <p className="mt-3 text-muted-foreground">The page you're looking for has moved, or never existed.</p>
          <Link to="/" className="mt-8 inline-block btn-luxury px-6 py-3 rounded-full font-medium">
            Back to home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}