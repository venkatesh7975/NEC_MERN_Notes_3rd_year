// Reproduce the repository-owned sample clip without downloading anyone else's media.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url),
  { chromium } = require(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
});
try {
  const page = await browser.newPage();
  await page.bringToFront();
  const encoded = await page.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;
    document.body.append(canvas);
    const ctx = canvas.getContext("2d");
    function draw(progress) {
      ctx.fillStyle = "#172945";
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = "#fff";
      ctx.font = "24px sans-serif";
      ctx.fillText("An HTTP request", 30, 80);
      ctx.font = "20px sans-serif";
      ctx.fillText("Validate > Authorize > Store > Respond", 30, 155);
      ctx.fillStyle = "#9cbbef";
      ctx.fillRect(30, 240, progress * 580, 15);
    }
    draw(0);
    const stream = canvas.captureStream(0),
      recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8",
      }),
      chunks = [];
    const done = new Promise((resolve) => (recorder.onstop = resolve));
    recorder.ondataavailable = (e) => chunks.push(e.data);
    const started = new Promise((resolve) => (recorder.onstart = resolve));
    recorder.start();
    await started;
    for (let n = 0; n < 30; n++) {
      draw(n / 29);
      stream.getVideoTracks()[0].requestFrame();
      await new Promise((r) => setTimeout(r, 67));
    }
    await new Promise((r) => setTimeout(r, 300));
    recorder.stop();
    await done;
    stream.getTracks().forEach((t) => t.stop());
    const bytes = new Uint8Array(
      await new Blob(chunks, { type: "video/webm" }).arrayBuffer(),
    );
    return btoa(String.fromCharCode(...bytes));
  });
  const folder = new URL("../public/media/", import.meta.url);
  await mkdir(folder, { recursive: true });
  await writeFile(
    new URL("web-basics.webm", folder),
    Buffer.from(encoded, "base64"),
  );
  if (Buffer.from(encoded, "base64").length < 1000)
    throw new Error("MediaRecorder produced no useful frames");
  console.log("Generated original 2-second captioned WebM fixture.");
} finally {
  await browser.close();
}
