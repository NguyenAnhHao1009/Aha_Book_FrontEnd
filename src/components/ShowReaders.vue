<template>
  <div class="text-center row justify-content-center">
    <div class="col-10 col-md-6 form-group pb-4">
      <div class="input-group">
        <input
          v-model="searchKey"
          type="text"
          class="form-control"
          placeholder="Nhập tên độc giả . . ."
          @keyup.enter="search"
        />
        <button @click="search" class="btn btn-primary">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <h4 class="text-center text-warning" v-if="readers.length === 0 && !loading">
    Không tìm được độc giả phù hợp.
  </h4>
  <div v-else class="container">
    <table class="pt-5 table text-truncate table-hover table-bordered">
      <thead class="table-primary">
        <tr class="bg-primary">
          <th>Mã độc giả</th>
          <th>Họ và tên</th>
          <th>Ngày sinh</th>
          <th>Địa chỉ</th>
          <th>Điện thoại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readerShow">
          <td>
            {{ reader.madocgia }}
          </td>
          <td>
            {{ `${reader.holot} ${reader.ten}` }}
          </td>
          <td>
            {{ reader.ngaysinh }}
          </td>
          <td>
            {{ reader.diachi }}
          </td>
          <td>
            {{ reader.dienthoai }}
          </td>
        </tr>
      </tbody>
    </table>
    <Paging
      @changeCurrentPage="changeCurrentPage"
      :totalElement="readers.length"
      :numberPerPage="numberPerPage"
    ></Paging>
  </div>
</template>
<script>
import docgiaService from '@/services/docgia.service'
import Paging from './Paging.vue'

export default {
  components: {
    Paging,
  },
  data() {
    return {
      readers: [],
      numberPerPage: 8,
      currentPage: 1,
      searchKey: '',
      loading: true,
    }
  },
  async created() {
    try {
      this.loading = true
      this.readers = await docgiaService.getAll()
      console.log(this.readers)
    } catch (error) {
      alert('Có lỗi xảy ra vui lòng thử lại sau')
    }finally{
      this.loading = false
    }
  },
  methods: {
    changeCurrentPage(page) {
      this.currentPage = page
    },
    async search() {
      this.loading = true
      this.readers = await docgiaService.getAll(this.searchKey)
      this.currentPage = 1
      this.loading= false
    },
  },
  computed: {
    readerShow() {
      const from = (this.currentPage - 1) * this.numberPerPage
      const to = this.currentPage * this.numberPerPage
      let readerShow = this.readers.slice(from, to)
      return readerShow
    },
  },
}
</script>
<style></style>
