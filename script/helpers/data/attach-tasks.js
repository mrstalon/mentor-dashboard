const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')

const DATA_FOLDER = path.join(__dirname, '../../../data')
const TASKS_TABLE = 'tasks.xlsx'

let tasks = xlsx
  .parse(fs.readFileSync(path.join(DATA_FOLDER, TASKS_TABLE)))[0]
  .data.slice(1)
  .map((line) => line.splice(0, 3))

const attachTasksInfo = (student) => {
  student.tasks = []
  tasks.forEach((task) => {
    student.tasks.push({
      name: task[0],
      url: task[1],
      status: task[2]
    })
  })
  return student
}

const getTasksList = () => {
  return tasks.map((task) => {
    return {
      name: task[0],
      url: task[1],
      status: task[2]
    }
  })
}

module.exports = { attachTasksInfo, getTasksList }
