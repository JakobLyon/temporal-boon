const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on("error", () => console.log("Lost PG connection"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log(err));

//////////////////////////
// Express route handlers
//////////////////////////

app.post("/create_user", async (req, res) => {
  const { username, password } = req.body;
  const selectResult = await pgClient
    .query(`SELECT username FROM users WHERE username = '${username}'`)
    .catch(err => {
      res.send({ status: false, message: err.message });
    });

  // If username exists, exit
  if (selectResult.rowCount !== 0) {
    res.send({ status: false, message: "Username already exists" });
    return;
  }

  // Insert
  const insertResult = await pgClient
    .query(
      `INSERT INTO users (username, password) values('${username}', '${password}')`
    )
    .catch(err => {
      res.send({ status: false, message: err.message });
      return;
    });

  res.send({ status: true });
});

app.post("/login", async (req, res) => {
  pgClient
    .query(
      // `SELECT 1 FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}';`
      `SELECT 1 FROM users where username = '${req.body.username}' AND password = '${req.body.password}'`
    )
    .then(query => {
      if (query.rowCount === 0) {
        res.send({
          status: false,
          message: "Username does not exist, try creating a user"
        });
        return;
      }
      res.send({ status: true });
    })
    .catch(err => {
      res.send({
        status: false,
        message:
          "Something went extraordinarily wrong. Please consult the Star Chart."
      });
    });
});

app.listen(5000, err => {
  console.log("Listening");
});
