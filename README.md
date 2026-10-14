# Aarav Pawan Chhoja: portfolio site

Live at **https://aarav2006648.github.io/** once published.

## Put it online (GitHub Pages, free)

1. Sign in to GitHub as **Aarav2006648**.
2. Create a new **public** repository named exactly `Aarav2006648.github.io`.
   That exact name gives you the clean address `aarav2006648.github.io` with no extra folder in the URL.
3. Click **Add file → Upload files** and drag in *everything inside this folder*: `index.html`, `404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `.nojekyll`, and the `assets` and `demos` folders. Click **Commit changes**.
   (Windows hides `.nojekyll`. If you can't see it, skip it. The site still works.)
4. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. Wait 1–2 minutes and open https://aarav2006648.github.io/

To update later, upload the changed files again in the same repo.

## Get found on Google (no domain needed)

A `github.io` address can be indexed by Google like any other site.

1. Go to **Google Search Console**: https://search.google.com/search-console
2. Choose **URL prefix** and enter `https://aarav2006648.github.io/`
3. Pick the **HTML tag** method. Copy the `content="…"` code it gives you.
4. In `index.html`, find the line
   `<!-- <meta name="google-site-verification" content="YOUR-CODE"> -->`
   and replace it with the tag from Google, without the `<!--` and `-->`. Upload `index.html` again and click **Verify**.
5. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
6. Open **URL inspection**, paste your home page address and click **Request indexing**.

Indexing usually takes a few days to a couple of weeks. Searches for your full name, "Aarav Pawan Chhoja", tend to work first because the name is unique.

What's already built in for SEO:
- Your full name in the page title, headings, description and footer
- Person structured data (schema.org), so Google knows the page is about you, what you do and where
- Social preview image and text for WhatsApp, LinkedIn and Instagram links (`assets/og-cover.png`)
- `robots.txt`, `sitemap.xml`, a canonical URL, fast WebP images and a mobile-first layout

Things that help most after that:
- Link to the site from your **GitHub profile**, **LinkedIn**, **Instagram bio** and **CV**. Links from profiles that already rank for your name are the strongest signal.
- Ask Dance Central to add "Website by Aarav Pawan Chhoja" in their footer, linking here.
- A custom domain (for example `aaravchhoja.com`, roughly USD 10–15 a year) is optional. You can connect it later in Settings → Pages without rebuilding anything.

## Adding screenshots or a new walkthrough

1. Save the image as `.webp` or `.png` in `assets/img/`.
2. Open `assets/site.js`. Each project in `WALKTHROUGHS` is a list of `["file-name", "caption"]` steps. Add a line, save and upload.

AceTrack has a sample-data table right now. Once you have screenshots, add an `acetrack` walkthrough in `site.js` and swap the table in `index.html` for a `<button class="shot" data-walk="acetrack">` like the other projects.

## What's in here

```
index.html              the portfolio
404.html                page-not-found page
demos/wifi-gateway/     live, clickable demo of the Secure Wi-Fi Gateway prototype
assets/style.css        design
assets/site.js          walkthrough viewer and step captions
assets/img/             project screenshots (from the HND reports)
assets/og-cover.png     link preview image
robots.txt, sitemap.xml search engine files
```
