# 💍 Vowmoment Platform (`vowmoment.id`)

> A modern, high-performance digital wedding invitation platform built for the Indonesian market. Empowering couples to create luxurious, interactive, and lightning-fast digital invitations in minutes.

![Vowmoment Banner](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Tech Stack

Built with cutting-edge web technologies to ensure maximum performance, SEO optimization, and seamless user experience:

* **Framework:** [Next.js](https://nextjs.org/) (React Framework with App Router & Server Components)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for modern, responsive styling
* **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety
* **Database & ORM:** PostgreSQL with Prisma / Drizzle
* **Deployment & Edge:** Vercel Edge Network / Cloudflare Pages

---

## ✨ Key Features

* **⚡ Lightning-Fast Performance:** Optimized with Next.js Partial Prerendering (PPR) for instant page loads.
* **🎯 Smart Guest Customization:** Dynamic URL parameter handling to generate personalized guest names automatically (`?to=Nama+Tamu`).
* **💌 Real-Time RSVP & Wishes:** Interactive digital guest book allowing guests to confirm attendance and leave heartfelt messages instantly.
* **💳 Integrated Cashless Gift:** Seamless integration with QRIS and digital banking for secure wedding gifting.
* **🎨 Aesthetic Theme Engine:** Mobile-native responsive themes ranging from Minimalist Modern to Luxury Royal Gold.

---

## 📁 Project Structure

```text
vowmoment-platform/
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── (auth)/           # Authentication routes (Login/Register)
│   ├── (dashboard)/      # User dashboard & invitation builder
│   ├── [slug]/           # Dynamic public invitation pages
│   └── api/              # Backend endpoints (RSVP, Wishes, etc.)
├── components/           # Reusable UI components (shadcn/ui & custom)
├── public/               # Static assets (images, icons, fonts)
├── styles/               # Global styles & Tailwind configurations
└── types/                # TypeScript interface definitions

```

---

## 🛠️ Getting Started Locally

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/vowmoment-platform.git](https://github.com/your-username/vowmoment-platform.git)
cd vowmoment-platform

```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install

```

### 3. Environment Variables

Create a `.env.local` file in the root directory and configure your environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vowmoment"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000?utm_source=gemini) in your browser to see the result.

---

## 🚢 Deployment

The easiest way to deploy your Vowmoment instance is to use the [Vercel Platform](https://vercel.com?utm_source=gemini):

1. Push your code to your GitHub repository.
2. Import the project into Vercel.
3. Configure your environment variables in the Vercel dashboard.
4. Click **Deploy**.

---

## 📄 License

Distributed under the MIT License. See LICENSE for more information.

Distributed under the [MIT License](https://www.google.com/search?q=LICENSE&utm_source=gemini). See `LICENSE` for more information.

---
