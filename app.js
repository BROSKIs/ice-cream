//Importing the express module
import express from "express";

//Starting the app
const app = express();

app.set("view engine", "EJS");

//PORT number
const PORT = 3000;

const orders = []

app.use(express.static('public'));

//Defining the default route
app.get("/", (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
})

app.post("/submit", (req, res)=>{
    // name= email= flavor= cone= Toppings comments= 
    //order = {
    //    name: 
    //}
    res.render("confrimation");
});

// Start the server and listen on the specified port

app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});