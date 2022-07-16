const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");

// CONTROLLER TO REGISTER A USER
module.exports.register = async (req, res, next) => {
  try {
    const isEmailExists = await User.findOne({ email: req.body.email });
    if (!isEmailExists) {
      if (req.body.password === req.body.confirmPassword) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });
          const savedUser = await newUser.save();
          return res.status(200).json(savedUser);
        } catch (err) {
          return next(err);
        }
      } else {
        return next(createError(400, "Passwords do not match!"));
      }
    } else {
      return next(createError(400, "Email already exists!"));
    }
  } catch (err) {
    return next(err);
  }
};

// CONTROLLER FOR LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "Email doesn't exists!"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const {password,...otherDetails} = user._doc;
      return res.cookie("access_token", token).status(200).json(otherDetails);
    } else {
      return next(createError(400, "Password is not correct!"));
    }
  } catch (err) {
    return next(err);
  }
};
