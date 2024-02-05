// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // check user already exist or not

const UserModel = require("../models/UserModel");

//     let user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already have register !" });
//     }

//     // creating new user

//     user = await UserModel.create({
//       avatar: user?.avatar,
//       name: user?.name,
//       email: user?.email,
//       password: user?.password,
//       verificationCode: null,
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//       message: "User register successfull",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong !",
//     });
//   }
// };
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check whether the user exists or not
    let user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("User have already registered");
    }

    // creating a new user
    user = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

// user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found !");
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (error) {
    next(error);
  }
};

// get user profile
const userProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await UserModel.findById(req.user._id);
    console.log(user);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found !");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
// update user profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      throw new Error("User not found !");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be more than 6 character !");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      verified: updatedUser.verified,
      admin: updatedUser.admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
};
