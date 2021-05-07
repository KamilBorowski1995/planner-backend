const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const noteRoute = require("./routes/note");
const startRoute = require("./routes/start");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Zalogowano do bazy danych");
    }
  }
);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/user", authRoute);
app.use("/api/note", noteRoute);
app.use("/", startRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Serwer uruchomiony na porcie: ${PORT}`));
