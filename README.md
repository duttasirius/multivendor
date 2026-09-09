# 🛍️ MultiCart — AI-Powered Multi-Vendor E-Commerce Marketplace

<p align="center">
  <strong>A production-oriented full-stack marketplace where customers, vendors, and administrators operate through role-based workflows — enhanced with an AI shopping assistant, real product search, payments, order lifecycle management, and cloud media infrastructure.</strong>
</p>

<p align="center">
  <a href="https://multivendor-six.vercel.app/">🚀 Live Demo</a>
  ·
  <a href="https://github.com/duttasirius/multivendor">💻 Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-9aab2e?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NextAuth-5-black?style=for-the-badge" alt="NextAuth" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge" alt="Groq AI" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Razorpay-3395FF?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
</p>

---

## ⭐ Why This Project Stands Out

MultiCart is built to demonstrate **real product engineering**, not just CRUD screens. The codebase models a marketplace with different actors, permissions, business rules, external services, and complete commerce flows.

### 🔥 Key Highlights

| Capability | What it demonstrates |
|---|---|
| 🤖 **AI Shopping Assistant** | Natural-language product discovery backed by real MongoDB data and structured tool calling |
| 🏪 **Multi-Vendor Architecture** | Vendor onboarding, approval, product ownership, moderation, and vendor-specific operations |
| 👑 **Admin Governance** | Vendor approval, product verification, operational dashboards, and marketplace controls |
| 💳 **Payments** | Stripe online checkout plus Cash on Delivery support |
| 📦 **Order Lifecycle** | Pending → confirmed → shipped → delivered, with cancellation, return, and delivery verification flows |
| 🔐 **Authentication & RBAC** | NextAuth-powered authentication with customer, vendor, and admin roles |
| ☁️ **Cloud Media** | Cloudinary-backed product and profile image infrastructure |
| 🛒 **Commerce State** | Cart, checkout, addresses, order history, and client-side state management with Redux |
| 📊 **Marketplace Rules** | Active/approved/in-stock filtering so customer-facing AI search does not expose unavailable products |

---

## 🤖 AI Shopping Assistant — Featured Engineering Work

The AI assistant is one of the strongest parts of the project because it is **not a generic chatbot that invents catalog data**. It acts as an AI interface over the actual product database.

### 💬 What users can ask

```text
"Show me products under ₹1,000"
"Find black running shoes"
"I want something with free delivery"
"Show products available for cash on delivery"
"Find products in the electronics category"
```

### 🧠 How the AI search works

```text
Customer message
      │
      ▼
┌───────────────────────┐
│   AI intent parsing   │
│   Groq / GPT-OSS      │
└──────────┬────────────┘
           │ tool call
           ▼
┌───────────────────────┐
│ search_products tool  │
│ query / category      │
│ price / delivery     │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ MongoDB product query │
│ active + approved     │
│ + in-stock products   │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Structured results    │
│ real product records  │
└──────────┬────────────┘
           │
           ▼
      UI product cards
```

The chat route exposes a `search_products` function tool with structured parameters for product keywords, category, minimum/maximum price, Pay on Delivery, and free delivery. fileciteturn163file0

The product search layer then queries only products that are active, admin-approved, and in stock, applies the requested filters, limits the result set, and calculates average ratings from stored reviews. fileciteturn164file0

### ✅ Why this is stronger than a basic AI chatbot

- **Grounded in database data:** product recommendations come from actual MongoDB records.
- **Tool calling:** the model decides when to invoke structured product search rather than treating the whole catalog as free-form text.
- **Business-rule aware:** inactive, unapproved, and out-of-stock products are excluded from customer-facing AI search. fileciteturn164file0
- **Commerce-aware filtering:** price, category, free delivery, and Pay on Delivery can be represented as structured filters. fileciteturn163file0turn164file0
- **Vendor-aware results:** returned products include populated vendor information for the marketplace UI. fileciteturn164file0
- **Not just conversation:** the assistant returns product records that can be rendered as real storefront results.

