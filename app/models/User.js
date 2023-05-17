const bcrypt = require('bcrypt-nodejs');
const { getConnection } = require('../database');

class User {

  // Le constructeur de la classe prednra un objet en paramètre, cet objet est envoyé par le controller
  // Cet objet a par defaut la valeur d'un objet vide obj = {}
  // Si un objet est passé en paramètre depuis le controller, le constrructeur bouclera sur l'ensemble des propriétés pour définir les propiétés de l'instance de la classe
  // Par exemple si l'objet passé en paramètre est const stockage = {
  //          type_piece: type.value,
  //          nom: nom.value,
  //          marque: marque.value,
  //          prix: prix.value,
  //          description: desc.value,
  //          stock: stock.value
  //     };
  // Le constructeur aura la valeur suivante :
  // constructor(stockage) {
  //          this.type_piece = stockage.type_piece
  //          this.nom = stockage.type_piece
  //          this.marque = stockage.type_piece
  //          this.prix = stockage.type_piece
  //          this.description = stockage.type_piece
  //          this.stock = stockage.type_piece
  // }
  constructor(obj = {}) {
    for (const prop in obj) {
      this[prop] = obj[prop];
    }
  }

  // Méthode static (agit sur la classe et pas une instance) afin de récupérer toute les produits en stock
  static async findAll() {
    try {
      // conenxion à la db
      const connect = await getConnection();
      // requete à la db
      const results = await connect.query("SELECT * FROM appuser");
      // si on a des résultats, on boucle sur le tableau reçu
      // la méthode map permet de retourner un tableau
      // On retourne ici un tableau d'instance de la classe Vehicule générer via les données des résultats
      // Ce tableau est retourné au controller avant d'être rretourné au fichier liste.js
      if (results) {
        return results.map(result => new User(result));
      }
      // si on a pas de récultat par rapport à la requete on return null
      // Si on entre dans le if de dessus, on ne passera pas ici
      return null;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }

  // Méthode static (agit sur la classe et pas une instance) afin de récupérer un produit grâce  à l'ID
  static async getOneById(id) {
    try {
      const connect = await getConnection();
      const results = await connect.query("SELECT * FROM appuser WHERE id=?", id);
      // Si on a un résultat à l'index 0 du tableau
      // on return l'instance de ce produit au controller
      if (results[0]) {
        return new User(results[0])
      }
      // si on a pas de résultat par rapport à la requete on return null
      // Si on entre dans le if de dessus, on ne passera pas ici
      return null;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }

  async doLogin() {
    try {
      const connect = await getConnection();
      const results = await connect.query("SELECT * FROM appuser WHERE email=?", this.email);
      console.log(results[0])
        if (!results[0]) {
            throw new Error('Identification failed');
        }
        const isPwdValid = await bcrypt.compare(this.password, results[0].password);
        if (!isPwdValid) {
            throw new Error('Identification failed');
        }
        console.log('ici')
        this.id = results[0].id;
        this.firstname = results[0].firstName; 
        this.lastName = results[0].lastName;
        console.log(this);
        return this;

    } catch (error) {
        console.log(error);
        if (error.detail) {
            throw new Error(error.detail)
        }
        throw error
    }
}

  async addOne() {
    try {
      const password = await bcrypt.hash(this.password, 10)
      this.password = password;
      const connect = await getConnection();

      const results = await connect.query("INSERT INTO appuser SET ?", this);
      return null;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }

  async edit() {
    try {
      const connect = await getConnection();
      const result = await connect.query("UPDATE appuser SET ? WHERE id=?",[this, this.id]);
      return result;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }

  async delete() {
    try {
      const connect = await getConnection();
      const result = await connect.query("DELETE FROM appuser WHERE id = ?", this.id);
      return null;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      }
      throw error;
    }
  }

  
}

module.exports = User;