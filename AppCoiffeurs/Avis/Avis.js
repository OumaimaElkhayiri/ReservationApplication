const tableResults = document.getElementById('tableResults')

async function getReviews (id, idClient, idCoiffeur, note, review) {
  const nombreLignes = tableResults.rows.length
  const nouvelleLigne = tableResults.insertRow(nombreLignes)

  nouvelleLigne.insertCell(0).textContent = id
  nouvelleLigne.insertCell(1).textContent = idClient
  nouvelleLigne.insertCell(2).textContent = idCoiffeur
  nouvelleLigne.insertCell(3).textContent = note
  nouvelleLigne.insertCell(4).textContent = review
}

// Affiche les reviews des coiffeurs
async function chargerReviews () {
  const response = await fetch('/avisCoiffeurData')
  if (response.ok) {
    const reviews = await response.json()
    reviews.forEach((avis) => {
      getReviews(
        avis.idAvis,
        avis.idClient,
        avis.idCoiffeur,
        avis.note,
        avis.review
      )
    })
  } else {
    throw new Error('Erreur lors de la récupération des reviews')
  }
}

chargerReviews()