> **Recruiter takeaway:** this demonstrates how to connect an LLM to a transactional application without letting the model become the source of truth for inventory or pricing.

---

## 🛒 Customer Experience

### Shopping

- Browse products and categories
- Product detail pages with multiple product images
- Product highlights, warranty, replacement, delivery, and payment information
- Search and discovery flows
- Cart management
- Address management
- Checkout and order placement
- Order history and status tracking
- Cancellation and return workflows
- Delivery OTP verification
- Product reviews and ratings
- Responsive marketplace UI

The product model explicitly supports four product image fields, stock, category, vendor ownership, approval state, delivery/payment policies, product detail points, and embedded reviews. fileciteturn165file0

---

## 🏪 Vendor / Seller Platform

MultiCart treats vendors as first-class marketplace participants rather than just another user flag.

### Vendor capabilities

- Vendor registration and onboarding
- Business/shop information
- Admin approval and verification state
- Vendor-owned product relationships
- Product creation and management
- Product active/inactive state
- Product verification workflow
- Vendor order operations
- Vendor-specific operational views

The user model distinguishes `user`, `vendor`, and `admin` roles and stores vendor-specific fields such as shop name, business address, GST number, approval state, verification status, and vendor product references. fileciteturn166file0

### Marketplace governance

A vendor product can carry an approval state of `pending`, `approved`, or `rejected`, allowing the platform to separate **seller submission** from **customer publication**. fileciteturn165file0

---

## 👑 Admin Operations

The admin layer is designed around platform governance rather than ordinary storefront functionality.

### Admin responsibilities represented in the application

- Vendor approval and verification
- Vendor status management
- Product moderation
- Product approval/rejection
- Marketplace oversight
- Order monitoring
- Platform-level operational statistics
- Seller/product performance visibility

This structure is especially useful for demonstrating understanding of **role boundaries and marketplace control planes**.

---

## 💳 Payments & Commerce Lifecycle

The project supports both **Stripe online payments** and **Cash on Delivery**.

Order records track:

- Buyer
- Vendor
- Line items
- Product quantities
- Product prices
- Product totals
- Delivery charges
- Service charges
- Final amount
- Payment method
- Paid/unpaid state
- Stripe session/payment details
- Order status
- Cancellation timestamp
- Return amount
- Delivery date
- Delivery OTP and expiry

The order model defines the supported lifecycle as `pending`, `confirmed`, `shipped`, `delivered`, `returned`, and `cancelled`. fileciteturn170file0

The repository also contains dedicated API areas for COD, online payments, Stripe, cancellation, returns, order status updates, all-orders access, and delivery OTP verification. fileciteturn169file0

---

## 🔐 Authentication, Authorization & Security

- NextAuth-based authentication/session handling
- Role-aware customer/vendor/admin workflows
- Protected server-side API routes
- Environment-variable based secrets
- Server-side payment handling
- Stripe webhook verification infrastructure
- Password hashing through `bcryptjs`
- Sensitive credentials excluded from source control

The user model supports explicit roles and vendor approval states, enabling role-based access control to be represented directly in the application data layer. fileciteturn166file0

---

## ☁️ Cloudinary Media Infrastructure

Cloudinary is used as the media layer for marketplace assets, avoiding dependence on local filesystem storage for uploaded product and profile images.

Product records store four image URLs (`image1` → `image4`), which supports richer product galleries and a consistent product-media structure. fileciteturn165file0

---

## 🧰 Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React application framework and App Router |
| **React 19** | Component-driven UI |
| **TypeScript 5** | Static typing and maintainable application code |
| **Tailwind CSS 4** | Utility-first responsive styling |
| **Redux Toolkit** | Global client-side state and commerce state |
| **React Redux** | React bindings for Redux |
| **Framer Motion / Motion** | UI animation and micro-interactions |
| **Lucide React / React Icons** | Interface icons |

