console.log('haiiii')
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form')
  console.log(form)
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    /*
    const prenom = document.querySelector('input[name="prenom"]').value
    const nom = document.querySelector('input[name="nom"]').value
    const username = document.querySelector('input[name="username"]').value
    const telephone = document.querySelector('input[name="telephone"]').value
    const motDePasse = document.querySelector('input[name="motDePasse"]').value
    const estCoiffeur = document.querySelector('input[name="estCoiffeur"]').checked
    const salonID = document.querySelector('input[name=idSalon]').value
    */
    const prenom = document.getElementById('prenom').value
    const nom = document.getElementById('nom').value
    const username = document.getElementById('username').value
    const telephone = document.getElementById('telephone').value
    const motDePasse = document.getElementById('motDePasse').value
    const estCoiffeur = document.getElementById('estCoiffeur').checked
    const salonID = document.getElementById('idSalon').value
    const disponibilites = document.getElementById('disponibilites').value

    const formDataCoiffeur = {
      prenom,
      nom,
      username,
      "numTelephone": telephone,
      motDePasse,
      estCoiffeur,
      salonID,
      disponibilites
    }
    console.log(JSON.stringify(formDataCoiffeur))

    const formDataClient = {
      prenom,
      nom,
      username,
      numTelephone: telephone,
      motDePasse,
      "estCoiffeur": "false",
    }
    console.log(JSON.stringify(formDataClient))

    if (estCoiffeur) {
      fetch('/creationCompteCoiffeur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataCoiffeur)
      })
        .then(response => {
          if (response.ok) {
            console.log('Compte créé avec succès !')
          } else {
            console.error('Erreur lors de la création du compte.')
          }
        })
        .catch(error => {
          console.error('Erreur de connexion :', error)
        })
    } else {
      fetch('/creationCompteClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataClient)
      })
        .then(response => {
          if (response.ok) {
            console.log('Compte créé avec succès !')
          } else {
            console.error('Erreur lors de la création du compte.')
          }
        })
        .catch(error => {
          console.error('Erreur de connexion :', error)
        })
    }
  })
})
