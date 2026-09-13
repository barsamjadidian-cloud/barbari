"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  ShoppingBag,
  Search,
  X,
  Plus,
  Minus,
  Coffee as CoffeeIcon,
  Leaf,
  SlidersHorizontal,
  ChevronDown,
  Check,
  Menu,
  Package,
  Flame,
  Heart,
  Download,
  BookOpen,
} from "lucide-react";
import { coffees, Coffee, money, asset, priceFor } from "@/data/coffee";

type CartLine = {
  id: string;
  coffeeId: string;
  weight: number;
  grind: string;
  qty: number;
};
type Overlay = "cart" | "product" | "search" | "guide" | "checkout" | null;
const categories = [
  { id: "all", label: "همه قهوه‌ها" },
  { id: "espresso", label: "اسپرسو" },
  { id: "single", label: "تک‌خاستگاه" },
  { id: "blend", label: "قهوه ترکیبی" },
  { id: "decaf", label: "بدون کافئین" },
];
const grinds = ["دانه کامل", "اسپرسو", "موکاپات", "قهوه دمی", "فرنچ‌پرس"];

function CoffeeBag({
  coffee,
  large = false,
}: {
  coffee: Coffee;
  large?: boolean;
}) {
  return (
    <svg
      className={`coffee-bag ${large ? "large" : ""}`}
      viewBox="0 0 240 300"
      role="img"
      aria-label={`بسته قهوه ${coffee.name}`}
    >
      <defs>
        <linearGradient id={`bag-${coffee.id}`} x1="0" x2="1">
          <stop stopColor="#000" stopOpacity=".25" />
          <stop offset=".13" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".65" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
        <filter
          id={`shadow-${coffee.id}`}
          x="-50%"
          y="-100%"
          width="200%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <ellipse
        cx="121"
        cy="279"
        rx="73"
        ry="8"
        fill="#383325"
        opacity=".21"
        filter={`url(#shadow-${coffee.id})`}
      />
      <path
        d="M57 29 L180 29 L182 54 L194 251 Q194 266 179 271 L59 271 Q45 266 47 253 L54 55 Z"
        fill={coffee.color}
      />
      <path
        d="M57 29 L180 29 L182 54 L194 251 Q194 266 179 271 L59 271 Q45 266 47 253 L54 55 Z"
        fill={`url(#bag-${coffee.id})`}
      />
      <path
        d="M58 36 H179 M57 40 H180 M57 45 H180"
        stroke="#fff"
        strokeOpacity=".15"
      />
      <path
        d="M57 55 L65 82 L57 250 L69 267 M181 54 L173 79 L184 249 L174 268"
        stroke="#000"
        strokeOpacity=".13"
        fill="none"
      />
      <path
        d="M55 251 Q119 240 189 253 L178 267 H64Z"
        fill="#000"
        opacity=".08"
      />
      <rect x="65" y="93" width="111" height="129" rx="1" fill="#f6f1e5" />
      <text
        x="120"
        y="119"
        textAnchor="middle"
        fill="#344b38"
        fontSize="18"
        letterSpacing="2"
        fontFamily="Georgia,serif"
      >
        BARBARI
      </text>
      <text
        x="120"
        y="131"
        textAnchor="middle"
        fill="#666555"
        fontSize="5.5"
        letterSpacing="2"
      >
        SPECIALTY COFFEE
      </text>
      <path
        d="M109 149 Q120 133 130 149 Q122 165 109 149Z"
        fill="none"
        stroke="#526044"
        strokeWidth="1"
      />
      <path d="M114 155 Q125 150 123 141" stroke="#526044" fill="none" />
      <path d="M78 173 H163" stroke="#c6c5b3" strokeWidth=".7" />
      <text
        x="120"
        y="189"
        textAnchor="middle"
        fill="#344b38"
        fontSize="6.8"
        fontWeight="bold"
        letterSpacing=".5"
      >
        {coffee.english}
      </text>
      <text
        x="120"
        y="201"
        textAnchor="middle"
        fill="#777563"
        fontSize="5"
        letterSpacing="1.2"
      >
        FRESHLY ROASTED • 250 G
      </text>
      <rect x="79" y="210" width="82" height="2" fill={coffee.color} />
      <circle cx="119" cy="70" r="5" fill="#000" opacity=".13" />
      <circle cx="119" cy="70" r="2.5" fill="#000" opacity=".12" />
    </svg>
  );
}

