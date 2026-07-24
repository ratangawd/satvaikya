-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admin_profiles (
  id uuid NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  avatar_path text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admin_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT admin_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  parent_id uuid,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_path text,
  image_alt text,
  display_order integer NOT NULL DEFAULT 0,
  show_on_homepage boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  seo_title text,
  seo_description text,
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id),
  CONSTRAINT categories_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admin_profiles(id),
  CONSTRAINT categories_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admin_profiles(id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  description text,
  status USER-DEFINED NOT NULL DEFAULT 'draft'::product_status,
  featured boolean NOT NULL DEFAULT false,
  search_keywords ARRAY,
  is_active boolean NOT NULL DEFAULT true,
  seo_title text,
  seo_description text,
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  amazon_enabled boolean DEFAULT false,
  amazon_url text,
  display_order integer NOT NULL DEFAULT 0,
  code text,
  price numeric,
  specifications jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT products_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.admin_profiles(id),
  CONSTRAINT products_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admin_profiles(id)
);
CREATE TABLE public.product_variants (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  sku text UNIQUE,
  size text,
  color text,
  material text,
  weight numeric,
  stock integer NOT NULL DEFAULT 0,
  is_default boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  dimensions text,
  warranty text,
  lead_time text,
  hsn_code text,
  CONSTRAINT product_variants_pkey PRIMARY KEY (id),
  CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.product_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  storage_path text NOT NULL,
  alt_text text,
  display_order integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.variant_pricing (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  variant_id uuid NOT NULL,
  customer_type text NOT NULL CHECK (customer_type = ANY (ARRAY['B2B'::text, 'B2C'::text])),
  min_quantity integer NOT NULL DEFAULT 1,
  price numeric NOT NULL,
  sale_price numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  currency text NOT NULL DEFAULT 'INR'::text,
  CONSTRAINT variant_pricing_pkey PRIMARY KEY (id),
  CONSTRAINT variant_pricing_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id)
);
CREATE TABLE public.sales_channels (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  logo_path text,
  website text,
  CONSTRAINT sales_channels_pkey PRIMARY KEY (id)
);
CREATE TABLE public.product_sales_channels (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  channel_id uuid NOT NULL,
  product_url text,
  is_available boolean NOT NULL DEFAULT true,
  CONSTRAINT product_sales_channels_pkey PRIMARY KEY (id),
  CONSTRAINT product_sales_channels_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT product_sales_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.sales_channels(id)
);
CREATE TABLE public.settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  logo_path text,
  favicon_path text,
  email text,
  phone text,
  whatsapp text,
  address text,
  instagram text,
  facebook text,
  youtube text,
  linkedin text,
  currency text DEFAULT 'INR'::text,
  currency_symbol text DEFAULT '₹'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  gst_number text,
  pan_number text,
  company_description text,
  google_maps text,
  office_timings text,
  support_email text,
  CONSTRAINT settings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text,
  message text,
  status USER-DEFINED NOT NULL DEFAULT 'new'::enquiry_status,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT enquiries_pkey PRIMARY KEY (id),
  CONSTRAINT enquiries_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  admin_id uuid,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT activity_logs_pkey PRIMARY KEY (id),
  CONSTRAINT activity_logs_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin_profiles(id)
);