# MediHive 🏥

> **Healthcare that feels human.** An integrated digital health platform connecting patients with doctors, hospitals, specialties, and comprehensive health packages across India.

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Key Features

- **Doctor Directory & Filtering**: Find specialists by specialty, hospital, city, experience, and consultation type (in-clinic / video).
- **Hospital Directory & Interactive Maps**: Explore partnered hospitals with interactive Leaflet maps and facility details.
- **Appointment Booking Flow**: Streamlined booking funnel with date/slot selection and instant confirmation.
- **Health Packages**: Curated preventive and diagnostic health checkup packages.
- **Interactive AI Health Assistant**: Intelligent medical guidance chatbot for triaging symptoms and navigating services.
- **Responsive & Accessible**: WCAG 2.2 AA compliant typography, high-contrast tokens, keyboard navigation, and reduced-motion support.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8, Oxlint
- **Styling**: Tailwind CSS + Custom Design Tokens
- **Routing**: React Router DOM v7
- **Maps**: Leaflet + React-Leaflet
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Roony0708/MediHive_website.git
cd MediHive_website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The compiled static assets will be output in the `dist/` directory.

---

## 🌐 Deployment

MediHive is pre-configured for instant zero-configuration deployment to **Vercel** and **Render**.

### Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the `MediHive_website` project.
3. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included `vercel.json` handles Single Page Application (SPA) route rewrites automatically.

### Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Static Site**.
2. Connect your `MediHive_website` GitHub repository.
3. Configure the build settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. The included `public/_redirects` ensures all client-side routes (e.g. `/doctors`, `/booking`) redirect to `index.html` without 404 errors.

---

## 📁 Project Structure

```text
├── public/                 # Static public assets (icons, maps, photos, robots.txt, _redirects)
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Reusable UI & layout components (ChatBot, Maps, Forms)
│   ├── context/            # Global context (Theme, state)
│   ├── layouts/            # Header, Footer, MegaMenu, MobileDrawer
│   ├── pages/              # Application routes (Home, Doctors, Hospitals, Booking, etc.)
│   ├── router/             # React Router route definitions
│   ├── styles/             # Global CSS, Tailwind base & design tokens
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Data fixtures, constants & helper functions
├── vercel.json             # Vercel SPA rewrite configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

Private project. All rights reserved.