export default function CoffeeStore() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selected, setSelected] = useState(coffees[0]);
  const [weight, setWeight] = useState(250);
  const [grind, setGrind] = useState(grinds[0]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("barbari-fa-cart-v1") || "[]",
      );
      if (Array.isArray(saved))
        setCart(
          saved.filter(
            (line: CartLine) =>
              coffees.some((c) => c.id === line.coffeeId) &&
              [250, 500, 1000].includes(line.weight) &&
              grinds.includes(line.grind) &&
              Number.isInteger(line.qty) &&
              line.qty > 0 &&
              line.qty <= 20 &&
              line.id === `${line.coffeeId}-${line.weight}-${line.grind}`,
          ),
        );
    } catch {
      /* Unavailable storage must not prevent shopping. */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem("barbari-fa-cart-v1", JSON.stringify(cart));
      } catch {}
    }
  }, [cart, hydrated]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  useEffect(() => {
    if (!overlay) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(
      () =>
        dialogRef.current
          ?.querySelector<HTMLElement>("button,input,select")
          ?.focus(),
      20,
    );
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverlay(null);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]),a[href],input,select,textarea",
        );
        if (!focusable?.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", keydown);
      lastFocus.current?.focus();
    };
  }, [overlay]);
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cart.reduce(
    (sum, line) =>
      sum +
      priceFor(coffees.find((c) => c.id === line.coffeeId)!, line.weight) *
        line.qty,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 1500000 ? 0 : 65000;
  const filtered = coffees
    .filter(
      (c) =>
        (category === "all" || c.category === category) &&
        `${c.name} ${c.origin} ${c.notes} ${c.english}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : 0,
    );
  const visible =
    showAll || category !== "all" || query ? filtered : filtered.slice(0, 4);
  const openProduct = (coffee: Coffee) => {
    setSelected(coffee);
    setWeight(250);
    setGrind(grinds[0]);
    setOverlay("product");
  };
  const addToCart = () => {
    const id = `${selected.id}-${weight}-${grind}`;
    setCart((old) =>
      old.some((l) => l.id === id)
        ? old.map((l) =>
            l.id === id ? { ...l, qty: Math.min(20, l.qty + 1) } : l,
          )
        : [...old, { id, coffeeId: selected.id, weight, grind, qty: 1 }],
    );
    setOverlay("cart");
    setToast("قهوه به سبد خرید اضافه شد");
  };
  const updateQty = (id: string, delta: number) =>
    setCart((old) =>
      old
        .map((l) =>
          l.id === id ? { ...l, qty: Math.min(20, l.qty + delta) } : l,
        )
        .filter((l) => l.qty > 0),
    );
  const shop = (cat = "all") => {
    setCategory(cat);
    setShowAll(true);
    setQuery("");
    setMobileNav(false);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };
  const downloadOrder = () => {
    const text = [
      "بربری | پیش‌فاکتور نمونه — سفارش ثبت نشده و پرداخت نشده است",
      "",
      ...cart.map((l) => {
        const c = coffees.find((c) => c.id === l.coffeeId)!;
        return `${c.name} | ${money(l.weight)} گرم | ${l.grind} | تعداد ${money(l.qty)} | ${money(priceFor(c, l.weight) * l.qty)} تومان`;
      }),
      "",
      `جمع محصولات: ${money(subtotal)} تومان`,
      `ارسال برآوردی: ${money(shipping)} تومان`,
      `مبلغ برآوردی: ${money(subtotal + shipping)} تومان`,
      "",
      "قیمت‌ها و موجودی نمونه هستند. فروش آنلاین پس از تأیید فروشنده و اتصال درگاه فعال می‌شود.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "barbari-order-draft.txt";
    link.click();
    URL.revokeObjectURL(url);
    setToast("پیش‌فاکتور نمونه دانلود شد");
  };
  return (
    <div className="coffee-store" dir="rtl">
      <a className="skip-link" href="#shop">
        رفتن به محصولات
      </a>
      <div className="announcement">
        <span>یک فنجان خوب، یک شروع تازه</span>
        <span className="announcement-center">
          دنیای قهوه‌های تازه‌برشت بربری <Leaf size={13} />
        </span>
        <span dir="ltr">BREW A BETTER DAY</span>
      </div>
      <header className="store-header">
        <a href="#" className="brand" aria-label="بربری، صفحه اصلی">
          <span>
            BARBARI<span className="brand-dot">®</span>
          </span>
          <small>قهوه، با حالِ خوب</small>
        </a>
        <nav
          className={mobileNav ? "main-nav is-open" : "main-nav"}
          aria-label="منوی اصلی"
        >
          <a href="#shop" onClick={() => shop()}>
            فروشگاه قهوه <ChevronDown size={13} />
          </a>
          <button
            onClick={() => {
              setOverlay("guide");
              setMobileNav(false);
            }}
          >
            راهنمای انتخاب قهوه
          </button>
          <a href="#story" onClick={() => setMobileNav(false)}>
            داستان بربری
          </a>
          <a href="#journal" onClick={() => setMobileNav(false)}>
            مجله قهوه
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button search-button"
            onClick={() => {
              setQuery("");
              setOverlay("search");
            }}
            aria-label="جست‌وجوی قهوه"
          >
            <Search size={20} />
          </button>
          <span className="action-divider" />
          <button className="cart-trigger" onClick={() => setOverlay("cart")}>
            <ShoppingBag size={19} />
            <span>سبد خرید</span>
            <b>{money(count)}</b>
          </button>
          <button
            className="icon-button mobile-toggle"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="باز و بسته کردن منو"
            aria-expanded={mobileNav}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> از دانه تا فنجان، با عشق
            </div>
            <h1>
              حال خوب،
              <br />
              از یک <em>فنجان</em>
              <br />
              شروع می‌شه.
            </h1>
            <p>
              عطر قهوه تازه، طعمی که می‌مونه.
              <br />
              قهوه‌ات رو پیدا کن و به لحظه‌های معمولی، حال‌وهوای تازه بده.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => shop()}>
                قهوه‌ات رو انتخاب کن <ArrowLeft size={18} />
              </button>
              <button
                className="text-button"
                onClick={() => setOverlay("guide")}
              >
                کدوم قهوه برای منه؟ <ArrowUpLeft size={17} />
              </button>
            </div>
            <div className="hero-footnote">
              <span className="bean-mark">
                <CoffeeIcon size={19} />
              </span>
              <span>دانه‌های منتخب. برشت دقیق. یک فنجان متفاوت.</span>
            </div>
          </div>
          <div className="hero-art">
            <img
              src={asset("/images/coffee-hero.webp")}
              alt="بسته قهوه بربری و فنجان اسپرسو در نور گرم صبح"
              fetchPriority="high"
            />
            <div className="roast-stamp">
              <Leaf size={21} />
              <span>تازه‌برشت</span>
              <small>FRESHLY ROASTED</small>
            </div>
            <div className="photo-caption">
              <span className="caption-dot" /> برای مکث‌های کوچک زندگی{" "}
              <span dir="ltr">EST. 2026</span>
            </div>
          </div>
        </section>
        <section className="values-strip" aria-label="فلسفه بربری">
          <div>
            <Flame />
            <span>
              <strong>تازگی، اولویت ماست</strong>
              <small>عطر واقعی قهوه تازه‌برشت</small>
            </span>
          </div>
          <div>
            <Leaf />
            <span>
              <strong>دانه‌های باکیفیت</strong>
              <small>انتخاب با دقت، برشت با عشق</small>
            </span>
          </div>
          <div>
            <Package />
            <span>
              <strong>آسیاب، به سبک شما</strong>
              <small>متناسب با ابزار دم‌آوری‌تان</small>
            </span>
          </div>
          <div>
            <CoffeeIcon />
            <span>
              <strong>همراه هر سلیقه</strong>
              <small>از اسپرسوی قوی تا دمی لطیف</small>
            </span>
          </div>
        </section>

        <section id="shop" className="shop-section section-wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR DAILY RITUAL</span>
              <h2>
                قهوه خوب، انتخاب توست<span>.</span>
              </h2>
              <p>برای هر سلیقه و هر لحظه، یک قهوه داریم.</p>
            </div>
            <button className="text-button all-products" onClick={() => shop()}>
              مشاهده همه قهوه‌ها <ArrowLeft size={17} />
            </button>
          </div>
          <div className="shop-toolbar">
            <div className="category-tabs" aria-label="دسته‌بندی قهوه">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={category === cat.id ? "active" : ""}
                  onClick={() => {
                    setCategory(cat.id);
                    setShowAll(true);
                  }}
                  aria-pressed={category === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <label className="sort-label">
              <SlidersHorizontal size={15} />
              <select
                aria-label="مرتب‌سازی محصولات"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">پیشنهاد بربری</option>
                <option value="low">ارزان‌ترین</option>
                <option value="high">گران‌ترین</option>
              </select>
            </label>
          </div>
          {query && (
            <div className="search-summary">
              نتایج جست‌وجوی «{query}»{" "}
              <button onClick={() => setQuery("")}>
                <X size={15} /> پاک کردن
              </button>
            </div>
          )}
          <div className="products-grid">
            {visible.map((coffee) => (
              <article className="product-card" key={coffee.id}>
                <button
                  className="product-image"
                  style={{ background: coffee.background }}
                  onClick={() => openProduct(coffee)}
                  aria-label={`مشاهده ${coffee.name}`}
                >
                  {coffee.tag && (
                    <span
                      className={`product-tag ${coffee.id === "signature" ? "green" : ""}`}
                    >
                      {coffee.id === "signature" && <Leaf size={11} />}{" "}
                      {coffee.tag}
                    </span>
                  )}
                  <CoffeeBag coffee={coffee} />
                  <span className="image-bottom-label">
                    {coffee.roast}
                    <span>۲۵۰ گرم</span>
                  </span>
                </button>
                <div className="product-info">
                  <div className="product-origin">
                    {coffee.origin}
                    <span className="roast-dots">
                      <i />
                      <i />
                      <i className={coffee.roast === "لایت" ? "muted" : ""} />
                      <i className={coffee.roast === "دارک" ? "" : "muted"} />
                    </span>
                  </div>
                  <button
                    className="product-title"
                    onClick={() => openProduct(coffee)}
                  >
                    {coffee.name}
                  </button>
                  <p>{coffee.notes}</p>
                  <div className="product-bottom">
                    <span>
                      <strong>{money(coffee.price)}</strong>{" "}
                      <small>تومان</small>
                    </span>
                    <button
                      className="add-button"
                      onClick={() => openProduct(coffee)}
                      aria-label={`افزودن ${coffee.name} به سبد خرید`}
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <h3>قهوه‌ای با این نام پیدا نشد</h3>
              <p>نام، خاستگاه یا طعم دیگری را جست‌وجو کن.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                نمایش همه قهوه‌ها
              </button>
            </div>
          )}
          <div className="catalog-note">
            این ویترین در حال آماده‌سازی است؛ قیمت‌ها و محصولات فعلاً نمونه‌اند.
          </div>
        </section>

        <section className="discovery-banner section-wrap">
          <div className="discovery-icon">
            <CoffeeIcon size={49} strokeWidth={1} />
            <span>?</span>
          </div>
          <div>
            <span className="section-kicker">FIND YOUR COFFEE</span>
            <h2>هنوز قهوه محبوبت رو پیدا نکردی؟</h2>
            <p>بگو قهوه‌ات رو چطور دوست داری؛ انتخابش با ما.</p>
          </div>
          <button className="cream-button" onClick={() => setOverlay("guide")}>
            راهنمای انتخاب قهوه <ArrowLeft size={17} />
          </button>
          <span className="banner-decoration">☕</span>
        </section>

        <section id="story" className="story-section section-wrap">
          <div className="story-image">
            <img
              loading="lazy"
              src={asset("/images/coffee-hero.webp")}
              alt="داستان بربری؛ مکثی برای عطر قهوه"
            />
            <span>GOOD COFFEE. SLOW MOMENTS.</span>
          </div>
          <div className="story-copy">
            <span className="section-kicker">THE BARBARI WAY</span>
            <h2>
              ما به یک فنجان خوب
              <br />
              بیشتر از قهوه نگاه می‌کنیم.
            </h2>
            <p>
              بربری برای آن چند دقیقه‌ای‌ست که از شلوغی روز فاصله می‌گیری؛ برای
              گفت‌وگوهای طولانی، صبح‌های آرام و ایده‌هایی که با اولین جرعه جان
              می‌گیرند.
            </p>
            <p>
              باور ما ساده است: قهوه خوب نباید پیچیده باشد. کافی‌ست دانه درست را
              پیدا کنی، با حوصله دمش کنی و از لحظه‌ات لذت ببری.
            </p>
            <a href="#journal" className="text-button">
              با دنیای قهوه آشنا شو <ArrowLeft size={17} />
            </a>
            <span className="story-signature">با عشق، بربری</span>
          </div>
        </section>

        <section id="journal" className="journal-section section-wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE COFFEE JOURNAL</span>
              <h2>چند دقیقه با قهوه</h2>
            </div>
            <span className="journal-subtitle">
              برای فنجانی که هر روز بهتر می‌شود.
            </span>
          </div>
          <div className="journal-grid">
            {[
              {
                icon: CoffeeIcon,
                title: "اسپرسو یا قهوه دمی؟",
                text: "اسپرسو غلیظ و کوتاه است؛ قهوه دمی فرصت بیشتری برای کشف عطرها و طعم‌های ظریف می‌دهد.",
              },
              {
                icon: SlidersHorizontal,
                title: "آسیاب درست، نصف راهه.",
                text: "برای اسپرسو آسیاب ریز، برای V60 متوسط و برای فرنچ‌پرس درشت انتخاب کن. آسیاب تازه، عطر بیشتری دارد.",
              },
              {
                icon: BookOpen,
                title: "راز یک فنجان خوش‌عطر",
                text: "برای شروع، هر ۱۵ گرم قهوه را با ۲۵۰ گرم آب ۹۲ تا ۹۶ درجه دم کن؛ سپس نسبت را با سلیقه‌ات تنظیم کن.",
              },
            ].map((article, i) => (
              <article key={article.title}>
                <div className="journal-number">
                  <article.icon size={27} strokeWidth={1.3} />
                  <span>۰{i + 1}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section section-wrap">
          <div>
            <span className="section-kicker">A LITTLE HELP</span>
            <h2>شاید سؤال تو هم باشه</h2>
          </div>
          <div className="faq-list">
            {[
              {
                q: "قهوه را دانه کامل بخرم یا آسیاب‌شده؟",
                a: "اگر آسیاب قهوه دارید، دانه کامل عطر را بهتر حفظ می‌کند. در غیر این صورت، هنگام انتخاب محصول نوع آسیاب مناسب دستگاه خود را انتخاب کنید.",
              },
              {
                q: "چطور قهوه را تازه نگه دارم؟",
                a: "قهوه را در بسته دربسته، جای خشک و خنک و دور از نور نگهداری کنید. یخچال به‌دلیل رطوبت و بوی مواد غذایی انتخاب مناسبی نیست.",
              },
              {
                q: "آیا الان امکان پرداخت و ثبت سفارش وجود دارد؟",
                a: "هنوز نه. این نسخه ویترین فروشگاه است و محصولات و قیمت‌ها نمونه هستند. می‌توانید سبد خرید بسازید و پیش‌فاکتور نمونه بگیرید؛ ثبت سفارش و پرداخت پس از اتصال زیرساخت فروش فعال می‌شود.",
              },
            ].map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <Plus size={17} />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="store-footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand">
            <a href="#" className="brand">
              <span>
                BARBARI<sup>®</sup>
              </span>
              <small>قهوه، با حالِ خوب</small>
            </a>
            <p>
              کمی مکث کن.
              <br />
              زندگی با عطر قهوه قشنگ‌تره.
            </p>
          </div>
          <div>
            <h3>دنیای بربری</h3>
            <a href="#shop" onClick={() => shop()}>
              فروشگاه قهوه
            </a>
            <a href="#story">داستان ما</a>
            <a href="#journal">مجله قهوه</a>
          </div>
          <div>
            <h3>کنار شما</h3>
            <button onClick={() => setOverlay("guide")}>راهنمای انتخاب</button>
            <button onClick={() => setOverlay("cart")}>سبد خرید من</button>
            <a href="#journal">راهنمای دم‌آوری</a>
          </div>
          <div className="footer-message">
            <Leaf size={28} strokeWidth={1.2} />
            <h3>یک انتخاب کوچک، یک روز بهتر.</h3>
            <p>
              قهوه‌ات را با حوصله انتخاب کن؛
              <br />
              لحظه‌های خوب از همین‌جا شروع می‌شوند.
            </p>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© {money(2026)} بربری. با عشق برای دوست‌داران قهوه.</span>
          <span dir="ltr">CRAFTED WITH CARE, BREWED WITH LOVE.</span>
        </div>
      </footer>

      {toast && (
        <div className="store-toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
      {overlay && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOverlay(null);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className={`store-modal ${overlay === "cart" || overlay === "checkout" ? "cart-modal" : ""}`}
          >
            <div className="modal-heading">
              <h2 id="dialog-title">
                {overlay === "cart"
                  ? `سبد خرید شما (${money(count)})`
                  : overlay === "product"
                    ? "قهوه‌ات را شخصی‌سازی کن"
                    : overlay === "search"
                      ? "دنبال چه قهوه‌ای می‌گردی؟"
                      : overlay === "checkout"
                        ? "مرور پیش‌فاکتور"
                        : "قهوه مناسب تو کدام است؟"}
              </h2>
              <button
                className="icon-button"
                onClick={() => setOverlay(null)}
                aria-label="بستن پنجره"
              >
                <X size={22} />
              </button>
            </div>
            {overlay === "product" && (
              <div className="product-detail">
                <div
                  className="detail-art"
                  style={{ background: selected.background }}
                >
                  <CoffeeBag coffee={selected} large />
                </div>
                <span className="section-kicker">{selected.english}</span>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
                <div className="flavor-line">
                  <Leaf size={15} />
                  {selected.notes}
                </div>
                <fieldset>
                  <legend>وزن بسته</legend>
                  <div className="option-row">
                    {[250, 500, 1000].map((w) => (
                      <button
                        key={w}
                        className={weight === w ? "chosen" : ""}
                        onClick={() => setWeight(w)}
                        aria-pressed={weight === w}
                      >
                        {money(w)} گرم
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="grind-label">
                  نوع آسیاب
                  <select
                    value={grind}
                    onChange={(e) => setGrind(e.target.value)}
                  >
                    {grinds.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </label>
                <div className="detail-purchase">
                  <span>
                    <strong>{money(priceFor(selected, weight))}</strong> تومان
                  </span>
                  <button className="primary-button" onClick={addToCart}>
                    <Plus size={17} /> افزودن به سبد
                  </button>
                </div>
              </div>
            )}
            {(overlay === "cart" || overlay === "checkout") &&
              (cart.length ? (
                <div className="cart-content">
                  {overlay === "checkout" && (
                    <div className="checkout-notice">
                      <Package size={24} />
                      <h3>فروش آنلاین به‌زودی فعال می‌شود</h3>
                      <p>
                        درگاه پرداخت و ثبت سفارش هنوز متصل نیست. این پیش‌فاکتور
                        نمونه است و هیچ سفارش یا پرداختی ثبت نمی‌کند.
                      </p>
                    </div>
                  )}
                  <div className="cart-lines">
                    {cart.map((line) => {
                      const c = coffees.find((p) => p.id === line.coffeeId)!;
                      return (
                        <div key={line.id} className="cart-line">
                          <div
                            className="cart-thumb"
                            style={{ background: c.background }}
                          >
                            <CoffeeBag coffee={c} />
                          </div>
                          <div className="cart-line-info">
                            <h3>{c.name}</h3>
                            <p>
                              {money(line.weight)} گرم · {line.grind}
                            </p>
                            <strong>
                              {money(priceFor(c, line.weight) * line.qty)}{" "}
                              <small>تومان</small>
                            </strong>
                            <div className="quantity-control">
                              <button
                                aria-label={`افزایش تعداد ${c.name}`}
                                disabled={line.qty >= 20}
                                onClick={() => updateQty(line.id, 1)}
                              >
                                <Plus size={13} />
                              </button>
                              <span>{money(line.qty)}</span>
                              <button
                                aria-label={`کاهش تعداد ${c.name}`}
                                onClick={() => updateQty(line.id, -1)}
                              >
                                <Minus size={13} />
                              </button>
                            </div>
                          </div>
                          <button
                            className="remove-line icon-button"
                            aria-label={`حذف ${c.name}`}
                            onClick={() =>
                              setCart((old) =>
                                old.filter((l) => l.id !== line.id),
                              )
                            }
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="cart-summary">
                    <div>
                      <span>جمع محصولات</span>
                      <span>{money(subtotal)} تومان</span>
                    </div>
                    <div>
                      <span>هزینه ارسال (برآوردی)</span>
                      <span>
                        {shipping ? `${money(shipping)} تومان` : "رایگان"}
                      </span>
                    </div>
                    <div className="cart-total">
                      <strong>مجموع</strong>
                      <strong>
                        {money(subtotal + shipping)} <small>تومان</small>
                      </strong>
                    </div>
                    <p>
                      قیمت و شرایط ارسال نمونه‌اند و نیاز به تأیید فروشنده
                      دارند.
                    </p>
                    <button
                      className="primary-button full-width"
                      onClick={
                        overlay === "cart"
                          ? () => setOverlay("checkout")
                          : downloadOrder
                      }
                    >
                      {overlay === "cart" ? (
                        <>
                          مرور پیش‌فاکتور <ArrowLeft size={17} />
                        </>
                      ) : (
                        <>
                          دانلود پیش‌فاکتور نمونه <Download size={17} />
                        </>
                      )}
                    </button>
                    <button
                      className="text-button continue-shopping"
                      onClick={() => {
                        setOverlay(null);
                        shop();
                      }}
                    >
                      ادامه انتخاب قهوه
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <ShoppingBag size={45} strokeWidth={1} />
                  <h3>جای قهوه‌ات اینجا خالیه!</h3>
                  <p>یک قهوه خوش‌عطر برای شروع انتخاب کن.</p>
                  <button
                    className="primary-button"
                    onClick={() => {
                      setOverlay(null);
                      shop();
                    }}
                  >
                    کشف قهوه‌ها <ArrowLeft size={17} />
                  </button>
                </div>
              ))}
            {overlay === "search" && (
              <div className="search-content">
                <label className="search-input">
                  <Search size={20} />
                  <input
                    placeholder="نام قهوه، خاستگاه یا طعم دلخواه…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                </label>
                <p className="muted-text">مثلاً: شکلات، اتیوپی یا اسپرسو</p>
                <div className="search-results">
                  {coffees
                    .filter((c) =>
                      `${c.name} ${c.origin} ${c.notes} ${c.english}`
                        .toLowerCase()
                        .includes(query.toLowerCase().trim()),
                    )
                    .map((c) => (
                      <button key={c.id} onClick={() => openProduct(c)}>
                        <span
                          className="search-bean"
                          style={{ background: c.color }}
                        >
                          <CoffeeIcon size={20} />
                        </span>
                        <span>
                          <strong>{c.name}</strong>
                          <small>{c.notes}</small>
                        </span>
                        <span>
                          {money(c.price)} <small>تومان</small>
                        </span>
                        <ArrowUpLeft size={17} />
                      </button>
                    ))}
                </div>
                {!coffees.some((c) =>
                  `${c.name} ${c.origin} ${c.notes} ${c.english}`
                    .toLowerCase()
                    .includes(query.toLowerCase().trim()),
                ) && (
                  <p className="no-results">
                    نتیجه‌ای پیدا نشد؛ یک عبارت دیگر امتحان کن.
                  </p>
                )}
              </div>
            )}
            {overlay === "guide" && (
              <div className="guide-content">
                <p>
                  کدام جمله بیشتر شبیه سلیقه توست؟ روی انتخابت بزن تا پیشنهاد ما
                  را ببینی.
                </p>
                {[
                  {
                    title: "قهوه غلیظ و شکلاتی دوست دارم",
                    subtitle: "برای اسپرسوساز، موکاپات و قهوه با شیر",
                    coffee: coffees[0],
                    icon: CoffeeIcon,
                  },
                  {
                    title: "عطر گل و طعم میوه‌ای را ترجیح می‌دهم",
                    subtitle: "برای V60، کمکس و کشف طعم‌های تازه",
                    coffee: coffees[1],
                    icon: Leaf,
                  },
                  {
                    title: "قهوه پرقدرت و پرانرژی می‌خواهم",
                    subtitle: "ترکیبی تیره‌تر با تن‌واری بالا",
                    coffee: coffees[3],
                    icon: Flame,
                  },
                  {
                    title: "قهوه عصر، با کافئین کمتر",
                    subtitle: "همان لذت قهوه، آرام‌تر و ملایم‌تر",
                    coffee: coffees[4],
                    icon: Heart,
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => openProduct(item.coffee)}
                  >
                    <item.icon size={24} strokeWidth={1.4} />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </span>
                    <ArrowLeft size={19} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
