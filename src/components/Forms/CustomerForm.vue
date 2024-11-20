<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <hr />
        <Form :validation-schema="signUpFormSchema" @submit="submitChange">
          <div class="form-group mt-4">
            <Field
              :disabled="customerLocal._id"
              placeholder="Mã độc giả"
              id="madocgia"
              name="madocgia"
              type="text"
              class="form-control"
              v-model="customerLocal.madocgia"
            />
            <ErrorMessage name="madocgia" class="error-feedback" />
          </div>
          <div class="form-group mt-4" v-if="!customerLocal._id">
            <Field
              id="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              v-model="customerLocal.password"
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="justify-content-between row">
            <div class="form-group mt-4 col-6">
              <Field
                placeholder="Họ và chữ lót"
                id="holot"
                name="holot"
                type="text"
                class="form-control"
                v-model="customerLocal.holot"
              />
              <ErrorMessage name="holot" class="error-feedback" />
            </div>
            <div class="form-group mt-4 col-5">
              <Field
                placeholder="Tên"
                id="ten"
                name="ten"
                type="text"
                class="form-control"
                v-model="customerLocal.ten"
              />
              <ErrorMessage name="ten" class="error-feedback" />
            </div>
          </div>

          <label class="mt-4">Ngày sinh:</label>
          <div class="justify-content-between row">
            <!-- Ngày -->
            <div class="form-group col">
              <Field
                as="select"
                id="ngay"
                name="ngay"
                class="form-control"
                v-model="ngay"
              >
                <option disabled value="">Ngày</option>
                <template
                  v-for="i in Array.from(
                    { length: 31 },
                    (_, index) => index + 1,
                  )"
                >
                  <option :value="i">{{ i }}</option>
                </template>
              </Field>
              <ErrorMessage name="ngay" class="error-feedback" />
            </div>

            <!-- Tháng -->
            <div class="form-group col">
              <Field
                as="select"
                id="thang"
                name="thang"
                v-model="thang"
                class="form-control"
              >
                <option disabled value="">Tháng</option>
                <template
                  v-for="i in Array.from(
                    { length: 12 },
                    (_, index) => index + 1,
                  )"
                >
                  <option :value="i">{{ i }}</option>
                </template>
              </Field>
              <ErrorMessage name="thang" class="error-feedback" />
            </div>

            <!-- Năm -->
            <div class="form-group col">
              <Field
                as="select"
                id="nam"
                name="nam"
                v-model="nam"
                class="form-control"
              >
                <option disabled value="">Năm</option>
                <template
                  v-for="i in Array.from(
                    { length: 41 },
                    (_, index) => 1980 + index,
                  )"
                >
                  <option :value="i">{{ i }}</option>
                </template>
              </Field>
              <ErrorMessage name="nam" class="error-feedback" />
            </div>
          </div>

          <div class="form-group mt-4">
            <label for="diachi">Địa chỉ:</label>
            <Field
              id="diachi"
              name="diachi"
              type="text"
              class="form-control"
              v-model="customerLocal.diachi"
            />
            <ErrorMessage name="diachi" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="dienthoai">Số điện thoại:</label>
            <Field
              id="dienthoai"
              name="dienthoai"
              type="text"
              class="form-control"
              v-model="customerLocal.dienthoai"
            />
            <ErrorMessage name="dienthoai" class="error-feedback" />
          </div>
          <div class="form-group mt-4 text-center mt-2">
            <button
              v-if="customer._id"
              class="btn w-100 btn-primary"
              type="submit"
            >
              Cập nhật
            </button>
            <button v-else class="btn w-100 btn-primary" type="submit">
              Đăng Ký
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
  emits: ['submit:customer'],
  props: {
    customer: { type: Object, required: true },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const signUpFormSchema = yup.object().shape({
      madocgia: yup
        .string()
        .required('Vui lòng nhập mã độc giả')
        .min(5, 'Mã độc giả phải có ít nhất 5 ký tự'),
      holot: yup.string().required('Vui lòng nhập họ và chữ lót'),
      ten: yup.string().required('Vui lòng nhập tên'),
      diachi: yup.string().required('Vui lòng nhập địa chỉ'),
      dienthoai: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.',
        ),
      ngay: yup.string().required('Vui lòng chọn ngày'),
      thang: yup.string().required('Vui lòng chọn tháng'),
      nam: yup.string().required('Vui lòng chọn năm'),
      // password: yup.string().required('Vui lòng nhập mật khẩu'),
    })
    return {
      customerLocal: this.customer,
      signUpFormSchema,
      ngay: Number(this.customer.ngaysinh.split('-')[0]) ?? '',
      thang: Number(this.customer.ngaysinh.split('-')[1]) ?? '',
      nam: Number(this.customer.ngaysinh.split('-')[2]) ?? '',
    }
  },
  methods: {
    submitChange() {
      this.customerLocal = {
        ...this.customerLocal,
        ngaysinh: `${this.ngay}-${this.thang}-${this.nam}`,
      }
      this.$emit('submit:customer', this.customerLocal)
    },
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}
.custom-dropdown {
  max-height: 50px; /* Chiều cao tối đa */
  overflow-y: auto; /* Kích hoạt cuộn dọc nếu nội dung vượt quá chiều cao */
}
</style>
