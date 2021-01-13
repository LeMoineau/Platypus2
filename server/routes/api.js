const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { Store } = require('express-session')
var paiza_io = require('paiza-io')

const default_icon = 'http://getdrawings.com/free-icon/funny-avatars-icons-51.jpg'
const exo_load_by_time = 10

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: '123',
  database: 'IziCode'
 })

client.connect()

function isConnected(req) {
  return (req.session.userId !== undefined && req.session.userId !== -1)
}

function checkIfPermitted(req, res, permissionNeed, callback) {

  if (req.session.userId !== undefined && req.session.userId !== -1) {

    client.query({

      text: "SELECT perm FROM users WHERE id = $1",
      values: [req.session.userId]

    }).then(async (result) => {

      if (result.rows.length > 0 && permissionNeed(result.rows[0].perm)) {

        callback(req, res)

      } else {

        res.json({
          result: {
            status: 0,
            message: "Vous n'avez pas la permission d'effectuer cette action..."
          }
        })

      }

    })

  }

}

router.post("/exercice", async (req, res) => {

  let exercice = req.body.exercice;
  checkIfPermitted(req, res, (perm) => { perm > 0 }, () => {

    client.query({

      text: "INSERT INTO exercices (title, langage, difficulty, content, creator, icon) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [exercice.title, exercice.langage, exercice.difficulty, {content: exercice.lines}, exercice.creator, exercice.icon]

    }).then(async (result) => {

      if (result.rows.length > 0) {

        let last_id = result.rows[0].id;
        client.query({

          text: `UPDATE exomanager SET exo_create = array_append(exo_create, $1) WHERE "user" = $2`,
          values: [last_id, req.session.userId]

        }).then(async (result) => {

          res.json({
            result: {
              status: 1,
              exercicecreate: exercice,
              message: "Exercice bien créé !"
            }
          })

        })

      } else {

        res.json({
          result: {
            status: 0,
            message: "Oups :/, une erreur est apparu sans prévenir lors de la création de votre exercice..."
          }
        })

      }

    })

  })

});

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

          text: "INSERT INTO users (login, password, prenom, nom, icon, perm) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
          values: [user.login, hashPassword, user.prenom, user.nom, default_icon, 0]

        }).then(async (result) => {

          console.log(result);
          if (result.rows.length > 0) {

            let last_id = result.rows[0].id;
            req.session.userId = last_id;
            client.query({

              text: `INSERT INTO exomanager ("user", "exo_begin", "avancement", "exo_create") VALUES ($1, $2, $3, $4)`,
              values: [last_id, [], [], []]

            }).then(async (result) => {

              res.json({ result: {
                  status: 1,
                  errormessage: ""
                }
              })

            })

          } else {

            res.json({ result: {
                status: 0,
                errormessage: "Mince :/, une erreur est survenue lors de la création de votre compte..."
              }
            })

          }

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

  if (isConnected(req)) {

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

router.delete("/disconnect/", (req, res) => {

  req.session.userId = -1;
  res.json({
    result: {
      status: 1
    }
  })

})

router.get('/exercices/:offset/:lang/:difficulty', (req, res) => {

  let offset = req.params.offset;
  let lang = req.params.lang;
  lang = lang.split(',');
  let difficulty = req.params.difficulty;
  difficulty = difficulty.split(',').map(x => +x);

  client.query({

    text: "SELECT * FROM exercices WHERE langage = ANY($1) AND difficulty = ANY($2) LIMIT $3 OFFSET $4",
    values: [lang, difficulty, exo_load_by_time, offset]

  }).then(async (result) => {

    res.json({
      result: {
        status: 1,
        exercices: result.rows
      }
    })

  })

});

router.post('/work', (req, res) => {

  let exoId = req.body.exoId;
  console.log(exoId + "-" + req.session.userId);

  if (isConnected(req)) {

    //VERIFIER SI A PAS DEJA CET EXO
    client.query({

      text: `UPDATE exomanager SET exo_begin = array_append(exo_begin, $1), avancement = array_append(avancement, $2) WHERE "user" = $3`,
      values: [exoId, 0, req.session.userId]

    }).then(async (result) => {

      res.json({
        result: {
          status: 1
        }
      })

    })

  } else {

    res.json({
      result: {
        status: 0,
        message: "vous n'êtes pas connecté..."
      }
    })

  }

})

module.exports = router
