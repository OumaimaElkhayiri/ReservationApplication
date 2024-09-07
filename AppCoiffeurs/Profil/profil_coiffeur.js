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


function changePicture() {
    // Trigger click event on file input element
    document.getElementById('fileInput').click();
}

function changePhoto() {
    const fileInput = document.getElementById('fileInput');
    const imageURL = document.getElementById('imageURL');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Update image source with selected file
            imageURL.src = e.target.result;
        }

        // Read the selected file as Data URL
        reader.readAsDataURL(fileInput.files[0]);
    }
}
changePicture()
changePhoto()


async function getCoiffeurData (idCoiffeur) {
    try {
        const response = await fetch(`/getProfilCoiffeur/${idCoiffeur}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log(response)
        const coiffeurData = await response.json()
        console.log(coiffeurData)
        return coiffeurData[0] // Return the first item in the response array
    } else {
        console.error('Failed to fetch coiffeur data:', response.statusText)
        return null // Return null if the fetch failed
    }
    } catch (error) {
        console.error('Error fetching coiffeur data:', error)
      return null // Return null if an exception occurs
    }
}

getCoiffeurData()


async function displayCoiffeurData () {
    const idCoiffeur = sessionStorage.getItem('idCoiffeur') // Get the coiffeur ID from sessionStorage
    console.log(idCoiffeur)
    if (idCoiffeur) {
      const coiffeurData = await getCoiffeurData(idCoiffeur) // Fetch coiffeur data using the corrected function
        if (coiffeurData) {
            // Fill the form with coiffeur data
            document.getElementById('prenom').value = coiffeurData.prenom || ''
            document.getElementById('nom').value = coiffeurData.nom || ''
            document.getElementById('username').value = coiffeurData.username || ''
            document.getElementById('numTelephone').value = coiffeurData.numTelephone || ''
            document.getElementById('motDePasse').value = coiffeurData.motDePasse || ''
            document.getElementById('idSalon').value = coiffeurData.idSalon || ''
            document.getElementById('Disponibilite').value = coiffeurData.Disponibilite || ''
            document.getElementById('imageURL').value = coiffeurData.imageURL || ''
    } else {
        console.error('No coiffeur data found for the provided ID.')
    }
    } else {
        console.error('Coiffeur ID not found in sessionStorage.')
    }
}

displayCoiffeurData()




/*
async function chargerReviews() {
    try {
      const response = await fetch('/avisCoiffeurData'); // Assurez-vous d'ajuster l'URL en fonction de votre configuration serveur
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des avis');
        }
        const reviews = await response.json();
        const avisContainer = document.getElementById('avis-container');
      avisContainer.innerHTML = ''; // Effacer le contenu existant

      // Créer un tableau pour afficher les avis
        const table = document.createElement('table');
      table.classList.add('table', 'is-fullwidth'); // Ajouter des classes pour styliser le tableau

      // Créer l'en-tête du tableau
        const tableHead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const thClient = document.createElement('th');
        thClient.textContent = 'Client';
        const thReview = document.createElement('th');
        thReview.textContent = 'Avis';
        headRow.appendChild(thClient);
        headRow.appendChild(thReview);
        tableHead.appendChild(headRow);
        table.appendChild(tableHead);

      // Créer le corps du tableau avec les données des avis
        const tableBody = document.createElement('tbody');
        reviews.forEach(avis => {
            const row = document.createElement('tr');
            const cellClient = document.createElement('td');
            cellClient.textContent = `Client ${avis.idClient}`;
            const cellReview = document.createElement('td');
            cellReview.textContent = avis.review;
            row.appendChild(cellClient);
            row.appendChild(cellReview);
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);

      // Ajouter le tableau au conteneur des avis
        avisContainer.appendChild(table);
    } catch (error) {
        console.error(error);
    }
}

// Appeler la fonction pour charger les avis lors du chargement de la page
window.onload = chargerReviews;

*/

/*
let tableResults = document.getElementById('tableResults');

async function getReviews(id, idClient, idCoiffeur, note, review) {
    let nombreLignes = tableResults.rows.length;
    let nouvelleLigne = tableResults.insertRow(nombreLignes);

    nouvelleLigne.insertCell(0).textContent = id;
    nouvelleLigne.insertCell(1).textContent = idClient;
    nouvelleLigne.insertCell(2).textContent = idCoiffeur;
    nouvelleLigne.insertCell(3).textContent = note;
    nouvelleLigne.insertCell(4).textContent = review;
}

// Affiche des reviews 
async function chargerReviews() {
    const response = await fetch('/avisCoiffeurData')
    if (response.ok) {
        const reviews = await response.json();
        reviews.forEach((avis) => {
            getReviews(
                avis.idAvis, 
                avis.idClient, 
                avis.idCoiffeur, 
                avis.note, 
                avis.review
            );
        });
    } else {
        throw new Error ("Erreur lors de la récupération des reviews");
    }
}

chargerReviews();
*/

//1 JavaScript pour récupérer et afficher les avis depuis la base de données
async function getCoiffeurReviews(idCoiffeur) {
    try {
        const response = await fetch(`/avisCoiffeurData/${idCoiffeur}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const reviewsData = await response.json();
            const reviewsContainer = document.getElementById('reviews-list');

            // Clear previous reviews
            reviewsContainer.innerHTML = '';

            // Display each review
            reviewsData.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review-item');

                // Create elements for review details
                const reviewRating = document.createElement('p');
                reviewRating.textContent = `Rating: ${review.note}`;

                const reviewContent = document.createElement('p');
                reviewContent.textContent = review.review;

                // Append review details to review element
                reviewElement.appendChild(reviewRating);
                reviewElement.appendChild(reviewContent);

                // Append review element to reviews container
                reviewsContainer.appendChild(reviewElement);
            });
        } else {
            console.error('Failed to fetch coiffeur reviews:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching coiffeur reviews:', error);
    }
}

