import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

export const signUpUsers = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, imageUrl } =
    req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User has already exist' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password or confirm password is not matched' });
    }

    const hashPass = await bcrypt.hash(password, 12);
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPass,
      imageUrl,
    });

    const token = jwt.sign(
      {
        email: result.email,
        _id: result._id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      imageUrl: result.imageUrl,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: 'Some thing went wrong' });
  }
};

export const signInUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isCorrectPass = bcrypt.compareSync(password, existUser.password);

    if (!isCorrectPass) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      {
        email: existUser.email,
        _id: existUser._id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    );

    if (existUser && isCorrectPass) {
      res.status(200).json({
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        imageUrl: existUser.imageUrl,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
