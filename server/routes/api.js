const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { Store } = require('express-session')
var paiza_io = require('paiza-io')


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'ZAZA92izi...',
  database: 'IziCode'
 })

 client.connect()


router.post("/code", async (req, res) => {
      paiza_io('python', 'print "Hello, Python World!"', '', function (error, result) {
        if (error) throw error;
        console.log('python result:');
        console.log(result.stdout); //=> Hello, Python World!
      });
})

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const surname = req.body.surname;


  check(email).then((resultat) => {

    if (resultat.rowCount === 0) {

      bcrypt.hash(password, 10).then(hashPassword => {

        client.query({

          text: "INSERT INTO users (email,password,name,surname) VALUES($1,$2,$3,$4)",
          values: [email, hashPassword, name, surname]

        });
      })

      res.json({ message: "Registed" });
    }
    else {
      res.json({ message: "Error" });
      return;
    }
  });

});

async function check(email) {
  const sql = "SELECT * FROM users WHERE email=$1";
  return await client.query({
    text: sql,
    values: [email], // ici name et description ne sont pas concaténées à notre requête
  })
}

// async function checkAdmin(id) {
//   const sql = "SELECT perm FROM users WHERE id=$1";
//   return await client.query({
//     text: sql,
//     values: [id],
//   })
// }

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  check(email).then(async (resultat) => {
    if (resultat.rowCount >= 1) {
      let resu = resultat.rows[0]
      if (await bcrypt.compare(password,resu.password)){
        if (req.session.userId === resu.id) {
          res.json({message: "AlreadyConnected", userId: resu.id})
        } else {
          req.session.userId = resu.id
          res.json({message: "Connected", userId: resu.id})
        }
      } else {
        res.json({ message: "PasswordForget", userId: -1 })
      }
    }
  })
})

router.post("/disconnect", (req, res) => {

  req.session.userId = -1;
  res.json({ message: "disconnected" })

});

router.get("/me", async (req, res) => {
  if(CheckCo(req)){

    res.json({message: req.session.userId})

  }
  else{
    res.json({message: -1})
  }

})

router.get("/perm", async (req, res) => {

  const sql = "SELECT perm FROM users WHERE id=$1"
  return await client.query({
    text: sql,
    values: [req.session.userId]
  }).then( (result) => {

    res.json({message: result})

  })
})

router.get("/name", async (req, res) => {

  const sql = "SELECT email FROM users WHERE id=$1"
  return await client.query({
    text: sql,
    values: [req.session.userId]
  }).then( (result) => {

    res.json({message: result})

  })
})

function CheckCo(req){
  if(req.session.userId !== undefined && req.session.userId !== -1){
    return true
  } else {
    return false

  }
}

router.get("/change", async (req, res) => {

  const sql = "SELECT email, from users WHERE id=$1"
})

module.exports = router
