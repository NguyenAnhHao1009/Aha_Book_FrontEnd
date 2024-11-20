<template>
  <div id="login" class="pt-5">
    <h1 class="text-center main-title pt-5">ĐĂNG NHẬP</h1>
    <h5 class="text-center text-danger">{{ message }}</h5>
    <LoginForm @submit:loginInfo="submitLogin" :loginInfo="loginInfo" />
  </div>
</template>

<script>
import LoginForm from '@/components/Forms/LoginForm.vue'
import docgiaService from '@/services/docgia.service'
import nhanvienService from '@/services/nhanvien.service'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      loginInfo: {
        vaitro: '',
        ms: '',
        matKhau: '',
      },
      message: '',
    }
  },
  methods: {
    ...mapActions(['login']),

    loginCustomer() {},
    async loginStaff() {
      try {
        const response = await nhanvienService.login({
          msNV: this.loginInfo.ms,
          matKhau: this.loginInfo.matKhau,
        })

        if (response.success) {
          const { token, user } = response

          alert('Đăng nhập thành công với vai trò nhân viên')
          this.login({ token, user })

          this.$router.push('/')
        } else {
          this.message = response.message
        }
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
    async loginCustomer() {
      try {
        const response = await docgiaService.login({
          madocgia: this.loginInfo.ms,
          password: this.loginInfo.matKhau,
        })
        console.log(response)

        if (response.success) {
          const { token, user } = response

          alert('Đăng nhập thành công với vai trò độc giả')

          this.login({ token, user })
          this.$router.push('/')
        } else {
          this.message = response.errorMessage
        }
      } catch (error) {}
    },
    submitLogin() {
      if (this.loginInfo.vaitro === 'docgia') {
        this.loginCustomer()
      }
      if (this.loginInfo.vaitro === 'nhanvien') {
        this.loginStaff()
      }
    },
  },
}
</script>

<style></style>
