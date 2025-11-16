


const menuModel = require("../models/menusModel");

// Multer setup
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const menusController = {
  uploadMiddleware: upload.single("image"), // Champ "image"

  create: async (req, res) => {
    try {
      const menuData = JSON.parse(req.body.data);

      if (req.file) {
        menuData.image = req.file.filename;
      }

      const menuId = await menuModel.createMenu(menuData);
      res.status(201).json({ message: "Menu créé", menuId });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const menus = await menuModel.getAllMenus();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const menu = await menuModel.getMenuById(req.params.id);
      res.json(menu);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);

      if (req.file) {
        data.image = req.file.filename;
      }
      await menuModel.updateMenu(req.params.id, data);
      res.json({ message: "Menu mis à jour" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await menuModel.deleteMenu(req.params.id);
      res.json({ message: "Menu supprimé" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = menusController;