### Backend & Data

| Technology | Purpose |
|---|---|
| **Next.js Route Handlers** | Server-side APIs and backend logic |
| **MongoDB** | Primary document database |
| **Mongoose** | Schema modeling, validation, and persistence |
| **Axios** | HTTP communication |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email workflows |

### AI & External Services

| Technology | Purpose |
|---|---|
| **Groq SDK** | AI inference and tool-calling chat flow |
| **GPT-OSS 20B** | LLM used by the shopping assistant route |
| **Google GenAI SDK** | AI/LLM integration capability in the project |
| **OpenAI SDK** | AI integration capability |
| **Stripe** | Online payment processing |
| **Razorpay SDK** | Payment gateway integration capability |
| **Cloudinary** | Product/profile media hosting and delivery |
| **NextAuth** | Authentication/session infrastructure |

The current `package.json` includes the core application, state, database, AI, payment, media, authentication, and UI dependencies listed above. fileciteturn161file0

---

## 🏗️ High-Level Architecture

```text
                            ┌─────────────────────────────┐
                            │        Next.js 16           │
                            │     Customer / Vendor /     │
                            │           Admin             │
                            └──────────────┬──────────────┘
                                           │
             ┌─────────────────────────────┼─────────────────────────────┐
             │                             │                             │
             ▼                             ▼                             ▼
      NextAuth / RBAC              App Router APIs                 Redux Toolkit
             │                             │                             │
             │              ┌──────────────┼──────────────┐              │
             │              │              │              │              │
             ▼              ▼              ▼              ▼              ▼
          MongoDB      Product/Search    Orders        Vendor/Admin    Cart State
                            │              │
                            │              ├──────────────┐
                            │              │              │
                            ▼              ▼              ▼              
                       AI Tool Call     Stripe          Cloudinary
                            │
                            ▼
                     Groq / GPT-OSS
```

---

## 🔄 Example AI Request Flow

A request such as:

> **“Find products under ₹2,000 with free delivery.”**

moves through the application as:

```text
Natural language
      ↓
LLM identifies shopping intent
      ↓
search_products tool call
      ↓
{ maxPrice: 2000, freeDelivery: true }
      ↓
MongoDB search
      ↓
Active + approved + in-stock filter
      ↓
Real product records
      ↓
Average ratings + vendor data
      ↓
Product cards in chat UI
```

The current chat implementation intentionally returns the database search results instead of asking the model to fabricate product details. fileciteturn163file0turn164file0

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── admin/          # Admin APIs and marketplace controls
│   │   ├── auth/           # Authentication routes
│   │   ├── chat/           # AI shopping assistant
│   │   ├── order/          # Checkout, payment and order lifecycle
│   │   ├── search/         # Search endpoints
│   │   ├── user/           # Customer APIs
│   │   └── vendor/         # Vendor APIs
│   │
│   ├── cart/               # Cart experience
│   ├── category/           # Category discovery
│   ├── checkout/           # Checkout flow
│   ├── login/              # Login
│   ├── orders/             # Customer orders
│   ├── profile/            # Profile management
│   ├── register/           # Account registration
│   ├── shop/               # Marketplace storefront
│   └── viewProduct/        # Product details
│
├── components/
│   ├── admin/              # Admin UI
│   ├── user/               # Customer UI
│   └── vendor/             # Vendor UI
│
├── hooks/                  # Reusable React hooks
├── lib/                    # Application services and AI utilities
├── model/                  # Mongoose models
└── redux/                  # Redux Toolkit state
```

The repository’s API structure includes dedicated customer, vendor, admin, authentication, chat, search, and order domains. fileciteturn168file0turn169file0

---

## 📊 Domain Model at a Glance

```text
User
 ├── role: user | vendor | admin
 ├── cart
 ├── orders
 ├── vendorProducts
 └── chats

