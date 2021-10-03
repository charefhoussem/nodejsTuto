const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    //créer l'utilisateur
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    //créer token avec jwt
    const token = jwt.sign({ id: user._id }, "ultimate-secret", {
      expiresIn: "90d",
    });

    user.password = undefined;
    user.passwordConfirm = undefined;
    //retour de resultat
    res.status(201).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err._message || err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    //verifier si email et mot de passe sont disponible
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "email or password missing",
      });
    }
    //rechrche dans la basse de donner un utlisateur de l'email tapper
    const user = await User.findOne({ email });
    //verifier la disponibilité de l'utlisateur et verifier la mot de passe
    if (!user || user.password != password) {
      return res.status(404).json({
        status: "fail",
        message: "invalid email or password",
      });
    }
    // créer token
    const token = jwt.sign({ id: user._id }, "ultimate-secret", {
      expiresIn: "90d",
    });

    user.password = undefined;
    user.passwordConfirm = undefined;
    //retour de resultat
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
