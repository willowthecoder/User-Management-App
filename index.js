import { faker } from "@faker-js/faker";
import mysql from "mysql2";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
let getUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "assassinarno5246647@2005",
});

let port = 8080;
app.listen(port, () => {
  console.log("app is listening ");
});
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("Error loading results");
  }
});

app.get("/users", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    res.send("Error loading results");
  }
});

app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id ="${id}"`;
  try {
    connection.query(q, (err, users) => {
      let user = users[0];
      if (err) throw err;
      res.render("edituser.ejs", { user });
    });
  } catch (err) {
    res.send("Error loading results");
  }
});

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpassword, username: newusername } = req.body; //post request
  try {
    let q = `SELECT * FROM user WHERE id="${id}"`;
    connection.query(q, (err, result) => {
      let user = result[0];
      if (formpassword != user.password) {
        console.log("WRONG password");
        res.send("Wrong password");
      } else {
        let q = `UPDATE user SET username="${newusername}" WHERE id="${id}"`;
        connection.query(q, (err, result) => {
          if (err) throw err;
          else {
            res.redirect("/users");
          }
        });
      }
    });
  } catch (err) {
    console.log("ERROR in DB");
    res.send("SOME ERROR in DataBases");
  }
});

app.get("/users/newuser", (req, res) => {
  res.render("newuser.ejs");
});

app.post("/users", (req, res) => {
  let id = uuidv4();
  let { username: newuser, email: newemail, password: newpassword } = req.body;
  let q = `INSERT INTO user (id, username, email, password) 
  VALUES ('${id}', '${newuser}', '${newemail}', '${newpassword}')`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.redirect("/users");
    });
  } catch (err) {
    res.send("Error loading results");
  }
});

app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * from user where id = "${id}"`;
  try {
    connection.query(q, (err, users) => {
      let user = users[0];
      if (err) throw err;
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("Error Deleting results");
  }
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let { password: givenpassword } = req.body;
  let q = `SELECT * FROM user WHERE id="${id}"`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (givenpassword != user.password) {
        res.send("Wrong password");
      } else {
        let q = `DELETE FROM user WHERE id = "${id}"`;
        connection.query(q, (err, result) => {
          if (err) throw err;
          res.redirect("/users");
        });
      }
    });
  } catch (err) {
    console.log("ERROR in database");
    res.send("Can't delete due to database issue");
  }
});
