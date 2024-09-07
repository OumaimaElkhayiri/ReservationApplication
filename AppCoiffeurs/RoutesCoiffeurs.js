const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getUserByUsername } = require('../middleware/auth.js')
const TOKEN_SECRET_KEY = 'KEY_WEB-PROJET2'
const path = require('path')
const db = require('../dbKNEX.js')

// Route pour se connecter pour les CLIENTS et les COIFFEURS

/*
router.post('/login', async (req, res) => {
    try {

      const {username, password} = req.body

      const client = await getUserByUsername(username,'Clients') // besoin dimporter
      const coiffeur = await getUserByUsername(username,'Coiffeurs') // besoin dimporter

      if(!client && !coiffeur) {
        return res.status(401).json({message: 'Username/password invalide!!'})
      }

      if(client && await bcrypt.compare(password,client.password )) {
        const token = jwt.sign({username},TOKEN_SECRET_KEY,{expiresIn: '1h'})
        return res.status(201).json({ message: 'Client connecté', token, role: 'client', expiresIn: '1h', });
      }

      if(coiffeur && await bcrypt.compare(password,coiffeur.password )) {
        const token = jwt.sign({username},TOKEN_SECRET_KEY,{expiresIn: '1h'})
        return res.status(201).json({ message: 'Coiffeur connecté', token, role: 'coiffeur', expiresIn: '1h', });
      }

      return res.status(401).json({ message: 'Mot de passe incorrect' });

    } catch(error){
      console.error(error)
          res.status(500).json({error : 'Erreur Erreur lors de la connexion'})
    }
  })

*/

// Route html profil du coiffeur
router.get('/profilCoiffeur/:coiffeurID', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'ProfilCoiffeur.html'))
})

// Route js profil du coiffeur
router.get('/profilCoiffeur.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'profil_coiffeur.js'))
})

// Page css profil coiffeur -- PROBLEME AVEC LE CSS
router.get('/ProfilCoiffeur.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'ProfilCoiffeur.css'))
})

// Route html avis des clients
router.get('/AvisCoiffeur', (req, res) => {
  res.sendFile(path.join(__dirname, 'Avis', 'AvisCoiffeur.html'))
})

  // Page css avis
    router.get('/Avis.css', (req,res) => {
    res.sendFile(path.join(__dirname, 'Avis', 'Avis.css'))
  })
// Route js avis des clients
router.get('/Avis.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Avis', 'Avis.js'))
})

// Page css avis
router.get('/Avis.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Avis', 'Avis.css'))
})

// Route html reservations des clients
router.get('/reservationCoiffeur', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'reservationCoiffeur.html'))
})

  // Page css reservations des clients
    router.get('/reservationCoiffeur.css', (req,res) => {
    res.sendFile(path.join(__dirname, 'reservations', 'reservationCoiffeur.css'))
  })
// Route js reservations des clients
router.get('/reservationCoiffeur.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'reservationCoiffeur.js'))
})

// Page css reservations des clients
router.get('/reservationCoiffeur.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'reservationCoiffeur.css'))
})

// Affichage des coiffeurs dans la base de donnee
router.get('/getCoiffeur', async (req, res) => {
  try {
    const rows = await db('Coiffeurs').select('*')
    res.json(rows)
    console.log(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des coiffeurs' })
  }
})

// Affichage des profil des coiffeur dans la base de donnee
router.get('/getProfilCoiffeur/:coiffeurID', async (req, res) => {
  try {
    const idCoiffeur = req.params.coiffeurID
    const rows = await db('Coiffeurs').select('*').where('idCoiffeur', '=', idCoiffeur) // peut le transformer en modulisation
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des coiffeurs' })
  }
})

// affichage historique des reservations
router.get('/historique', async (req, res) => {
  try {
    const currentDate = new Date()
    const currentDateOnly = currentDate.toISOString().split('T')[0] // Extracting only the date part
    console.log(currentDateOnly)
    const rows = await db('Reservations').select('*')
      .where('dateReservation', '<', currentDateOnly) // peut le transformer en modulisation
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erreur lors de la récupération de l'historique" })
  }
})

// Creation nouveau coiffeur dans la base de donnee

router.post('/creationCompteCoiffeur', async (req, res) => {
  try {
    const nouveauCoiffeur = req.body
    console.log(nouveauCoiffeur)
    await db('Coiffeurs').insert({
      prenom: nouveauCoiffeur.prenom,
      nom: nouveauCoiffeur.nom,
      username: nouveauCoiffeur.username,
      numTelephone: nouveauCoiffeur.numTelephone,
      motDePasse: await bcrypt.hash(nouveauCoiffeur.motDePasse, 10),
      idSalon: nouveauCoiffeur.salonID,
      disponibilite: nouveauCoiffeur.disponibilites,
      imageURL: nouveauCoiffeur.imageURL
    })
    res.status(201).json({ message: 'Utilisateur coiffeur créer avec success ' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création du compte coiffeur' })
  }
})

// Get Reservations des clients de la base de donnee

router.get('/futurRendezVous', async (req, res) => {
  try {
    const currentDate = new Date()
    const currentDateOnly = currentDate.toISOString().split('T')[0] // Extracting only the date part
    console.log(currentDateOnly)
    const rows = await db('Reservations').select('*')
      .where('dateReservation', '>', currentDateOnly) // peut le transformer en modulisation
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des futures rendez-vous' })
  }
})

router.get('/getProfilCoiffeur/:coiffeurID', async (req, res) => {
  try {
    const idCoiffeur = req.params.coiffeurID
    const rows = await db('Coiffeurs').select('*').where('idCoiffeur', '=', idCoiffeur) // peut le transformer en modulisation
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des coiffeurs' })
  }
})

// Get type de coiffure de la base de donnee
router.get('/getTypeCoiffure/:CoiffureID', async (req, res) => {
  try {
    const idTypeCoiffure = req.params.CoiffureID
    const rows = await db('TypeCoiffure').select('*').where('idTypeCoiffure', '=', idTypeCoiffure)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des types de coiffures' })
  }
})

router.get('/avisCoiffeurData', async (req, res) => {
  try {
      const rows = await db('Avis').select('*')
      res.json(rows)
  } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erreur lors de la récupération des reviews' })
  }
})

router.get('/avisCoiffeurData/:idCoiffeur', async (req, res) => {
  try {
    const idCoiffeur= req.params
      const rows = await db('Avis').select('*').where('idCoiffeur','=',idCoiffeur)
      res.json(rows)
  } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erreur lors de la récupération des reviews' })
  }
})


  module.exports = router;
