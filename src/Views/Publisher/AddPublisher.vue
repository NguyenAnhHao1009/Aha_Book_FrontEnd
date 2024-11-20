<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">THÊM MỚI MỘT NHÀ XUẤT BẢN</h1>
    <h5 v-if="message" class="text-center text-danger">{{ message }}</h5>
    <PublisherForm :publisher="publisher" @create:publisher="addPublisher" />
  </div>
</template>

<script>
import PublisherForm from '@/components/Forms/PublisherForm.vue'
import nhaxuatbanService from '@/services/nhaxuatban.service'
export default {
  components: { PublisherForm },
  data() {
    return {
      publisher: {
        manxb: '',
        tennxb: '',
        diachi: '',
      },
      message: '',
    }
  },
  methods: {
    async addPublisher(publisher) {
      const result = await nhaxuatbanService.create(publisher)
      if (result) {
        if (result.errorMessage) {
          return (this.message = result.errorMessage)
        }
        alert(
          `Thêm thành công nhà xuất bản "${publisher.tennxb}" vào danh sách`,
        )
      }
      this.$router.push({
        name: 'publisher',
      })
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
