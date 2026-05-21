const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ======================
// Initialisation Express
// ======================
const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Connexion MongoDB
// ======================
mongoose.connect(
  "mongodb+srv://soui0564910670_db_user:WLMd27UNhrtyL7Q6@cluster0.n4p87yc.mongodb.net/?appName=Cluster0"
)
.then(() => {
  console.log("MongoDB connecté");
})
.catch((error) => {
  console.log("Erreur MongoDB :", error);
});

// ======================
// Importation du modèle
// ======================
const User = require("./models/User");

// ======================
// ROUTE TEST
// ======================
app.get("/", (req, res) => {
  res.json({
    message: "API fonctionne correctement"
  });
});

// ======================
// GET USERS
// ======================
app.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs"
    });

  }

});

// ======================
// ADD USER
// ======================
app.post("/users", async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      message: "Utilisateur ajouté",
      data: user
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: "Erreur lors de l'ajout de l'utilisateur"
    });

  }

});

// ======================
// DELETE USER
// ======================
app.delete("/users/:id", async (req, res) => {

  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });

    }

    res.status(200).json({
      message: "Utilisateur supprimé",
      data: user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur lors de la suppression de l'utilisateur"
    });

  }

});

// ======================
// UPDATE USER
// ======================
app.put("/users/:id", async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {

      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });

    }

    res.status(200).json({
      message: "Utilisateur mis à jour",
      data: user
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      message: "Erreur lors de la mise à jour de l'utilisateur"
    });

  }

});

// ======================
// PORT
// ======================
const PORT = process.env.PORT || 3000;

// ======================
// Lancement serveur
// ======================
app.listen(PORT, () => {

  console.log(`Serveur lancé sur le port ${PORT}`);

});