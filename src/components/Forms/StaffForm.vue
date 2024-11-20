<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <!-- Sử dụng VeeValidate Form component -->

        <Form :validation-schema="staffFormSchema" @submit="createStaff">
          <div class="d-flex justify-content-between">
            <div class="form-group mt-4 col-6">
              <label for="msnv">Mã số nhân viên:</label>

              <Field
                :disabled="staffLocal._id"
                id="msnv"
                name="msnv"
                type="text"
                v-model="staffLocal.msnv"
                class="form-control"
              />

              <ErrorMessage name="msnv" class="error-feedback" />
            </div>
            <div class="form-group mt-4 col-5">
              <label for="diachi">Chức vụ:</label>

              <!-- Dropdown cho chọn lựa Chức vụ -->
              <Field
                :disabled="staffLocal._id"
                as="select"
                id="chucvu"
                name="chucvu"
                v-model="staffLocal.chucvu"
                class="form-control"
              >
                <!-- Các lựa chọn trong dropdown -->
                <option value="Quản lý">Quản lý</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Kế toán">Kế toán</option>
              </Field>

              <!-- Hiển thị lỗi nếu có -->
              <ErrorMessage name="chucvu" class="error-feedback" />
            </div>
          </div>
          <div class="form-group mt-4">
            <label for="hotennv">Họ tên nhân viên:</label>

            <Field
              id="hotennv"
              name="hotennv"
              type="text"
              v-model="staffLocal.hotennv"
              class="form-control"
            />

            <ErrorMessage name="hotennv" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="sodienthoai">Số điện thoại nhân viên:</label>

            <Field
              id="sodienthoai"
              name="sodienthoai"
              type="text"
              v-model="staffLocal.sodienthoai"
              class="form-control"
            />

            <ErrorMessage name="sodienthoai" class="error-feedback" />
          </div>

          <div class="form-group mt-4">
            <label for="diachi">Địa chỉ nhân viên:</label>

            <Field
              id="diachi"
              name="diachi"
              type="text"
              v-model="staffLocal.diachi"
              class="form-control"
            />

            <ErrorMessage name="diachi" class="error-feedback" />
          </div>

          <div class="form-group mt-4" v-if="!staffLocal._id">
            <label for="password">Mật khẩu nhân viên:</label>

            <Field
              id="password"
              name="password"
              type="password"
              v-model="staffLocal.password"
              class="form-control"
            />

            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group mt-4" v-else>
            <RouterLink :to="`password/${staff._id}`">
              <button class="btn w-100 btn-outline-danger">Đổi mật khẩu</button>
            </RouterLink>
          </div>

          <div class="form-group mt-4 text-center mt-2">
            <RouterLink to="/staff">
              <button class="btn btn-outline-primary mx-2" type="button">
                Quay lại
              </button>
            </RouterLink>
            <button
              v-if="staffLocal._id"
              class="btn btn-primary"
              @click="editStaff"
            >
              Sửa
            </button>
            <button v-else class="btn btn-primary" type="submit">Thêm</button>
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
    staff: { type: Object, required: true },
  },
  emits: ['create:staff', 'edit:staff'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const staffFormSchema = yup.object().shape({
      msnv: yup.string().trim().required('Vui lòng nhập mã số nhân viên'),
      hotennv: yup.string().trim().required('Vui lòng nhập họ tên nhân viên'),
      password: yup
        .string()
        .min(8, 'Mật khẩu ít nhất 8 ký tự')
        .required('Vui lòng nhập mật khẩu cho nhân viên'),
      sodienthoai: yup
        .string()
        .trim()
        .required('Vui lòng nhập số điện thoại')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.',
        ),
      diachi: yup.string().trim().required('Vui lòng nhập địa chỉ'),
      chucvu: yup.string().trim().required('Vui lòng chọn chức vụ'),
    })
    return {
      staffLocal: this.staff,
      staffFormSchema,
    }
  },
  methods: {
    createStaff() {
      this.$emit('create:staff', this.staffLocal)
    },
    editStaff() {
      this.$emit('edit:staff', this.staffLocal)
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
