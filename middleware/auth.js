const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TOKEN_SECRET_KEY = 'test'
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databaseCoiffeur.sqlite3')

function authentificationDuToken(req,res,next){

    const authHeader = req.headers.authorization;
  //console.log('Authorization header:', authHeader);
  //console.log('Request Headers:', req.headers);

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès interdit - Token manquant' });
  }

  const token = authHeader.split(' ')[1]; // Extract token without "Bearer" prefix

  jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Accès interdit - Token invalide' });
    }
    req.user = user;
    next();
  });
}




function getUserByUsername(username,tableNom){
    return new Promise ((resolve, reject) => {
        db.get(`SELECT * FROM ${tableNom} WHERE username=?`,[username],(err, row) => {
            if(err){
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

function getID(username,tableNom) {
  return new Promise ((resolve, reject) => {
    db.get(`SELECT * FROM ${tableNom} WHERE username=?`,[username],(err, row) => {
        if(err){
            reject(err);
        } else {
            resolve(row);
        }
    })
})
}


module.exports={getUserByUsername, authentificationDuToken, getID}