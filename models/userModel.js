const db = require("../config/db");
const bcrypt = require("bcrypt");

const user = {
  signup: async (userData) => {
    if (!userData.password) {
      throw new Error("Le mot de passe est requis");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    };
    const [result] = await db.query("INSERT INTO users SET ?", [newUser]);
    return result.insertId;
  },

  signin: async (email, password) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) throw new Error("Utilisateur non trouvé");

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Mot de passe invalide");

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  },

  getAllUsers: async () => {
    const [rows] = await db.query("SELECT id, username, email FROM users");
    return rows;
  },

  getUserById: async (id) => {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id]
    );
    if (rows.length === 0) throw new Error("Utilisateur non trouvé");
    return rows[0];
  },

  updateUser: async (id, data) => {
    return await db.query("UPDATE users SET ? WHERE id = ?", [data, id]);
  },

  deleteUser: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Utilisateur non trouvé");

    await db.query("DELETE FROM users WHERE id = ?", [id]);
  },
};

module.exports = user;
