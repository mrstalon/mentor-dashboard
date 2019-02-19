const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx')

const extractGithubName = require('./extract-github-name')

const DATA_FOLDER = path.join(__dirname, '../../../data')
const MENTOR_STUDENT_PAIRS_TABLE = 'mentor-students-pairs.xlsx'

const mentorsInfoTalbe = xlsx
  .parse(fs.readFileSync(path.join(DATA_FOLDER, MENTOR_STUDENT_PAIRS_TABLE)))[1]
  .data.slice(1)

const setMentorInfo = (data) => {
  const firstName = data[0]
  const secondName = data[1]
  const githubUrl = data[4]
  return {
    fullname: `${firstName} ${secondName}`,
    github: extractGithubName(githubUrl),
    students: []
  }
}

const getMentors = () => {
  const mentors = []
  mentorsInfoTalbe.forEach((mentor) => {
    if (mentor.length === 5) {
      mentors.push(setMentorInfo(mentor))
    }
  })

  return mentors
}

module.exports = getMentors
