const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const route = require("./routes/routers");
const cors = require("cors");
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

app.listen(PORT, () => {
    console.log("server started successfylly at", PORT);
})

app.use(route);
const { dbConnect } = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>Wow server started.`)
})
