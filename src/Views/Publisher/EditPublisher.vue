<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">CHỈNH SỬA MỘT NHÀ XUẤT BẢN</h1>
    <h5 v-if="message" class="text-success text-center">
      {{ message }}
    </h5>
    <PublisherForm
      v-if="publisher"
      :publisher="publisher"
      @edit:publisher="editPublisher"
      
    />
  </div>
</template>

<script>
import PublisherForm from '@/components/Forms/PublisherForm.vue'
import nhaxuatbanService from '@/services/nhaxuatban.service'
export default {
  components: { PublisherForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      publisher: null,
      message: '',
    }
  },
  methods: {
    async editPublisher(data) {
      const result = await nhaxuatbanService.update(this.publisher._id, data)

      if (result) {
        if (result.errorMessage) {
          return alert(result.errorMessage)
        }
        return (this.message = 'Cập nhật thành công')
      }
      return (this.message = 'Có lỗi xảy ra vui lòng thử lại sau')
    },
    async getPublisher(id) {
      try {
        this.publisher = await nhaxuatbanService.get(id)
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
  },
  created() {
    this.getPublisher(this.id)
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
