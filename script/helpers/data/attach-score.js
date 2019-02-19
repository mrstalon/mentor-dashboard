const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const { cloneDeep } = require('lodash')

const warn = require('../error/warn')
const extractGithubName = require('./extract-github-name')
const findMentorByStudent = require('./find-mentor-by-student')
const findTargetStudent = require('./find-target-student')
const { attachStudent } = require('./attach-students')
const { unifyTaskName } = require('../unify-strings')

const DATA_FOLDER = path.join(__dirname, '../../../data')
const TASKS_SCORE_TABLE = 'mentor-score.xlsx'

const tasksScoreTable = xlsx
  .parse(fs.readFileSync(path.join(DATA_FOLDER, TASKS_SCORE_TABLE)))[0]
  .data.slice(1)

const attachScore = (mentors) => {
  let mentorsCopy = cloneDeep(mentors)
  tasksScoreTable.forEach((task) => {
    const mentorGithub = extractGithubName(task[1])
    const studentGithub = extractGithubName(task[2])
    const taskName = task[3]
    const pullReqUrl = task[4]
    const taskScore = task[5]
    let targetMentor = findMentorByStudent(mentorsCopy, studentGithub)

    if (!targetMentor) {
      warn(
        `Can't find student's (${studentGithub}) mentor, there is probably an issue with Mentor-Student pairs file.
        Script will automatically attach current student to his pr's rewiewer (${mentorGithub})`
      )
      const updatedData = attachStudent(mentorsCopy, mentorGithub, studentGithub)
      mentorsCopy = updatedData.mentors
      targetMentor = updatedData.targetMentor

      if (!targetMentor) {
        return
      }
      console.log(`Case with student(${studentGithub}) was successfuly handled`)
    }

    const targetStudent = findTargetStudent(targetMentor, studentGithub)
    
    if (!targetStudent) {
      warn(`Smth is wrong with student(${studentGithub})`)
      return
    }

    const targetTask = targetStudent.tasks.find((i) => unifyTaskName(i.name) === unifyTaskName(taskName))

    if (!targetTask) {
      warn(`Smth is wrong with the task (${taskName})`)
    }

    targetTask.score = taskScore
    targetTask.pullReqUrl = pullReqUrl
    targetTask.status = 'Checked'
  })

  return mentorsCopy
}

module.exports = attachScore
