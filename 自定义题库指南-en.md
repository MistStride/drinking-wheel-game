# Customize Your "LaiYiKou" Drinking Wheel Question Bank - Beginner's Guide

> Don't want to use the official 646 questions? No problem. **You can replace or expand the wheel's question bank with your own questions** - make a "Company Team-Building Edition", "Girls' Night Edition", "Couple Exclusive Edition", "Dorm Night Chat Edition" ... any style you want.
>
> No coding skills needed - below are three ways, **from easiest to most flexible**. Pick whichever suits you.

---

## 1. Three Ways to Play, Pick One

| Method | Difficulty | Who It's For |
|------|------|--------|
| **1 Add questions one by one in the UI** | ⭐ Zero skills | Just want to add a few questions without any hassle (most recommended) |
| **2 Paste a prompt to an AI to generate a full set** | ⭐⭐ Copy-paste | Want a whole brand-new bank and don't want to write questions yourself |
| **3 Add your own flavor to the official bank** | ⭐⭐ Copy-paste | Like the official questions, just want to add a few personal inside jokes |

> Either way, you'll end up with a `.json` file - just hit "Import JSON" in the app and you're done.

---

## 2. Method 1: Add Questions One by One in the UI (Most Recommended, No Coding)

No downloads needed - just type in the wheel to add questions:

1. Tap **⚙️ Settings** in the top-right, and open **"6 Question Bank Editor"**.
2. Find the pink-highlighted **"+ Add Question"** box.
3. Type your question in the "Question Text" field, e.g.: `What time did you stay up until last night?`
4. Pick a **category**: Truth / Dare / Drink / Deeptalk.
   - Choose **Dare**: then pick a contact level (Social Butterfly Solo / Polite Tease / Heated Interaction / Full-Room Scream).
   - Choose **Truth or Deeptalk**: then pick a topic (Hobbies, School, Love ...).
5. Tap **+ Add** - the question **enters the wheel immediately**, no refresh needed. Spin and you can draw it right away.
6. Want a question to sit out for now? Uncheck its "Use" box in the question list below.

> That's it. Great for adding a few personal inside jokes or last-minute additions. Want a whole big set? Check out the next method.

---

## 3. Method 2: Copy a Prompt to an AI and Generate a Full Bank

You don't need to figure out the format or write code. Just paste the text below into **any AI** (web version, WeChat AI assistant, WorkBuddy, etc.), fill in 【My Requirements】, and the AI will output a ready-to-import question bank file.

**Steps:**
1. Copy the "Requirements Template" below.
2. Edit the 【My Requirements】lines to fit your needs (theme, style, question count, contact level).
3. Send it to the AI and wait for it to return a `.json` file.
4. Save that content as `my-bank.json` (paste into Notepad and save as `.json`).
5. Jump to the "How to Use It" section below to import.

**Requirements Template (copy directly):**

````markdown
You are the question-bank generator assistant for the "LaiYiKou" drinking-wheel party game. Please generate a custom question bank for me in the format below.

【My Requirements】
- Theme/Scenario: ______________ (e.g., late-night dorm chat / new-hire icebreaker)
- Tone/Style: ______________ (e.g., hilarious and silly / heartfelt and healing)
- Question Count: Truth ___ , Dare ___ , Drink ___ , Deeptalk ___
- Contact Limit: ______________ (e.g., up to Heated Interaction, nothing restricted)
- Special Requests: ______________ (e.g., avoid alcohol mentions, add more game references)

【Format Requirements】
- The bank is a JSON with root structure: { "version": 3, "stats": {...}, "topics": {...}, "questions": [...] }
- questions is a flat array, one question per entry; cat must be one of truth / dare / drink / deeptalk
- truth and deeptalk questions MUST have a topic (use the topic ids below)
- dare questions MUST have contact(0-3) / stranger / target / scene
- drink questions MUST have who / amount / combo
- Every entry has: id(unique, no duplicates) / risk(safe|mild|spicy) / difficulty(1-3) / adultOnly(boolean) / enabled(boolean)

【Topic ids】
truth: hobby / childhood / school / family / friendship / love / ex / secret / money / work / body / intimacy / bodyexp / role / dream / social / weakness
deeptalk: life / fear / relation / self / regret / value / future

【Contact levels】
dare contact: 0 Social Butterfly Solo / 1 Polite Tease / 2 Heated Interaction / 3 Full-Room Scream (restricted)
risk: safe / mild / spicy (restricted, needs High-Energy Mode)

