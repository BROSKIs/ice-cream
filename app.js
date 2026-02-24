//Importing the express module
import express from "express";

//Starting the app
const app = express();

app.set("view engine", "EJS");

//PORT number
const PORT = 3000;

const orders = []

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

//Defining the default route
app.get("/", (req, res) => {
    res.render("home");
})

app.post("/submit", (req, res)=>{
    // name= email= flavor= cone= Toppings comments= 
    const order = {
        name: req.body.name,
        email: req.body.email,
        flavor: req.body.flavor,
        cone: req.body.cone,
        toppings: req.body.toppings,
        comment: req.body.comment
    }
    orders.push(order);
    res.render("confirmation", { order });
});

// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});