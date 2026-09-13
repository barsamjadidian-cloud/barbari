export type Coffee = {
  id: string;
  name: string;
  english: string;
  origin: string;
  notes: string;
  category: "espresso" | "single" | "blend" | "decaf";
  price: number;
  color: string;
  background: string;
  roast: string;
  tag?: string;
  description: string;
};
export const coffees: Coffee[] = [
  {
    id: "signature",
    name: "اسپرسو بلند بربری",
    english: "SIGNATURE BLEND",
    origin: "برزیل و کلمبیا",
    notes: "شکلات تلخ · فندق · کارامل",
    category: "espresso",
    price: 385000,
    color: "#344b38",
    background: "#e9eade",
    roast: "مدیوم دارک",
    tag: "انتخاب بربری",
    description:
      "یک ترکیب متعادل با تن‌واری بالا و طعمی شکلاتی؛ انتخابی دلنشین برای اسپرسوی روزانه و نوشیدنی‌های شیری.",
  },
  {
    id: "ethiopia",
    name: "اتیوپی یرگاچف",
    english: "ETHIOPIA YIRGACHEFFE",
    origin: "تک‌خاستگاه اتیوپی",
    notes: "یاس · مرکبات · برگاموت",
    category: "single",
    price: 495000,
    color: "#d5c4a4",
    background: "#f0e9dd",
    roast: "لایت",
    tag: "برای قهوه‌دوست‌ها",
    description:
      "عطر گل‌ها و اسیدیته‌ای روشن و مرکباتی. این قهوه برای دم‌آوری با V60 و کمکس، تجربه‌ای لطیف و متفاوت می‌سازد.",
  },
  {
    id: "colombia",
    name: "کلمبیا سوپریمو",
    english: "COLOMBIA SUPREMO",
    origin: "تک‌خاستگاه کلمبیا",
    notes: "کارامل · سیب قرمز · کاکائو",
    category: "single",
    price: 445000,
    color: "#ad7253",
    background: "#eee3da",
    roast: "مدیوم",
    description:
      "شیرینی کارامل، عطر کاکائو و پایانی میوه‌ای؛ قهوه‌ای متعادل که هم با اسپرسوساز و هم با ابزارهای دمی همراه خوبی است.",
  },
  {
    id: "midnight",
    name: "بلند نیمه‌شب",
    english: "MIDNIGHT BLEND",
    origin: "برزیل و هند",
    notes: "شکلات تلخ · گردو · ادویه",
    category: "blend",
    price: 345000,
    color: "#343c3d",
    background: "#e6e8e5",
    roast: "دارک",
    tag: "پرقدرت و جسور",
    description:
      "ترکیبی پرقدرت برای شروع‌های پرانرژی. تن‌واری بالا و نت‌های شکلاتی آن در موکاپات و اسپرسوساز به‌خوبی نمایان می‌شود.",
  },
  {
    id: "decaf",
    name: "کلمبیا بدون کافئین",
    english: "DECAF COLOMBIA",
    origin: "تک‌خاستگاه کلمبیا",
    notes: "وانیل · پرتقال · شکلات شیری",
    category: "decaf",
    price: 465000,
    color: "#928968",
    background: "#eeece2",
    roast: "مدیوم",
    description:
      "برای عصرهای آرام؛ طعم شیرین و لطیف قهوه با کافئین بسیار کمتر. مناسب اسپرسو و دم‌آوری فیلتری.",
  },
  {
    id: "brazil",
    name: "برزیل سانتوس",
    english: "BRAZIL SANTOS",
    origin: "تک‌خاستگاه برزیل",
    notes: "بادام · کاکائو · شکر قهوه‌ای",
    category: "espresso",
    price: 365000,
    color: "#6a7150",
    background: "#e7e8db",
    roast: "مدیوم",
    description:
      "کم‌اسید، آجیلی و خوش‌نوش؛ انتخابی مناسب برای کسانی که یک فنجان قهوه کلاسیک و ملایم دوست دارند.",
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value);
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
export const priceFor = (coffee: Coffee, weight: number) =>
  Math.round(coffee.price * (weight === 1000 ? 3.6 : weight === 500 ? 1.9 : 1));
