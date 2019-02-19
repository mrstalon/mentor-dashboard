const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const { cloneDeep } = require('lodash')

const warn = require('../error/warn')
const { attachTasksInfo } = require('./attach-tasks')
const { unifyName } = require('../unify-strings')


const DATA_FOLDER = path.join(__dirname, '../../../data')
const MENTOR_STUDENT_PAIRS_TABLE = 'mentor-students-pairs.xlsx'

const mentorStudentPairs = xlsx
  .parse(fs.readFileSync(path.join(DATA_FOLDER, MENTOR_STUDENT_PAIRS_TABLE)))[0]
  .data.slice(1)

const attachStudents = (mentors) => {
  const mentorsCopy = cloneDeep(mentors)

  mentorStudentPairs.forEach((pair) => {
    if (pair.length < 2) return

    const [mentorFullName, studentGithub] = pair
    const targetMentor = mentorsCopy.find(
      (mentor) => unifyName(mentor.fullname) === unifyName(mentorFullName)
    )

    const student = attachTasksInfo({
      github: String(studentGithub)
    })

    targetMentor.students.push(student)
  })

  return mentorsCopy
}

const attachStudent = (mentors, mentorGithub, studentGithub) => {
  const mentorsCopy = cloneDeep(mentors)
  const targetMentor = mentorsCopy.find(
    (m) => unifyName(m.github) === unifyName(mentorGithub)
  )

  if (!targetMentor) {
    warn(
      `No mentor(${mentorGithub}) was found, as well as no student's(${studentGithub}) actual mentor was found
      at Mentor-Student Pairs file. This case will not be handled by script. You should handle this case manually`
    )
    return {
      mentors: mentorsCopy,
      targetMentor: null
    }
  }

  const studentToAttach = attachTasksInfo({
    github: String(studentGithub)
  })
  targetMentor.students.push(studentToAttach)

  return {
    mentors: mentorsCopy,
    targetMentor
  }
}

module.exports = { attachStudents, attachStudent }
