<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
        <input
          v-model="searchKey"
          type="text"
          class="form-control"
          placeholder="Nhập tên sách hoặc tên độc giả . . ."
          @keyup.enter="search"
        />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
      <div class="btn-group py-3 d-flex">
        <button
          @click="getByStatus('Chờ duyệt')"
          :class="
            (status == 'Chờ duyệt' ? 'active' : '') +
            ' btn btn-outline-primary '
          "
        >
          Chờ duyệt
        </button>
        <button
          @click="getByStatus('Đã duyệt')"
          :class="
            (status == 'Đã duyệt' ? 'active' : '') + ' btn btn-outline-primary '
          "
        >
          Đã duyệt
        </button>
        <button
          @click="getByStatus('Đã trả')"
          :class="
            (status == 'Đã trả' ? 'active' : '') + ' btn btn-outline-primary '
          "
        >
          Đã trả
        </button>
      </div>
    </div>
  </div>
  <h4 class="text-center text-warning" v-if="loans.length === 0 && !loading">
    Không tìm được kết quả phù hợp.
  </h4>
  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-info">
        <tr class="bg-primary">
          <th>STT</th>
          <th>Người mượn</th>
          <th>Tên sách</th>
          <th>Số quyển</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loan, index) in loansShow">
          <td>{{ index + 1 }}</td>
          <td>{{ `${loan.holot} ${loan.ten}` }}</td>
          <td>{{ loan.tensach }}</td>
          <td>{{ loan.soquyen }}</td>
          <td>{{ loan.ngaymuon }}</td>
          <td>{{ loan.ngaytra }}</td>

          <td
            class="text-danger change-status"
            v-if="loan.trangthai == 'Chờ duyệt'"
          >
            <span class="status-1">{{ loan.trangthai }}</span>
            <span
              class="status-2 text-success"
              @click="changeStatus(loan._id, 'Đã duyệt')"
              >Duyệt</span
            >
          </td>
          <td
            class="text-success change-status"
            v-if="loan.trangthai == 'Đã duyệt'"
          >
            <span class="status-1">{{ loan.trangthai }}</span>
            <span
              class="status-2 text-primary"
              @click="changeStatus(loan._id, 'Đã trả')"
              >Xác nhận trả</span
            >
          </td>
          <td class="text-primary" v-if="loan.trangthai == 'Đã trả'">
            {{ loan.trangthai }}
          </td>
        </tr>
      </tbody>
    </table>
    <Paging
      @changeCurrentPage="changeCurrentPage"
      :totalElement="loans.length"
      :numberPerPage="numberPerPage"
    ></Paging>
  </div>
</template>
<script>
import theodoimuonsachService from '@/services/theodoimuonsach.service'
import Paging from './Paging.vue'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      loans: [],
      numberPerPage: 8,
      currentPage: 1,
      searchKey: '',
      status: '',
      loading: true,
    }
  },
  async created() {
    try {
      this.loading = true
      this.loans = await theodoimuonsachService.getAll()
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
    async search() {
      this.loading = true
      this.loans = await theodoimuonsachService.getAll(this.searchKey)
      this.currentPage = 1
      this.status = ''
      this.loading = false
    },
    async getByStatus(status) {
      if (status != '') {
        this.status = status
        this.loading = true
        this.loans = await theodoimuonsachService.getAllByStatus(this.status)
        this.loading = false
      }
      this.currentPage = 1
      this.searchKey = ''
    },
    async changeStatus(_id, status) {
      const accept = confirm(`Xác nhận thay đổi trạng thái sang "${status}"`)
      if (accept) {
        const result = await theodoimuonsachService.update(_id, {
          trangthai: status,
        })
        
        if (result) {
          
          
          this.loading = true
          this.loans = await theodoimuonsachService.getAll()
          this.status = ''
          this.searchKey = ''
          this.loading = false
        }
      }
    },
  },
  computed: {
    loansShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let loanshow = this.loans.slice(from, to)
      return loanshow
    },
  },
}
</script>
<style scoped>
.active {
  background-color: blue;
}

tr td:last-child {
  cursor: pointer;
}

.change-status {
  position: relative;
}

.status-1,
.status-2 {
  position: absolute;
  margin: auto;
  width: 100%;
  height: 100%;
  opacity: 1;
  visibility: hidden;
}

.status-1 {
  visibility: visible;
}

/* Khi hover vào .change-status, ẩn status-1 và hiển thị status-2 */
.change-status:hover .status-1 {
  opacity: 0; /* Làm mờ status-1 */
  visibility: hidden; /* Ẩn status-1 */
}

.change-status:hover .status-2 {
  opacity: 1; /* Hiển thị status-2 */
  visibility: visible; /* Hiển thị status-2 */
  text-decoration: underline;
}
</style>
