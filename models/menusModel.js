

const db = require("../config/db");

const menuModel = {
  createMenu: async (menuData) => {
    const { nom, description, timer, total, region, image, nombre_personnes } =
      menuData;

    const [result] = await db.query(
      "INSERT INTO menus (nom, description, timer, total, region, image, nombre_personnes) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nom,
        description,
        timer,
        total,
        region,
        image || null,
        nombre_personnes || null,
      ]
    );

    const menuId = result.insertId;

    if (menuData.items && menuData.items.length > 0) {
      const itemsValues = menuData.items.map((item) => [
        menuId,
        item.nom,
        item.prix,
      ]);
      await db.query("INSERT INTO menu_items (menu_id, nom, prix) VALUES ?", [
        itemsValues,
      ]);
    }

    return menuId;
  },

  getAllMenus: async () => {
    const [menus] = await db.query("SELECT * FROM menus");
    for (const menu of menus) {
      const [items] = await db.query(
        "SELECT * FROM menu_items WHERE menu_id = ?",
        [menu.id]
      );
      menu.items = items;
    }
    return menus;
  },

  getMenuById: async (id) => {
    const [menus] = await db.query("SELECT * FROM menus WHERE id = ?", [id]);
    if (menus.length === 0) throw new Error("Menu non trouvé");
    const menu = menus[0];
    const [items] = await db.query(
      "SELECT * FROM menu_items WHERE menu_id = ?",
      [id]
    );
    menu.items = items;
    return menu;
  },

  updateMenu: async (id, data) => {
    const {
      nom,
      description,
      timer,
      total,
      region,
      image,
      nombre_personnes,
      items,
    } = data;

    await db.query(
      "UPDATE menus SET nom = ?, description = ?, timer = ?, total = ?, region = ?, image = ?, nombre_personnes = ? WHERE id = ?",
      [
        nom,
        description,
        timer,
        total,
        region,
        image || null,
        nombre_personnes || null,
        id,
      ]
    );

    await db.query("DELETE FROM menu_items WHERE menu_id = ?", [id]);

    if (items && items.length > 0) {
      const itemsValues = items.map((item) => [id, item.nom, item.prix]);
      await db.query("INSERT INTO menu_items (menu_id, nom, prix) VALUES ?", [
        itemsValues,
      ]);
    }
  },

  deleteMenu: async (id) => {
    await db.query("DELETE FROM menus WHERE id = ?", [id]);
  },
};

module.exports = menuModel;