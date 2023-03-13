const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const { cloudinary } = require('./utils/cloudinary');

const controllers = require("./controllers");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.get("/user/:id", verifyToken, controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);


app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:galeria')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

  const publicIds = resources.map(file => file.public_id);
  res.send(publicIds);
});

app.post('/api/upload', async (req, res) => {
  try {
    
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'galeria',
      });
      console.log(uploadResponse);
      res.json({ msg: 'Archivo subido correctamente' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ err: 'Algo ocurrio, provoco error' });
  }
});




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  db();
});

module.exports = app;