<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <hr />
        <Form :validation-schema="loginFormSchema" @submit="submitLogin">
          <Field
            as="select"
            id="vaitro"
            name="vaitro"
            v-model="loginInfoLocal.vaitro"
            class="form-control text-center"
          >
            <option class="text-center" disabled value="">
              <b>--- Vui lòng chọn vai trò của bạn ---</b>
            </option>

            <option value="docgia">Độc giả</option>
            <option value="nhanvien">Nhân viên</option>
          </Field>

          <!-- Hiển thị lỗi nếu có -->
          <ErrorMessage name="vaitro" class="error-feedback" />
          <div class="form-group mt-4">
            <label for="ms">Mã số người dùng:</label>
            <Field
              v-model="loginInfoLocal.ms"
              id="ms"
              name="ms"
              type="text"
              class="form-control"
            />
            <ErrorMessage name="ms" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="matKhau">Mật khẩu:</label>
            <Field
              v-model="loginInfoLocal.matKhau"
              id="matKhau"
              name="matKhau"
              type="password"
              class="form-control"
            />
            <ErrorMessage name="matKhau" class="error-feedback" />
          </div>
          <div class="form-group mt-4 text-center mt-2">
            <button class="btn w-100 btn-primary" type="submit">
              Đăng nhập
            </button>
            <RouterLink to="/">
              <button class="btn w-100 btn-outline-primary my-2" type="button">
                Thoát
              </button>
            </RouterLink>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  emits: ['submit:loginInfo'],
  props: {
    loginInfo: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginFormSchema = yup.object().shape({
      vaitro: yup.string().required('Vui lòng chọn vai trò'),
      ms: yup.string().required('Vui lòng nhập mã số người dùng'),
      matKhau: yup.string().required('Vui lòng nhập mật khẩu'),
    })
    return {
      loginInfoLocal: this.loginInfo,
      loginFormSchema,
    }
  },
  methods: {
    submitLogin() {
      this.$emit('submit:loginInfo', this.loginInfoLocal)
    },
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
