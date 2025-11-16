const restauModel = require("../models/restauModel");

const restauController = {
  // Créer un restaurant
  create: async (req, res) => {
    try {
      const restauId = await restauModel.create(req.body);
      res.status(201).json({ message: "Restaurant ajouté", restauId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer tous
  getAll: async (req, res) => {
    try {
      const restaurants = await restauModel.getAll();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Récupérer par ID
  getById: async (req, res) => {
    try {
      const restaurant = await restauModel.getById(req.params.id);
      res.json(restaurant);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Mettre à jour
  update: async (req, res) => {
    try {
      await restauModel.update(req.params.id, req.body);
      res.json({ message: "Restaurant mis à jour" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer
  delete: async (req, res) => {
    try {
      await restauModel.delete(req.params.id);
      res.json({ message: "Restaurant supprimé" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = restauController;
