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

document.getElementById('reservations').addEventListener('click', async (event) => {
  const token = sessionStorage.getItem('token')
  const bearerToken = 'Bearer ' + token
  console.log(bearerToken)
  const protectedResponse = await fetch('/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken
    }
  })
  console.log(protectedResponse)
  if (protectedResponse.ok) {
    window.location.href = '/prise_rdv'
  } else {
    window.location.href = '/connexion'
  }
}
)
