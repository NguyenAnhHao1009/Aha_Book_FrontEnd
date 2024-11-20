<template>
  <div class="container text-center justify-content-center">
    <div class="pb-4 w-100">
      <div class="input-group w-100">
        <input
          v-model="searchKey"
          type="text"
          class="form-control"
          placeholder="Nhập tên sách . . ."
          @keyup.enter="search"
        />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>

  <h4 class="text-center text-warning" v-if="books.length === 0 && !loading">
    Không tìm được sách phù hợp.
  </h4>
  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-info">
        <tr class="bg-primary">
          <th>Mã sách</th>
          <th>Tên sách</th>
          <th>Tác giả</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="book in bookShow">
          <tr @click="currentBook(book._id)">
            <td>
              {{ book.masach }}
            </td>
            <td>
              {{ book.tensach }}
            </td>
            <td>
              {{ book.tacgia_nguongoc }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <Paging
      @changeCurrentPage="changeCurrentPage"
      :totalElement="books.length"
      :numberPerPage="numberPerPage"
    ></Paging>
  </div>
</template>
<script>
import sachService from '@/services/sach.service'
import Paging from './Paging.vue'

export default {
  components: {
    Paging,
  },
  emits: ['set:currentBook'],
  data() {
    return {
      books: [],
      numberPerPage: 10,
      currentPage: 1,
      searchKey: '',
      loading: true,
    }
  },
  async created() {
    try {
      this.loading = true
      this.books = await sachService.getAll()
    } catch (error) {
      alert('Có lỗi xảy ra vui lòng thử lại sau')
    } finally {
      this.loading = false
    }
  },
  methods: {
    changeCurrentPage(page) {
      this.currentPage = page
    },
    currentBook(id) {
      this.$emit('set:currentBook', id)
    },
    async search() {
      this.loading = true
      this.books = await sachService.getAll(this.searchKey)
      this.changeCurrentPage(1)
      this.loading = false
    },
  },
  computed: {
    bookShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let bookShow = this.books.slice(from, to)
      return bookShow
    },
  },
}
</script>
<style scoped>
tr {
  cursor: pointer;
}
</style>
