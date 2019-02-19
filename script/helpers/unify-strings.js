const unifyName = (str) => {
  return str.trim().toLowerCase()
}

const unifyTaskName = (str) => {
  return str.split(' ').join('').trim().toLowerCase()
}

module.exports = {
  unifyName,
  unifyTaskName
}