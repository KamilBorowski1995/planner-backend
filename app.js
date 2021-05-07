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

const env = process.env.DB_CONNECT.toString();

mongoose.connect(
  env,
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

app.listen(process.env.PORT, () =>
  console.log(`Serwer uruchomiony na porcie: ${process.env.PORT}`)
);
