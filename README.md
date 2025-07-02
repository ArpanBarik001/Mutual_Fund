# 📊 Mutual Fund Finder

A full-stack web application that allows users to register, log in, search for mutual funds, view fund details, and save their favorite mutual funds for later — using real-time data from [MFAPI](https://www.mfapi.in).

---

## 🔧 Tech Stack

### Frontend:
- ⚛️ React
- 🎨 CSS
- 🔐 JWT Authentication (with token stored in localStorage)
- 🌐 Axios for API communication
- 🧭 React Router DOM for page navigation

### Backend:
- 🟢 Node.js
- 🚀 Express.js
- 🛡️ JWT for secure authentication
- 🛢️ MongoDB + Mongoose for data storage
- 🔐 Passport.js for route protection

---

## ✨ Features

- ✅ User Registration and Login
- 🔐 JWT-based authentication
- 🔍 Search mutual funds by scheme name using [MFAPI](https://www.mfapi.in)
- 📄 View detailed mutual fund information
- 💾 Save mutual funds to personal list (auth required)
- 📁 View all saved mutual funds in one place
- 🚫 Only allow saving each fund once
- 🗑️ Remove saved funds from list

---

## 🖥️ Pages Overview

| Page             | Description                              |
|------------------|------------------------------------------|
| `/register`      | New user signup                          |
| `/login`         | Existing user login                      |
| `/landing`       | Search mutual funds by name              |
| `/fund/:code`    | View mutual fund details + Save button   |
| `/saved`         | List of saved mutual funds (auth only)   |

---

## 📦 Installation & Running Locally

## Deployment link
https://mutual-fund-client.onrender.com/

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mutual-fund-finder.git
cd mutual-fund-finder
