const express = require("express");
const app = express();
const path = require("path");


app.use(express.static("public"));

const formInput = path.join(__dirname, "./public/form_input.html");
const tableInput = path.join(__dirname, "./public/table_input.html");

app.get("/", (req, res) => {
  res.status(200).sendFile(formInput);
});

app.get("/table", (req, res) => {
  res.status(200).sendFile(tableInput);
});


const port = 8000;
app.listen(port, () => {
  console.log(`Server express running at http://localhost:${port}`);
});
