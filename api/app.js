const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const userRoter = require("./src/Routes/UserRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoter);

mongoose.connect(
  "mongodb://host.docker.internal:27017",
  {
    auth: {
      username: "rauluser",
      password: "password",
    },
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Error connecting to database");
    } else {
      app.listen(port, () =>
        console.log(`Server running on port ${port}, http://localhost:${port}`)
      );
    }
  }
);
