// const { remote } = require("electron")

// const Product = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

const vehiculeList = document.querySelector("#vehiculeList");
const dispoSpan = document.querySelector("#dispo");
const totalSpan = document.querySelector("#total");
const firstNameSpan = document.querySelector("#userFirstName");
const lastNameSpan = document.querySelector("#userLastName");
const exitSpan = document.querySelector("#userExit");
const goEdit = document.querySelector("#goEdit");
const goDelete = document.querySelector("#goDelete");

const user = JSON.parse(sessionStorage.getItem('user'));

if (user) {
  console.log(user);
  firstNameSpan.textContent = user.firstname;
  lastNameSpan.textContent = user.lastName;
} else {
  document.location.href = 'connect.html'
  exitSpan.textContent = "Veuillez vous connecter";
}
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

getData();

function renderList(vehicules) {

  let dispo = 0;

  vehicules.forEach((vehicule) => {
    console.log(vehicule)
    if (vehicule.statut == 0) {
      vehicule.statut = "emprunté";
    } else {
      vehicule.statut = "retourné";
      dispo++;
    }

    const row = document.createElement('div');
    row.setAttribute('id', `vehicule${vehicule.id}`)
    row.classList.add('flex', 'w-full', 'justify-between', 'mb-5');
    row.innerHTML = `
      <span class="w-1/5">${vehicule.plaque}</span>
      <span class="w-1/5">${vehicule.date.toLocaleDateString('fr-FR')}</span>
      <span class="w-1/5">${vehicule.statut}</span>
      <span class="w-1/5">${vehicule.prenom} ${vehicule.nom}</span>
    `
    const actionsRow = document.createElement('div');
    actionsRow.classList.add('w-1/5');

    if(vehicule.prenom+vehicule.nom === user.lastName+user.firstname) {

      const editBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

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

    // vehiculeList.innerHTML +=`
    //   <div class="flex w-full justify-between mb-5">
    //     <span class="w-1/5">${vehicule.plaque}</span>
    //     <span class="w-1/5">${vehicule.date}</span>
    //     <span class="w-1/5">${vehicule.statut}</span>
    //     <span class="w-1/5">${vehicule.prenom} ${vehicule.nom}</span>
    //     ${vehicule.prenom+vehicule.nom === "HarryPotter" ? 
    //       `<div class="w-1/5"> <button id="goEdit" type="button">Modifier</button> <button id="goDelete" type="button">Supprimer</button></div>`
    //     : 
    //       `<span class="w-1/5">none</span>`
    //     }
    //   </div>
    //   `
    });

    dispoSpan.textContent = dispo;
    totalSpan.textContent = vehicules.length;

    // goEdit.addEventListener("click", async (e) => {
    //   e.preventDefault();
    //   console.log("cliked");
    // })
}

