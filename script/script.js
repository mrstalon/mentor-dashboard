const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const writefile = promisify(fs.writeFile)

module.exports = () => {
  const JSON_FOLDER_PATH = path.join(__dirname, '../json/mentors.json')

  const getMentors = require('./helpers/data/get-mentors')
  const { attachStudents } = require('./helpers/data/attach-students')
  const attachScore = require('./helpers/data/attach-score')
  const buildJson = require('./helpers/data/build-json')


  let mentors = getMentors()
  mentors = attachStudents(mentors)
  mentors = attachScore(mentors)

  const dataJson = buildJson(mentors)
  return fs.writeFileSync(JSON_FOLDER_PATH, JSON.stringify(dataJson))
    .catch((err) => {
      console.log('error while writing file')
      console.log(err)
    })
}