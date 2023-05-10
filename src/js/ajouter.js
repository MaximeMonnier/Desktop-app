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
const problem = document.querySelector("#problem");

const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");

if (sessionStorage.getItem('user')) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
  lastname.setAttribute('value', user.lastName);
  name.setAttribute('value', user.firstname);
} else {
  document.location.href = 'connect.html'
  exitSpan.textContent = "Veuillez vous connecter";
}

exitSpan.addEventListener("click", (e) => {
  sessionStorage.removeItem('user');
  document.location.href = 'connect.html'

})

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
          probleme: problem.value
        };
        //requete envoyé au controller avec les données de stockage quis era passé au constructeur du model Product
        await vehiculeController.addOne(formData);
        document.location.href = "index.html";
    }
    catch (error){
        console.log(error);
    }
});