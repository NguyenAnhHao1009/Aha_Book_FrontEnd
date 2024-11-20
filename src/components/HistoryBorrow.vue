<template>
  <div class="text-center justify-content-center row">
    <div class="col-8 col-lg-4">
      <div class="btn-group d-flex">
        <button @click="changeFilter('Chờ duyệt')" class="btn btn-primary">
          Chờ duyệt
        </button>
        <button
          @click="changeFilter('Đã duyệt')"
          class="btn btn-outline-primary"
        >
          Đã duyệt
        </button>
        <button @click="changeFilter('Đã trả')" class="btn btn-primary">
          Đã trả
        </button>
      </div>
    </div>
  </div>
  <div v-if="historyShow.length == 0">
    <h4 class="text-primary pt-4 text-center">Không có kết quả cho mục này</h4>
  </div>
  <div v-else>
    <table class="mt-4 table text-truncate table-hover table-bordered">
      <thead class="table-info">
        <tr class="fw-bold">
          <td>STT</td>
          <td>Tên sách</td>
          <td>Tác giả</td>
          <td>Số quyển</td>
          <td>Ngày mượn</td>
          <td>Ngày trả</td>
          <td>Trạng thái</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in historyShow">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.tensach }}</td>
            <td>{{ item.tacgia }}</td>
            <td>{{ item.soquyen }}</td>
            <td>{{ item.ngaymuon }}</td>
            <td>{{ item.ngaytra }}</td>
            <td
              :class="
                item.trangthai == 'Chờ duyệt'
                  ? 'text-danger text-center'
                  : item.trangthai == 'Đã duyệt'
                    ? 'text-success text-center'
                    : 'text-secondary text-center'
              "
            >
              {{ item.trangthai }}
              <span
                @click="removeBorrow(item._id, item.tensach)"
                class="btn btn-outline-danger btn-sm"
                v-if="item.trangthai == 'Chờ duyệt'"
              >
                <i class="fa-regular fa-calendar-xmark"></i
              ></span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import theodoimuonsachService from '@/services/theodoimuonsach.service'

export default {
  emits: ['reloadShow'],
  props: {
    historyBorrow: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      historyShow: this.historyBorrow,
    }
  },
  methods: {
    changeFilter(filter) {
      this.historyShow = this.historyBorrow.filter(item => {
        switch (filter) {
          case 'Chờ duyệt':
            return item.trangthai === 'Chờ duyệt'
          case 'Đã duyệt':
            return item.trangthai === 'Đã duyệt'
          case 'Đã trả':
            return item.trangthai === 'Đã trả'
          default:
            return true
        }
      })
    },
    removeBorrow(id, tensach) {
      let accept = confirm(`Bạn có muốn hủy đăng ký mượn "${tensach}" không?`)
      if (accept) {
        const result = theodoimuonsachService.removeBorrow(id)
        if (result.errorMessage) {
          alert('Xóa không thành công')
        } else {
          alert('Hủy đăng ký mượn sách thành công')
          this.$emit('reloadShow')
        }
      }
    },
  },
  watch: {
    historyBorrow: {
      handler(newVal) {
        this.historyShow = newVal
      },
      deep: true,
    },
  },
}
</script>
