const Staff = require('../Model/staff.model.js');
const User = require('../Model/user.model')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mySuperSecretKey123!';


const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly compare the entered password with the stored password
    if (password !== validUser.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: validUser._id }, // Payload
      JWT_SECRET,             // Secret key
      { expiresIn: '1h' }     // Token expiration
    );

    // Exclude the password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Send the token as an HTTP-only cookie and return the user data without the password
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // Ensures the cookie can't be accessed via client-side scripts
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        sameSite: 'Strict', // Protect against CSRF
      })
      .json(rest); // Respond with user details (except password)
  } catch (error) {
    next(error); // Pass any errors to error handling middleware
  }
};

const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};


//staff login 
const Ssignup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new Staff({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json("Signup succes");
  } catch (error) {
    next(error);
  }
};

const Ssignin = async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await Staff.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "user Not found" });
    }

    const token = jwt.sign(
      { id: validUser._id },
      JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httponly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};



// Exporting all controller functions
module.exports = {
  signup,
  signin,
  signOut,
  Ssignup,
  Ssignin,
};