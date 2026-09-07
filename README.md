# 🛒 MultiCart

### A full-stack multi-vendor e-commerce marketplace built with Next.js, TypeScript, MongoDB, Redux, Stripe, Cloudinary, NextAuth, and Tailwind CSS.

[🚀 Live Demo](https://multivendor-six.vercel.app/)

---

## ✨ Overview

MultiCart is a full-stack multi-vendor marketplace where customers can browse products, manage carts, place orders, make secure payments, track deliveries, and interact with multiple vendors through a single platform.

The platform includes separate workflows for:

- 👤 Customers
- 🏪 Vendors
- 🛡️ Administrators

Built with a modern Next.js architecture and designed with responsive UI, animated interactions, secure authentication, payment integration, and role-based workflows.

---

## 🚀 Features

### 👤 Customer
- User registration and authentication
- Browse and search products
- Category-based product discovery
- Shopping cart management
- Product reviews
- Order placement
- Cash on Delivery
- Stripe online payments
- Order tracking
- Order cancellation
- Product return workflow
- Profile management

### 🏪 Vendor
- Vendor registration
- Vendor approval workflow
- Product creation
- Product management
- Product activation/deactivation
- Order management
- Product verification workflow
- Vendor-specific product/order views

### 🛡️ Admin
- Admin dashboard
- Vendor approval
- Product approval/rejection
- Order monitoring
- Vendor statistics
- Product statistics
- Platform earnings overview
- Role management

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | Database modeling |
| Redux | Global state management |
| NextAuth | Authentication |
| Stripe | Online payments |
| Cloudinary | Image management |
| Tailwind CSS | Styling |
| Framer Motion | UI animations |
| Axios | API communication |

---

---

## 🔐 Security

- Protected authentication and authorization flows
- Role-based access control
- Server-side handling of sensitive credentials
- Stripe webhook signature verification
- Environment variables for secrets and API credentials
- Sensitive keys kept out of source control

---

## 📁 Project Structure


src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   ├── auth/
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

-----


## 🧩 Engineering Challenges

### Multi-Role Architecture
Designed separate workflows for customers, vendors, and administrators while maintaining a shared marketplace.

### Payment Processing
Integrated Stripe online payments and server-side webhook verification to handle payment events securely.

### Product Approval Workflow
Implemented an admin verification process where vendor products must be reviewed before becoming publicly available.

### Order Lifecycle
Built order cancellation, delivery tracking, payment status, and product return workflows.

### Image Management
Integrated Cloudinary for storing and managing product and profile images.

### Production Readiness
Validated the application with production builds and resolved TypeScript issues before deployment.
