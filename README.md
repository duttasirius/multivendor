# 🛍️ MultiCart — Multi-Vendor E-Commerce Marketplace

<p align="center">
  <strong>A production-oriented, full-stack marketplace built with Next.js, TypeScript, MongoDB, Redux, Stripe, Cloudinary, NextAuth, and Tailwind CSS.</strong>
</p>

<p align="center">
  <a href="https://multivendor-six.vercel.app/">🚀 Live Demo</a>
  ·
  <a href="https://github.com/duttasirius/multivendor">💻 Source Code</a>
</p>

---

## 📸 Product Showcase

### 🛒 Customer Marketplace

![MultiCart Customer Marketplace](https://multivendor-six.vercel.app/)

### 🏪 Multi-Vendor Platform

![MultiCart Multi-Vendor Experience](https://multivendor-six.vercel.app/)

> **Note:** GitHub Markdown cannot turn a normal website URL into an image preview. For best README presentation, replace the image URLs above with screenshots committed to `public/` (for example `public/readme/customer.png` and `public/readme/vendor.png`).

---

## 🎯 Why This Project Stands Out

MultiCart is more than a storefront. It models the core complexity of a real marketplace where **customers, vendors, and administrators operate inside one platform** with different permissions, workflows, and business responsibilities.

The project demonstrates practical full-stack engineering across:

- **Role-based architecture** for customers, vendors, and admins
- **Marketplace workflows** for vendor onboarding and product approval
- **Real payment flows** with Stripe and Cash on Delivery
- **Order lifecycle management** including cancellation, tracking, and returns
- **Authentication and authorization** with NextAuth and protected server routes
- **Cloud image management** through Cloudinary
- **AI-powered customer interaction** through an integrated chat experience
- **Server-side API routes** implemented directly with the Next.js App Router

---

## ✨ Core Features

### 👤 Customer Experience

- User registration and authentication
- Product search and category discovery
- Product details and reviews
- Cart management
- Checkout and order placement
- Stripe online payments
- Cash on Delivery
- Order tracking
- Order cancellation
- Return workflow
- Profile management
- AI shopping/chat assistance

### 🏪 Vendor Experience

- Vendor registration and onboarding
- Admin-controlled vendor approval
- Product creation and editing
- Product activation/deactivation
- Vendor-specific product management
- Vendor order management
- Product verification workflow
- Vendor-focused dashboard workflows

### 🛡️ Admin Experience

- Admin authentication
- Vendor approval and status management
- Product approval/rejection
- Order monitoring
- Vendor statistics
- Product statistics
- Platform earnings overview
- Role-based administrative controls

---

## 🧠 Engineering Highlights

### Multi-Role Marketplace Architecture

Designed distinct customer, vendor, and administrator workflows while keeping the marketplace inside a unified Next.js application.

### Secure Payment Lifecycle

Integrated Stripe online payments alongside Cash on Delivery, with server-side handling for payment events and webhook verification.

### Product Governance

Vendor-created products can move through an administrative approval process before being surfaced to customers, reflecting a realistic marketplace moderation workflow.

### Order State Management

Implemented order placement, payment status, cancellation, tracking, and return-related flows to model a complete commerce lifecycle.

### API-Driven Full-Stack Architecture

Built server-side API routes for authentication, users, vendors, products, orders, admin operations, and chat directly inside the Next.js App Router.

### Media Infrastructure

Used Cloudinary for product/profile image storage and delivery rather than relying on local filesystem storage.

---

## 🧰 Tech Stack

| Technology | Role in the Project |
|---|---|
| **Next.js** | Full-stack React framework and App Router |
| **TypeScript** | Type-safe application development |
| **MongoDB** | Persistent application data |
| **Mongoose** | MongoDB data modeling |
| **Redux** | Global client-side state management |
| **NextAuth** | Authentication and session management |
| **Stripe** | Online payment processing |
| **Cloudinary** | Product and profile media management |
| **Tailwind CSS** | Responsive UI styling |
| **Framer Motion** | UI animation and interaction |
| **Axios** | HTTP/API communication |

---

## 🏗️ Application Architecture

```text
                         ┌─────────────────────┐
                         │     Next.js App     │
                         │  Customer / Vendor  │
                         │       / Admin       │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
            NextAuth          App Router APIs      Redux
          Authentication       & Server Logic     State Layer
                  │                 │
                  │        ┌────────┼───────────┐
                  │        ▼        ▼           ▼
                  │     MongoDB   Stripe    Cloudinary
                  │        │        │           │
                  └────────┴────────┴───────────┘
```

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── order/
│   │   ├── user/
│   │   └── vendor/
│   │
│   ├── cart/
│   ├── category/
│   ├── checkout/
│   ├── login/
│   ├── orders/
│   ├── profile/
│   ├── register/
│   ├── shop/
│   └── viewProduct/
│
├── components/
│   ├── admin/
│   ├── user/
│   └── vendor/
│
├── hooks/
├── model/
└── redux/
```

---

## 🔐 Security & Reliability

- Protected authentication and authorization flows
- Role-based access control
- Sensitive credentials handled through environment variables
- Server-side payment processing
- Stripe webhook signature verification
- Sensitive keys excluded from source control
- Production-oriented TypeScript and build validation

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/duttasirius/multivendor.git
cd multivendor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env.local` file with the credentials required by the application.

> Never commit real secrets or production credentials to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
npm start
```

---

## ☁️ Deployment

The application is deployed with Vercel:

**Live:** https://multivendor-six.vercel.app/

The `development` branch is used for the current development workflow.

---

## 📌 Recruiter Snapshot

This project demonstrates hands-on experience with:

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Redux, responsive UI, animations

**Backend:** Next.js server routes, MongoDB, Mongoose, authentication, role-based authorization

**Commerce:** cart, checkout, Stripe payments, COD, orders, tracking, cancellations, returns

**Marketplace:** vendor onboarding, product moderation, admin workflows, platform analytics

**Integrations:** Stripe, Cloudinary, NextAuth, Axios, AI chat

**Engineering:** full-stack architecture, API design, state management, security, production deployment

---

## 🚀 Live Project

**MultiCart:** https://multivendor-six.vercel.app/

Built as a portfolio-grade full-stack marketplace to demonstrate real-world product engineering patterns rather than a simple CRUD storefront.

---

## 📄 License

This project is for educational and portfolio purposes.
