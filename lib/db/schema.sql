-- BARBARI Premium Coffee E-commerce SQL Schema
-- Supports SQLite (dev) and PostgreSQL (prod) with minimal changes

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer','admin')),
  loyalty_points INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label TEXT, -- home/work
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT NOT NULL,
  street TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id TEXT REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category_id TEXT REFERENCES categories(id),
  origin TEXT,
  roast_level TEXT CHECK (roast_level IN ('light','medium','medium-dark','dark')),
  flavor_notes TEXT, -- JSON array
  processing_method TEXT,
  bean_type TEXT, -- arabica/robusta/blend
  caffeine_level TEXT CHECK (caffeine_level IN ('low','medium','high','decaf')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  rating_avg REAL DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_bestseller ON products(is_bestseller);

CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  weight_grams INTEGER NOT NULL, -- 250, 500, 1000
  grind_type TEXT NOT NULL, -- whole-bean, espresso, filter, french-press, etc
  sku TEXT UNIQUE NOT NULL,
  price REAL NOT NULL,
  compare_at_price REAL,
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_variants_product ON product_variants(product_id);

CREATE TABLE IF NOT EXISTS product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('percentage','fixed')),
  value REAL NOT NULL,
  min_order_amount REAL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  starts_at DATETIME,
  expires_at DATETIME,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  order_number TEXT UNIQUE NOT NULL, -- BAR-XXXX
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  subtotal REAL NOT NULL,
  shipping_cost REAL DEFAULT 0,
  discount_amount REAL DEFAULT 0,
  tax_amount REAL DEFAULT 0,
  total_amount REAL NOT NULL,
  coupon_code TEXT,
  shipping_address TEXT NOT NULL, -- JSON
  billing_address TEXT,
  shipping_method TEXT,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed','refunded')),
  tracking_number TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  product_snapshot TEXT -- JSON of product at time of purchase
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id),
  provider TEXT NOT NULL, -- zarinpal, stripe, mock
  provider_payment_id TEXT,
  amount REAL NOT NULL,
  status TEXT CHECK (status IN ('pending','success','failed')),
  raw_response TEXT, -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id),
  order_id TEXT REFERENCES orders(id),
  rating INTEGER CHECK (rating >=1 AND rating <=5),
  title TEXT,
  comment TEXT,
  images TEXT, -- JSON array
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_reviews_product ON reviews(product_id);

CREATE TABLE IF NOT EXISTS wishlists (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  session_id TEXT, -- for guest
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  grind_type TEXT,
  quantity INTEGER,
  frequency TEXT CHECK (frequency IN ('weekly','biweekly','monthly')),
  status TEXT CHECK (status IN ('active','paused','cancelled')),
  next_delivery_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory_logs (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  change_amount INTEGER NOT NULL, -- + or -
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  type TEXT, -- order_confirmation, shipping_update, etc
  channel TEXT CHECK (channel IN ('email','sms','both')),
  subject TEXT,
  body TEXT,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author_id TEXT REFERENCES users(id),
  is_published BOOLEAN DEFAULT FALSE,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed categories
INSERT OR IGNORE INTO categories (id, slug, name, description) VALUES 
('cat_espresso','espresso','Espresso','Rich and intense espresso blends'),
('cat_single','single-origin','Single Origin','Single farm traceable coffees'),
('cat_blends','blends','Signature Blends','Our master roaster curated blends'),
('cat_decaf','decaf','Decaf','Decaffeinated without compromise'),
('cat_cold','cold-brew','Cold Brew','Smooth cold brew concentrates'),
('cat_equip','equipment','Equipment','Brewing equipment & accessories');
