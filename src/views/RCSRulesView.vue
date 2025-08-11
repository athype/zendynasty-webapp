<script setup>
import MarkdownDisplay from '@/components/MarkdownDisplay.vue'
</script>

<template>
  <div class="rcs-rules-view">
    <h1>RCS Rules</h1>
    <MarkdownDisplay src="/content/rcs-rules.md" />
  </div>
</template>

<style scoped>
.rcs-rules-view {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}
.rcs-rules-view h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