Product
 ├── vendor
 ├── approval status
 ├── stock
 ├── price
 ├── 4 product images
 ├── delivery/payment policies
 ├── detail points
 └── reviews

Order
 ├── buyer
 ├── vendor
 ├── products[]
 ├── payment
 ├── status
 ├── cancellation
 ├── return
 └── delivery OTP
```

This domain separation gives the project a clear foundation for extending marketplace features without turning the storefront into a single-user shopping system. fileciteturn165file0turn166file0turn170file0

---

## 🚀 Local Development

### 1. Clone

```bash
git clone https://github.com/duttasirius/multivendor.git
cd multivendor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` and configure the credentials required by the application, such as database, authentication, AI, payment, email, and Cloudinary settings.

> Never commit real secrets or production credentials.

### 4. Start development

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
npm start
```

Available package scripts currently include `dev`, `build`, `start`, and `lint`. fileciteturn161file0

---

## ☁️ Deployment

The project is deployed on Vercel.

### Live application

**https://multivendor-six.vercel.app/**

### Development branch

The active development branch is:

```text
development
```

---

## 🧑‍💻 Recruiter Snapshot

### What this project says about the developer

**Frontend engineering**

Next.js, React, TypeScript, responsive UI, Tailwind CSS, Redux Toolkit, animations, reusable components.

**Backend engineering**

Next.js Route Handlers, MongoDB, Mongoose, authentication, authorization, domain-specific API design, business rules.

**AI engineering**

LLM integration, function/tool calling, structured parameters, database-grounded search, AI-to-application orchestration, hallucination reduction through database sourcing.

**E-commerce engineering**

Cart, checkout, addresses, payments, COD, order status, cancellation, returns, delivery OTP, product reviews, inventory-aware discovery.

**Marketplace engineering**

Customer/vendor/admin role separation, seller onboarding, approval workflows, product moderation, vendor ownership, platform operations.

**Integration engineering**

Stripe, Razorpay, Cloudinary, NextAuth, Groq, Google GenAI, OpenAI, Nodemailer.

### 💡 Strong interview topics from this project

- Why use tool calling for product search instead of asking an LLM to generate product JSON?
- How would you prevent an AI assistant from exposing unavailable inventory?
- How should vendor permissions differ from customer permissions?
- How would you design Stripe webhook verification and idempotency?
- How would you split an order containing products from multiple vendors?
- How would you scale MongoDB queries for large product catalogs?
- How would you evolve the AI search into embeddings or hybrid semantic search?

---

## 📌 Engineering Decisions Worth Discussing

### 1. AI is an interface, not the source of truth

The assistant interprets user intent, but product availability, pricing, inventory, and vendor data remain application/database concerns. fileciteturn163file0turn164file0

### 2. Marketplace governance happens before discovery

Products are filtered by active state, approval state, and stock availability before they are returned to the AI customer experience. fileciteturn164file0

### 3. Role data lives in the core domain model

Customer/vendor/admin roles and vendor approval states are represented at the user-model level rather than simulated purely in the UI. fileciteturn166file0

### 4. Commerce state is explicit

Orders keep payment method, payment state, status, delivery information, cancellation, return amount, and OTP data as first-class fields. fileciteturn170file0

---

## 🛣️ Potential Next Steps

The architecture is positioned for further marketplace and AI evolution, including:

- Semantic/vector product search
- Personalized recommendation systems
- Vendor analytics and sales dashboards
- Commission and payout workflows
- Multi-vendor order splitting and settlement
- Product moderation automation
- AI-assisted customer support
- Notification pipelines
- Caching and search indexing for larger catalogs
- Automated testing and CI/CD hardening

---

## 🔗 Project Links

### 🚀 Live Demo
**https://multivendor-six.vercel.app/**

### 💻 GitHub
**https://github.com/duttasirius/multivendor**

---

## 📄 License

This repository is maintained as a portfolio and educational full-stack marketplace project.
