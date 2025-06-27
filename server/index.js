const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { authenticateToken } = require('./authMiddleware');
const authRoutes = require('./routes/authRoutes'); // We'll create this next
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Protected dashboard route (example)
app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}! This is protected data.` });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 