// const { remote } = require("electron")

// const Product = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

const vehiculeList = document.querySelector("#vehiculeList");
const dispoSpan = document.querySelector("#dispo");
const totalSpan = document.querySelector("#total");
const goEdit = document.querySelector("#goEdit");
const goDelete = document.querySelector("#goDelete");

const getData = async () => {
    allVehicules = await vehiculeController.findAll();
    
    renderList(allVehicules);
}

// async function init() {
//     getData();
// }

// init();

getData();

function renderList(vehicules) {

  let dispo = 0;

  vehicules.forEach((vehicule) => {
    if (vehicule.statut == 0) {
      vehicule.statut = "emprunté";
    } else {
      vehicule.statut = "retourné";
      dispo++;
    }

    const row = document.createElement('div');
    row.classList.add('flex', 'w-full', 'justify-between', 'mb-5');
    row.innerHTML = `
    <div class="flex w-full justify-between mb-5">
      <span class="w-1/5">${vehicule.plaque}</span>
      <span class="w-1/5">${vehicule.date}</span>
      <span class="w-1/5">${vehicule.statut}</span>
      <span class="w-1/5">${vehicule.prenom} ${vehicule.nom}</span>
      <div id="actionsDiv" class="w-1/5"> </div>
    </div>
    `
    const actionsRow = document.createElement('div');
    actionsRow.classList.add('w-1/5');

    if(vehicule.prenom+vehicule.nom === "HarryPotter") {

      const editBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      editBtn.textContent = "Modifier";
      deleteBtn.textContent = "Delete";
      editBtn.className = "mr-2";
      editBtn.addEventListener("click", (e) => {
        document.location.href = "modifier.html";

      });

      deleteBtn.addEventListener("click", (e) => {
        console.log("clicked");
      });

      actionsRow.appendChild(editBtn);
      actionsRow.appendChild(deleteBtn);

    } else {

      const noneSpan = document.createElement('span');

      noneSpan.textContent = 'none';
      actionsRow.appendChild(noneSpan);

    }

    row.appendChild(actionsRow)
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

