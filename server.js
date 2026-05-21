const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    name: "Youssouf",
    age: 22
  }
];

// GET
app.get("/users", (req, res) => {
  res.json(users);
});

// POST
app.post("/users", (req, res) => {

  const user = req.body;

  users.push(user);

  res.json({
    message: "Utilisateur ajouté",
    data: user
  });

});

// DELETE
app.delete("/users/:index", (req, res) => {

  const index = req.params.index;

  users.splice(index, 1);

  res.json({
    message: "Utilisateur supprimé"
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});