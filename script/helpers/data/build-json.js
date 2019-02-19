const { cloneDeep } = require('lodash')

const { getTasksList } = require('./attach-tasks')
const { unifyTaskName } = require('../unify-strings')

const getStudentsTaskInfo = (taskName, students) => {
  return students.map((student) => {
    return {
      ...student.tasks.find((i) => unifyTaskName(i.name) === unifyTaskName(taskName)),
      github: student.github
    }
  })
}

const buildJson = (mentors) => {
  const mentorsCopy = cloneDeep(mentors)
  return mentorsCopy.map((mentor) => {
    const tasksInfo = getTasksList().map((task) => {
      if (!task.name) {
        return
      }
      const studentsTaskInfo = getStudentsTaskInfo(task.name, mentor.students)
      return {
        ...task,
        studentsTaskInfo
      }
    })

    return {
      github: mentor.github,
      tasksInfo
    }
  })
}

module.exports = buildJson
