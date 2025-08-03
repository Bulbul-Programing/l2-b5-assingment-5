# 📦 Parcel Delivery API 
          

A full-featured backend API for parcel delivery management with role-based access control, real-time tracking, and discount coupons.

## 🌟 Features

### Core Functionality
- **JWT Authentication** with bcrypt password hashing
- **Role-based Authorization** (Admin, Sender, Receiver)
- **Parcel Lifecycle Management**:
  - Create, update, cancel parcels
  - Status history tracking
  - Automatic tracking ID generation

### Advanced Features
- **Coupon System**: Percentage/fixed discounts
- **Transactional Logic**: Atomic operations

## 🛠 Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| **Runtime**    | Node.js                      |
| **Framework**  | Expressx                      |
| **Language**   | TypeScript|
| **Database**   | MongoDB 
| **Auth**       | JWT, bcryptjs                       |
| **Testing**    | Jest        

## 🚀 Quick Start

### Prerequisites
- Node.js
- MongoDB
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/Bulbul-Programing/l2-b5-assingment-5

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Development mode (with hot reload)
npm run dev

# Production build
npm run build && npm start
```

### Base URL
http://localhost:5000/api/v1