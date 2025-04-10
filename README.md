# E-Zone 🛒

E-Zone is a modern e-commerce web application for buying electronic products including laptops, tablets, and mobile accessories. This project is built with **Next.js**, **Tailwind CSS**, **MongoDB**, and **NextAuth**. It features full authentication, admin functionality, cart management, and dynamic product search.

---

## 🔧 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: API Routes with RESTful design
- **Database**: MongoDB (via Prisma ORM)
- **Authentication**: NextAuth.js with JWT
- **Styling**: Tailwind CSS
- **External Data**: DummyJSON API for product details

---

## ✨ Features

### 👤 User Features

- Sign Up / Log In with form validation
- Browse categorized products (laptops, tablets, mobile accessories)
- Search bar with live search from DummyJSON
- Add to cart, remove items, and clear cart
- Cart persisted per user using MongoDB
- Checkout flow with order creation
- Order history page

### 🔐 Admin Features

- Role-based access control (admin/user)
- Admin dashboard with:
  - List of registered users
  - List of all orders
- Admins are redirected to `/admin` on login

---
