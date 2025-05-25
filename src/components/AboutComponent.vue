<template>
  <section class="about-section">
    <h2 class="about-title">Our Achievements</h2>
    <div class="custom-carousel">
      <button
        class="carousel-arrow left"
        @click="prevSlide"
        :disabled="isPrevDisabled"
        aria-label="Previous"
      >
        &#8592;
      </button>
      <div class="carousel-track-wrapper">
        <div
          class="carousel-track"
          :style="trackStyle"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <CardComponent
            v-for="(realIdx, windowIdx) in visibleWindow"
            :key="achievements[realIdx].title + '-' + windowIdx"
            :item="achievements[realIdx]"
            :variant="getCardVariant(windowIdx)"
          />
        </div>
      </div>
      <button
        class="carousel-arrow right"
        @click="nextSlide"
        :disabled="isNextDisabled"
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
    <div class="carousel-indicators">
      <span
        v-for="(item, idx) in achievements"
        :key="item.title + '-dot'"
        class="carousel-dot"
        :class="{ active: idx === centerIndex }"
        @click="goToSlide(idx)"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CardComponent from './CardComponent.vue'

const achievements = ref([
  {
    title: 'Top 1% Global Clan',
    description: 'Ranked among the top 1% of all clans worldwide in 2024.',
    image: '/zenicon.png',
  },
  {
    title: 'Legend League Champions',
    description: 'Multiple members reached Legend League in the same season.',
    image: '/zenicon.png',
  },
  {
    title: 'Perfect War Streak',
    description: 'Achieved 10 consecutive perfect wars in 2025.',
    image: '/zenicon.png',
  },
  {
    title: 'Community Growth',
    description: 'Surpassed 1,000 Discord members in under a year.',
    image: '/zenicon.png',
  },
  {
    title: 'Clan Games Masters',
    description: 'Maxed out clan games points for 12 months straight.',
    image: '/zenicon.png',
  },
])

const centerIndex = ref(0)
const isMobile = ref(false)
const visibleCount = computed(() => (isMobile.value ? 1 : 3))
const slideCount = computed(() => achievements.value.length)

// Compute the visible window of cards for infinite carousel
const visibleWindow = computed(() => {
  const count = visibleCount.value
  const half = Math.floor(count / 2)
  let indices = []
  for (let i = -half; i <= half; i++) {
    let idx = (centerIndex.value + i + slideCount.value) % slideCount.value
    indices.push(idx)
  }
  return indices
})

// Remove disabled states for infinite scrolling
const isPrevDisabled = computed(() => false)
const isNextDisabled = computed(() => false)

function prevSlide() {
  stopAutoScroll()
  centerIndex.value = (centerIndex.value - 1 + slideCount.value) % slideCount.value
  // Restart auto-scroll after user interaction
  setTimeout(startAutoScroll, 5000)
}

function nextSlide() {
  stopAutoScroll()
  centerIndex.value = (centerIndex.value + 1) % slideCount.value
  // Restart auto-scroll after user interaction
  setTimeout(startAutoScroll, 5000)
}

function goToSlide(idx) {
  stopAutoScroll()
  centerIndex.value = idx
  // Restart auto-scroll after user interaction
  setTimeout(startAutoScroll, 5000)
}

function getCardVariant(windowIdx) {
  // windowIdx is the index in visibleWindow
  if (windowIdx === Math.floor(visibleWindow.value.length / 2)) return 'primary' // center
  if (
    windowIdx === Math.floor(visibleWindow.value.length / 2) - 1 ||
    windowIdx === Math.floor(visibleWindow.value.length / 2) + 1
  )
    return 'secondary' // sides
  return isMobile.value ? 'primary' : 'muted' // only show center on mobile, hide others on desktop
}

const trackStyle = computed(() => {
  // Always keep the center card in the middle
  return {
    transform: `translateX(-${(100 / visibleCount.value) * Math.floor(visibleCount.value / 2)}%)`,
    transition: 'transform 0.5s cubic-bezier(0.4,1.5,0.5,1)',
    width: `${(visibleWindow.value.length * 100) / visibleCount.value}%`,
  }
})

// Touch/swipe support
let startX = 0
let deltaX = 0
function onTouchStart(e) {
  startX = e.touches[0].clientX
  deltaX = 0
}
function onTouchMove(e) {
  deltaX = e.touches[0].clientX - startX
}
function onTouchEnd() {
  if (deltaX > 50) {
    prevSlide()
  } else if (deltaX < -50) {
    nextSlide()
  }
  startX = 0
  deltaX = 0
}

// Responsive detection
function handleResize() {
  isMobile.value = window.innerWidth <= 700
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  startAutoScroll()
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  stopAutoScroll()
})

// Auto-scroll
let autoScrollInterval = null
function startAutoScroll() {
  stopAutoScroll()
  autoScrollInterval = setInterval(() => {
    nextSlide()
  }, 3500)
}
function stopAutoScroll() {
  if (autoScrollInterval) clearInterval(autoScrollInterval)
  autoScrollInterval = null
}
</script>

<style scoped>
.about-section {
  padding: 3rem 0 2rem 0;
  background: var(--color-background);
  text-align: center;
}
.about-title {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  letter-spacing: 1.5px;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
}
.custom-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  user-select: none;
}
.carousel-arrow {
  background: var(--color-background);
  border: none;
  color: var(--color-primary);
  font-size: 2.2rem;
  font-weight: bold;
  border-radius: 50%;
  width: 2.7rem;
  height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  z-index: 2;
  transition: background 0.18s;
}
.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.carousel-track-wrapper {
  overflow: hidden;
  width: 1020px;
  max-width: 80vw;
  margin: 0 1.2rem;
}
.carousel-track {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
  gap: 0.5rem;
}
.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-border);
  display: inline-block;
  cursor: pointer;
  transition: background 0.2s;
}
.carousel-dot.active {
  background: var(--color-primary);
}
@media (max-width: 1100px) {
  .carousel-track-wrapper {
    width: 98vw;
    max-width: 98vw;
  }
}
@media (max-width: 700px) {
  .carousel-track-wrapper {
    width: 98vw;
    max-width: 98vw;
  }
  .about-title {
    font-size: 2rem;
  }
}
</style>
