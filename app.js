const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutesV2 = require('./routes/userRoutesV2');

sequelize.sync()
  .then(() => console.log("PostgreSQL connected & synced"))
  .catch(err => console.error("PostgreSQL sync error:", err));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/auth-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" MongoDB connection error:", err));


const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/v2', userRoutesV2);

module.exports = app;
