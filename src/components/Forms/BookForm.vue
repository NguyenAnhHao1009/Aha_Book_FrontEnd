<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <!-- Sử dụng VeeValidate Form component -->

        <Form :validation-schema="bookFormSchema" @submit="createBook">
          <div class="form-group mt-4">
            <label for="masach">Mã sách:</label>

            <Field
              :disabled="bookLocal._id"
              id="masach"
              name="masach"
              type="text"
              v-model="bookLocal.masach"
              class="form-control"
            />

            <ErrorMessage name="masach" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="tensach">Tên sách:</label>

            <Field
              id="tensach"
              name="tensach"
              type="text"
              v-model="bookLocal.tensach"
              class="form-control"
            />

            <ErrorMessage name="tensach" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="manxb">Nhà xuất bản:</label>

            <!-- Dropdown cho chọn lựa Chức vụ -->
            <Field
              as="select"
              id="manxb"
              name="manxb"
              v-model="bookLocal.manxb"
              class="form-control"
            >
              <option disabled value="">---Chọn nhà xuất bản---</option>
              <template v-for="publisher in publishers">
                <option :value="publisher.manxb">
                  {{ publisher.manxb + ' - ' + publisher.tennxb }}
                </option>
              </template>
            </Field>

            <!-- Hiển thị lỗi nếu có -->
            <ErrorMessage name="manxb" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="dongia">Đơn giá:</label>
            <Field
              id="dongia"
              name="dongia"
              type="number"
              v-model="bookLocal.dongia"
              class="form-control"
            />
            <ErrorMessage name="dongia" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="soquyen">Số quyển:</label>

            <Field
              id="soquyen"
              name="soquyen"
              type="number"
              v-model="bookLocal.soquyen"
              class="form-control"
            />

            <ErrorMessage name="soquyen" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="namxuatban">Năm xuất bản:</label>

            <Field
              id="namxuatban"
              name="namxuatban"
              type="number"
              v-model="bookLocal.namxuatban"
              class="form-control"
            />

            <ErrorMessage name="namxuatban" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="tacgia_nguongoc">Tác giả:</label>

            <Field
              id="tacgia_nguongoc"
              name="tacgia_nguongoc"
              type="text"
              v-model="bookLocal.tacgia_nguongoc"
              class="form-control"
            />

            <ErrorMessage name="tacgia_nguongoc" class="error-feedback" />
          </div>

          <div class="form-group mt-4 text-center mt-2">
            <RouterLink to="/">
              <button class="btn btn-outline-primary mx-2" type="button">
                Quay lại
              </button>
            </RouterLink>
            <button
              v-if="bookLocal._id"
              class="btn btn-primary"
              @click="editBook"
            >
              Sửa
            </button>
            <button
              v-if="bookLocal._id"
              class="mx-2 btn btn-danger"
              @click="deleteBook"
            >
              Xóa
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
import nhaxuatbanService from '@/services/nhaxuatban.service'

export default {
  props: {
    book: { type: Object, required: true },
  },
  emits: ['create:book', 'edit:book', 'delete:book'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const bookFormSchema = yup.object().shape({
      masach: yup.string().trim().required('Vui lòng nhập mã sách'),
      tensach: yup.string().trim().required('Vui lòng nhập tên sách'),
      manxb: yup.string().required('Vui lòng chọn mã nhà xuất bản'),
      dongia: yup
        .number()
        .typeError('Đơn giá phải là một số')
        .required('Vui lòng nhập đơn giá')
        .moreThan(0, 'Đơn giá không hợp lệ'),
      soquyen: yup
        .number()
        .required('Vui lòng nhập số quyển')
        .typeError('Số quyển phải là một số')
        .moreThan(0, 'Số quyển không hợp lệ'),
      namxuatban: yup
        .number()
        .required('Vui lòng chọn năm xuất bản')
        .typeError('Năm xuất bản phải là một năm hợp lệ')
        .moreThan(0, 'Năm xuất bản không hợp lệ'),
      tacgia_nguongoc: yup.string().required('Vui lòng nhập tác giả'),
    })
    return {
      bookLocal: this.book,
      bookFormSchema,
      publishers: [],
    }
  },
  methods: {
    createBook() {
      this.$emit('create:book', this.bookLocal)
    },
    editBook() {
      this.$emit('edit:book', this.bookLocal)
    },
    deleteBook() {
      const accept = confirm('Bạn có muốn xóa sách này không')
      if (accept) {
        this.$emit('delete:book')
      }
    },
    async getPublishers() {
      try {
        this.publishers = await nhaxuatbanService.getAll()
      } catch (error) {
        alert('Có lỗi xảy ra khi lấy danh sách nhà xuất bản')
      }
    },
  },
  created() {
    this.getPublishers()
  },
}
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875em;
}
</style>
