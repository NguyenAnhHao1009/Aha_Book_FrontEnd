<template>
  <h1 class="py-5 text-center">
    <b>LỊCH SỬ MƯỢN SÁCH CỦA BẠN</b>
  </h1>
  <div v-if="historyBorrow === null">
    <!-- <h4 class="text-center text-info">ĐANG TẢI DỮ LIỆU...</h4> -->
  </div>
  <div v-else-if="historyBorrow.length > 0">
    <div class="container">
      <HistoryBorrow @reloadShow="reloadShow" :historyBorrow="historyBorrow" />
    </div>
  </div>
  <div v-else>
    <hr />
    <h4 class="text-center text-warning">BẠN CHƯA CÓ LỊCH SỬ MƯỢN SÁCH</h4>
  </div>
</template>

<script>
import HistoryBorrow from '@/components/HistoryBorrow.vue'
import theodoimuonsachService from '@/services/theodoimuonsach.service'

export default {
  components: {
    HistoryBorrow,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      historyBorrow: [],
    }
  },
  methods: {
    async reloadShow() {
      try {
        this.historyBorrow = await theodoimuonsachService.getHistory(this.id)
      } catch (error) {
        console.error('Lỗi khi tải lịch sử mượn sách:', error)
        this.historyBorrow = []
      }
    },
  },
  async created() {
    this.reloadShow()
  },
}
</script>
