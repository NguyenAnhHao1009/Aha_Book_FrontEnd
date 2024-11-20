<template>
  <div class="text-center">
    <button
      :disabled="currentPage == 1 ? true : false"
      @click="changePage(currentPage - 1)"
      class="btn text-primary"
    >
      <<
    </button>
    <button
      v-for="i in numberPage"
      @click="changePage(i)"
      :class="
        i == currentPage
          ? ' btn rounded rounded-3 mx-1 btn-primary'
          : ' btn rounded-3 mx-1 btn-outline-primary'
      "
    >
      {{ i }}
    </button>
    <button
      :disabled="currentPage == numberPage ? true : false"
      @click="changePage(currentPage + 1)"
      class="btn rounded rounded-3 mx-1 text-primary"
    >
      >>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    numberPerPage: {
      type: Number,
      required: true,
    },
    totalElement: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    numberPage() {
      return Math.ceil(this.totalElement / this.numberPerPage)
    },
  },
  methods: {
    changePage(index) {
      this.currentPage = index
      this.$emit('changeCurrentPage', index)
    },
  },
}
</script>

<style scoped>
button:disabled {
  border: none;
  opacity: 0.3;
}
</style>
