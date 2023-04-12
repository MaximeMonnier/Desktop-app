// !!!
// fichier si on utilise postgresql comme database
// !!!

const db = require('../database');

class Product {

  constructor(obj = {}) {
    for (const prop in obj) {
      this[prop] = obj[prop];
    }
  }
  static async findAll() {
    try {
      const {rows} = await db.query("SELECT * FROM stockage ORDER BY id DESC");
      return rows.map(row => new Product(row));
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }
}

module.exports = Product;