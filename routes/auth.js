const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { hash, compare } = require("bcryptjs");

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, age } = req.body;
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
        type: "error"
      });
    }

    const newUser = new User({
      email,
      password: await hash(password, 10),
      firstName,
      lastName,
      age
    });

    await newUser.save();
    
    res.status(201).json({
      message: "Compte créé avec succès! Redirection...",
      type: "success",
      redirect: "/login" // Ajout de l'URL de redirection
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Erreur lors de la création du compte",
      error: error.message
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
        type: "error"
      });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
        type: "error"
      });
    }

    res.status(200).json({
      message: "Connexion réussie!",
      type: "success",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Erreur lors de la connexion",
      error: error.message
    });
  }
});

module.exports = router;