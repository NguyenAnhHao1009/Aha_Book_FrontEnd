<template>
  <div class="mb-5">
    <h1 class="py-5 text-center"><b>ĐĂNG KÝ MƯỢN SÁCH</b></h1>
    <div class="row">
      <div class="col-12 col-lg-8 mb-3">
        <ShowBooksForBorrow @set:currentBook="getOneBook" />
      </div>
      <div v-if="currentBook" class="col-12 col-lg-4">
        <BookDetail :book="currentBook" @submit:borrowInfo="borrowBook" />
      </div>
      <div v-else class="col-12 col-lg-4 py-2">
        <h3 class="text-center"><b>CHỌN SÁCH ĐỂ XEM THÔNG TIN</b></h3>
      </div>
    </div>
  </div>
</template>
<script>
import ShowBooksForBorrow from '@/components/ShowBooksForBorrow.vue'
import BookDetail from './Book/BookDetail.vue'
import sachService from '@/services/sach.service'
import theodoimuonsachService from '@/services/theodoimuonsach.service'

export default {
  components: {
    ShowBooksForBorrow,
    BookDetail,
  },
  data() {
    return {
      currentBook: null,
    }
  },
  methods: {
    async getOneBook(id) {
      try {
        this.currentBook = await sachService.get(id)
      } catch (error) {
        alert('Có lỗi xảy ra khi tra cứu thông tin 1 sách')
      }
    },
    async borrowBook(info) {
      const data = {
        madocgia: JSON.parse(localStorage.getItem('user')).madocgia,
        masach: this.currentBook.masach,
        ngaymuon: info.borrowDate.split('-').reverse().join('-'),
        ngaytra: info.returnDate.split('-').reverse().join('-'),
        soquyen: info.quantity,
        trangthai: 'Chờ duyệt',
      }

      try {
        const result = await theodoimuonsachService.create(data)
        if (result) {
          alert('Đăng ký mượn sách thành công')
          this.getOneBook(this.currentBook._id)
        }
      } catch (error) {
        alert('Có lỗi xảy ra vui lòng thử lại sau')
      }
    },
  },
}
</script>

<style></style>
