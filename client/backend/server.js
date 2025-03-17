const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const userRoutes = require('./routes/userRoutes');
const tutorRoutes = require('./routes/tutorRoutes')
const studentRoutes = require('./routes/studentRoutes')

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [`http://localhost:5173`, `http://localhost:5174`],
        credentials: true, // Allow cookies (important for authentication)
    })
);

// Mount user routes at /api/users
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', tutorRoutes);
app.use('/api/users', studentRoutes);

app.use('/api/helprequests', helpRequestRoutes);


// Database connection
connectDB();

app.get("/", (req, res) => {
    res.send("Server is running...");
});


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
