// Si on est pas connected et qu'on clique sur reservation

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
