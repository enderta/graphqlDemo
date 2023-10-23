import User from "../server/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const dotenv = require("dotenv");

dotenv.config();



const SECRET = process.env.SECRET;

// Create collection
const createCollection = async () => {
  try {
    await User.createCollection();
    console.log("Collection created!");
  } catch (err) {
    console.error("Error creating collection!");
  }
};

// Create user
const createUser = async (body) => {
  body = JSON.parse(body);
  const user = new User({
    username: body.username,
    email: body.email,
    password: body.password,
  });

  try {
    const newUser = await user.save();
    console.log("User created successfully", newUser);
  } catch (err) {
    console.error("Error creating user!");
  }
};

// Login user
const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  return jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
};

const getUsers = async () => {
  try {
    const users = await User.find();
    const usersJSON = JSON.stringify(users);
    console.log(usersJSON);
  } catch (err) {
    console.error("Error getting users!");
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    const userJSON = JSON.stringify(user);
    console.log(userJSON);
  } catch (err) {
    console.error("Error getting user!");
  }
};

const updateUserById = async (id, body) => {
  try {
    const user = await User.findById(id);
    if (body.username) {
      user.username = body.username;
    }
    if (body.email) {
      user.email = body.email;
    }
    if (body.password) {
      user.password = body.password;
    }
    const updatedUser = await user.save();
    console.log("User updated successfully", updatedUser);
  } catch (err) {
    console.error("Error updating user!");
  }
};

// Delete user by ID
const deleteUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    console.log("User deleted successfully", user);
  } catch (err) {
    console.error("Error deleting user!");
  }
};

// Delete all users
const deleteUsers = async () => {
  try {
    const users = await User.deleteMany();
    console.log("Users deleted successfully", users);
  } catch (err) {
    console.error("Error deleting users!");
  }
};

// Example usage:
createCollection();
createUser();
loginUser();
getUsers();
getUserById();
updateUserById();
deleteUserById();
deleteUsers();
