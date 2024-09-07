

function getUserByUsername(username,tableNom){
    return new Promise ((resolve, reject) => {
        db.get(`SELECT * FROM ${tableNom} WHERE username=?`[username],(err, row) => {
            if(err){
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

/*
async function test() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username);
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data);
        console.log(data.token);
        sessionStorage;
        window.location.href = 'http://localhost:3000/accueilClient';
    }
}

const btn = document.getElementById('btnConnexion')
btn.addEventListener("click", test);

*/

module.exports={getUserByUsername}