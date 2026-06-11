<template>
  <div id="page-content">
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
    <OrderBar />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import OrderBar from '../components/OrderBar.vue'
</script>
