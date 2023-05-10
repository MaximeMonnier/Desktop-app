const Vehicule = require('../models/Vehicule');

module.exports = {

  // methode findAll
  // appelle la methode findAll de la class product
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
        const vehicules = await Vehicule.getOneById(id);
        return vehicules;
      } catch (error) {
        console.log(error);
      }
    },

    async addOne(vehiculeform) {
      try {
        //  /!\ ici on passe l'objet vehiculeform au constructeur de la classe Product, pas en paramètre à la méthode addOne !!!
        const vehicule = await new Vehicule().addOne();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async edit(vehiculeform) {
      try {
        const vehicule = await new Vehicule(vehiculeform).edit();
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