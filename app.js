const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/index");
const { login, registerUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express(); 
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use(cors()); 
app.use(express.json());

app.post("/signin", login);
app.post("/signup", registerUser);

app.use(auth); 
app.use("/items", require("./routes/clothingItems"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});