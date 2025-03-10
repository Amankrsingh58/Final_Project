const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cookieParser());

// ✅ Correct CORS configuration
app.use(
    cors({
      origin: `http://localhost:${5173||5174}`, // Allow requests from frontend
      credentials: true, // Allow cookies (important for authentication)
    })
);

// Define routes
app.use('/api/users', userRoutes);

// Database connection
connectDB();

// ✅ Add a default route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
    res.send("Server is running...");
});


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
