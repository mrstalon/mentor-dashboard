const express = require('express');

const dataWorker = require('../../helpers/DataWorker');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dataWorker.getMentorsNames());
})

router.get('/:github', (req, res) => {
  const targetMentor = req.params.github;
  const data = dataWorker.getMentorInfo(targetMentor)
  res.json(data);
})

module.exports = router