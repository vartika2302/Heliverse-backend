const User = require("../models/User");
const bcrypt = require("bcryptjs");

// CONTROLLER TO GET A USER INFO
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

// CONTROLLER TO UPDATE A USER
module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...otherDetails } = updatedUser._doc;
    return res.status(200).json(otherDetails);
  } catch (err) {
    return next(err);
  }
};

// CONTROLLER TO DELETE A USER
module.exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User deleted successfully!");
  } catch (err) {
    return next(err);
  }
};
