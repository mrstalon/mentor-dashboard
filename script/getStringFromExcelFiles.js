const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readfile = promisify(fs.readFile)

const PATH_TO_MENTORS_SCORE = path.join(__dirname, '../data/mentor-score.xlsx')
const PATH_TO_MENTOR_STUDENT_PAIRS = path.join(__dirname, '../data/mentor-students-pairs.xlsx')
const PATH_TO_TASKS = path.join(__dirname, '../data/tasks.xlsx')


module.exports = () => {
  return Promise.all([
    readfile(PATH_TO_MENTORS_SCORE, 'utf-8'),
    readfile(PATH_TO_MENTOR_STUDENT_PAIRS, 'utf-8'),
    readfile(PATH_TO_TASKS, 'utf-8')
  ])
    .then((res) => res.join(''))
    .catch(err => console.log(err))
}