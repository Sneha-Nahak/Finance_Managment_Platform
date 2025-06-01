require('dotenv').config();

const express = require('express');
const cors = require('cors');

const path = require('path');

const AuthRouter = require('./routes/authRoutes');
const PolicyRouter = require('./routes/policyRoutes');
const CustomerRouter = require('./routes/customerRoutes');
const ClaimRouter = require('./routes/claimRoutes');
const SupportRouter = require('./routes/supportRoutes');
const TransactionRouter = require('./routes/transactionRoutes');

const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route mounting
app.use('/api/auth', AuthRouter);
app.use('/api/policies', PolicyRouter);
app.use('/api/customers', CustomerRouter);
app.use('/api/claims', ClaimRouter);
app.use('/api/support', SupportRouter);
app.use('/api/transactions', TransactionRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Insurance Management System API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