【Output】
Output ONLY one complete, valid JSON that can be parsed by JSON.parse - no explanation text. I will import it directly into the app.
````

> Not sure how to fill it in? Just tell the AI something like "I want a girls'-night edition, funny, about 100 questions" in plain words and let it complete the template for you.

---

## 4. Method 3: Add Your Own Flavor to the Official Bank

Like the official 646 questions and just want to add your own? Here's how:

1. In the app, tap **⚙️ Settings → 6 Question Bank Editor → Export JSON** to save the official bank.
2. Send the exported content to an AI with this message:

````markdown
Below is the official question-bank JSON I'm currently using. Please 【keep ALL existing questions unchanged】 and only append the custom questions I need,
then output the 【complete, valid】 new JSON (same structure, just more questions).

My additions: ___ new Truth questions (topic ___), ___ new Dare questions (contact ___), ___ new Drink questions (who ___), ___ new Deeptalk questions (topic ___).
New question ids must not duplicate existing ones; keep the field format consistent with the original; do not modify any existing questions.

【Official bank starts】
(paste the entire exported JSON here)
【Official bank ends】
````

3. Save the new JSON returned by the AI and jump to the next section to import.

---

## 5. How to Use It (Importing Back into the App)

1. Open the app and tap **⚙️ Settings** in the top-right.
2. In the drawer, find **6 Question Bank Editor / Import & Export**.
3. Tap **Import JSON** and choose your `.json` file.
4. After importing, the wheel **rebuilds automatically based on your current settings**.

⚠️ **Important**
- Importing **completely overwrites** the current bank. Before switching, tap **Export JSON** to back up the original.
- The app validates the format on import: missing fields, wrong categories, contact out of 0-3 range, etc. will raise errors - fix them per the prompts and re-import.
- JSON is a "lossless" backup (includes the topics table); edit the text and re-import. CSV is convenient for batch-editing text in Excel, but topics revert to ids.

You can also view this guide anytime in the UI by tapping the **Custom Bank Guide** button next to "6 Question Bank Editor".

---

## 6. FAQ

**Q: Will questions I add in the UI survive closing the page?**
A: In the current version, questions added live in this page session - refreshing/reopening the page reverts to the official bank. To keep them permanently, tap **Export JSON** after adding and re-import next time.

**Q: The wheel didn't change after importing?**
A: Check: 1 Is the question `enabled` set to `true`? 2 Is the `cat` spelled correctly (truth/dare/drink/deeptalk)? 3 Is the dare `contact` between 0-3? 4 Restricted questions only appear when "High-Energy Mode" is on.

**Q: I want a brand-new topic not in the official list (e.g., "Pets")?**
A: When adding a question in the UI, pick an option other than "All Topics" in the topic dropdown; for batch work, have the AI add an entry to `topics` and set the new question's `topic` to that id.

**Q: Why can't I see the restricted questions?**
A: Restricted questions (risk = spicy, or dare contact = 3 "Full-Room Scream") are off by default. You need to enable "High-Energy Mode" in settings AND the question must have `enabled:true` to enter the wheel.

**Q: What happens if I fill in the wrong stats numbers?**
A: Nothing. It's just display stats - the wheel is generated from the actual `questions` content, so approximate numbers are fine.

---

> Still have questions, or want a ready-made bank for a specific theme? Send your request to any AI (paste the template from section 3) and you'll get one. Enjoy the party! 🍻

---

---

# Appendix: For AI / Advanced Reference (Format Details)

> The technical details below are for AI when generating question banks. Regular users rarely need them - kept here for reference.

## A. What the Bank File Looks Like

```json
{
  "version": 3,
  "stats": { "total": 6, "byCat": {...}, "byRisk": {...}, "enabled": 6, "disabled": 0 },
  "topics": {
    "truth":    [ { "id": "hobby", "label": "Hobbies & Interests", "defaultOn": true } ],
    "deeptalk": [ { "id": "life",  "label": "Meaning of Life", "defaultOn": true } ]
  },
  "questions": [
    { "id": "truth-hobby-0001", "cat": "truth", "topic": "hobby", "text": "...", "risk": "safe", "difficulty": 1, "adultOnly": false, "enabled": true },
    { "id": "dare-c1-0001",     "cat": "dare",  "text": "...", "contact": 1, "stranger": false, "target": "partner", "scene": "any", "risk": "safe", "difficulty": 1, "adultOnly": false, "enabled": true },
    { "id": "drink-basic-0001", "cat": "drink", "text": "...", "who": "self", "amount": "sip", "combo": "", "risk": "safe", "difficulty": 1, "adultOnly": false, "enabled": true },
    { "id": "deeptalk-life-0001","cat": "deeptalk","topic": "life", "text": "...", "risk": "safe", "difficulty": 1, "adultOnly": false, "enabled": true }
  ]
}
```

