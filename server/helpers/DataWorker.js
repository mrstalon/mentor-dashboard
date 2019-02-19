const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const sha512 = require('hash.js/lib/hash/sha/512')

const getStringFromExcelFiles = require('../../script/getStringFromExcelFiles')
const rebuildMentorsJson = require('../../script/script')

const readfile = promisify(fs.readFile)

class DataWorker {
  constructor() {
    // console.log(__dirname)
    console.log(__dirname)
    this.JSON_FILE_PATH = path.join(__dirname, '../../json/mentors.json')
    this.mentors = []
    this.tablesHash = ''
    this.updateRate = 180000

    // initial build
    this.compareHashes()

    // setting json update interval
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
}

const dataWorker = new DataWorker()

module.exports = dataWorker