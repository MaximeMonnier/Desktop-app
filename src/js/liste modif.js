// const main = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

//Récupérer les données du formulaire

const form = document.querySelector("#addForm");
const name = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const immat = document.querySelector("#immat");
const km = document.querySelector("#km");
const trajet = document.querySelector("#trajet");
const etat = document.querySelector('input[name="etat"]:checked');
const returnCar = document.querySelector('input[name="returnCar"]:checked');
const problem = document.querySelector("#problem");

const editedVehicule = JSON.parse(sessionStorage.getItem("vehicule"));

console.log(editedVehicule);
name.value = editedVehicule.nom;
lastname.value = editedVehicule.prenom;
immat.value = editedVehicule.plaque;
km.value = editedVehicule.kilometre;
trajet.value = editedVehicule.trajet;
etat.value = editedVehicule.etat;
problem.value = editedVehicule.probleme;

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    //initialiser les valeurs pour la table stockage
    const formData = {
      plaque: immat.value,
      nom: name.value,
      prenom: lastname.value,
      kilometre: km.value,
      trajet: trajet.value,
      etat: etat.value,
      probleme: problem.value,
      statut: returnCar.value,
      id: editedVehicule.id
    };
    //requete envoyé au controller avec les données de stockage quis era passé au constructeur du model Product
    await vehiculeController.edit(formData);
    document.location.href = "index.html";
  }
  catch (error){
    console.log(error);
  }
});