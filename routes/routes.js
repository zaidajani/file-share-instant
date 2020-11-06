const express = require('express');
const router = express.Router();
const { FileNames } = require('./../models/fileSchema');
const idgen = require('./../functions/makeid');

router.get('/', async (req, res) => {
  const data = await FileNames.find();
  res.send(data);
});

router.post('/', async (req, res) => {
  if (req.files) {
    const file = req.files.file;
    const filename = file.name;


    file.mv('./static/' + filename)
      .catch(err => {
        res.status(400).send('Error occured');
      });

    const fileForDb = new FileNames({
      name: `${idgen(3)}-${idgen(4)}-${idgen(3)}`,
      url: `/files/${filename}`,
      filename: filename
    });
    await fileForDb.save();

    res.send(fileForDb);
  }
});

router.get('/:id', async (req, res) => {
  const data = await FileNames.findOne({ name: { $eq: req.params.id } });

  const error = {
    error: '404',
    message: 'not found'
  }

  if (!data) return res.status(404).send(error);

  res.render('found', { fileName: data });
});

module.exports = router;