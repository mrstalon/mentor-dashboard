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
    const name = task[0]
    const url = task[1]
    const status = task[2]
    student.tasks.push({
      name,
      url,
      status
    })
  })
  return student
}

const getTasksList = () => {
  return tasks.map((task) => {
    return {
      name: task[0],
      status: task[2]
    }
  })
}

module.exports = { attachTasksInfo, getTasksList }
