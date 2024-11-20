import createAppClient from './api.service'

class BookService {
  constructor(baseURL = '/api/book') {
    this.api = createAppClient(baseURL)
  }
  async getAll(filter) {
    if (!filter) return (await this.api.get('/')).data
    else return (await this.api.get(`/?name=${filter}`)).data
  }
  async create(data) {
    return (await this.api.post('/', data)).data
  }
  async deleteAll() {
    return (await this.api.delete('/')).data
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }
  async update(id, data) {
    return (await this.api.post(`/${id}`, data)).data
  }
  async delete(id) {
    return (await this.api.delete(`${id}`)).data
  }
  async getNumberOfTotalBook() {
    return (await this.api.get('/count')).data
  }
}

export default new BookService()
