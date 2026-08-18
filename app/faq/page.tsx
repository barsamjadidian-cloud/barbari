export default function FAQPage() {
  const faqs = [
    { q: "How fresh is the coffee?", a: "We roast daily Mon-Sat. Orders before 2pm EST ship same day. Roast date printed on bag. Best 7-28 days post-roast." },
    { q: "What grind should I choose?", a: "Whole bean is best. If you need pre-ground: Espresso = fine, Filter = medium, French Press = coarse, Moka = medium-fine." },
    { q: "Do you offer subscriptions?", a: "Yes! Save 15% with flexible delivery weekly/biweekly/monthly. Pause, modify, cancel anytime from account." },
    { q: "What payment methods?", a: "ZarinPal for Iran, Stripe cards, Apple Pay. All via secure /api/payments/* — secrets never in frontend." },
    { q: "Free shipping?", a: "Free standard US shipping over $50. Express 24h in NYC." },
  ];
  return (
    <div className="container-premium py-16 max-w-[800px]">
      <h1 className="font-display text-4xl font-bold">FAQ</h1>
      <div className="mt-10 space-y-6">
        {faqs.map(f=>(
          <div key={f.q} className="bg-white border border-espresso-100 rounded-2xl p-6">
            <h3 className="font-semibold">{f.q}</h3>
            <p className="text-sm text-espresso-600 mt-2 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
