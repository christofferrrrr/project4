// controllers/userController.js
import bcrypt from 'bcrypt'; // or bcryptjs if you switch
import User from '../models/user.js';

// Register User
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, phone, sex, password, isactive } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const trimmedPassword = password.trim();
    console.log('Trimmed password before hashing:', trimmedPassword);

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10); // Trim password before hashing
    console.log('Hashed Password before save:', hashedPassword);

    user = new User({
      firstname,
      lastname,
      email,
      phone,
      sex,
      password: hashedPassword,  // Use the hashed password
      isactive,
    });

    const passwordValid = await bcrypt.compare(trimmedPassword, hashedPassword);
    console.log('Password hash verified at registration:', passwordValid);

    await user.save();
    console.log('User saved in DB:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const trimmedPassword = password.trim();
    console.log('Trimmed plain password:', trimmedPassword);
    console.log('Length of trimmed plain password:', trimmedPassword.length);
    console.log('Hashed password from DB:', user.password);

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    res.send({
      message: 'Login successful',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        sex: user.sex,
        isactive: user.isactive,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error); // Log the error
    res.status(400).send({ message: 'Error creating user', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error('Error retrieving users:', error); // Log the error
    res.status(500).send({ message: 'Error retrieving users', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error('Error retrieving user:', error); // Log the error
    res.status(500).send({ message: 'Error retrieving user', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error('Error updating user:', error); // Log the error
    res.status(400).send({ message: 'Error updating user', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error); // Log the error
    res.status(500).send({ message: 'Error deleting user', error: error.message });
  }
};