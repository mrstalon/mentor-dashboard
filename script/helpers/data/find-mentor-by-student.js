const { unifyName } = require('../unify-strings')

const getMentor = (mentors, studentGithub) => {
  return mentors.find((mentor) => {
    let isRightMentor = false
    mentor.students.forEach((student) => {
      // Some mentors when pushing student's task review 
      // insert private repo link instead of student's github
      // Second check at if-statement handles this case
      if (
        unifyName(studentGithub) === unifyName(student.github) ||
        unifyName(studentGithub.split('-2018Q3')[0]) === unifyName(student.github)
      ) {
        isRightMentor = true
      }
    })
    return isRightMentor
  })
}

module.exports = getMentor
