<template>
  <div class="mb-5" v-if="book">
    <h1 class="py-5 text-center">CHỈNH SỬA THÔNG TIN SÁCH</h1>
    <h5 v-if="message" class="text-center text-primary">{{ message }}</h5>
    <BookForm :book="book" @edit:book="editBook" @delete:book="deleteBook" />
  </div>
</template>

<script>
import BookForm from '@/components/Forms/BookForm.vue'
import sachService from '@/services/sach.service'
export default {
  props: {
    id: { type: String, required: true },
  },
  components: { BookForm },
  data() {
    return {
      book: null,
      message: '',
    }
  },
  methods: {
    async editBook(book) {
      const result = await sachService.update(this.id, book)
      if (result) {
        if (result.errorMessage) {
          return (this.message = result.errorMessage)
        }
        return (this.message = 'Cập nhật thành công thông tin sách')
      }
    },
    async deleteBook() {
      try {
        const result = await sachService.delete(this.id)
        if (result) {
          if (result.errorMessage) {
            return (this.message = result.errorMessage)
          }
          alert(`Xóa thành công sách ${this.book.tensach}`)
          this.$router.back()
        }
      } catch (error) {
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
    async getBook() {
      try {
        this.book = await sachService.get(this.id)
      } catch (error) {
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
    this.getBook()
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
