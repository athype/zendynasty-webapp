<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped>
/* Minimal or empty style for App.vue */
</style>
