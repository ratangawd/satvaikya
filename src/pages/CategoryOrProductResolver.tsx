/**
 * CategoryOrProductResolver.tsx
 *
 * Mounted once at "/collections/*". Takes the wildcard remainder of the URL
 * (everything after "/collections/"), splits it into segments, and asks
 * store.service's resolveStorePath() — the single source of truth for
 * category/product resolution — what it is.
 *
 * This replaces the previous resolver, which had to guess between a
 * category and a product using its own ad hoc logic, and which caused
 * CategoryPage/ProductPage to read the wrong useParams() keys (since those
 * pages were written assuming :subCategorySlug / :productSlug params that
 * don't exist on the 2-segment route). All of that ambiguity is gone: this
 * component resolves the data once and hands it down as props.
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveStorePath } from "@/services/store.service";
import type { ResolvedStorePath } from "@/services/store.service";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import NotFound from "./NotFound";
import PageTransition from "@/components/PageTransition";

export default function CategoryOrProductResolver() {
    const params = useParams();
    const rawPath = params["*"] ?? "";
    const segments = rawPath.split("/").filter(Boolean);
    const pathKey = segments.join("/");

    // undefined = loading, null = not found
    const [result, setResult] = useState<ResolvedStorePath | undefined>(
        undefined
    );

    useEffect(() => {
        let cancelled = false;
        setResult(undefined);

        resolveStorePath(segments)
            .then((resolved) => {
                if (!cancelled) setResult(resolved);
            })
            .catch((error) => {
                console.error(error);
                if (!cancelled) setResult(null);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathKey]);

    if (result === undefined) {
        return (
            <PageTransition>
                <div className="pt-40 text-center text-muted-foreground">Loading…</div>
            </PageTransition>
        );
    }

    if (result === null) {
        return <NotFound />;
    }

    if (result.type === "category") {
        return <CategoryPage category={result.category} />;
    }

    return <ProductPage category={result.category} product={result.product} />;
}