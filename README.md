# 🏦 Banking Ledger Backend

> A secure and scalable Banking Backend REST API built with **Node.js**, **Express.js**, and **MongoDB**. It provides user authentication, bank account management, ledger recording, secure fund transfers, and transaction history while ensuring data consistency using MongoDB ACID transactions.

---

## 🌐 Live Demo

**Base URL**

👉 https://banking-ledger-project.onrender.com

---

## 🚀 Features

- 🔐 User Registration & Login
- 🔑 JWT Authentication
- 🍪 HTTP-only Cookie Authentication
- 🚪 Secure Logout with Token Blacklisting
- 🔒 Password Hashing using bcrypt
- 🏦 Bank Account Management
- 💸 Secure Fund Transfers
- 📒 Ledger Entry Management
- 📜 Transaction History
- 💾 MongoDB Transactions (ACID)
- ⚡ RESTful API Design
- 🌱 Environment Variable Configuration

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | NoSQL Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Cookie Parser | Cookie Handling |
| dotenv | Environment Variables |

---

# 📂 Project Structure

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

# ⚙️ Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/banking-ledger-backend.git
```

```bash
cd banking-ledger-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔐 Authentication Flow

```
User Registration
        │
        ▼
Password Hashed (bcrypt)
        │
        ▼
User Stored in MongoDB
        │
        ▼
Login
        │
        ▼
JWT Generated
        │
        ▼
Stored in HTTP-only Cookie
        │
        ▼
Access Protected Routes
        │
        ▼
Logout
        │
        ▼
Token Added to Blacklist
```

---

# 💸 Fund Transfer Flow

```
Authenticate User
        │
        ▼
Validate Request
        │
        ▼
Start MongoDB Transaction
        │
        ▼
Verify Sender Balance
        │
        ▼
Debit Sender Account
        │
        ▼
Credit Receiver Account
        │
        ▼
Create Ledger Entry
        │
        ▼
Store Transaction
        │
        ▼
Commit Transaction
```

If any step fails, the transaction is automatically rolled back, ensuring complete data consistency.

---

# 🗄 Database Models

### 👤 User

- Name
- Email
- Password

---

### 🏦 Account

- Account Number
- Owner
- Balance

---

### 💸 Transaction

- Sender
- Receiver
- Amount
- Status
- Timestamp

---

### 📒 Ledger

Stores ledger records for every successful transaction.

---

### 🚫 Blacklist

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
| POST | `/account/create` | Create New Account |
| GET | `/account/:id` | Get Account Details |

---

## Transaction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transaction/transfer` | Transfer Funds |
| GET | `/transaction/history` | Get Transaction History |

---

# 📤 Example Request

```http
POST /transaction/transfer
```

```json
{
    "toAccount": "68901234abcd5678ef901234",
    "amount": 1000
}
```

---

# 📥 Example Response

```json
{
    "message": "Funds transferred successfully"
}
```

---

# 🔒 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing with bcrypt
- Protected Routes
- Token Blacklisting
- MongoDB ACID Transactions
- Environment Variable Protection
- Request Validation

---

# 🚀 Future Enhancements

- Refresh Tokens
- Email Verification
- OTP Authentication
- Password Reset via Email
- Rate Limiting
- Redis Caching
- Docker Support
- Swagger API Documentation
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---

# 📌 Deployment

The application is deployed on **Render**.

**Live URL**

https://banking-ledger-project.onrender.com

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.

2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# 👨‍💻 Author

**Maxy**

Electronics & Communication Engineering  
National Institute of Technology Agartala

GitHub: https://github.com/your-github-username

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future improvements.               │
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
