const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { Store } = require('express-session')
var paiza_io = require('paiza-io')

const default_icon = 'http://getdrawings.com/free-icon/funny-avatars-icons-51.jpg'
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: '123',
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
  const user = req.body.user;

  client.query({

    text: "SELECT * FROM users WHERE login=$1",
    values: [user.login]

  }).then(async (result) => {

    if (result.rowCount <= 0) {
      bcrypt.hash(user.mdp, 10).then((hashPassword) => {
        client.query({

          text: "INSERT INTO users (login, password, prenom, nom, icon, perm) VALUES ($1, $2, $3, $4, $5, $6)",
          values: [user.login, hashPassword, user.prenom, user.nom, default_icon, 0]

        }).then(async () => {

          res.json({ result: {
              status: 1,
              errormessage: ""
            }
          })

        })
      })
    } else {

      res.json({ result: {
          status: 0,
          errormessage: "Ce login est déjà prit :/"
        }
      })

    }
  })

});

router.post("/login", async (req, res) => {
  const user = req.body.user;

  client.query({

    text: "SELECT * FROM users WHERE login=$1",
    values: [user.login]

  }).then(async (result) => {

    if (result.rowCount >= 1) {

      let resu = result.rows[0]
      if (await bcrypt.compare(user.mdp, resu.password)){

        if (req.session.userId === resu.id) {

          res.json({
            result: {
              status: 2,
              errormessage: "Vous êtes déjà connecté"
            }
          })

        } else {

          req.session.userId = resu.id
          res.json({
            result: {
              status: 1,
              errormessage: ""
            }
          })

        }
      } else {

        res.json({
          result: {
            status: 0,
            errormessage: "Mot de passe incorrect"
          }
        })

      }

    } else {

      res.json({
        result: {
          status: 0,
          errormessage: "Ce login nous est inconnu"
        }
      })

    }
  })
})

router.post("/disconnect", (req, res) => {

  req.session.userId = -1;
  res.json({ message: "disconnected" })

});

router.get("/me", async (req, res) => {

  if (req.session.userId !== undefined && req.session.userId !== -1) {

    client.query({

      text: "SELECT login, prenom, nom, icon, perm FROM users WHERE id=$1",
      values: [req.session.userId]

    }).then(async (result) => {

      if (result.rowCount >= 1) {

        res.json({
          result: {
            status: 1,
            user: result.rows[0]
          }
        })

      } else {

        res.json({
          result: {
            status: 0,
            errormessage: "ID incorrect"
          }
        })

      }

    })

  } else {

    res.json({
      result: {
        status: 0,
        errormessage: "Vous n'êtes pas authentifié"
      }
    })

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
