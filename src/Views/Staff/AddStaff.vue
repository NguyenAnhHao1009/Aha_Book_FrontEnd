<template>
  <div class="mb-5">
    <h1 class="py-5 text-center"><b>THÊM NHÂN VIÊN</b></h1>
    <h5 v-if="message" class="text-danger text-center">{{ message }}</h5>
    <StaffForm :staff="staff" @create:staff="createStaff" />
  </div>
</template>
<script>
import StaffForm from '@/components/Forms/StaffForm.vue'
import nhanvienService from '@/services/nhanvien.service'
export default {
  components: {
    StaffForm,
  },
  data() {
    return {
      staff: {
        msnv: '',
        hotennv: '',
        password: '',
        diachi: '',
        sodienthoai: '',
        chucvu: '',
      },
      message: '',
    }
  },
  methods: {
    async createStaff() {
      const result = await nhanvienService.create(this.staff)
      if (result) {
        if (result.errorMessage) {
          return (this.message = result.errorMessage)
        }
        alert(`Thêm thành công nhân viên "${result.hotennv}"`)
        this.$router.push({ name: 'staff' })
      }
      this.message('Có lỗi xảy ra vui lòng thử lại sau!')
    },
  },
}
</script>

<style></style>
