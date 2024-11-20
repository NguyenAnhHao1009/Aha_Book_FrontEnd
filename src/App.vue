<template>
  <header class="">
    <Navbar></Navbar>
  </header>
  <div class="">
    <RouterView></RouterView>
  </div>
  <footer >
    <Footer></Footer>
  </footer>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'
import Footer from '@/components/Layout/Footer.vue'

export default {
  components: { Navbar, Footer },
 
}
</script>
<style scoped></style>
