const userController = require("../../app/controller/userController");

const form = document.querySelector("#signupForm");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");

if (sessionStorage.getItem('user')) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
} else {
  exitSpan.textContent = "Veuillez vous connecter";
}

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    //initialiser les valeurs pour la table stockage
    const formData = {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value
    };

    console.log(formData);

    //requete envoyé au controller avec les données de stockage quis era passé au constructeur du model Product
    await userController.addOne(formData);
    // document.location.href = "index.html";
  }

  catch (error){
    console.log(error);
  }
});