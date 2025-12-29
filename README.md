# BAM Web Platform

Production-grade **ReactJS website** for **BAM** — a professional talent & services collaboration platform for the Media & Entertainment ecosystem.

This repository contains the **frontend web application** for the BAM platform.

---

## 📌 Project Overview

BAM enables producers, creators, agencies, brands, and event companies to:

- Discover verified talent & service providers
- Showcase portfolios and projects
- Post requirements and manage collaborations

This web application serves as the **primary user interface** for the platform.

---

## 🧭 Scope (Website – Phase 1)

### Included

- Marketing & landing pages
- Authentication UI (Talent / Customer)
- Talent profiles & portfolios
- Project / requirement listing UI
- Dashboard interfaces
- Inbox & messaging UI
- Responsive design (desktop-first)

### Excluded

- Mobile applications
- Payments & monetisation
- AI-based features
- Backend services

---

## 🏗️ Tech Stack

- **ReactJS** (Vite)
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **ESLint & Prettier**

---

## 📁 Project Structure

```text
src/
│
├── assets/      # Static assets (images, icons)
├── components/  # Reusable UI components
├── pages/       # Route-level pages
├── sections/    # Landing & marketing sections
├── layouts/     # App & page layouts
├── routes/      # Route configuration
├── services/    # API service layer
├── hooks/       # Custom React hooks
├── utils/       # Helper utilities
├── constants/   # App-wide constants
├── styles/      # Global styles
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/<org-or-username>/bam-web.git
cd bam-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🧪 Code Quality & Standards

- ESLint for linting
- Prettier for formatting
- Component-driven architecture
- Feature-based separation
- Environment-based configuration

---

## 🌍 Deployment

This application is production-ready and can be deployed on:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GCP Firebase Hosting

---

## 🌱 Branching Strategy

- `main` → Production
- `dev` → Active development
- `feature/*` → Feature branches
- `hotfix/*` → Production fixes

---

## 🔒 Security Notes

- No secrets committed to the repository
- Environment variables managed per environment
- API access controlled via backend authentication

---

## 📄 License

This project is proprietary and confidential.  
Unauthorized copying, distribution, or use is prohibited.

---

## 👥 Maintained By

BAM Engineering Team
