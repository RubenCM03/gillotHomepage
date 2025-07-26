# Website Deployment & Maintenance Guide

This guide is intended for the owner of the website to understand how to deploy it to a server and make small edits when needed.

---

## 🚀 How to Deploy the Website

1. **Build the project:**
   In the project root directory, run the following command to generate the static site:

   ```bash
   npm run build
   ```

2. **Upload to Server:**
   - After building, a folder called `dist` will be created.
   - Upload the contents of the `dist` folder (not the folder itself) to your server's `htdocs` or equivalent public directory.

---

## About the Project – Built with Astro

This website was developed using [Astro](https://docs.astro.build/), a modern static site generator.

### Key Commands

- `npm run dev` → Starts a local development server, use this command to see the changes in real time while coding or editing.
- `npm run build` → Builds the site for production into the `dist` folder. Use this when you are ready to upload the page.
- `npm run preview` → Previews the production build locally.

Astro allows using JavaScript frameworks, components, and partial hydration. For static pages like this site, the final output is optimized HTML/CSS/JS.

---

## 🌐 Multilingual Support (de / en / fr)

The website supports three languages: **German (de), English (en), French (fr)**.

- Translations are stored in the `/src/i18n/` folder as `.json` files.
  ```
  └── src/
      └── i18n/
          ├── de.json
          ├── en.json
          └── fr.json
  ```
- To edit a text, open the file for the correct language and section. Example:
  ```json
  {
    "index": {
      "TITLE": "We use cookies...",
      "TEXT_1": "...",
      "BUTTON_1": "Accept"
    }
  }
  ```
If you edit some text, remember to translate it to the other languages in their files.

---

## Layout & Components

The layout is a template used by all pages, to ensure consistency and save repeated code. It contains information such as the head of each page (SEO), elements used throughout the website (navbar, footer, etc.)...

- All pages use a central layout from `/src/layouts/Layout.astro`.
- Navigation, Footer, and Language Switcher are in `/src/components/`, with other important components.
- Each section is componentized for clarity and reuse.

---

### 🌍 Language navigation
- The system detects the language from the URL (`/de`, `/en`, `/fr`) and displays the corresponding texts.
- Each page uses the component of its own name (/components/app/...) in a general way, so they all have the same content. In case you want to edit the page, edit the content of the component, in addition to the language .json files named above.

---

## 🧠 Editing Tips

| Task                     | Where to Edit                               |
|--------------------------|---------------------------------------------|
| Change homepage text     | `src/pages/[lang]/index.astro`              |
| Add a new service        | `src/components/Dienstleistungen-nav.astro` |
| Add a new page           | `src/components/Navbar.astro`               |
| Update translations      | `src/i18n/de.json`, `en.json`, `fr.json`    |
| Edit contact info        | `src/components/Footer.astro`               |
| Modify cookie texts      | `CookieBanner.tsx`                          |

---

## 📚 Learn More

For more advanced customization or learning, visit the official Astro documentation:  
[https://docs.astro.build](https://docs.astro.build)

---

## Final notes

- The project **doesn't need a backend or a database**, it's all optimized static HTML.
- The site is designed to load quickly, with good SEO practices and accessibility.
- If you want to add analytics, integration with forms or new sections, you can easily add components.

---

If you have questions, you can contact the developer who created this site (rubencordero003@gmail.com) or consult Astro's documentation.
