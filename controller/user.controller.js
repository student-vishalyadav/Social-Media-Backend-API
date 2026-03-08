const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.send("All Fields are required");
    }
    email = email.trim().toLowerCase();
    let existUser = await user.findOne({ email });
    if (existUser) {
      return res.send("user is already exist!");
    }
    let hash = await bcrypt.hash(password, 10);
    let newuser = await user.create({
      username,
      email,
      password: hash,
      role,
    });

    let token = jwt.sign(
      { email: newuser.email, id: newuser._id },
      "terejajbatomemahkisisasome",
      { expiresIn: "2d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      msg: "now you are registerd successfully",
      newuser,
    });
  } catch (error) {
    res.status(404).send("user is not found");
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).send("you are not othorized for this schema");
    }
    email = email.trim().toLowerCase();
    let existuser = await user.findOne({ email });
    if (!existuser) {
      return res.status(201).send("user is not registerd");
    }

    let compare = await bcrypt.compare(password, existuser.password);
    if (!compare) {
      return res.status(401).send("Unothorised User");
    }

    let token = jwt.sign(
      { email: existuser.email, id: existuser._id },
      "terejajbatomemahkisisasome",
      { expiresIn: "2d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send("now you are login");
    console.log("user is login now ");
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};
