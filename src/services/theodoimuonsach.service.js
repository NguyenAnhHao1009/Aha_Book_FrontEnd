import createAppClient from './api.service'

class BorrowedBookTrackService {
  constructor(baseURL = '/api/borrowed-book-tracking') {
    this.api = createAppClient(baseURL)
  }
  async getAll(seachKey) {
    if (!seachKey) return (await this.api.get('/')).data
    return (await this.api.get(`/?searchKey=${seachKey}`)).data
  }
  async getAllByStatus(status) {
    return (await this.api.get(`/?status=${status}`)).data
  }
  async create(data) {
    return (await this.api.post('/', data)).data
  }
  async getNumberFree(masach) {
    return (await this.api.get(`/masach/${masach}`)).data
  }
  async getNumberBorrowedOfReader(madocgia, masach) {
    return (await this.api.get(`/damuon?madocgia=${madocgia}&masach=${masach}`))
      .data
  }
  async get() {
    return (await this.api.get('/detail')).data
  }
  async getHistory(id) {
    return (await this.api.get(`/history/${id}`)).data
  }
  async removeBorrow(id){
    return (await this.api.delete(`/${id}`)).data
  }
  async update(id, data) {
    return (await this.api.post(`/update/${id}`, data)).data
  }
}

export default new BorrowedBookTrackService()
