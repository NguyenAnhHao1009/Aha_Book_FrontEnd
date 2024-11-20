<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
    <h5 v-if="message" class="text-center text-danger">{{ message }}</h5>
    <CustomerForm :customer="customer" @submit:customer="signUp" />
  </div>
</template>

<script>
import CustomerForm from '@/components/Forms/CustomerForm.vue'
import docgiaService from '@/services/docgia.service'
export default {
  components: {
    CustomerForm,
  },
  data() {
    return {
      message: '',
      customer: {
        madocgia: '',
        holot: '',
        ten: '',
        ngaysinh: '',
        diachi: '',
        dienthoai: '',
        password: '',
      },
    }
  },
  methods: {
    async signUp(customer) {
      try {
        console.log(customer)

        const result = await docgiaService.create(customer)
        if (result) {
          if (result.errorMessage) {
            return (this.message = result.errorMessage)
          }
          alert('Đăng ký thành công')
          this.$router.back()
        }
      } catch (error) {
        console.log(error)
        alert('Có lỗi xảy ra vui lòng thử lại sau')
      }
    },
  },
}
</script>
<style scoped>
h1 {
  font-weight: bolder;
}
.text-underline {
  text-decoration: underline;
}
</style>
