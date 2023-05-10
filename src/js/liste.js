// const { remote } = require("electron")

// const Product = require("../js/main")

const vehiculeController = require("../../app/controller/vehiculeController");

const list = document.querySelector("#data");

const getData = async () => {
    allVehicule = await vehiculeController.findAll();
    return allVehicule;
}

// async function init() {
//     getData();
// }

// init();

getData();

function renderList(vehicules) {
vehicules.forEach((vehicule) => {
    list.innerHTML += `
        <tr>
        <td class="flex justify-center items-center"><img class="w-28 h-20 mt-4" src="./assets/img/camion_DHL.jpg" alt="camion dhl"></td>
        <td><p class="flex justify-center items-center">${vehicule.plaque}</p></td>
        <td><p class="flex justify-center items-center">${vehicule.date}</p></td>
        <td><p class="flex justify-center items-center">${vehicule.statut}</p></td>
        <td><p class="flex justify-center items-center">${vehicule.nom}${vehicule.prenom}</p></td>
        <td>
            <div class="flex justify-center items-center">
                <a href="./modifier.html"><i class="fi fi-rr-pencil"></i></a>
                <a href="./supprimer.html"><i class="fi fi-sr-trash"></i></a>
            </div>
        </td>
    </tr>
        `
    });
}