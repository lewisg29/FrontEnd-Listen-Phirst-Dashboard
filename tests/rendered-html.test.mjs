import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Oz account screen", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Phicil-itate Change Oz Dashboard<\/title>/i);
  assert.match(html, /Phicil-itate Change/);
  assert.match(html, /Welcome to your Oz dashboard/);
  assert.match(html, /Secure account access/);
  assert.match(html, /demo@phicilitatechange\.com/);
  assert.match(html, /OzDemo2026!/);
  assert.match(html, /Password/);
  assert.match(html, /OTP/);
  assert.match(html, /Login/);
  assert.doesNotMatch(html, /you@company\.com/i);
  assert.doesNotMatch(html, /Listen Phirst|Blood Status|Heart Rate|Glucose Level/i);
});

test("keeps the app frontend-only and focused on Oz dashboard data", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"use client"/);
  assert.match(page, /Email is required/);
  assert.match(page, /Enter a valid email address/);
  assert.match(page, /Use the temporary demo email and password/);
  assert.match(page, /OTP code is required/);
  assert.match(page, /Signing in\.\.\./);
  assert.match(page, /Sign out/);
  assert.match(page, /const completedCalls = \[/);
  assert.match(page, /"Dashboard"[\s\S]*"Data Access"[\s\S]*"Calls"/);
  assert.match(page, /const dataAccessRecords = \[/);
  assert.match(page, /ElevenLabs/);
  assert.match(layout, /title:\s*"Phicil-itate Change Oz Dashboard"/);
  assert.doesNotMatch(page, /Prescriptions|Health Record|Listen Phirst/i);
  assert.doesNotMatch(page, /fetch\(|axios|\/api\//i);
  assert.doesNotMatch(packageJson, /express|axios/);
});
