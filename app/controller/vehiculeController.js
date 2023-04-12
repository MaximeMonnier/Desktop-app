const Vehicule = require('../models/Vehicule');

module.exports = {

  // methode findAll
  // appelle la methode findAll de la class vehicule
  // ne pas confondre les deux méthode findALl, elles peuvent avoir des noms différents (voir methode findOneById)
  // retourne la liste des produits
    async findAll() {
      try {
        const vehicules = await Vehicule.findAll();
        return vehicules;
      } catch (error) {
        console.log(error);
      }
    },
  
  // methode findOne
  // appelle la methode getOneById de la class vehicule
  // retourne un produit si trouvé
    async findOne(id) {
      try {
        // l'id est passé en paramètre de la méthode getOneById
        const vehicule = await Vehicule.getOneById(id);
        return vehicule;
      } catch (error) {
        console.log(error);
      }
    },

    async addOne(formData) {
      try {
        //  /!\ ici on passe l'objet stockage au constructeur de la classe Vehicule, pas en paramètre à la méthode addOne !!!
        const vehicule = await new Vehicule(formData).addOne();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async edit(stockage) {
      try {
        const vehicule = await new Vehicule(stockage).edit();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async delete(id) {
      try {
        const vehicule = await new Vehicule().delete(id);
        return null;
      } catch (error) {
        console.log(error);
      }
    },

}