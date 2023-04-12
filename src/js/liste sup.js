const productContollermysql = require("../../app/controller/productContollermysql");

// const { remote } = require("electron")

// const main = require("../js/main")

const list = document.querySelector("#data");

const getData = async () => {
    listeProduits = await productContollermysql.findAll();
    renderList(listeProduits);
}

// async function init() {
//     getData();
// }

getData();

function renderList(produits) {
  produits.forEach((produit) => {
        list.innerHTML += `
        <tr>
            <td>${produit.id}</td>
            <td>${produit.type_piece}</td>
            <td>${produit.nom}</td>
            <td>${produit.marque}</td>
            <td>${produit.prix}</td>
            <td>${produit.description}</td>
            <td>${produit.stock}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="Supprime(${produit.id})">Supprimer</button>
            </td>
        </tr>`
    });
}
const Supprime = async (id) => {
    const reponse = confirm("Vous confirmez?");
    if (reponse) {
        await productContollermysql.delete(id);
        document.location.href="supprimer.html";
    }
    else {
       console.error();
    }
    return;
};