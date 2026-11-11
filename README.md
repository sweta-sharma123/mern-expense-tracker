# Personal Expense Tracker (MERN)

A beginner-friendly MERN project with one role (`user`) and multiple separate user accounts.

## Features
- Register and login with JWT authentication
- Dashboard: total income, total expenses, and balance
- Add, view, edit, and delete income/expense transactions
- Search transactions by title
- Filter by type and category
- Simple monthly summary
- Each user can access only their own transactions

## Requirements
- Node.js and npm
- MongoDB server running locally OR a MongoDB Atlas connection string

## 1. Backend setup
Open a terminal in the `backend` folder:

```bash
npm install
```

Copy `.env.example` to `.env` and update values if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=change_this_to_a_long_random_secret
```

Start backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

## 2. Frontend setup
Open another terminal in the `frontend` folder:

```bash
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## 3. Test the project
1. Register a new account.
2. Login with that account.
3. Add an income transaction, for example Salary / 25000.
4. Add an expense transaction, for example Food / 1500.
5. Check the dashboard totals.
6. Edit and delete a transaction.
7. Register a second account in another browser/incognito window. Its transactions should be separate.

## Project structure
```text
backend/
  config/db.js
  controllers/authController.js
  controllers/transactionController.js
  middleware/auth.js
  models/User.js
  models/Transaction.js
  routes/authRoutes.js
  routes/transactionRoutes.js
  server.js
frontend/
  src/components/ProtectedRoute.jsx
  src/context/AuthContext.jsx
  src/pages/Login.jsx
  src/pages/Register.jsx
  src/pages/Dashboard.jsx
  src/pages/Transactions.jsx
  src/services/api.js
  src/App.jsx
  src/main.jsx
  src/style.css
```

## Notes
- This is a learning project, not a production financial application.
- JWT is stored in localStorage to keep the learning flow simple. Production apps should use stronger security practices.
- Never upload your `.env` file or real secrets to GitHub.
