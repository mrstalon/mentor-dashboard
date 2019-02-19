const express = require('express');

const dataWorker = require('../../helpers/DataWorker');

const router = express.Router();

router.get('/', (req, res) => {
  const mentors = dataWorker.getMentorsNames()
  if (mentors.length === 0) {
    res.json(['Hello'])
  }
  res.json();
})

router.get('/:github', (req, res) => {
  const targetMentor = req.params.github;
  const data = dataWorker.getMentorInfo(targetMentor)
  res.json(data);
})

module.exports = router