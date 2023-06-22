const express = require("express");
const app = express();
const routeUser = require("./src/routes/user.route");
const routePost = require("./src/routes/post.route");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.json());
app.use("/api/v1/users", routeUser);
app.use("/api/v1/posts", routePost);


app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log(`This is server at http://127.0.0.1:${port}`);
});
