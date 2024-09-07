document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form')
  console.log(form)

  form.addEventListener('submit', async function (event) {
    event.preventDefault()

    const datereservation = document.querySelector('input[name="datereservation"]').value
    const Heure = document.querySelector('select[id="time"]').value
    const Coiffeur = document.querySelector('select[name="idCoiffeur"]').value
    const Client = sessionStorage.getItem('idClient') // Get the client ID from sessionStorage
    const Coiffure = document.querySelector('select[name="typeCoiffure"]').value

    const prix = await obtenirPrixCoiffure(Coiffure);
    console.log('Prix de la coiffure:', prix);

    const formData = {
      datereservation,
      Heure,
      idCoiffeur: Coiffeur,
      idClient: Client,
      idTypeCoiffure: Coiffure
    }

    console.log(JSON.stringify(formData))

    fetch('/nouvelleReservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Réservation confirmé')
          return response.json() // Parse response body as JSON
        } else {
          throw new Error('Erreur lors de la creation de la reservation')
        }
      })
      .then(data => {
        // Check if the response contains reload instruction
        if (data.reload) {
          // Reload the page
          window.location.reload()
        }
      })
      .catch(error => {
        console.error('Erreur de connexion :', error)
      })
  })
})

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
    console.log(coiffure)
    const nomTypeCoiffure = coiffure[0].nomCoiffure
    console.log(nomTypeCoiffure)
    return await nomTypeCoiffure
  }
}

async function obtenirPrixCoiffure (idTypeCoiffure) {
  const response = await fetch(`/getTransactions/${idTypeCoiffure}`)
  if (response.ok) {
    const transaction = await response.json()
    const prix = transaction[0].prix
    console.log(prix)
    alert('le prix de la coiffure est : ' + prix)
    return await prix
  }
}


obtenirPrixCoiffure()

function afficherNavbar () {
  const token = sessionStorage.getItem('token')
  if (token) {
    document.getElementById('btnConnexion').textContent = 'Déconnexion'
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

afficherNavbar()
