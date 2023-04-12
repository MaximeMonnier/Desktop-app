// const { remote } = require("electron")

// const main = require("../js/main")

const productContoller = require("../../app/controller/productContoller");

const list = document.querySelector("#data");
const formulaire = document.querySelector("#AjoutForm");
const type = document.querySelector("#typepiece");
const nom = document.querySelector("#nom")
const marque = document.querySelector("#marque");
const prix = document.querySelector("#prix");
const stock = document.querySelector("#stock");
const desc = document.querySelector("#description");

let modificationId;

const getData = async () => {
    listeData = await productContoller.findAll();
    renderList(listeData);
}

async function init() {
    getData();
}

init();

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
                <button class="btn btn-secondary btn-sm" onclick="Modifie(${produit.id})">Modifier</button>
            </td>
        </tr>`
    });
}
const Modifie = async (id) => {

    const stockage = await productContoller.findOne(id);
    console.log(stockage)
    type.value = stockage.type_piece;
    nom.value = stockage.nom;
    marque.value = stockage.marque;
    prix.value = stockage.prix;
    stock.value = stockage.stock;
    desc.value = stockage.description;

    modificationId = stockage.id;
};

AjoutForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        //initialiser les valeurs INPUT VS champ table stockage
        const stockage = {
            type_piece: type.value,
            nom: nom.value,
            marque: marque.value,
            prix: prix.value,
            description: desc.value,
            stock: stock.value,
            //on ajoute la propiété ID à l'objet afin de faire la modification dans la bdd
            id: modificationId
        };
        //demande de promese vers le main
        const Modifier = await productContoller.edit(stockage);
        console.log(Modifier);
        document.location.href = "modifier.html";

    } catch (error) {
        console.log(error);
    }

});