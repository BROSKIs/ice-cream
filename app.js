//Importing the express module
import express from "express";
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

//Starting the app
const app = express();

app.set("view engine", "ejs");

//PORT number
const PORT = 4729;

const ordera = [];

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const pool = mysql2.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT

}).promise();

//Defining the default route
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/submit", async (req, res) => {
  //NEW CODE
  // customer.    email.        flavor   come   toppings
  //'Superman','ckent@msn.com','Vanilla','Cup','Nuts, Cherry
  try {
    const order = req.body;

    order.toppings = Array.isArray(order.toppings) ? order.toppings.join(", ") : " "; 

    const sql = `INSERT INTO orders(customer, email, flavor, cone, toppings) VALUES (?, ?, ?, ?, ?);`;

    const params = [
      order.name,
      order.email,
      order.flavor,
      order.cone,
      order.toppings
    ];

    const result = await pool.execute(sql, params);

    res.render("confirmation", { order } )
  }
  catch{
    console.error('Error saving order:', err);
    res.status(500).send('Sorry, there was an error processing your order. Please try again.');
  }
});

// Start the server and listen on the specified port

app.get("/admin", async (req, res) => {

  try{
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
    res.render("admin", { orders })
  }
  catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Error loading orders: '+ err.message);
  }
});

app.get('/db-test', async (req, res) => {


    try {


  const orders = await pool.query('SELECT * FROM orders');

       res.send(orders[0]);


    } catch (err) {


       console.error('Database error:', err);

       res.status(500).send('Database error: ' + err.message);

    }

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
