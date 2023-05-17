const userController = require("../../app/controller/userController");

const form = document.querySelector("#connectForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");
const indexLink = document.querySelector("#indexLink");
const addLink = document.querySelector("#addLink");

if (sessionStorage.getItem('user')) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
  if (sessionStorage.getItem('user')) document.location.href = 'index.html';
} else {
  indexLink.setAttribute('disabled', '');
  addLink.setAttribute('disabled', '');
  exitSpan.textContent = "Veuillez vous connecter";
}

form.addEventListener("submit", async (e) => {
  try {
    console.log(email.value)
    e.preventDefault();
    //initialiser les valeurs pour la table stockage
    const formData = {
      email: email.value,
      password: password.value
    };

    //requete envoyé au controller avec les données de stockage qui sera passé au constructeur du model Vehicule
    const user = await userController.login(formData);
    if (user.email === email.value) {
      sessionStorage.setItem('user', JSON.stringify(user))
      document.location.href = "index.html";
    };

  }

  catch (error){
    console.log(error);
  }
});