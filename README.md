# Breazy

Breazy is a no‑login, single‑page web app that guides users through breathwork exercises using a dynamic **climbing visual**. A simple ball travels up, across, and down a path to represent **Inhale → Hold → Exhale**, synchronized to customizable durations.

## 🚀 Features

* **Climbing Visual Guide**: Ball animation along incline, plateau, and decline segments.
* **Custom Durations**: Adjustable sliders for inhale, hold, and exhale times with a "Reset Defaults" option.
* **Session Controls**: Start, Pause, Reset buttons and a cycle counter.
* **Day/Night Themes**: Toggle between light and dark modes.
* **Accessible & Responsive**: WCAG‑compliant ARIA labels, reduced‑motion support, and fluid layouts from mobile to desktop.
* **PWA‑Ready**: Offline caching for uninterrupted sessions.

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router, TypeScript)
* **Styling**: Tailwind CSS with semantic tokens
* **Animations**: Framer Motion for smooth phase transitions
* **State Management**: Custom React Context & hooks
* **Deployment**: Vercel or Netlify (PWA support)

## 💻 Installation & Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your‑username>/breazy.git
   cd breazy
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn
   ```

3. **Environment Variables**

   * Copy `.env.example` to `.env.local` (if present)
   * Define any required `NEXT_PUBLIC_*` variables.

4. **Run locally**

   ```bash
   npm run dev
   # Visit: http://localhost:3000
   ```

5. **Build & Preview**

   ```bash
   npm run build
   npm run start
   ```



---

*Made with ❤️ by Amlan.*
