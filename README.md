# Live Fire Instruction

Official website repository for **Live Fire Instruction** – Northern Virginia's premier firearm training provider based in Fairfax, VA. Specializing in Virginia Concealed Carry Permit (CCW) courses, NRA Basics of Pistol Shooting, 1-on-1 instruction, and defensive firearm training.

[Live Website](https://livefireinstruction.com)

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Astro 5](https://astro.build/) (Server-Side Rendering enabled via Netlify Adapter)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **CMS**: [Keystatic CMS](https://keystatic.com/) integrated directly into Astro (`/keystatic`)
- **UI & Components**: [React 19](https://react.dev/), Radix UI Primitives, Lucide Icons, Astro Icon (`tabler`), Sonner Toast Notifications
- **Content Engine**: Astro Content Collections (`src/content.config.ts`) powering blogs, courses, partners, and landing pages
- **Backend & Email**: Supabase Client (`@supabase/supabase-js`), Nodemailer with EJS template engine, Netlify Edge Functions
- **SEO & Performance**: `astro-seo`, `astro-seo-schema`, `@astrojs/sitemap`, `@playform/compress`

---

## 📁 Directory Structure

```text
├── public/                    # Static public assets (images, favicons, robots.txt)
├── src/
│   ├── actions/               # Astro server actions
│   ├── assets/                # Optimized internal images and icons
│   ├── components/            # Reusable Astro & React components (Hero, Nav, Buttons, etc.)
│   ├── config/                # Site configuration (siteData, navData, siteSettings)
│   ├── data/                  # Markdown & MDX content collections
│   │   ├── authors/           # Author profiles
│   │   ├── blog/              # Blog articles & guides
│   │   ├── otherPages/        # Training courses, partner directories & landing pages
│   │   └── pages/             # Custom page contents
│   ├── js/                    # Utility scripts (blogUtils, textUtils)
│   ├── layouts/               # Page layouts (BaseLayout, MainLayout)
│   ├── lib/                   # Integrations and helpers (Supabase, mailers)
│   ├── middleware.ts          # Astro middleware handlers
│   ├── pages/                 # File-based routing (SSR & Static pages)
│   ├── styles/                # Global CSS styles
│   └── content.config.ts      # Schema definitions for Astro Content Collections
├── astro.config.mjs           # Astro configuration (integrations, redirects, SSR adapter)
├── keystatic.config.ts        # Keystatic CMS configuration & collection schemas
├── netlify.toml               # Netlify deployment configuration
├── package.json               # Node.js dependencies & scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- npm or pnpm package manager

### Local Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd livefireinstruction
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the project root with the necessary keys (Supabase API credentials, email configurations, etc.).

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser to view the site.

---

## 📝 Managing Content with Keystatic CMS

This site uses **Keystatic CMS** for headless content management directly in the repository:

- Access the local CMS dashboard by visiting `http://localhost:4321/keystatic` while running the dev server.
- Manage blog posts, firearm training courses, partner listings, author bios, and landing page content.
- Changes made in Keystatic automatically update markdown/MDX files in `src/data/`.

---

## ⚡ Available Commands

All scripts are executed from the project root:

| Command | Action |
| :--- | :--- |
| `npm run dev` / `npm start` | Starts local dev server at `http://localhost:4321` |
| `npm run build` | Builds the production bundle to `./dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint analysis across the project |
| `npm run format` | Runs ESLint `--fix` and formats files with Prettier |
| `npm run astro ...` | Runs Astro CLI commands directly |

---

## 🌐 Deployment

The application is deployed on **Netlify** using `@astrojs/netlify` edge functions:

- Production builds are triggered automatically upon pushing to the primary branch.
- Configured with server-side redirects for legacy URL compatibility (`astro.config.mjs`).

---

## 📄 License

Distributed under the [GPL-3.0 License](LICENSE).

