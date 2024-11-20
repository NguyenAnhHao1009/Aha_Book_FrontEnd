<template>
  <div class="mb-5">
    <h1 class="py-5 text-center">THÔNG TIN SÁCH TRONG THƯ VIỆN</h1>
    <ShowBooks />
  </div>
</template>

<script>
import ShowBooks from '@/components/ShowBooks.vue'

export default {
  components: { ShowBooks },
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
