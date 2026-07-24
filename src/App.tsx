import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { getSettings } from "./services/settings.service";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Dashboard from "./admin/pages/Dashboard";
import Login from "./admin/pages/Login";
import Categories from "./admin/pages/Categories";
import Products from "./admin/pages/Products";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Collections = lazy(() => import("./pages/Collections"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  useEffect(() => {
    getSettings()
      .then(console.log)
      .catch(console.error);
  }, []);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const content = (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
            Loading…
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route
              path="/collections/:categorySlug"
              element={<CategoryPage />}
            />
            <Route
              path="/collections/:categorySlug/:productSlug"
              element={<ProductPage />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={<Products />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );

  return isAdminRoute ? content : <Layout>{content}</Layout>;
}