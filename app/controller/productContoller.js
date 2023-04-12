const Product = require('../models/Product');

module.exports = {

  // methode findAll
  // appelle la methode findAll de la class product
  // ne pas confondre les deux méthode findALl, elles peuvent avoir des noms différents (voir methode findOneById)
  // retourne la liste des produits
    async findAll() {
      try {
        const products = await Product.findAll();
        return products;
      } catch (error) {
        console.log(error);
      }
    },
  
  // methode findOne
  // appelle la methode getOneById de la class product
  // retourne un produit si trouvé
    async findOne(id) {
      try {
        // l'id est passé en paramètre de la méthode getOneById
        const product = await Product.getOneById(id);
        return product;
      } catch (error) {
        console.log(error);
      }
    },

    async addOne(stockage) {
      try {
        //  /!\ ici on passe l'objet stockage au constructeur de la classe Product, pas en paramètre à la méthode addOne !!!
        const product = await new Product(stockage).addOne();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async edit(stockage) {
      try {
        const product = await new Product(stockage).edit();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async delete(id) {
      try {
        const product = await new Product().delete(id);
        return null;
      } catch (error) {
        console.log(error);
      }
    },

}