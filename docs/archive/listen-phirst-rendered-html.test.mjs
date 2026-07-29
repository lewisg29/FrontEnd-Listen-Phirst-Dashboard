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

test("server-renders the Listen Phirst dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Listen Phirst Dashboard<\/title>/i);
  assert.match(html, /Listen Phirst/);
  assert.match(html, /Welcome back, Kate/);
  assert.match(html, /Appointment Calendar/);
  assert.match(html, /Appointment History/);
  assert.match(html, /Care Snapshot/);
  assert.doesNotMatch(html, /Blood Status|Heart Rate|Glucose Level/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("keeps the dashboard code focused and free of starter pieces", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../../src/app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../src/app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"use client"/);
  assert.match(page, /const appointments = \[/);
  assert.match(page, /setSelectedDate/);
  assert.match(page, /changeMonth/);
  assert.match(layout, /title:\s*"Listen Phirst Dashboard"/);
  assert.doesNotMatch(page, /Blood Status|Heart Rate|Glucose Level/i);
  assert.doesNotMatch(page, /<img|<Image/i);
  assert.doesNotMatch(page, /SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
