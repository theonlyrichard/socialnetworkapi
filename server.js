const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requrie("./routes"));

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialnetworkapi", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//mongo queries
mongoose.set("debug", true);



app.listen(PORT, () => console.log("Connected to localhost:${PORT}"))