// Call function to display coiffeur reviews when the page loads
window.onload = function() {
    const coiffeurID = sessionStorage.getItem('idCoiffeur')
    getCoiffeurReviews(coiffeurID);
};



/*
//2 JavaScript pour récupérer et afficher les avis depuis la base de données
async function getAvisCoiffeur(idCoiffeur) {
    try {
        const response = await fetch(`/getAvisCoiffeur/${idCoiffeur}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const avisData = await response.json();
            return avisData;
        } else {
            console.error('Failed to fetch avis data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching avis data:', error);
        return null;
    }
}

async function displayAvisCoiffeur() {
    const idCoiffeur = sessionStorage.getItem('idCoiffeur');
    if (idCoiffeur) {
        const avisData = await getAvisCoiffeur(idCoiffeur);
        if (avisData) {
            const tableBody = document.getElementById('tableResults');
            avisData.forEach((avis) => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = avis.idAvis;
                row.insertCell().textContent = avis.idClient;
                row.insertCell().textContent = avis.idCoiffeur;
                row.insertCell().textContent = avis.note;
                row.insertCell().textContent = avis.review;
            });
        } else {
            console.error('No avis data found for the provided ID.');
        }
    } else {
        console.error('Coiffeur ID not found in sessionStorage.');
    }
}

// Appeler la fonction pour afficher les avis du coiffeur
displayAvisCoiffeur();
*/

/*
// message

// Récupérer l'ID du coiffeur à partir de l'URL
const coiffeurID = window.location.pathname.split('/').pop();

// Envoyer une requête GET au serveur pour récupérer les informations du coiffeur
fetch(`/getProfilCoiffeur/${coiffeurID}`)
    .then(response => response.json())
    .then(data => {
        // Mettre à jour les champs du formulaire avec les informations récupérées
        document.querySelector('input[name="Prenom"]').value = data[0].prenom;
        document.querySelector('input[name="Nom"]').value = data[0].nom;
        document.querySelector('input[name="Username"]').value = data[0].username;
        document.querySelector('input[name="Telephone"]').value = data[0].numTelephone;
        // Mettre à jour les autres champs si nécessaire
    })
    .catch(error => console.error('Erreur lors de la récupération des informations du coiffeur :', error));


function maskPassword (motDePasse) {
  return '*'.repeat(motDePasse.length) // Replace each character with asterisks
}

function display (data) {
    const prenom = document.getElementById('coiffeurPrenom')
    const nom = document.getElementById('coiffeurNomfamille')
    const username = document.getElementById('coiffeurUsername')
    const motDePasse = document.getElementById('coiffeurPass')
    const numeroTelephone = document.getElementById('coiffeurPhoneNumber')

    console.log(data[0])

    prenom.textContent = data[0].prenom
    nom.textContent = data[0].nom
    username.textContent = data[0].username
    motDePasse.textContent = maskPassword(data[0].motDePasse)
    numeroTelephone.textContent = data[0].numTelephone
}

async function obtenirID () {
    const url = new URLSearchParams(window.location.search)
    const coiffeurID = url.get('coiffeurID')
    const newURL = `/getProfilCoiffeur/${coiffeurID}`

    const response = await fetch(newURL)
    if (response.ok) {
    const coiffeur = await response.json()
    console.log(coiffeur)
    display(coiffeur)
    }
}

document.addEventListener('DOMContentLoaded', () => {
obtenirID()
})


*/