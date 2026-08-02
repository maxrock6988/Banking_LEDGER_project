# 🏦 Banking Backend API

A secure and scalable RESTful Banking API built with **Node.js**, **Express.js**, and **MongoDB**. This project implements authentication, account management, fund transfers using MongoDB transactions, and secure logout with JWT token blacklisting.

> Designed with security, reliability, and clean architecture in mind.

---

## 📖 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Database Models](#-database-models)
- [Security Features](#-security-features)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# ✨ Features

- User Registration
- User Login
- JWT Authentication
- HTTP-Only Cookie Authentication
- Secure Logout using Token Blacklisting
- Bank Account Management
- Fund Transfer
- Transaction History
- MongoDB ACID Transactions
- Password Hashing (bcrypt)
- Environment Variable Support
- RESTful API Design

---

# 🏗 Architecture

```
            Client
               │
               ▼
        Express Routes
               │
               ▼
         Controllers
               │
               ▼
        Business Logic
               │
               ▼
       MongoDB (Mongoose)
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Handling |
| dotenv | Environment Variables |

---

# 📁 Project Structure

```
BANKING_BACKEND
│
├── src
│   ├── controller
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware
│   │   └── auth.middleware.js
│   │
│   ├── models
│   │   ├── user.model.js
│   │   ├── account.model.js
│   │   ├── ledger.model.js
│   │   ├── transaction.model.js
│   │   └── Blacklist.model.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── services
│   │   └── email.services.js
│   │
│   ├── app.js
│   └── db.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/banking-backend.git
```

```bash
cd banking-backend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## Start Development Server

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔑 Authentication Flow

```
Register
    │
    ▼
Password Hashing
    │
    ▼
Store User
    │
    ▼
Login
    │
    ▼
JWT Generated
    │
    ▼
Cookie Sent
    │
    ▼
Protected Routes
    │
    ▼
Logout
    │
    ▼
Token Added to Blacklist
```

---

# 💳 Money Transfer Flow

```
User Authentication
        │
        ▼
Validate Request
        │
        ▼
Check Balance
        │
        ▼
Start MongoDB Transaction
        │
        ▼
Debit Sender
        │
        ▼
Credit Receiver
        │
        ▼
Create Transaction Record
        │
        ▼
Commit Transaction
```

If any operation fails, the transaction is automatically rolled back to maintain database consistency.

---

# 📦 Database Models

### User

- Name
- Email
- Password
- Created At

### Account

- Account Number
- Owner
- Balance

### Transaction

- Sender
- Receiver
- Amount
- Status
- Timestamp

### Ledger

Stores ledger entries for every successful transaction.

### Blacklist

Stores invalidated JWT tokens after logout.

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |
| POST | `/auth/logout` | Logout User |

---

## Account

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/account/create` | Create Account |
| GET | `/account/:id` | Get Account Details |

---

## Transaction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transaction/transfer` | Transfer Funds |
| GET | `/transaction/history` | Transaction History |

---

# 📄 Example Request

```http
POST /transaction/transfer
```

```json
{
    "toAccount":"68901234abcd5678ef901234",
    "amount":1000
}
```

---

# 📄 Example Response

```json
{
    "message":"Funds transferred successfully"
}
```

---

# 🔒 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing (bcrypt)
- Protected Routes
- Token Blacklisting
- MongoDB Transactions
- Environment Variables
- Input Validation

---

# 🚀 Future Improvements

- Refresh Token Authentication
- Email Verification
- OTP Login
- Swagger API Documentation
- Docker Support
- Redis Caching
- Rate Limiting
- Unit & Integration Testing
- Admin Dashboard
- Account Statements (PDF)

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 👨‍💻 Author

**Iash Das**

ECE Student, NIT Agartala



---

# 📜 License

This project is licensed under the MIT License.
