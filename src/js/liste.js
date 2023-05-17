// Récupération du controlleur de véhicule
const vehiculeController = require("../../app/controller/vehiculeController");

//Accès au différents éléments HTML de la vue
const vehiculeList = document.querySelector("#vehiculeList");
const dispoSpan = document.querySelector("#dispo");
const totalSpan = document.querySelector("#total");
const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");
const goEdit = document.querySelector("#goEdit");
const goDelete = document.querySelector("#goDelete");

//Récupération de l'utilisateur connecté
const user = JSON.parse(sessionStorage.getItem('user'));

// si l'utilisateur est connecté on récupère ses informations à afficher dans le menu
if (user) {
  console.log(user);
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
} else {
  //Sinon on redirige l'utilisateur à la page de connexion
  document.location.href = 'connect.html'
  exitSpan.textContent = "Veuillez vous connecter";
}

//Fonction permettant de récupérer les informations des véhicules et les afficher
const getData = async () => {
    allVehicules = await vehiculeController.findAll();
    
    renderList(allVehicules);
    exitSpan.addEventListener("click", (e) => {
      sessionStorage.removeItem('user');
      document.location.href = 'connect.html'

    })
}

// async function init() {
//     getData();
// }

// init();

// Appelle dela fonction getData
getData();

// Fonction permettant de mettre en forme les données récupérées du controlleur
function renderList(vehicules) {

  let dispo = 0;

  // compte des véhicules disponibles
  vehicules.forEach((vehicule) => {
    console.log(vehicule)
    if (vehicule.statut == 0) {
      vehicule.statut = "emprunté";
    } else {
      vehicule.statut = "retourné";
      dispo++;
    }
    //création des éléments HTML pour la mise en forme des éléments liés à un véhicule
    const row = document.createElement('div');
    // On a joute un id à chaque div en fonction de l'ID du véhicule 
    row.setAttribute('id', `vehicule${vehicule.id}`);
    //Ajout des classes CSS de tailwind

    row.classList.add('flex', 'w-full', 'justify-between', 'mb-5');
    // Insertion des données HTML
    row.innerHTML = `
      <span class="w-1/5">${vehicule.plaque}</span>
      <span class="w-1/5">${vehicule.date.toLocaleDateString('fr-FR')}</span>
      <span class="w-1/5">${vehicule.statut}</span>
      <span class="w-1/5">${vehicule.prenom} ${vehicule.nom}</span>
    `
    const actionsRow = document.createElement('div');
    actionsRow.classList.add('w-1/5');

    // Compare si l'utilisateur connecté est l'utilisateur affiché sur la ligne de véhicule
    if(vehicule.prenom+vehicule.nom === user.lastName+user.firstname) {

      const editBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      // ajout des boutons pour la modification et la suppression
      editBtn.textContent = "Modifier";
      deleteBtn.textContent = "Delete";
      editBtn.className = "mr-2";
      editBtn.addEventListener("click", (e) => {
        sessionStorage.setItem("vehicule", JSON.stringify(vehicule));
        document.location.href = "modifier.html";

      });

      deleteBtn.addEventListener("click", (e) => {
        console.log("clicked delete");
        document.getElementById(`vehicule${vehicule.id}`).remove();
        vehiculeController.delete(vehicule);
      });

      actionsRow.appendChild(editBtn);
      actionsRow.appendChild(deleteBtn);

    } else {

      const noneSpan = document.createElement('span');

      noneSpan.textContent = 'none';
      actionsRow.appendChild(noneSpan);

    }
    row.appendChild(actionsRow);
    vehiculeList.appendChild(row);

    });

    dispoSpan.textContent = dispo;
    totalSpan.textContent = vehicules.length;

}

