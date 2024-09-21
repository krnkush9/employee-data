const mongoose = require('mongoose');
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully."))
    .catch((error) => {
        console.log("DB not connected.");
        console.log("DB CONNECTION ERROR--> ", error);
        process.exit(1);
    })
}
