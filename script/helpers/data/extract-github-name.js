const extractGithubName = (url) => {
  let temp = url.split('/').filter(i => i.length > 0)
  return temp[temp.length - 1]
}

module.exports = extractGithubName