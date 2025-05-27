<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref } from 'vue'

const achievements = ref([
  {
    title: 'RCS Verified',
    description: 'Our clans are amongst the highest ranking ones within the RCS.',
    image: '/zenicon.png',
  },
  {
    title: 'Competitive CWL',
    description: 'Multiple clans in Champion and master league.',
    image: '/zenicon.png',
  },
  {
    title: 'Big clan family',
    description: 'Ovewr 10 clans in total with multiple war, farm and event clans.',
    image: '/zenicon.png',
  },
  {
    title: 'Frequent GP events',
    description: 'We often do events where members can win gold passes.',
    image: '/zenicon.png',
  },
  {
    title: 'Perfect War Streak',
    description: 'Multiple of our clans have gotten 50+ war win streaks.',
    image: '/zenicon.png',
  },
  {
    title: 'Vibrant Community',
    description: 'Our discord community with about 1000 members is constantly active.',
    image: '/zenicon.png',
  },
  {
    title: 'Clan Games Masters',
    description: 'Clan games maxed out in each clan every month.',
    image: '/zenicon.png',
  },
])

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 4000,
  pauseAutoplayOnHover: true,
  gap: 20,
  transition: 500,
  snapAlign: 'center',
  mouseDrag: true,
  touchDrag: true,
  breakpoints: {
    700: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    1000: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    1400: {
      itemsToShow: 2.5,
      snapAlign: 'center',
    },
  },
}
</script>

<template>
  <div class="card">
    <h2 class="card-title">Our Achievements</h2>
    <p class="card-desc">Proudly showcasing our clan's top achievements and milestones.</p>

    <Carousel v-bind="carouselConfig">
      <Slide v-for="achievement in achievements" :key="achievement.title">
        <div class="achievement-wrapper">
          <div class="achievement-image-container">
            <img :src="achievement.image" :alt="achievement.title" class="achievement-image" />
          </div>
          <h3 class="achievement-title">{{ achievement.title }}</h3>
          <p class="achievement-description">{{ achievement.description }}</p>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-background);
}

.card-title {
  color: var(--color-heading);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.card-desc {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 2rem;
}

/* Achievement card styling */
.achievement-wrapper {
  margin: 0 0.25rem; /* Reduced from 0.5rem to 0.25rem */
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 280px;
  height: 100%;
  min-width: 40%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.achievement-image-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.achievement-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 8px;
}

.achievement-title {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--color-heading);
  flex-shrink: 0;
  line-height: 1.3;
}

.achievement-description {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: center;
}

/* Customize vue3-carousel navigation */
:deep(.carousel__prev),
:deep(.carousel__next) {
  background: var(--color-background-soft);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: scale(1.1);
}

:deep(.carousel__icon) {
  width: 20px;
  height: 20px;
}

/* Customize vue3-carousel pagination */
:deep(.carousel__pagination) {
  margin-top: 1.5rem;
}

:deep(.carousel__pagination-button) {
  background: var(--color-border);
  border: none;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 0 0.25rem;
  transition: all 0.3s ease;
}

:deep(.carousel__pagination-button--active) {
  background: var(--color-primary);
  transform: scale(1.2);
}

:deep(.carousel__pagination-button:hover) {
  background: var(--color-primary);
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 1199px) {
  .achievement-wrapper {
    min-height: 260px;
    padding: 1.25rem;
  }
}

@media (max-width: 767px) {
  .achievement-wrapper {
    margin: 0 0.125rem;
    padding: 1rem;
    min-height: 240px;
  }

  .achievement-title {
    font-size: 1.1rem;
  }

  .achievement-description {
    font-size: 0.9rem;
  }

  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 40px;
    height: 40px;
  }

  :deep(.carousel__icon) {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 575px) {
  .card {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.75rem;
  }

  .achievement-wrapper {
    min-height: 220px;
  }
}
</style>
