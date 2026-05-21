const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://soui0564910670_db_user:WLMd27UNhrtyL7Q6@cluster0.n4p87yc.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connecté"))
.catch((error) => console.log(error));
const app = express();
//importation du modèle User
const User = require("./models/User");

app.use(cors());
app.use(express.json());

// let users = [
//   {
//     name: "Youssouf",
//     age: 22
//   }
// ];

// GET
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

// POST
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Utilisateur ajouté",
      data: user
    });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé", data: user });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur mis à jour", data: user });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

  res.json({
    message: "Utilisateur supprimé"
  });



//UPDATE
// app.put("/users/:index", (req, res) => {
//   const index = req.params.index;
//   const user = req.body;

//   users[index] = user;

//   res.json({
//     message: "Utilisateur mis à jour",
//     data: user
//   });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});