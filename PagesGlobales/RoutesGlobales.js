const express = require('express')
const router = express.Router()
const path = require('path')
const { authentificationDuToken, getUserByUsername } = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const TOKEN_SECRET_KEY = 'test'

// variable pour obtenir id
let user = null

// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body
//     console.log(password)

//     const client = await getUserByUsername(username, 'Clients') // besoin dimporter
//     console.log(client)
//     const coiffeur = await getUserByUsername(username, 'Coiffeurs') // besoin dimporter
//     console.log(coiffeur)

//     if (!client && !coiffeur) {
//       return res.status(401).json({ message: 'Username/password invalide!!' })
//     }

//     if (client && await bcrypt.compare(password, client.motDePasse)) {
//       const token = jwt.sign({ username }, TOKEN_SECRET_KEY, { expiresIn: '1h' })
//       const reponse = { message: 'Client connecté', token, role: 'client', expiresIn: '1h', idClient: client.idClient }
//       return res.status(201).json(reponse)
//     }

//     if (coiffeur && await bcrypt.compare(password, coiffeur.motDePasse)) {
//       const token = jwt.sign({ username }, TOKEN_SECRET_KEY, { expiresIn: '1h' })
//       return res.status(201).json({ message: 'Coiffeur connecté', token, role: 'coiffeur', expiresIn: '1h', idCoiffeur: coiffeur.IdCoiffeur /* redirectTo: '/client/dashboard' */ })
//     }

//     return res.status(401).json({ message: 'Mot de passe incorrect' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Erreur Erreur lors de la connexion' })
//   }
// })

// Recuperer html Acceuil
router.get('/Acceuil', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'Acceuil.html'))
})

// Recuperer js Acceuil
router.get('/Accueil.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'Accueil.js'))
})

// Page css Accueil
router.get('/AcceuilBase.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'AcceuilBase.css'))
})

// Recuperer la page html informations
router.get('/Informations', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact', 'Informations.html'))
})

// Page css informations
router.get('/contact.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact', 'contact.css'))
})

// Recuperer la page js informations
router.get('/Informations.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact', 'Informations.js'))
})

// Recuperer le html salons
router.get('/Salons', (req, res) => {
  res.sendFile(path.join(__dirname, 'Salons', 'Salons.html'))
})

// Recuperer le js salons
router.get('/Salons.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Salons', 'Salons.js'))
})

// Page css salons
router.get('/Salons.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Salons', 'Salons.css'))
})

// recuperer html page login
router.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, 'Connexion', 'connexion.html'))
})

// recuperer html page login
router.get('/connexion.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Connexion', 'connexion.js'))
})

// Page css Connexion
router.get('/connexion.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Connexion', 'connexion.css'))
})

// recuperer html creation de compte
router.get('/creationCompte', (req, res) => {
  res.sendFile(path.join(__dirname, 'Register', 'creation_compte.html'))
})

// recuperer js creation de compte
router.get('/creationCompteScript.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Register', 'creationCompteScript.js'))
})

// Page css creation compte
router.get('/creationCompte.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Register', 'creationCompte.css'))
})

// Route pour images

router.get('/Images/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'Images', 'logo.png'))
})

// route pour protection
router.get('/protected', authentificationDuToken, (req, res) => {
  user = req.user
  res.status(200).json(user)
  // res.redirect('/servicesOffers')
})

// transaction
router.get('/transactionCoiffeur', async (req, res) => {
  try {
    const idCoiffeur = req.params.idCoiffeur
    const rows = await db('Transactions').select('*').where('idCoiffeur', '=', idCoiffeur)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des transactions' })
  }
})

// annulation de reservation avec foinction 48 hrs (pas tester)
router.delete('/annulationReservation/:idReservation', async (req, res) => {
  try {
    const idReservation = req.params.idReservation
    const reservation = await db('Reservations').where('idReservation', '=', idReservation).first()

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    const currentDate = new Date()
    const reservationDate = new Date(reservation.date) // Assuming 'date' is the column storing the reservation date

    // Calculate the difference in milliseconds between the current date and the reservation date
    const timeDifference = currentDate.getTime() - reservationDate.getTime()
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    // Check if the reservation can be canceled (within 48 hours)
    if (hoursDifference >= 48) {
      return res.status(400).json({ error: 'Reservation cannot be canceled after 48 hours' })
    }

    const rows = await db('Reservations').where('idReservation', '=', idReservation).del()
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de l\'annulation de la réservation' })
  }
})

router.post('/loginCoiffeur', async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(password)

    const coiffeur = await getUserByUsername(username, 'Coiffeurs') // besoin dimporter
    console.log(coiffeur)

    if (!coiffeur) {
      return res.status(401).json({ message: 'Username/password invalide!!' })
    }

    if (!await bcrypt.compare(password, coiffeur.motDePasse)) {
      return res.status(401).json({ message: 'Username/Mot de passe incorrect' })
    }
    const token = jwt.sign({ username }, TOKEN_SECRET_KEY, { expiresIn: '1h' })
    console.log({ message: 'Coiffeur connecté', token, role: 'coiffeur', expiresIn: '1h', idCoiffeur: coiffeur.IdCoiffeur })
    res.status(201).json({ message: 'Coiffeur connecté', token, role: 'coiffeur', expiresIn: '1h', idCoiffeur: coiffeur.idCoiffeur })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur Erreur lors de la connexion' })
  }
})

router.post('/loginClient', async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(password)

    const client = await getUserByUsername(username, 'Clients') // besoin dimporter
    console.log(client)

    if (!client) {
      return res.status(401).json({ message: 'Username/password invalide!!' })
    }

    if (!await bcrypt.compare(password, client.motDePasse)) {
      return res.status(401).json({ message: 'Username/Mot de passe incorrect' })
    }

    const token = jwt.sign({ username }, TOKEN_SECRET_KEY, { expiresIn: '1h' })
    const reponse = { message: 'Client connecté', token, role: 'client', expiresIn: '1h', idClient: client.idClient }
    res.status(201).json(reponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur Ereur lors de la connexion' })
  }
})

module.exports = router
