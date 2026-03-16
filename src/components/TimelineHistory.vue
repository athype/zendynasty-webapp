<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timelineContainer = ref(null)
const timelineLine = ref(null)
const timelineItems = ref([])
const parallaxOffsets = ref([])
const backgroundParallax = ref(0)
const connectorVisibility = ref([])

const milestones = [
  {
    date: '2014',
    title: 'Foundation',
    description:
      'Reddit Zen was founded in 2014, beginning as a small, humble but committed clan. Our first feeder clan, Reddit Zenith, became the starting point for many of our earliest members.',
    icon: 'fas fa-castle',
    stats: { Clans: '2', 'Reddit Zen': 'Reddit Zenith' },
  },
  {
    date: 'Growth',
    title: 'Reddit Zen Dynasty',
    description:
      'We\'ve grown into a thriving community with 5 competitive war clans, 1 GFL clan, and numerous event clans under our banner of the "Reddit Zen Dynasty".',
    icon: 'fas fa-users',
    stats: { 'War Clans': '5', 'GFL Clans': '1' },
  },
  {
    date: 'Alliance',
    title: 'Reddit Clan System',
    description:
      'The Reddit Zen Dynasty is part of the larger Reddit Clan System, a network of clans built on shared values of competition, community, and growth.',
    icon: 'fas fa-network-wired',
    stats: { Network: 'Reddit Clan System' },
  },
  {
    date: 'Summer 2024',
    title: 'Lethal Demise Partnership',
    description:
      'In the summer of 2024, we formed a key partnership with Lethal Demise, another highly competitive and respected family of clans.',
    icon: 'fas fa-handshake',
    stats: { Partner: 'Lethal Demise', Year: '2024' },
  },
  {
    date: 'Legacy',
    title: 'Our Leaders',
    description:
      'Over the years, the Reddit Zen Dynasty has undergone many changes in leadership. Each leader has played a vital role in shaping who we are today. We honour all past and present leaders for their dedication, time, and commitment to growing and guiding our clan family.',
    icon: 'fas fa-crown',
    stats: null,
  },
  {
    date: 'Present',
    title: 'Current Leadership',
    description:
      'Leaders guiding our clan family today across all branches of the Reddit Zen Dynasty.',
    icon: 'fas fa-star',
    stats: {
      'Reddit Zen': 'Caedo',
      'Reddit Zenith': 'Evan',
      'Zen Dojo': '6',
      'Zen Academy': 'Athype',
      'Zen Seekers': 'Casey',
      'Farming Zen': 'Athype',
    },
  },
]

parallaxOffsets.value = new Array(milestones.length).fill(0)
connectorVisibility.value = new Array(milestones.length).fill(false)

let scrollHandler = null

const handleScroll = () => {
  if (!timelineContainer.value) return

  const containerRect = timelineContainer.value.getBoundingClientRect()
  const viewportCenter = window.innerHeight / 2

  backgroundParallax.value =
    (viewportCenter - (containerRect.top + containerRect.height / 2)) * 0.15

  timelineItems.value.forEach((item, index) => {
    if (item) {
      const itemRect = item.getBoundingClientRect()
      const itemCenter = itemRect.top + itemRect.height / 2
      const distance = viewportCenter - itemCenter

      const timelineProgress = Math.max(
        0,
        Math.min(1, (viewportCenter - containerRect.top) / containerRect.height),
      )
      const itemProgress = (index + 1) / milestones.length
      connectorVisibility.value[index] = timelineProgress >= itemProgress - 0.1

      const baseIntensity = index % 2 === 0 ? 0.08 : -0.08
      const verticalStagger = Math.sin(index * 0.5) * 15
      const maxOffset = 60

      let calculatedOffset = distance * baseIntensity + verticalStagger

      if (index > 0) {
        const prevOffset = parallaxOffsets.value[index - 1]
        const minDistance = 40
        if (Math.abs(calculatedOffset - prevOffset) < minDistance) {
          calculatedOffset = index % 2 === 0 ? prevOffset + minDistance : prevOffset - minDistance
        }
      }

      calculatedOffset = Math.max(-maxOffset, Math.min(maxOffset, calculatedOffset))
      parallaxOffsets.value[index] = calculatedOffset
    }
  })

  if (timelineLine.value) {
    const progress = Math.max(
      0,
      Math.min(1.1, (viewportCenter - containerRect.top + 100) / containerRect.height),
    )
    timelineLine.value.style.transform = `scaleY(${progress})`
  }
}

const handleHover = (index, isHovering) => {
  const item = timelineItems.value[index]
  if (item) {
    const card = item.querySelector('.timeline-card')
    if (isHovering) {
      card.style.transform += ' scale(1.03) rotateX(5deg)'
    } else {
      card.style.transform = card.style.transform.replace(' scale(1.03) rotateX(5deg)', '')
    }
  }
}

