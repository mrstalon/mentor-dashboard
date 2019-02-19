class ApiWorker {
  constructor(basicUrl) {
    this.basicUrl = basicUrl
  }

  formUrl(apiRoute) {
    return `${this.basicUrl}/${apiRoute}`
  }

  getJson(apiRoute) {
    return fetch(this.formUrl(apiRoute))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status)
        }
        return res.json()
      })
  }

  fetchMentors() {
    return this.getJson('mentors')
      .then((mentors) => {
        return mentors
      })
  }

  fetchMentor(mentorGithub) {
    return this.getJson(`mentors/${mentorGithub}`)
      .then((mentor) => {
        return mentor;
      })
  }
}

const apiWorker = new ApiWorker('/api')

export default apiWorker;