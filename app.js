

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Ajouter CORS pour permettre les requêtes depuis le frontend
const userController = require("./controllers/userController");
const menusController = require("./controllers/menusController");
const restauController = require("./controllers/restauController");

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Activer CORS
app.use(express.json()); // Parser les corps JSON
app.use(express.static("uploads")); // Servir les fichiers statiques (images) depuis le dossier uploads

// Routes
app.post("/users/signup", userController.signup);
app.post("/users/signin", userController.signin);
app.get("/users", userController.getAll);
app.get("/users/:id", userController.getById);
app.put("/users/:id", userController.update);
app.delete("/users/:id", userController.delete);

// Routes des menus avec middleware Multer
app.post("/menus", menusController.uploadMiddleware, menusController.create);
app.get("/menus", menusController.getAll);
app.get("/menus/:id", menusController.getById);
app.put("/menus/:id", menusController.uploadMiddleware, menusController.update);
app.delete("/menus/:id", menusController.delete);

// Restaurants
app.post("/restaurants", restauController.create);
app.get("/restaurants", restauController.getAll);
app.get("/restaurants/:id", restauController.getById);
app.put("/restaurants/:id", restauController.update);
app.delete("/restaurants/:id", restauController.delete);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});