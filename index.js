import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';



const app = express();
const port = 3000;
const apiUrl = 'https://api.chucknorris.io/jokes';


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) =>{
  res.render('index.ejs');
})

app.post("/", async (req, res) => {
  try {
    const category = req.body.category;
    console.log(category);
    if (category) {
      const response = await axios.get(`${apiUrl}/random?category=${category}`);
      const result = response.data;
      res.render("index.ejs", { data: result, selectedCategory: category });
    } else {
      res.render("index.ejs", {
        error: "Please select a category.",
      });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to retrieve Chuck Norris joke.",
    });
  }
});


app.listen(3000, () =>{
    console.log(`Server listen on port ${port}`);
})