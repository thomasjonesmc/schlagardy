const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser');
const db = require("./config/db");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5000"
}));

app.use(cookieParser());

app.use(express.json());

app.use("/api", router);

// this must be the last middleware so all errors get caught here
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));