onMounted(() => {
  scrollHandler = () => requestAnimationFrame(handleScroll)
  window.addEventListener('scroll', scrollHandler, { passive: true })
  handleScroll() // Initial call
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <div class="timeline-container" ref="timelineContainer">
    <div class="timeline-header">
      <h2 class="timeline-title">Our Journey</h2>
      <div class="timeline-line" ref="timelineLine"></div>
    </div>

    <div class="timeline-content">
      <div
        v-for="(milestone, index) in milestones"
        :key="index"
        :class="['timeline-item', { left: index % 2 === 0, right: index % 2 === 1 }]"
        :ref="(el) => (timelineItems[index] = el)"
        @mouseenter="handleHover(index, true)"
        @mouseleave="handleHover(index, false)"
      >
        <div class="timeline-marker">
          <div class="marker-icon">
            <i :class="milestone.icon"></i>
          </div>
          <div class="marker-date">{{ milestone.date }}</div>
          <!-- Connecting line that only appears when timeline reaches this point -->
          <div
            class="connector-line"
            :class="{
              left: index % 2 === 0,
              right: index % 2 === 1,
              visible: connectorVisibility[index],
            }"
          ></div>
        </div>

        <div
          class="timeline-card"
          :style="{ transform: `translateY(${parallaxOffsets[index]}px)` }"
        >
          <div class="card-content">
            <h3 class="card-title">{{ milestone.title }}</h3>
            <p class="card-description">{{ milestone.description }}</p>
            <div class="card-stats" v-if="milestone.stats">
              <span v-for="(stat, key) in milestone.stats" :key="key" class="stat-item">
                <strong>{{ stat }}</strong> {{ key }}
              </span>
            </div>
          </div>
          <div class="card-accent"></div>
        </div>
      </div>
    </div>

    <!-- Floating background elements for parallax -->
    <div class="bg-elements">
      <div
        v-for="n in 8"
        :key="n"
        :class="`floating-element element-${n}`"
        :style="{
          transform: `translateY(${backgroundParallax * (n * 0.08)}px) rotate(${backgroundParallax * 0.3}deg)`,
        }"
      >
        {{ n % 4 === 0 ? '⚔️' : n % 4 === 1 ? '🏆' : n % 4 === 2 ? '🛡️' : '👑' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  max-width: 1400px;
  margin: 4rem auto;
  padding: 2rem;
  overflow: hidden;
}

.timeline-header {
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
}

.timeline-title {
  color: var(--color-primary);
  font-size: 3rem;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 0 var(--color-gold);
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 100%;
  width: 4px;
  height: 180vh;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-gold));
  transform-origin: top;
  transition: transform 0.3s ease-out;
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(237, 28, 36, 0.3);
}

.timeline-content {
  position: relative;
  z-index: 2;
}

.timeline-item {
  display: flex;
  margin: 10rem 0;
  position: relative;
  align-items: center;
  min-height: 200px;
}

.timeline-item.left {
  flex-direction: row;
}

.timeline-item.right {
  flex-direction: row-reverse;
}

.timeline-marker {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5rem;
  flex-shrink: 0;
}

.marker-icon {
  width: 70px;
  height: 70px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 25px rgba(237, 28, 36, 0.4);
  border: 4px solid var(--color-gold);
  position: relative;
  z-index: 4;
}

.marker-icon i {
  color: white;
  font-size: 1.8rem;
}

.marker-date {
  background: var(--color-background-soft);
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  margin-top: 1.5rem;
  font-weight: bold;
  color: var(--color-gold);
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  position: relative;
  z-index: 4;
}

.connector-line {
  position: absolute;
  top: 35px;
  width: 80px;
  height: 2px;
  background: linear-gradient(to right, var(--color-primary), var(--color-gold));
  z-index: 1;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.5s ease;
  transform-origin: center;
}

.connector-line.visible {
  opacity: 1;
  transform: scaleX(1);
}

.connector-line.left {
  right: -80px;
}

.connector-line.right {
  left: -80px;
}

.timeline-card {
  flex: 1;
  max-width: 450px;
  min-width: 350px;
  background: var(--color-background-soft);
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border: 2px solid var(--color-border);
  transition: all 0.3s ease;
  position: relative;
  perspective: 1000px;
}

.timeline-item.left .timeline-card {
  margin-right: 4rem;
}

.timeline-item.right .timeline-card {
  margin-left: 4rem;
}

.card-content {
  padding: 2.5rem;
  position: relative;
  z-index: 2;
}

.card-title {
  color: var(--color-primary);
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
}

.card-description {
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.card-stats {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.stat-item {
  background: var(--color-primary);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 1.2rem;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(237, 28, 36, 0.25);
}

.card-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-gold));
}

.timeline-item.right .card-accent {
  left: 0;
  right: auto;
}

.bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.08;
  transition: transform 0.1s ease-out;
}

.element-1 {
  top: 5%;
  left: 8%;
}
.element-2 {
  top: 15%;
  right: 12%;
}
.element-3 {
  top: 30%;
  left: 5%;
}
.element-4 {
  top: 45%;
  right: 8%;
}
.element-5 {
  top: 60%;
  left: 12%;
}
.element-6 {
  top: 75%;
  right: 5%;
}
.element-7 {
  top: 85%;
  left: 15%;
}
.element-8 {
  top: 95%;
  right: 20%;
}

@media (max-width: 768px) {
  .timeline-container {
    padding: 1rem;
  }

  .timeline-item,
  .timeline-item.left,
  .timeline-item.right {
    flex-direction: column;
    text-align: center;
    margin: 6rem 0;
  }

  .timeline-card,
  .timeline-item.left .timeline-card,
  .timeline-item.right .timeline-card {
    margin: 2rem 0;
    max-width: 100%;
    min-width: auto;
  }

  .timeline-line {
    display: none;
  }

  .connector-line {
    display: none;
  }

  .timeline-marker {
    margin: 0 1rem;
  }

  .marker-icon {
    width: 60px;
    height: 60px;
  }

  .marker-icon i {
    font-size: 1.5rem;
  }
}
</style>
