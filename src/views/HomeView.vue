<script setup>
//import AboutComponent from '@/components/AboutComponent.vue'
import AboutComponentPrimeCarousel from '@/components/AboutComponentPrimeCarousel.vue'
import ScrollDownComponent from '@/components/ScrollDownComponent.vue'
</script>

<template>
  <div id="about">
    <AboutComponentPrimeCarousel />
  </div>
  <div class="scroll-down">
    <ScrollDownComponent />
  </div>
  <main class="landing-container">
    <div id="join" class="landing-content">
      <h1 class="landing-title">Zen Dynasty</h1>
      <p class="landing-subtitle">A Clash of Clans Discord Community</p>
      <a href="https://discord.gg/mQ3u9cps3G" class="join-btn" target="_blank" rel="noopener">
        Join Up
      </a>
    </div>
  </main>
</template>

<style scoped>
.landing-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--color-background);
}

.landing-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-background-soft);
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.25);
  border: 2px solid var(--color-border);
}

.landing-title {
  color: var(--color-primary);
  font-size: 2.8rem;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
  text-shadow:
    2px 2px 0 var(--color-gold),
    0 2px 8px #0008;
}

.landing-subtitle {
  color: var(--color-gold);
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  text-shadow: 1px 1px 0 #000a;
}

.join-btn {
  background: var(--color-primary);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.9rem 2.5rem;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 2px 12px 0 rgba(237, 28, 36, 0.25);
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
  text-decoration: none;
  letter-spacing: 1px;
}

.join-btn:hover {
  background: var(--vt-c-primary-dark);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 24px 0 rgba(237, 28, 36, 0.35);
}

</style>
