import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRETE = "process.env.JWT_SECRETE";

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: ' successfully singup' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });
    const matchedPassword = bcrypt.compare(password, user.password);
    if (!user) {
      res.json({
        message: 'user not found',
      });
    } else if (!matchedPassword) {
      res.json({
        message: 'incorrect password',
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRETE
      );
      res.status(201).json({ token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
