<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
        <input
          v-model="searchKey"
          type="text"
          class="form-control"
          placeholder="Nhập tên nhà xuất bản . . ."
          @keyup.enter="search"
        />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <div class="container">
    <RouterLink :to="{ name: 'add-publisher' }"
      ><button class="btn btn-outline-success">
        Thêm nhà xuất bản
      </button></RouterLink
    >
    <hr />
  </div>

  <!-- Hiển thị thông báo khi không tìm thấy nhà xuất bản và đã tải xong dữ liệu -->
  <h4
    class="text-center text-warning"
    v-if="publishers.length === 0 && !loading"
  >
    Không tìm thấy nhà xuất bản phù hợp
  </h4>

  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-info">
        <tr class="bg-primary">
          <th>Mã nhà xuất bản</th>
          <th>Tên nhà xuất bản</th>
          <th>Địa chỉ</th>
          <th class="text-center">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishersShow" :key="publisher.manxb">
          <td>{{ publisher.manxb }}</td>
          <td>{{ publisher.tennxb }}</td>
          <td>{{ publisher.diachi }}</td>
          <td class="text-center justify-content-between">
            <RouterLink :to="`/publisher/edit/${publisher._id}`">
              <button class="btn btn-primary mx-2 btn-sm">
                <i class="fa fa-solid fa-pencil"></i>
              </button>
            </RouterLink>
            <button
              @click="deletePublisher(publisher._id, publisher.tennxb)"
              class="btn btn-danger btn-sm"
            >
              <i class="fa fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paging
      @changeCurrentPage="changeCurrentPage"
      :totalElement="publishers.length"
      :numberPerPage="numberPerPage"
    ></Paging>
  </div>
</template>

<script>
import nhaxuatbanService from '@/services/nhaxuatban.service'
import Paging from './Paging.vue'
import Login from '@/Views/Login.vue'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      publishers: [],
      numberPerPage: 8,
      currentPage: 1,
      searchKey: '',
      loading: true,
    }
  },
  async created() {
    try {
      this.publishers = await nhaxuatbanService.getAll()
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
      this.publishers = await nhaxuatbanService.getAll(this.searchKey)
      this.currentPage = 1
      this.loading = false
    },
    async deletePublisher(id, name) {
      const accept = confirm(`Bạn có muốn xóa "${name}"`)
      if (accept) {
        const result = await nhaxuatbanService.delete(id)
        if (result.errorMessage) {
          return alert(result.errorMessage)
        }
        alert('Xóa thành công')

        this.loading = true
        this.publishers = await nhaxuatbanService.getAll(this.searchKey)
        this.searchKey = ''
        this.loading = false
        this.changeCurrentPage(1)
      }
    },
  },
  computed: {
    publishersShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let publishersShow = this.publishers.slice(from, to)
      return publishersShow
    },
  },
}
</script>

<style scoped></style>
