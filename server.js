const { cloudinary } = require('./utils/cloudinary');

const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

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
        res.json({ msg: 'File uploaded sucessfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('listening on 4000');
});