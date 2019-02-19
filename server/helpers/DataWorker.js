const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const sha512 = require('hash.js/lib/hash/sha/512')

const getStringFromExcelFiles = require('../../script/getStringFromExcelFiles')
const rebuildMentorsJson = require('../../script/script')

const readfile = promisify(fs.readFile)

class DataWorker {
  constructor() {
    this.JSON_FILE_PATH = path.join(__dirname, '../../json/mentors.json')
    this.mentors = []
    this.tablesHash = null
    this.updateRate = 10000

    this.firstSyncUpdate()
    setInterval(this.compareHashes.bind(this), this.updateRate)
  }

  getMentorsNames() {
    return this.mentors.map((mentor) => mentor.github)
  }

  getMentorInfo(mentorGithub) {
    return this.mentors.find((mentor) => mentor.github.toLowerCase() === mentorGithub.toLowerCase())
  }

  compareHashes() {
    getStringFromExcelFiles()
      .then((data) => {
        const newHash = sha512().update(data).digest('hex')
        if (newHash !== this.tablesHash) {
          rebuildMentorsJson()
            .then(() => {
              this.tablesHash = sha512().update(data).digest('hex')
              this.updateMentorsList()
            })
        }
      })
  }

  updateMentorsList() {
    readfile(this.JSON_FILE_PATH, 'utf-8')
      .then((mentors) => {
        this.mentors = JSON.parse(mentors)
      })
      .catch(err => console.log(err))
  }

  firstSyncUpdate() {
    this.mentors = JSON.parse(fs.readFileSync(this.JSON_FILE_PATH, 'utf-8'))
    getStringFromExcelFiles()
      .then((data) => {
        this.tablesHash = sha512().update(data).digest('hex')
      })
  }
}

const dataWorker = new DataWorker()

module.exports = dataWorker