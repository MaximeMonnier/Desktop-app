const User = require('../models/User');

module.exports = {

  // methode findAll
  // appelle la methode findAll de la class vehicule
  // ne pas confondre les deux méthode findALl, elles peuvent avoir des noms différents (voir methode findOneById)
  // retourne la liste des produits
    async findAll() {
      try {
        const users = await User.findAll();
        return users;
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
        const user = await User.getOneById(id);
        return user;
      } catch (error) {
        console.log(error);
      }
    },

    async addOne(formData) {
      try {
        console.log('=== model ===')
        console.log(formData)
        console.log('=== model ===')

        //  /!\ ici on passe l'objet stockage au constructeur de la classe Vehicule, pas en paramètre à la méthode addOne !!!
        const user = await new User(formData).addOne();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async edit(formData) {
      try {
        console.log(formData)
        const user = await new User(formData).edit();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async delete(id) {
      try {
        const user = await new User(id).delete();
        return null;
      } catch (error) {
        console.log(error);
      }
    },

    async login(formData) {
      try {
        const user = await new User(formData).doLogin();
        return user;
      } catch (error) {
        console.log(error);
      }
    }

}