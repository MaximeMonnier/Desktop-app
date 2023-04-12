// const { remote } = require("electron")

// const Product = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

const vehiculeList = document.querySelector("#vehiculeList");

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
  vehicules.forEach((vehicule) => {
    if (vehicule.statut == 0) {
      vehicule.statut = "emprunté"
    }
    vehiculeList.innerHTML +=`
      <div class="flex w-full justify-between mb-5">
        <span class="w-1/4">${vehicule.plaque}</span>
        <span class="w-1/4">${vehicule.date}</span>
        <span class="w-1/4">${vehicule.statut}</span>
        <span class="w-1/4">${vehicule.prenom} ${vehicule.nom}</span>
      </div>
      `
    });
}