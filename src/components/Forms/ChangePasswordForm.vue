<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <!-- Sử dụng VeeValidate Form component -->

        <Form :validation-schema="userFormSchema" @submit="changePassWord">
          <div class="form-group mt-4">
            <label for="oldPass">Mật khẩu cũ:</label>

            <Field
              id="oldPass"
              name="oldPass"
              type="password"
              v-model="userLocal.oldPass"
              class="form-control"
            />

            <ErrorMessage name="oldPass" class="error-feedback" />
          </div>

          <div class="form-group mt-4">
            <label for="newPass">Mật khẩu mới:</label>

            <Field
              id="newPass"
              name="newPass"
              type="password"
              v-model="userLocal.newPass"
              class="form-control"
            />

            <ErrorMessage name="newPass" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="newPass">Mật khẩu mới:</label>

            <Field
              id="reNewPass"
              name="reNewPass"
              type="password"
              class="form-control"
            />

            <ErrorMessage name="reNewPass" class="error-feedback" />
          </div>
          <div class="form-group mt-4 text-center">
            <button class="btn btn-primary w-100" type="submit">
              Đổi mật khẩu
            </button>
            <RouterLink to="/"
              ><button class="form-control btn my-2 btn-outline-primary">
                Thoát
              </button></RouterLink
            >
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
  props: {
    user: { type: Object, required: true },
  },
  emits: ['create:user', 'edit:user'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const userFormSchema = yup.object().shape({
      oldPass: yup.string().trim().required('Vui lòng nhập mật khẩu cũ'),
      newPass: yup.string().trim().required('Vui lòng nhập mật khẩu mới'),
      reNewPass: yup
        .string()
        .trim()
        .required('Vui lòng xác nhận mật khẩu mới')
        .test(
          'password-match',
          'Mật khẩu xác nhận không khớp với mật khẩu mới',
          function (value) {
            return value === this.parent.newPass // Kiểm tra giá trị của reNewPass so với newPass
          },
        ),
    })
    return {
      userLocal: this.user,
      userFormSchema,
    }
  },
  methods: {
    changePassWord() {
      this.$emit('edit:user', this.userLocal)
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
