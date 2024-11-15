import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false },
    registrationTime: { type: Date, default: Date.now },
    profilePicture: { type: String },
    roles: [{ type: String, enum: ['admin', 'user'],default:"user" }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User',userSchema);