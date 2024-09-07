async function genererCartes (reservations) {
  const carteContainer = document.getElementById('reservationinfo')

  for (const reservation of reservations) {
    const coiffeurPrenom = await obtenirPrenomCoiffeur(reservation.idCoiffeur)
    const coiffeurNom = await obtenirNomCoiffeur(reservation.idCoiffeur)
    const nomCoiffure = await obtenirNomTypeCoiffure(reservation.idTypeCoiffure)
    const datereservation = reservation.datereservation
    const Heure = reservation.Heure
    const salonInfo = await obtenirinfoSalon(await obtenirIdSalon(reservation.idCoiffeur)) // Utilisation directe de obtenirNomSalon
    const nomSalon = salonInfo.nom
    const adresseSalon = salonInfo.adresse
    const adresseCourriel = salonInfo.adresseCourriel
    const idReservation = reservation.idReservation

    const carteHTML = `
      <div class="card reservation-card">
          <header class="card-header">
              <p class="card-header-title">
                  RÉSERVATION: ${idReservation}
              </p>
          </header>
          <div class="card-content">
              <div class="content">
                  <p><strong>Coiffeur:  </strong>${coiffeurPrenom} ${coiffeurNom}</p>
                  <p><strong>Style de coiffure:  </strong>${nomCoiffure}</p>
                  <p><strong>Date reservation:  </strong>${datereservation}</p>
                  <p><strong>Durée de la réservation:  </strong>${Heure}</p>
                  <p><strong> Salon: </strong>${nomSalon} <br> <strong>adresse:</strong> ${adresseSalon} <br> <strong>Email: </strong> ${adresseCourriel}</p>

              </div>
              <div class="card-footer">
                  <a class="card-footer-item" id="btnModifier${idReservation}">Modifier la réservation</a>
                  <a class="card-footer-item annuler-reservation" id="btnDeleteReservation${idReservation}">Annuler la réservation</a>
                  <a class="card-footer-item prendre-reservation" id="prendreReservation${idReservation}">Prendre un nouveau rendez-vous</a>
              </div>
          </div>
      </div>`

    carteContainer.insertAdjacentElement('beforeend', document.createRange().createContextualFragment(carteHTML).firstElementChild)

    const btnModifier = document.getElementById(`btnModifier${idReservation}`)
    btnModifier.addEventListener('click', () => {
      EnvoieModReservation(idReservation)
    })

    const btnDeleteReservation = document.getElementById(`btnDeleteReservation${idReservation}`)
    btnDeleteReservation.addEventListener('click', () => {
      SupprimerReservation(idReservation)
    })

    const prendreReservation = document.getElementById(`prendreReservation${idReservation}`)
    prendreReservation.addEventListener('click', () => {
      EnvoiePrendreRendezVous()
    })

    console.log(idReservation)
  }
}

async function EnvoieModReservation (idReservation) {
  window.location.href = `/ModifierReservation?idReservation=${idReservation}`
}

async function EnvoiePrendreRendezVous () {
  window.location.href = '/prise_rdv'
}

async function SupprimerReservation (idReservation) {
  const response = await fetch(`/supprimerReservation/${idReservation}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const message = await response.json()
    console.log(message)
    alert('La réservation a été annulée avec succès')
    window.location.reload()
  }
}

async function obtenirIdSalon (idCoiffeur) {
  const response = await fetch(`/getProfilCoiffeur/${idCoiffeur}`) //
  if (response.ok) {
    const coiffeur = await response.json()
    const idSalon = coiffeur[0].idSalon
    return await idSalon
  } else {
    console.error('Erreur lors de la récupération de l\'ID du salon')
    return null
  }
}

async function obtenirinfoSalon (idSalon) {
  const response = await fetch(`/getSalons/${idSalon}`)
  if (response.ok) {
    const salon = await response.json()
    const nomSalon = salon[0].nom
    const adresseSalon = salon[0].adresse
    const adresseCourriel = salon[0].adresseCourriel
    return { nom: nomSalon, adresse: adresseSalon, adresseCourriel } // Retourne à la fois le nom et l'adresse
  } else {
    console.error('Erreur lors de la récupération du nom du salon')
    return { nom: 'Salon inconnu', adresse: 'Adresse inconnue', adresseCourriel: 'Email inconuue' } // Valeur par défaut en cas d'erreur
  }
}

async function obtenirNomCoiffeur (idCoiffeur) {
  const response = await fetch(`/getProfilCoiffeur/${idCoiffeur}`)
  if (response.ok) {
    const coiffeur = await response.json()
    const nomCoiffeur = coiffeur[0].nom
    return await nomCoiffeur
  }
}

async function obtenirPrenomCoiffeur (idCoiffeur) {
  const response = await fetch(`/getProfilCoiffeur/${idCoiffeur}`)
  if (response.ok) {
    const coiffeur = await response.json()
    const prenomCoiffeur = coiffeur[0].prenom
    return await prenomCoiffeur
  }
}

async function obtenirNomTypeCoiffure (idTypeCoiffure) {
  const response = await fetch(`/getTypeCoiffure/${idTypeCoiffure}`)
  if (response.ok) {
    const coiffure = await response.json()
    const nomTypeCoiffure = coiffure[0].nomCoiffure
    return await nomTypeCoiffure
  }
}

async function obtenirReservations () {
  const idClient = sessionStorage.getItem('idClient') // Get the client ID from sessionStorage
  const url = `/reservation/${idClient}`

  const response = await fetch(url)
  if (response.ok) {
    const reservations = await response.json()
    genererCartes(reservations)
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

document.addEventListener("DOMContentLoaded", () => {
  obtenirReservations();
  afficherNavbar();
})
