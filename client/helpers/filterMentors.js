const unifyString = (string) => string.trim().toLowerCase()

export default (userInp, mentors) => {
  const userInput = unifyString(userInp)

  const regex = new RegExp(`${userInput}`, 'i')
  return mentors.sort().filter(v => regex.test(unifyString(v)))
}