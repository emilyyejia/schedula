const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
  signUp,
  logIn,
  googleLogIn,
  checkUser,
};
async function googleLogIn(req, res) {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({ googleId, email, name, avatar: picture });
    }
    const appToken = createJWT(user);
    res.json({ user: user, token: appToken });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(400).json({ message: "Google Login Failed" });
  }
}
async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Duplicate Email" });
  }
}

async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad Credentials" });
  }
}

async function checkUser(req, res) {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.json({ exists: false });
    } else res.json({ exists: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
/*--- Helper Functions ---*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
