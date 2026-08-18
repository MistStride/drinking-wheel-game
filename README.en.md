# 🍻 Take a Sip Wheel (Single-File Edition)

A ready-to-play web spinner built for parties. Just double-click `app.html` and play in your browser — **no install, no server needed**. The 646-question bank is inlined, and all drawing, rigging, and de-duplication happen right in the frontend.

> ⚠️ Make sure everyone involved knows about and voluntarily joins the game, and keeps the jokes in good taste.

👉 **Want your own questions?** See the [Custom Question Bank Guide](自定义题库指南-en.md) — copy a prompt, send it to an AI, and it generates a bank just for you. There's also a ready-made [template](我的题库模板.json) you can download directly.

👉 **First time and not sure how to play?** See the [User Manual](用户手册.md) — it walks through opening the wheel, rigging, custom ratios, and bank editing step by step.

---

## ✨ Features

- **Four game modes**: Truth / Dare / Just Drink / Deeptalk, each with its own color on the wheel.
- **Two wheel modes**
  - **By Question (default)**: draws a number of questions at random from the active pool, by category ratio (default 50, adjustable), and puts them on the wheel — it stops right on the original question. The **⚖️ Custom Ratio** popup lets you drill down to sub-categories and use sliders to set exactly how many questions from each branch go on the wheel (capped by each branch's pool size).
  - **By Type (Branch)**: each slice is a category; when the wheel stops, it draws one question from that category.
- **Precise rigging**: force a specific category to hit on the **Nth** spin or within the **first K** spins — even force one **specific question** (search its text, then pin it). Rigged questions are forced onto the wheel so the outcome matches the setup.
- **No repeats**: turn off "Allow repeated draws" and a drawn question is removed from the wheel so it can't come up again (rigged-protected questions excepted); a one-click "Reset drawn" restores everything.
- **⚙️ Settings drawer (top-right)**: rigging, bank editing, and import/export all live in a right-side slide-out drawer, keeping the main screen to just the wheel and play settings — clean and uncluttered.
- **Four dare intensity levels**: `0 Social-Solo` (emoji mimic / boss-style line) · `1 Polite Probe` (handshake / high-five) · `2 Warming Up` (hug / feed) · `3 Crowd-Pleaser` (cheek-to-cheek / whisper, requires High-Energy mode); you can set a default max contact level and whether to allow approaching strangers.
- **High-Energy mode**: off by default. Turning it on unlocks spicy topics (ex, crush/flirt, body exploration) and releases the "Crowd-Pleaser (level 3)" contact dares.
- **Editable bank**: in the settings drawer you can export JSON (lossless) or CSV (handy for editing text in Excel), edit, then re-import to overwrite; you can also re-run the generator to batch-regenerate.
- **Bilingual UI**: switch between **中文 / English** anytime from the top-right toggle — the interface and the built-in question bank both flip languages.
- **Candy-party UI**: bright, soft pink / yellow / light-blue / lavender palette with rounded animations that fit the party vibe.

---

## 🚀 Quick Start

**Option 1 (easiest)**: Just double-click `app.html` to open it in your browser and play.

**Option 2 (developers / rebuild)**:

```bash
node gen-bank.js   # generate question-bank.json
node build.js      # inject the bank into app.src.html to produce the self-contained app.html
```

> Requires Node.js installed locally. The generator re-batches and de-duplicates the bank; the build script inlines the bank into a single file.

---

## 🗂 Project Structure

| File | Description |
| --- | --- |
| `app.html` | **Main app**: self-contained single file, double-click to play |
| `index.html` | Lightweight starter (inlined config, good for quick category tweaks) |
| `app.src.html` | Source template (with bank placeholders); `build.js` injects the bank to produce `app.html` |
| `gen-bank.js` | Bank generator: templates + word pools batch-generate the bank (with de-dup) |
| `build.js` | Build script: injects the bank into `app.src.html` to produce `app.html` |
| `question-bank.json` | Bank data (646 questions, with a top-level `stats` block), editable externally then re-imported |
| `i18n-en.json` | English UI dictionary (156 keys) used by the in-app language toggle |
| `question-bank-design.md` | Bank category & field design doc |
| `用户手册.md` | Player-facing illustrated manual (open wheel → play settings → rigging → custom ratio → bank edit) |
| `自定义题库指南-en.md` | English version of the custom-bank guide |

---

## 🛠 Customizing the Question Bank

- **Just change question text**: tap ⚙️ top-right to open the settings drawer, export JSON / CSV from "Bank Edit" → edit in an editor or Excel → re-import to overwrite.
- **Rebuild the whole bank**: edit the templates & word pools in `gen-bank.js` → `node gen-bank.js` → `node build.js`.
- **Tune rigging / ratio / high-energy**: rigging lives in the ⚙️ settings drawer; the logic is in `app.src.html`'s `CAT_META` / `resolveRigging()`. Rebuild after changes.

---

## 🔧 Technical Notes

- The wheel is built on [lucky-canvas](https://github.com/buuing/lucky-canvas) (loaded via CDN).
- Question types, weights, and rigging-hit logic live in `app.src.html`'s `CAT_META` and `resolveRigging()`.
- The current `app.html` still depends on the CDN (lucky-canvas and fonts). For full offline use, inline lucky-canvas and the fonts into the single file.

---

## 📄 License

For learning and non-commercial party entertainment only.
