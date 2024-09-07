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

async function getClientData (idClient) {
  try {
    const response = await fetch(`/getClient/${idClient}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log(response)
      const clientData = await response.json()
      console.log(clientData)
      return clientData[0] // Return the first item in the response array
    } else {
      console.error('Failed to fetch client data:', response.statusText)
      return null // Return null if the fetch failed
    }
  } catch (error) {
    console.error('Error fetching client data:', error)
    return null // Return null if an exception occurs
  }
}

async function displayClientData () {
  const idClient = sessionStorage.getItem('idClient') // Get the client ID from sessionStorage
  console.log(idClient)
  if (idClient) {
    const clientData = await getClientData(idClient) // Fetch client data using the corrected function
    if (clientData) {
      // Fill the form with client data
      document.getElementById('inputPrenom').value = clientData.prenom || ''
      document.getElementById('inputNom').value = clientData.nom || ''
      document.getElementById('inputUsername').value = clientData.username || ''
      document.getElementById('inputTelephone').value = clientData.numTelephone || ''
      document.getElementById('inputMDP').value = clientData.motDePasse || ''
    } else {
      console.error('No client data found for the provided ID.')
    }
  } else {
    console.error('Client ID not found in sessionStorage.')
  }
}

getClientData()
displayClientData()
