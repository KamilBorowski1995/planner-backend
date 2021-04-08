const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Zalogowano do bazy danych")
);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/user", authRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Serwer uruchomiony na porcie: ${PORT}`));
