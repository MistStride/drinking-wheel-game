# 🍻 Take a Sip Wheel

A web-based spinner built for party warm-ups. Four categories — Truth / Dare / Just Drink / Deeptalk — with 646 built-in questions. Double-click `app.html` to play in your browser; no install and no server required.

> ⚠️ Make sure everyone involved knows about and voluntarily joins the game, and keep the jokes in good taste.

---

## 🌐 Language Switch

Tap the **EN / 中文** button in the top-right corner. The UI, buttons, prompts, and built-in question bank all switch between English and Chinese.

![English mode](screenshots/en.png)

---

## 🖼 Screenshots

![Main screen](screenshots/main.png)

Spin once and the result appears below:

![Result](screenshots/result.png)

---

## ✨ Features

- **Four game modes**: Truth / Dare / Just Drink / Deeptalk, each with its own color on the wheel.
- **Two wheel modes**
  - **By Question (default)**: draws questions from the active pool by category ratio and puts them on the wheel — it stops right on the original question.
  - **By Type (Branch)**: each slice is a category; when the wheel stops, it draws one question from that category.
- **Custom ratios**: open the **⚖️ Custom Ratio** popup to set how many questions from each sub-category go into the wheel, capped by each branch's pool.
- **Precise rigging**: force a specific category to hit on the **Nth** spin or within the **first K** spins — even force one **specific question**.
- **No repeats**: turn off "Allow repeated draws" and a drawn question is removed from the wheel until you click "Reset drawn".
- **⚙️ Settings drawer**: rigging, bank editing, and import/export all live in a right-side slide-out drawer.
- **Editable bank**: export JSON (lossless) or CSV (handy for Excel) and re-import to overwrite.
- **Bilingual UI**: switch between **中文 / English** anytime; the interface and the built-in question bank both flip languages.
- **Candy-party UI**: bright pink / yellow / light-blue / lavender palette with rounded animations.

---

## 🚀 Quick Start

Double-click `app.html` to open it in your browser and play.

To rebuild from source:

```bash
node gen-bank.js   # generate question-bank.json
node build.js      # inject the bank into app.src.html to produce app.html
```

> Requires Node.js. The generator re-batches and de-duplicates the bank; the build script inlines the bank into the final HTML.

---

## 🛠 Customizing the Question Bank

- **Only change question text**: tap ⚙️ top-right, export JSON / CSV from "Bank Edit", edit, then re-import to overwrite.
- **Rebuild the whole bank**: edit templates & word pools in `gen-bank.js` → `node gen-bank.js` → `node build.js`.

![Settings drawer](screenshots/settings.png)

![Custom ratio](screenshots/quota.png)

---

## 🗂 Project Structure

| File | Description |
| --- | --- |
| `app.html` | Main app; double-click to play |
| `index.html` | Lightweight starter |
| `app.src.html` | Source template; `build.js` injects the bank to produce `app.html` |
| `gen-bank.js` | Bank generator: templates + word pools batch-generate the bank (with de-dup) |
| `build.js` | Build script: injects the bank into `app.src.html` to produce `app.html` |
| `question-bank.json` | Bank data (646 questions, with top-level `stats`) |
| `用户手册.md` | Player-facing illustrated manual |
| `自定义题库指南-en.md` | English version of the custom-bank guide |

---

## 📄 License

For learning and non-commercial party entertainment only.
