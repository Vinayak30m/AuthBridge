# AuthBridge

AuthBridge is a flexible and scalable authentication system built with Node.js and Express that supports both MongoDB and PostgreSQL databases. It’s designed to demonstrate seamless integration of two popular database technologies for user management, offering developers a practical example of handling multiple data stores within the same project.

---

## Features

- User signup and login with password hashing and JWT-based authentication.
- Dual database support:
  - MongoDB for NoSQL storage using Mongoose.
  - PostgreSQL for relational data using Sequelize ORM.
- Clean, modular architecture separating routes, controllers, and models.
- Environment-based configuration using `.env` files.
- Secure password handling with bcrypt.
- Ready for easy extension to other databases or authentication methods.
- Simple API endpoints for user registration and login.
- Demonstrates best practices in modern Node.js backend development.

---

## Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** with Mongoose
- **PostgreSQL** with Sequelize ORM
- **JWT** for authentication tokens
- **bcrypt** for password hashing
- **dotenv** for environment configuration

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance (local or cloud)
- PostgreSQL instance (local or cloud)
