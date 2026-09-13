import { chromium as playwright } from "@playwright/test";
import chromium from "@sparticuz/chromium";
import { inflate } from "../node_modules/@sparticuz/chromium/build/lambdafs.js";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
// The bundled runtime makes browser tests independent of external browser CDNs.
const libraries = await inflate(
  `${process.cwd()}/node_modules/@sparticuz/chromium/bin/al2023.tar.br`,
);
const browser = await playwright.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args,
  headless: true,
  env: {
    ...process.env,
    LD_LIBRARY_PATH: `${libraries}/lib:${process.env.LD_LIBRARY_PATH || ""}`,
  },
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(process.env.TEST_URL || "http://localhost:3000");
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator(".product-card").count(), 4);
  assert.equal(
    await page
      .locator(".hero-art img")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
    true,
  );
  await page.getByRole("button", { name: "بدون کافئین", exact: true }).click();
  assert.equal(await page.locator(".product-card").count(), 1);
  await page.getByRole("button", { name: "همه قهوه‌ها", exact: true }).click();
  assert.equal(await page.locator(".product-card").count(), 6);
  await page.getByLabel("مرتب‌سازی محصولات").selectOption("low");
  assert.match(
    await page.locator(".product-title").first().textContent(),
    /نیمه‌شب/,
  );
  await page
    .getByRole("button", { name: "جست‌وجوی قهوه", exact: true })
    .click();
  await page
    .getByPlaceholder("نام قهوه، خاستگاه یا طعم دلخواه…")
    .fill("اتیوپی");
  assert.equal(await page.locator(".search-results>button").count(), 1);
  await page.locator(".search-results>button").click();
  await page.getByRole("button", { name: "۵۰۰ گرم", exact: true }).click();
  await page.locator(".grind-label select").selectOption("موکاپات");
  await page
    .getByRole("button", { name: "افزودن به سبد", exact: true })
    .click();
  assert.match(
    await page.locator(".cart-line").textContent(),
    /۵۰۰ گرم · موکاپات/,
  );
  assert.match(await page.locator(".cart-total").textContent(), /۱٬۰۰۵٬۵۰۰/);
  await page
    .getByRole("button", { name: "افزایش تعداد اتیوپی یرگاچف" })
    .click();
  assert.match(await page.locator(".cart-total").textContent(), /۱٬۸۸۱٬۰۰۰/);
  await page.reload();
  await page.locator(".cart-trigger").click();
  assert.equal(await page.locator(".quantity-control span").textContent(), "۲");
  await page
    .getByRole("button", { name: "مرور پیش‌فاکتور", exact: true })
    .click();
  assert.match(
    await page.locator(".checkout-notice").textContent(),
    /هیچ سفارش یا پرداختی ثبت نمی‌کند/,
  );
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "دانلود پیش‌فاکتور نمونه" }).click();
  assert.equal(
    (await downloaded).suggestedFilename(),
    "barbari-order-draft.txt",
  );
  await page.getByRole("button", { name: "حذف اتیوپی یرگاچف" }).click();
  assert.equal(await page.locator(".empty-state").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.getByRole("button", { name: "کدوم قهوه برای منه؟" }).click();
  await page.getByRole("button", { name: /قهوه عصر، با کافئین کمتر/ }).click();
  assert.match(
    await page.locator(".product-detail h3").textContent(),
    /بدون کافئین/,
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "جست‌وجوی قهوه", exact: true })
    .click();
  await page
    .getByPlaceholder("نام قهوه، خاستگاه یا طعم دلخواه…")
    .fill("نام‌ناموجود");
  assert.equal(await page.locator(".no-results").isVisible(), true);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "پاک کردن", exact: true }).click();
  await page.getByLabel("مرتب‌سازی محصولات").selectOption("featured");
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir("test-results", { recursive: true });
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  for (const width of [390, 320, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Horizontal overflow at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "باز و بسته کردن منو" }).click();
  assert.equal(await page.locator(".main-nav").isVisible(), true);
  await page
    .locator(".main-nav")
    .getByRole("link", { name: "داستان بربری" })
    .click();
  assert.equal(await page.locator(".main-nav").isVisible(), false);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  assert.deepEqual(errors, [], "No browser errors");
  console.log(
    "PASS: RTL, images, categories, sorting, search/empty search, weight/grind, totals, shipping, cart persistence/removal, draft download, guide, dialogs, mobile navigation, four responsive widths, no browser errors.",
  );
} finally {
  await browser.close();
}
