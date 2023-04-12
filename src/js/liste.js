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
    vehiculeList.innerHTML +=`
        <p>${vehicule.nom}</p>
      `
    });
}