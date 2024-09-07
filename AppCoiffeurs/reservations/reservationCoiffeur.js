let tableResults = document.getElementById('tableResults');


async function getReservations(id, datereservation, Heure, idCoiffeur, idClient, idTypeCoiffure) {
    let nombreLignes = tableResults.rows.length;
    let nouvelleLigne = tableResults.insertRow(nombreLignes);

    nouvelleLigne.insertCell(0).textContent = id;
    nouvelleLigne.insertCell(1).textContent = datereservation;
    nouvelleLigne.insertCell(2).textContent = Heure;
    nouvelleLigne.insertCell(3).textContent = idCoiffeur;
    nouvelleLigne.insertCell(4).textContent = idClient;
    nouvelleLigne.insertCell(5).textContent = idTypeCoiffure;
}

// Affiche les reviews des coiffeurs
async function chargerReservations() {
    const response = await fetch('/reservation')
    if (response.ok) {
        const reservations = await response.json();
        reservations.forEach((reservation) => {
            getReservations(
                reservation.idReservation, 
                reservation.datereservation, 
                reservation.Heure, 
                reservation.idCoiffeur, 
                reservation.idClient,
                reservation.idTypeCoiffure
            );
        });
    } else {
        throw new Error ("Erreur lors de la récupération des reviews");
    }
}


function afficherNavbar () {
    const token = sessionStorage.getItem('token')
    if (token) {
      document.getElementById('btnConnexion').textContent = 'Déconnexion'
      document.getElementById('btnCreationCompte').style.visibility = 'hidden'
    } else {
      document.getElementById('btnCreationCompte').style.visibility = 'visible'
    }
    const btnDeconnexion = document.getElementById('btnConnexion')
    btnDeconnexion.addEventListener('click', function () {
      if (token) {
        sessionStorage.removeItem('token')
        window.location.href = '/Acceuil'
      } else {
        window.location.href = '/Acceuil'
      }
    })
  }

chargerReservations();
afficherNavbar();





