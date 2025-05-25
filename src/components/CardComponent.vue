<template>
  <div class="card" :class="cardClasses">
    <img v-if="item.image" :src="item.image" :alt="item.title" class="card-img" />
    <h3 class="card-title">{{ item.title }}</h3>
    <p class="card-desc">{{ item.description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value.title === 'string' && typeof value.description === 'string'
    },
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'muted'].includes(value),
  },
})

const cardClasses = computed(() => {
  const classes = []
  if (props.variant !== 'default') {
    classes.push(props.variant)
  }
  return classes
})
</script>

<style scoped>
.card {
  background: var(--color-background-soft);
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 #0002;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
  min-width: 340px;
  max-width: 340px;
  margin: 0 0.5rem;
  opacity: 1;
  transition:
    box-shadow 0.2s,
    opacity 0.2s,
    filter 0.2s;
  filter: grayscale(0.2);
}

.card.primary {
  box-shadow: 0 4px 32px 0 #0004;
  filter: none;
  opacity: 1;
  z-index: 2;
}

.card.secondary {
  opacity: 0.7;
  filter: grayscale(0.4);
  z-index: 1;
}

.card.muted {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.card-img {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 1.2rem;
}

.card-title {
  font-size: 1.4rem;
  color: var(--color-heading);
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.card-desc {
  font-size: 1.08rem;
  color: var(--color-text);
  margin: 0;
}

@media (max-width: 1100px) {
  .card {
    min-width: 30vw;
    max-width: 32vw;
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
}

@media (max-width: 700px) {
  .card {
    min-width: 90vw;
    max-width: 98vw;
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
}
</style>
