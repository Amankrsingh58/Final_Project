const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['Admin', 'Tutor', 'Student'],
            required: true,
        },
        image: {
            type: String,
            default: function () {
                return `https://api.dicebear.com/5.x/initials/svg?seed=${this.userName.replace(/\s+/g, '%20') || 'default'}`;
            },
        },
        imageCloudinaryId: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        tutorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tutor',
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    },
    { timestamps: true }
);

// Password hashing before saving the user
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password check method
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Access token generation
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Refresh token generation
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
