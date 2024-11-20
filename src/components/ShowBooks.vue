<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
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
  <div class="container" v-if="getRole == 'NV' || getRole == 'QL'">
    <RouterLink :to="{ name: 'add-book' }">
      <button class="btn btn-outline-success">Thêm sách</button>
    </RouterLink>
    <hr />
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
          <th>Năm xuất bản</th>
          <th>Tác giả</th>
          <th>Số quyển</th>
          <th>Đơn giá</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="book in bookShow">
          <tr
            @click="
              getRole == 'QL' || getRole == 'NV' ? goToEdit(book._id) : ''
            "
          >
            <td>
              {{ book.masach }}
            </td>
            <td>
              {{ book.tensach }}
            </td>
            <td>
              {{ book.namxuatban }}
            </td>
            <td>
              {{ book.tacgia_nguongoc }}
            </td>
            <td>
              {{ book.soquyen }}
            </td>
            <td>
              {{ book.dongia }}
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      books: [],
      numberPerPage: 8,
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
    goToEdit(id) {
      this.$router.push(`/book/edit/${id}`)
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

    ...mapGetters(['getRole']),
  },
}
</script>
<style scoped>
tr {
  cursor: pointer;
}
</style>
