// const { remote } = require("electron")

// const Product = require("../js/main")

const productContollermysql = require("../../app/controller/productContollermysql");

const list = document.querySelector("#data");

const getData = async () => {
    allProducts = await productContollermysql.findAll();
    renderList(allProducts);
}

// async function init() {
//     getData();
// }

// init();

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
        </tr>`
    });
}