- `questions` is a flat array - all questions live here flat, no nested categories.
- The four categories are distinguished by `cat`: `truth` / `dare` / `drink` / `deeptalk`.
- `topics` only manages topic ranges for truth and deeptalk (used by the top-right filter); dare and drink use "structured fields" for classification and don't live in the topics table.
- `stats` is display-only; the app generates the wheel from the actual `questions` content, so approximate numbers are fine.

> Want a minimal runnable template to practice on? The repo has **[my-bank-template.json](我的题库模板.json)** - download it, edit the text, and you're good, or paste it whole to an AI as a format reference.

## B. Field Dictionary

**Common fields for ALL questions**

| Field | Required | Values | Description |
|------|------|------|------|
| `id` | Yes | String, unique | The question's ID. Suggested `category-topic-number`. **No duplicates** |
| `cat` | Yes | `truth`/`dare`/`drink`/`deeptalk` | One of the four categories |
| `text` | Yes | String | The question text - the line everyone sees when the wheel stops |
| `risk` | No | `safe`/`mild`/`spicy` | Risk level, default `safe`. `spicy` requires "High-Energy Mode" |
| `difficulty` | No | `1`/`2`/`3` | Difficulty, default `1` |
| `adultOnly` | No | `true`/`false` | Adult content flag, default `false` |
| `enabled` | No | `true`/`false` | Whether it enters the wheel, default `true` |

**Extra fields for Truth `truth` / Deeptalk `deeptalk`**

| Field | Required | Values | Description |
|------|------|------|------|
| `topic` | Yes | Topic id (see table C) | Determines which topic range it belongs to |

**Extra fields for Dare `dare`**

| Field | Required | Values | Description |
|------|------|------|------|
| `contact` | Yes | `0`/`1`/`2`/`3` | Physical-contact level: 0 Social Butterfly Solo / 1 Polite Tease / 2 Heated Interaction / 3 Full-Room Scream (restricted) |
| `stranger` | Yes | `true`/`false` | Whether it involves strangers - grouped under "Stranger Interaction" on the wheel |
| `target` | Yes | `self`/`partner`/`group`/`stranger`/`choose` | Who performs it |
| `scene` | No | `any`/`phone`/`public` | Scene: anywhere / phone / in public |

**Extra fields for Drink `drink`**

| Field | Required | Values | Description |
|------|------|------|------|
| `who` | Yes | `self`/`left`/`right`/`all`/`choose` | Who drinks |
| `amount` | Yes | `sip`/`glass`/`chug`/`bottle` | How much: a sip / a glass / chug it / a whole bottle |
| `combo` | No | String | Extra requirement, e.g., "answer a Truth question after drinking"; leave `""` if none |

## C. Topic ID Quick Reference (copy directly when filling `topic`)

**Available topics for Truth `truth`**

| id | label | Default On | Notes |
|----|-------|--------|------|
| `hobby` | Hobbies & Interests | Yes | |
| `childhood` | Childhood Memories | Yes | |
| `school` | School Days | Yes | |
| `family` | Family Bonds | Yes | |
| `friendship` | Friendship Boundaries | Yes | |
| `love` | Views on Love | Yes | |
| `ex` | Ex Relationships | No | Restricted, needs High-Energy Mode |
| `secret` | Embarrassing Secrets | Yes | |
| `money` | Money & Spending | Yes | |
| `work` | Work & Study | Yes | |
| `body` | Looks & Body | Yes | |
| `intimacy` | Crushes & Flirting | No | Restricted, needs High-Energy Mode |
| `bodyexp` | Body Exploration | No | Restricted, needs High-Energy Mode |
| `role` | Drama & Roleplay | Yes | |
| `dream` | Dreams & Ideals | Yes | |
| `social` | Social Savvy | Yes | |
| `weakness` | Fears & Weaknesses | Yes | |

**Available topics for Deeptalk `deeptalk`**: `life` Meaning of Life / `fear` Inner Fears / `relation` Relationships / `self` Self-Understanding / `regret` Regrets / `value` Values / `future` Hopes for the Future

> Dare and Drink have **no topic table** - they're auto-classified by structured fields like `contact` / `stranger` / `target` / `who` / `amount`, so you don't fill in `topic`.
