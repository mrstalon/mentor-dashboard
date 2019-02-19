const { unifyName } = require('../unify-strings')

module.exports = (mentor, studentGithub) => {
  return mentor.students.find(
    (i) => {
      let isTarget = false
      if (unifyName(i.github) === unifyName(studentGithub)
        || unifyName(studentGithub.split('-2018Q3')[0]) === unifyName(i.github)
      ) {
        isTarget = true
      }
      return isTarget
    }
  )
}