const db = require("../config/db");

const restaurant = {
  // Créer un restaurant
  create: async (data) => {
    const [result] = await db.query("INSERT INTO restaurants SET ?", [data]);
    return result.insertId;
  },

  // Récupérer tous les restaurants
  getAll: async () => {
    const [rows] = await db.query(
      "SELECT * FROM restaurants ORDER BY created_at DESC"
    );
    return rows;
  },

  // Récupérer un restaurant par ID
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM restaurants WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) throw new Error("Restaurant non trouvé");
    return rows[0];
  },

  // Mettre à jour un restaurant
  update: async (id, data) => {
    return await db.query("UPDATE restaurants SET ? WHERE id = ?", [data, id]);
  },

  // Supprimer un restaurant
  delete: async (id) => {
    const [rows] = await db.query("SELECT * FROM restaurants WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) throw new Error("Restaurant non trouvé");
    await db.query("DELETE FROM restaurants WHERE id = ?", [id]);
  },
};

module.exports = restaurant;
