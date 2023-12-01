import { SignUp } from "../model/registerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const signUpController = async (req, res) => {
  try {
    const { name, password, team,email } = req.body;

    // Validate input data
    if (!email || !name || !password || !team) {
      return res.status(400).json({ error: 'All fields (name,email, password, team) are required.' });
    }

    // Check if the user with the given email already exists
    const existingUser = await SignUp.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this name already exists.' });
    }

    // Create a new user using the SignUp model
    const newUser = await SignUp.create({ name, password, team,email });

    console.log("The sign up succefully", newUser)

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ error: 'Both email and password are required.' });
    }

    // Check if the user with the provided name exists
    const user = await SignUp.findOne({
      where: { email },
    });
    console.log("Thisis " ,user)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. from user' });
    }

    // Compare the provided password with password in the database

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials from the last.' });
    }

    // If credentials are valid, generate a JWT token
    const token = jwt.sign({ userId: 1 },'your', { expiresIn: '1h' });
    console.log(token)

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { signUpController ,loginController};
