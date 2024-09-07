const express = require('express')
const router = express.Router()
const path = require('path')
// const sqlite3 = require('sqlite3')
const db = require('../dbKNEX.js')
const bcrypt = require('bcryptjs')

// Routes pour les side clients

// Page html service
router.get('/servicesOffers', (req, res) => {
  res.sendFile(path.join(__dirname, 'Services', 'servicesOffers.html'))
})

// Page js service
router.get('/services.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Services', 'services.js'))
})

// Page css service
router.get('/Services.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Services', 'Services.css'))
})

// Page html profil client
router.get('/profilClient', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'profil_client.html'))
})

// Page js profil client
router.get('/profil_client.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'profil_client.js'))
})

// Page css profil client
router.get('/ProfilClient.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Profil', 'ProfilClient.css'))
})

// Page html formulaire de réservation
router.get('/prise_rdv', (req, res) => {
  res.sendFile((path.join(__dirname, 'reservations', 'prise_rdv.html')))
})

// Page js formulaire prendre reservations
router.get('/prise_rdv.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'prise_rdv.js'))
})

// Page css priseRDv
router.get('/priseRdv.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'priseRdv.css'))
})

// Page html formulaire modifier de réservation
router.get('/ModifierReservation', (req, res) => {
  res.sendFile((path.join(__dirname, 'reservations', 'modification_rdv.html')))
})

// Page js formulaire modifier reservations
router.get('/modification_rdv.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'modification_rdv.js'))
})

// Page Affichage des reservations
router.get('/Affichage_Rdv', (req, res) => {
  res.sendFile((path.join(__dirname, 'reservations', 'Affichage_Rdv.html')))
})

// Page js Affichage des reservations
router.get('/Affichage_Rdv.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'reservations', 'Affichage_Rdv.js'))
})

// Page html accueil client
router.get('/accueilClient', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'accueil_client.html'))
})

router.get('/accueilClient.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'accueilClient.js'))
})

// -- je ne sais pas a quoi ca sert
router.get('/reservationsTableau', (req, res) => {
  res.sendFile(path.join(__dirname, 'AppCoiffeurs', 'reservations', 'reservationCoiffeur.html'))
})

// Page css priseRDv
router.get('/accClient.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'Acceuil', 'accClient.css'))
})

// Page html informations des coiffeurs
router.get('/coiffeur', (req, res) => {
  res.sendFile(path.join(__dirname, 'RechercheCoiffeur', 'coiffeur.html'))
})

// Page js informations des coiffeurs
router.get('/coiffeur.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'RechercheCoiffeur', 'coiffeur.js'))
})

// Page css informations des coiffeurs
router.get('/RechercheCoiffeur.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'RechercheCoiffeur', 'RechercheCoiffeur.css'))
})

// Base De Donnes affichage/ entree

// Afficher tout les clients de la BD
router.get('/getClient', async (req, res) => {
  try {
    const rows = await db('Clients').select('*')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des clients' })
  }
})

router.get('/getClient/:idClient', async (req, res) => {
  try {
    const idClient = req.params.idClient
    const rows = await db('Clients').select('*').where('idClient', '=', idClient)
    res.json(rows) // Return the client data as JSON
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error retrieving client data' })
  }
})

// Affichage de tout les reservations --> A VOIR DAVE

router.get('/reservation', async (req, res) => {
  try {
    const rows = await db('Reservations').select('*')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des futures rendez-vous' })
  }
})

// affichage des reservations selon un coiffeur de la BD

router.get('/reservation/:id', async (req, res) => {
  try {
    const id = req.params.id
    const rows = await db('Reservations').select('*')
      .where('idClient', '=', id)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des futures rendez-vous' })
  }
})

// Ajout nouveau client dans la BD
router.post('/creationCompteClient', async (req, res) => {
  try {
    const nouveauClient = req.body
    console.log(nouveauClient)
    await db('Clients').insert({
      prenom: nouveauClient.prenom,
      nom: nouveauClient.nom,
      username: nouveauClient.username,
      numTelephone: nouveauClient.numTelephone,
      motDePasse: await bcrypt.hash(nouveauClient.motDePasse, 10)

    })
    res.status(201).json({ message: 'Utilisateur client créer avec success ' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création du compte client' })
  }
})

// Ajout nouvelle reservation dans la BD

router.post('/nouvelleReservation', async (req, res) => {
  try {
    const nouveauReserve = req.body
    await db('Reservations').insert({
      datereservation: nouveauReserve.datereservation,
      Heure: nouveauReserve.Heure,
      idCoiffeur: nouveauReserve.idCoiffeur,
      idClient: nouveauReserve.idClient,
      idTypeCoiffure: nouveauReserve.idTypeCoiffure
    })
    // Sending success response with reload instruction
    res.status(201).json({
      message: 'Nouveau rendez-vous créé avec succès',
      reload: true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création du nouveau rendez-vous' })
  }
})

// Modification reservation dans la BD

router.put('/modificationReservation/:idReservation', async (req, res) => {
  try {
    const idReservation = req.params.idReservation
    const nouveauReserve = req.body
    await db('Reservations').update({
      datereservation: nouveauReserve.datereservation,
      Heure: nouveauReserve.Heure,
      idCoiffeur: nouveauReserve.idCoiffeur,
      idClient: nouveauReserve.idClient,
      idTypeCoiffure: nouveauReserve.idTypeCoiffure
    }).where('idReservation', '=', idReservation)
    // Sending success response with reload instruction
    res.status(201).json({
      message: 'Modification de la réservation passé avec succès',
      reload: true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la modification du rendez-vous' })
  }
})
module.exports = router

// suppression de la reservation dans la BD
router.delete('/supprimerReservation/:idReservation', async (req, res) => {
  try {
    const idReservation = req.params.idReservation
    await db('Reservations').where('idReservation', '=', idReservation).del()
    res.status(200).json({ message: 'Réservation supprimé avec succès' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' })
  }
})

// Get salons from the database

router.get('/getSalons', async (req, res) => {
  try {
    const rows = await db('Salons').select('*')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des Salons' })
  }
})

// Get salon by id

router.get('/getSalons/:id', async (req, res) => {
  try {
    const id = req.params.id
    const rows = await db('Salons').select('*')
      .where('idSalon', '=', id)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des Salons' })
  }
})


router.get('/getTransactions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await db('Transactions').select('*').where('idTypeCoiffure', '=', id);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des Transactions' });
  }
});
