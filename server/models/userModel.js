// server/models/userModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Doctor", "Admin"], // Role must be one of these values
      default: "Patient", // If no role is provided, it defaults to Patient
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// This function will run BEFORE a user document is saved to the database
userSchema.pre("save", async function (next) {
  // We only want to hash the password if it's new or has been modified
  if (!this.isModified("password")) {
    next();
  }

  // "salt" makes the hash more secure
  const salt = await bcrypt.genSalt(10);
  // This hashes the plain text password and updates it
  this.password = await bcrypt.hash(this.password, salt);
});
// Add this method to your userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
