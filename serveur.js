
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
app.use(bodyParser.json())
app.use(express.static('Pages_Interfaces')) // A voir avec dave 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })) // A voir avec dave


// Routes pour Clients
app.use('/', require('./AppClients/RoutesClients.js'));

// Routes pour Coiffeurs
app.use('/', require('./AppCoiffeurs/RoutesCoiffeurs.js'));

// Routes pour Pages Globales
app.use('/', require('./PagesGlobales/RoutesGlobales.js'));

//app.get('/navbar.js', (req, res) => {
 // res.sendFile('navbar.js')
//})



// Lancement du serveur sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${PORT}`)
})
