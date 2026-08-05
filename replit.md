# SatvAikya Ecommerce — Project Overview

A React + Vite + TypeScript + Tailwind CSS v4 storefront with Supabase backend.

## Stack
- **Frontend**: React 19, React Router v7, Framer Motion, Tailwind CSS v4, Radix UI
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Build**: Vite 8, TypeScript strict

## Running locally
```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Environment variables required
| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

Set these in Replit Secrets before running.

## Project structure
```
src/
  admin/           Admin panel (Dashboard, Categories, Products)
    components/    CategoryModal, ProductModal, ProductImagesModal, ProtectedRoute
    layouts/       AdminLayout (sidebar + content area)
    pages/         Dashboard, Categories, Products, Login
  contexts/        AuthContext, CartContext, WishlistContext
  pages/           Public storefront pages
  services/        Supabase service layer
    store.service.ts   — storefront queries (hierarchical categories)
    category.service.ts
    product.service.ts
    product-image.service.ts
    category-image.service.ts
    auth.service.ts
    admin.service.ts
  types/           TypeScript interfaces
  lib/             supabase.ts client
```

## Admin routes
| Path | Page |
|---|---|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard (live stats) |
| `/admin/categories` | Category CRUD |
| `/admin/products` | Product CRUD + image management |

## Category hierarchy
- Categories support unlimited depth via `parent_id`.
- `getStoreCategories()` returns root categories with nested `children[]`.
- `getStoreCategory(slug)` returns the matched category with `ancestors[]` (full breadcrumb path).
- `getFeaturedProducts()` recursively collects featured products from all depths.

## User preferences
- Keep React Router (no TanStack Router).
- Keep Supabase (no replacement).
- Keep existing project structure and coding style.
- TypeScript strict — avoid `any` unless necessary.
- Do NOT change the Customer Side Website UI design.
- Preserve Framer Motion animations, responsive design, Wishlist, SEO.
