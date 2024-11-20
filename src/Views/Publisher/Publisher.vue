<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">DANH SÁCH CÁC NHÀ XUẤT BẢN</h1>
    <ShowPublishers />
  </div>
</template>

<script>
import ShowPublishers from '@/components/ShowPublishers.vue';

export default {
  components: { ShowPublishers },
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
