# PHIL.us design rules (for Markup's design review)

> **Who owns it:** marketing and design. Changes to this file should be
> approved by them (list it in `CODEOWNERS`).
>
> **What it is for:** when someone clicks **Review with AI** in the Markup
> extension, the review checks each requested change against the rules below
> and leaves short design notes on the note's card. The notes are advice: they
> never stop a ticket being filed, each one can be ignored, and none of them is
> sent to Jira.
>
> **What it does not cover, on purpose:** what a page says, how long its
> headings are, who it is written for, and how names are spelled. Those are
> wording, and marketing knows them best, so the review leaves them alone.
>
> **Changes take effect within minutes** of being merged — no Markup release.
> The file is public (it is read from a public GitHub address), so put nothing
> private in it.

The review looks at the change and the section of the page it sits in: a
picture before and after the change, and the buttons and links in that
section. For a change Markup cannot show on the page — a new size, colour or
layout — it works from the current picture and the request, and its notes say
so. It only comments on what the change itself makes worse; things that were
already on the page are not the note's doing.

Each rule has an id in backticks. The review uses the id to say which rule a
note is about, so a rule can be reworded here without breaking anything.

---

## 1. One main action per section — `one-main-action`

Each section of a page asks the visitor to do one main thing. On phil.us that
is almost always **Book Demo**, shown as a filled button. Other ways forward
are lighter: a text link with an arrow ("Brand Experience →", "Read report →").

**Flag when the change:**
- adds a second filled button next to an existing one, so two strong buttons
  compete for the same attention;
- turns a light text link into a filled button in a section that already has
  one.

**Don't flag:**
- the header bar's two buttons ("Book Demo" and "Patient Login") — they serve
  two different visitors and have always sat together;
- a card strip where every card has its own text link — that is one link per
  card, not competing buttons;
- swapping a section's main button for a different one — there is still only
  one.

**Example note:** "This adds a second filled button beside 'Book Demo'. Make
one of them a text link so visitors know which to click."

---

## 2. The most important thing looks the most important — `keep-hierarchy`

In each section the heading and the main button are the strongest things on
screen. Supporting text, stats, labels and secondary links stay quieter.

**Flag when the change:**
- makes supporting text, a label or a stat bigger, bolder or brighter than the
  section's heading;
- makes a secondary link or button louder than the main button;
- makes everything in a section bigger at once, so nothing stands out.

**Don't flag:** stat banners (a big number with a small label under it) —
there the number is meant to be the strongest thing.

**Example note:** "The new label would be larger than the heading above it,
so the section loses its focus."

---

## 3. Every section keeps a way forward — `keep-a-way-forward`

A visitor who reaches the end of a section can always do something next:
book a demo, read more, open the next page.

**Flag when the change:**
- removes the only button or link in a section;
- hides it, or moves it out of the section it belongs to.

**Don't flag:** removing one of several links when another way forward stays.

**Example note:** "This removes the section's only 'Book Demo'. Keep a way
forward, or say where the visitor should go next."

---

## 4. One name per action — `one-name-per-action`

The same action has the same words everywhere, so visitors recognise the
button they are looking for.

| Action | Its name on phil.us |
|---|---|
| Ask for a demo (goes to `/demo/`) | **Book Demo** |
| Patients sign in | **Patient Login** |
| Open a research report | **Read report →** |
| Reach the team | **Contact Us** |

"Book A Demo" and "Request a Demo" also appear on a few older pages. Don't add
new ones; when a page is touched anyway, prefer **Book Demo**.

**Flag when the change:** names one of these actions differently on a button
or link, or gives a new button a name that means the same as an existing one.

**Don't flag:** the same words used in running text ("request a demo of the
platform") — the rule is about buttons and links.

**Example note:** "'Request a Demo' does the same as 'Book Demo', which is used
everywhere else."

---

## 5. Match the look of what's around it — `match-the-look`

Things of the same kind look the same: cards in a strip, buttons of one type,
stats in a banner, labels like "NEW" or "FOR PHARMA". The site's teal and
white palette carries across every page except the Addyi microsite
(`/addyi/`), which has its own look on purpose.

**Flag when the change:**
- gives one card, button or stat a colour, size, font or shape its neighbours
  don't have;
- brings in a colour from outside the site's palette;
- styles one item in a list differently from the rest.

**Don't flag:**
- the "NEW" badge — it is meant to stand out;
- anything on `/addyi/`, judged against the rest of the site.

**Example note:** "This card would be the only one with a red title; the
others in the strip are teal."

---

## Not covered yet

- **Readable on a phone** (short buttons, no long all-caps lines, enough
  contrast). Left out for now: the review sees the desktop page.
