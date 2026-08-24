<template>
  <div id="page-content">
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
    <OrderBar />
    <PreorderInfoModal :open="showIntro" :source="introSource" @close="closeIntro" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import OrderBar from '../components/OrderBar.vue'
import PreorderInfoModal from '../components/PreorderInfoModal.vue'
import { useOrder } from '../composables/useOrder'

const { showIntro, introSource, closeIntro } = useOrder()
</script>
