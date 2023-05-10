// const main = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

//Récupérer les données du formulaire

const form = document.querySelector("#addForm");
const name = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const immat = document.querySelector("#immat");
const km = document.querySelector("#km");
const trajet = document.querySelector("#trajet");
const etats = document.querySelectorAll('input[name="etat"]');
const returnCars = document.querySelectorAll('input[name="returnCar"]');
// const returnCar = document.querySelector('input[name=returnCar]:checked');
const problem = document.querySelector("#problem");

const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");

const editedVehicule = JSON.parse(sessionStorage.getItem("vehicule"));

if (sessionStorage.getItem('user')) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  // console.log(user);
  console.log(user.firstname)
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
} else {
  document.location.href = 'connect.html'
  exitSpan.textContent = "Veuillez vous connecter";
}

exitSpan.addEventListener("click", (e) => {
  sessionStorage.removeItem('user');
  document.location.href = 'connect.html'

})

const getOriginEtat = (etats) => {
  for (const etat of etats) {
    if(etat.value === editedVehicule.etat) return etat;
  }
}

const getOriginReturn = (returnCars) => {
  for (const returnCar of returnCars) {
    if(returnCar.value === editedVehicule.etat) return etat;
  }
}

name.value = editedVehicule.nom;
lastname.value = editedVehicule.prenom;
immat.value = editedVehicule.plaque;
km.value = editedVehicule.kilometre;
trajet.value = editedVehicule.trajet;
const etat = getOriginEtat(etats);
etat.checked = true;
etat.value = editedVehicule.etat;
problem.value = editedVehicule.probleme;

const getCheckedEtat = (etats) => {
  for (const etat of etats) {
    if(etat.checked === true) return etat.value;
  }
}

const getCheckedReturn = (returnCars) => {
  for (const returnCar of returnCars) {
    if(returnCar.checked === true) return returnCar.value;
  }
}

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
      etat: getCheckedEtat(etats),
      probleme: problem.value,
      statut: getCheckedReturn(returnCars),
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