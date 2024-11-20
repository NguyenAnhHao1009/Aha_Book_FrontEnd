<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
       
        <!-- Sử dụng VeeValidate Form component -->
        <Form
          :validation-schema="publisherFormSchema"
          @submit="createPublisher"
        >
          <div class="form-group mt-4">
            <label for="manxb">Mã nhà xuất bản:</label>

            <Field
              id="manxb"
              name="manxb"
              type="text"
              v-model="publisherLocal.manxb"
              class="form-control"
              :disabled="publisherLocal._id"
            />

            <ErrorMessage name="manxb" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="tennxb">Tên nhà xuất bản:</label>

            <Field
              id="tennxb"
              v-model="publisherLocal.tennxb"
              name="tennxb"
              type="text"
              class="form-control"
            />

            <ErrorMessage name="tennxb" class="error-feedback" />
          </div>
          <div class="form-group mt-4">
            <label for="diachi">Địa chỉ:</label>

            <Field
              id="diachi"
              v-model="publisherLocal.diachi"
              name="diachi"
              type="text"
              class="form-control"
            />

            <ErrorMessage name="diachi" class="error-feedback" />
          </div>
          <div class="form-group mt-4 text-center mt-2">
            <RouterLink to="/publisher">
              <button class="btn btn-outline-primary mx-2" type="button">
                Quay lại
              </button>
            </RouterLink>
            <button
              v-if="publisherLocal._id"
              class="btn btn-primary"
              @click="editPublisher"
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
    publisher: { type: Object, required: true },
  },
  emits: ['create:publisher', 'edit:publisher'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const publisherFormSchema = yup.object().shape({
      manxb: yup.string().trim().required('Vui lòng nhập mã nhà xuất bản'),
      tennxb: yup.string().trim().required('Vui lòng nhập tên nhà xuất bản'),
      diachi: yup
        .string()
        .trim()
        .required('Vui lòng nhập địa chỉ nhà xuất bản'),
    })
    return {
      publisherLocal: this.publisher,
      publisherFormSchema,
    }
  },
  methods: {
    createPublisher() {
      this.$emit('create:publisher', this.publisherLocal)
    },
    editPublisher() {
      console.log('Sửa')

      this.$emit('edit:publisher', this.publisherLocal)
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
