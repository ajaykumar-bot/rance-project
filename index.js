const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/routes");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", mainRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
