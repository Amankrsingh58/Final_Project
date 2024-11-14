const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();


const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
// const tutorRoutes = require('./routes/tutorRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const enquiryRoutes = require('./routes/enquiryRoutes');
// const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cookieParser());

// // Define routes
app.use('/api/users', userRoutes);
// app.use('/api/tutors', tutorRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/enquiries', enquiryRoutes);
// app.use('/api/auth', authRoutes);

//db connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(3000, () => {
    console.log("started");
});
