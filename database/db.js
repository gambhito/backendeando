const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://ice:gambhito187@cluster0.8iw7z91.mongodb.net/10iDB";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = db
