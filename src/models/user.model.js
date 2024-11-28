import mongoose from "mongoose";

const userCollection = "Usuario";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "tech", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: false,
  },
});

const users = mongoose.model(userCollection, userSchema);

export default users;
