// const main = require("../js/main")

const productContollermysql = require("../../app/controller/productContollermysql");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const type = document.querySelector("#typepiece");
const nom = document.querySelector("#nom")
const marque = document.querySelector("#marque");
const prix = document.querySelector("#prix");
const stock = document.querySelector("#stock");
const desc = document.querySelector("#description");

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table stockage
        const stockage = {
            type_piece: type.value,
            nom: nom.value,
            marque: marque.value,
            prix: prix.value,
            description: desc.value,
            stock: stock.value,
        };
        //requete envoyé au controller avec les données de stockage quis era passé au constructeur du model Product
        await productContollermysql.addOne(stockage);
        document.location.href = "index.html";
    }
    catch (error){
        console.log(error);
    }
});