<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
        <input
          v-model="searchKey"
          type="text"
          class="form-control"
          placeholder="Nhập tên nhân viên . . ."
          @keyup.enter="search"
        />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <div class="container">
    <RouterLink :to="{ name: 'add-staff' }"
      ><button class="btn btn-outline-success">
        Thêm nhân viên
      </button></RouterLink
    >
    <hr />
  </div>
  <h4 class="text-center text-warning" v-if="staffs.length === 0 && !loading">
    Không tìm được nhân viên phù hợp.
  </h4>

  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-success">
        <tr class="bg-primary">
          <th>Mã nhân viên</th>
          <th>Họ và tên</th>
          <th>Chức vụ</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th class="text-center">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffShow">
          <td>
            {{ staff.msnv }}
          </td>
          <td>
            {{ staff.hotennv }}
          </td>
          <td>
            {{ staff.chucvu }}
          </td>
          <td>
            {{ staff.sodienthoai }}
          </td>
          <td>
            {{ staff.diachi }}
          </td>

          <td class="text-center">
            <button
              @click="deleteStaff(staff._id, staff.hotennv)"
              class="btn btn-sm btn-danger"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paging
      @changeCurrentPage="changeCurrentPage"
      :totalElement="staffs.length"
      :numberPerPage="numberPerPage"
    ></Paging>
  </div>
</template>
<script>
import nhanvienService from '@/services/nhanvien.service'
import Paging from './Paging.vue'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      staffs: [],
      numberPerPage: 8,
      currentPage: 1,
      searchKey: '',
      loading: true,
    }
  },
  async created() {
    try {
      this.staffs = await nhanvienService.getAll()
      console.log(this.staffs)
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
      this.staffs = await nhanvienService.getAll(this.searchKey)
      this.currentPage = 1
      this.loading = false
    },
    async deleteStaff(id, hotennv) {
      const userObject = JSON.parse(window.localStorage.getItem('user'))

      if (userObject._id === id) {
        return alert('Không thể xóa tài khoản này đang được sử dụng')
      }

      const accept = confirm(`Bạn có muốn xóa nhân viên "${hotennv}"`)
      if (accept) {
        const result = await nhanvienService.delete(id)
        if (result) {
          alert(`Xóa thành công một nhân viên`)
          this.loading = true
          this.staffs = await nhanvienService.getAll()
          this.searchKey = ''
          this.changeCurrentPage(1)
          this.loading = false
        } else {
          alert('Có lỗi xảy ra vui lòng thử lại sau')
        }
      }
    },
  },
  computed: {
    staffShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let staffShow = this.staffs.slice(from, to)
      return staffShow
    },
  },
}
</script>
<style></style>
