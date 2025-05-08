const express = require ("express");
const mongoose = require ("mongoose");
const routes = require("./routes/index");

const app = express ();
const { PORT = 3001 } = process.env;

mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
    console.log("Connect to DB");
})
.catch(console.error);

app.use(express.json());
app.use(routes);



 
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    console.log('this is working!')
});