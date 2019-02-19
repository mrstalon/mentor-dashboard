const express = require('express');

const dataWorker = require('../../helpers/DataWorker');

const router = express.Router();

router.get('/', (req, res) => {
  const mentors = dataWorker.getMentorsNames()
  console.log('response mentors length -- ' + mentors.length)
  res.json(mentors);
})

router.get('/:github', (req, res) => {
  const targetMentor = req.params.github;
  const data = dataWorker.getMentorInfo(targetMentor)
  res.json(data);
})

module.exports = router