let coiffeurs = null;
let coiffeursFiltres = null;
async function genererCoiffeurs(data) {
    console.log(data)
    let html = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i]) { // Vérifiez si data[i] est défini
            const salonInfo = await obtenirinfoSalon(data[i].idSalon);
            const nomSalon = salonInfo.nom;
            html += `<div class="column is-3 is-4-tablet is-12-mobile">
                <div class="card large">
                      <div class="card-image">
                          <figure class="image is-square">
                              <img src="${data[i].imageURL}" alt="Image de ${data[i].nom}">
                          </figure>
                      </div>
                      <div class="card-content">
                              <div class="content">
                                  <p class="title is-4 no-padding">${data[i].prenom} ${data[i].nom}</p>
                                  <p class="subtitle is-6"><strong>Numéro de téléphone:</strong> ${data[i].numTelephone}</p>
                                  <p class="subtitle is-6"><strong>Salon:</strong> ${nomSalon}</p>
                                  <p class="subtitle is-6"><strong>Disponibilite:</strong> ${data[i].Disponibilite}</p>
                              </div>
                      </div>
                  </div>
            </div>`;
        }
    }
    return html;
}


async function obtenirIdSalon(idCoiffeur) {
    const response = await fetch(`/getProfilCoiffeur/${idCoiffeur}`); // 
    if (response.ok) {
        const coiffeur = await response.json();
        const idSalon = coiffeur[0].idSalon;
        return await idSalon;
    } else {
        console.error('Erreur lors de la récupération de l\'ID du salon');
        return null;
    }
  }
  
async function obtenirinfoSalon(idSalon) {
    const response = await fetch(`/getSalons/${idSalon}`); 
    if (response.ok) {
        const salon = await response.json();
        const nomSalon = salon[0].nom
        return { nom: nomSalon}; // Retourne à la fois le nom et l'adresse
    } else {
        console.error('Erreur lors de la récupération du nom du salon');
        return { nom: 'Salon inconnu'}; // Valeur par défaut en cas d'erreur
    }
  }


async function filtrerEnTempsReel() {
    const nomCoiffeur = document.getElementById("filterNom").value.toLowerCase();
    coiffeursFiltres = coiffeurs.filter(
        coiffeur => coiffeur.nom.toLowerCase().includes(nomCoiffeur)
    );
    const html = await genererCoiffeurs(coiffeursFiltres); // Attendre la résolution de la promesse
    document.getElementById("coiffeurs").innerHTML = html;}


async function obtenirCoiffeurs() {
    const url = "/getCoiffeur";
    const response = await fetch(url);
    if (response.ok) {
        coiffeurs = await response.json();
        coiffeursFiltres = coiffeurs;
        filtrerEnTempsReel();
    } else {
        console.log(response.statusText);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obtenirCoiffeurs();
    document.getElementById("filterNom").addEventListener("input", filtrerEnTempsReel);
});

