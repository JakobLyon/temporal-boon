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

app.get("/create_user", async (req, res) => {
  const existingUsername = await pgClient.query(
    `SELECT username FROM users WHERE username = '${req.body.username}'`
  );

  // Username already exists, early exit
  if (existingUsername.length !== 0) {
    res.send({ status: false, message: "Username already exists" });
    return;
  }

  const values = await pgClient.query(
    `INSERT INTO users (username, password) values(${req.body.username}, ${req.body.password})`
  );
  if (values === false) {
    res.send({ status: false, message: "Something unexpected happened" });
    return;
  }
  res.send({ status: true });
});

app.post("/login", async (req, res) => {
  const loggedIn = pgClient
    .query(
      `SELECT 1 FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`
    )
    .then(p => {
      console.log("p");
      console.log(p);
    })
    .catch(err => {
      res.send({
        status: false,
        message: "Username does not exist, try creating a user"
      });
    });
  if (loggedIn.length === 0) {
    res.send({
      status: false,
      message: "Username does not exist, try creating a user"
    });
    return;
  }

  // this doesn't fail properly LOLE

  res.send({ status: true });
});

app.listen(5000, err => {
  console.log("Listening");
});
