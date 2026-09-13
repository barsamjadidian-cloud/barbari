// Export ONLY the public storefront. Legacy demo accounts, admin and API routes
// must never be published as a functioning commerce backend.
import { mkdir, cp, writeFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
const root = process.cwd();
const target = path.join(root, ".pages-site");
await rm(target, { recursive: true, force: true });
await mkdir(path.join(target, "app"), { recursive: true });
for (const file of [
  "app/layout.tsx",
  "app/page.tsx",
  "app/globals.css",
  "app/coffee.css",
  "app/fonts",
  "components/store/CoffeeStore.tsx",
  "data/coffee.ts",
  "public",
  "tailwind.config.ts",
  "postcss.config.js",
]) {
  await mkdir(path.dirname(path.join(target, file)), { recursive: true });
  await cp(path.join(root, file), path.join(target, file), { recursive: true });
}
await writeFile(
  path.join(target, "package.json"),
  JSON.stringify({ name: "barbari-public-storefront", private: true }),
);
await writeFile(
  path.join(target, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        jsx: "preserve",
        isolatedModules: true,
        resolveJsonModule: true,
        incremental: true,
        plugins: [{ name: "next" }],
        baseUrl: ".",
        paths: { "@/*": ["./*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2,
  ),
);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/barbari";
await writeFile(
  path.join(target, "next.config.mjs"),
  `export default { output: 'export', basePath: ${JSON.stringify(basePath)}, trailingSlash: true, images: { unoptimized: true }, experimental: { cpus: 2 }, env: { NEXT_PUBLIC_BASE_PATH: ${JSON.stringify(basePath)} } };\n`,
);
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build", target],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_BASE_PATH: basePath,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
await writeFile(path.join(target, "out/.nojekyll"), "");
console.log(
  "\nStatic storefront ready at .pages-site/out (no credentials or server routes included).",
);
