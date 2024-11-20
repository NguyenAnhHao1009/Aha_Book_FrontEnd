<template>
  <div class="mb-5" v-if="staff">
    <h1 class="py-5 text-center"><b>THAY ĐỔI MẬT KHẨU</b></h1>
    <h5 v-if="message" class="text-danger text-center">{{ message }}</h5>
    <ChangePasswordForm :user="staff" @edit:user="editStaff" />
  </div>
</template>
<script>
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm.vue'
import nhanvienService from '@/services/nhanvien.service'
export default {
  props: {
    id: { type: String, required: true },
  },
  components: {
    ChangePasswordForm,
  },
  data() {
    return {
      staff: null,
      message: '',
    }
  },
  methods: {
    async editStaff(newInfo) {
      const result = await nhanvienService.changePassword(this.id, {
        oldPass: newInfo.oldPass,
        newPass: newInfo.newPass,
      })

      if (result) {
        if (result.errorMessage) {
          return (this.message = result.errorMessage)
        }
        alert('Đổi mật khẩu thành công')
        this.$router.back()
      } else {
        this.message = 'Có lỗi khi thay đổi mật khẩu vui lòng thử lại sau'
        this.$router.back()
      }
    },
    async getStaff() {
      try {
        this.staff = await nhanvienService.get(this.id)
        console.log(this.staff)
      } catch (error) {
        console.log(error)
        this.$router.push({
          name: 'not_found',
          params: {
            pathMatch: this.$route.path.split('/').slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        })
      }
    },
  },
  created() {
    this.getStaff()
  },
}
</script>

<style></style>
