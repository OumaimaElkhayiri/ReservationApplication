document.getElementById('btnConnexion').addEventListener('click', async (event) => {
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const isCoiffeur = document.getElementById('estCoiffeur').checked

  let loginRoute
  if (isCoiffeur) {
    loginRoute = '/loginCoiffeur'
  } else {
    loginRoute = '/loginClient'
  }

  // Perform login request to get JWT token
  const response = await fetch(loginRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (response.ok) {
    const data = await response.json()
    console.log(data)
    sessionStorage.setItem('token', data.token)
    
    console.log(isCoiffeur)
    if (isCoiffeur) {
      sessionStorage.setItem('idCoiffeur', data.idCoiffeur)
    } else {
      sessionStorage.setItem('idClient', data.idClient)
    }
    const token = sessionStorage.getItem('token')
    console.log('Token:', token)

    // Fetch protected data using token
    const bearerToken = 'Bearer ' + token
    console.log(bearerToken)

    const protectedResponse = await fetch('/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      }
    })

    if (protectedResponse.ok) {
      if (isCoiffeur) {
        window.location.href = `/profilCoiffeur/${ sessionStorage.getItem('idCoiffeur')}`
      } else {
        window.location.href = '/accueilClient'
      }
    } else {
      console.log('Failed to fetch protected data:', protectedResponse)
    }
  } else {
    console.error('Failed to login:', response.statusText)
  }
})
