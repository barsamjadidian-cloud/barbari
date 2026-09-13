export default function TermsPage() {
  return (
    <div className="container-premium py-16 max-w-[800px] prose prose-stone">
      <h1 className="font-display text-4xl font-bold">Terms & Privacy</h1>
      <p className="mt-6 text-sm text-espresso-600">This is a demo store built as production-ready codebase. For real launch, plug real payment keys via env, add legal counsel review.</p>
      <h2 className="font-semibold mt-8">Security</h2><ul className="list-disc pl-5 text-sm"><li>Passwords hashed with bcryptjs 12 rounds</li><li>SQL injection prevented via prepared statements / ORM</li><li>XSS sanitized, CSRF double-submit, rate limiting</li><li>Secrets only in .env, never in client</li></ul>
      <h2 className="font-semibold mt-8">Payments</h2><p className="text-sm">Abstract provider in lib/payments/ — getPaymentProvider() reads PAYMENT_PROVIDER env. ZarinPal implementation ready for real merchant ID.</p>
    </div>
  );
}
