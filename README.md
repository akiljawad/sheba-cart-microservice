# 🚀 Cart Microservice

> Cart Microservice for Service Booking System

---

## 📚 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running Tests](#-running-tests)
- [API Documentation](#-api-documentation)
- [Folder Structure](#-folder-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

Cart microservice for storing services in the cart and initiating checkout for an order.

---

## ✨ Features

- ✅ Create user (Admin/Customer). Only the customer can create a cart.
- ✅ Login using JWT
- ✅ Customer can create a cart and add/remove items
- ✅ Customer initiate checkout and submit order to 3rd party external service.


---

## 🛠️ Tech Stack

| Technology | Description |
|:---|:---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Backend framework |
| **Sequelize** | ORM for database |
| **MySQL** | Database |
| **Jest + Supertest** | Testing Framework |
| **Auth** | JWT |
| **API** | RESTful |

---

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/akiljawad/sheba-cart-microservice.git
cd sheba-cart-microservice
```
### 2. Install dependencies
```bash
yarn install
```
### 3. Install dependencies
Create a .env file in the root:
```bash
cp .env.example .env
```
### 4. Run the server
```bash
# For development
yarn dev

# For production
yarn start
```
Server will start on:
```bash
http://localhost:3000
```

## 🔑 Environment Variables
Create a .env file in the project root and add the following:
```dotenv
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_NAME_TEST=your_test_db_name
DB_DIALECT=mysql

JWT_SECRET=jwt_secret
JWT_EXPIRES=6h
JWT_REFRESH_SECRET=jwt_refresh_secret
JWT_REFRESH_EXPIRES=1d
```

## 🧪 Running Tests
```bash
# Run all tests
yarn test

# Run all tests for windows
yarn win:test
```

## 📬 API Documentation
Postman collection and environment file added in github repo

## 📁 Folder Structure
```bash
src/
├── common/         # Global services (e.g Constants,enums,exceptions,utils,response)
├── config/         # Environment variables and configs
├── controllers/    # Request handlers
├── models/         # Sequelize models
├── routes/         # Express routes
├── services/       # Business logic
├── middlewares/    # Express middlewares
├── validations/    # Request validation schema
├── app.js          # App entry point
tests/
├── mocks/          # Mock data for testing purpose
├── unit/           # Unit tests
├── integration/    # Integration tests
```

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
Feel free to fork the repo and submit a Pull Request!

## 📝 License
Author: Akil Jawad
Date: 27th April,2025
