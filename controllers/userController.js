const userModel = require("../models/userModel");

const userController = {
  signup: async (req, res) => {
    try {
      const userId = await userModel.signup(req.body);
      res.status(201).json({ message: "Utilisateur créé", userId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.signin(email, password);
      res.json({ message: "Connexion réussie", user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await userModel.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      await userModel.updateUser(req.params.id, req.body);
      res.json({ message: "Utilisateur mis à jour" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await userModel.deleteUser(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
