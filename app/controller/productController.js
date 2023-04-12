// !!!
// fichier si on utilise postgresql comme database
// !!!

const Product = require('../models/Product');

module.exports = {

    async findAll() {
      try {
        const products = await Product.findAll();
        return products;
      } catch (error) {
        console.log(error);
      }
    }
    

}