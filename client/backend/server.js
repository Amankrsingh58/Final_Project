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
const studentRoutes = require('./routes/studentRoutes');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

cloudinaryConnect();


app.use(
    cors({
        origin: [`http://localhost:5173`, `http://localhost:5174`, `http://192.168.1.x:5173`],
        credentials: true,
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

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
