const idReservation = window.location.search.split('=')[1];
console.log(idReservation)

document.addEventListener('DOMContentLoaded',  function () {
  const form = document.querySelector('form');
  console.log(form)

  document.getElementById('btnModifier').addEventListener('click', async function (event) {
    event.preventDefault();

    const datereservation = document.querySelector('input[name="datereservation"]').value
    const Heure = document.querySelector('input[name="time"]').value
    const Coiffeur = document.querySelector('select[name="idCoiffeur"]').value
    const Coiffure = document.querySelector('select[name="typeCoiffure"]').value

    const formData = {
      datereservation: datereservation,
      Heure: Heure,
      idCoiffeur: Coiffeur,
      idTypeCoiffure: Coiffure
    };

    console.log(JSON.stringify(formData));

    await fetch(`/modificationReservation/${idReservation}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Réservation modifie');
          return response.json(); // Parse response body as JSON
        } else {
          throw new Error('Erreur lors de la modification de la reservation');
        }
      })
  });
});

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

afficherNavbar()