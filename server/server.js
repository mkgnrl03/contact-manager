const express = require('express');
const dotenv = require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

const errorHandler = require("./middleware/errorHandler.js");

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

