<template>
  <header class="zen-header">
    <div class="zen-header-grid">
      <div class="zen-header-left">
        <span class="zen-logo">ZEN</span>
      </div>
      <div class="zen-header-right">
        <nav class="zen-nav">
          <a href="#about" class="zen-nav-link">
            <span class="nav-text-stack">
              <span class="nav-text nav-text-top">About</span>
              <span class="nav-text nav-text-bottom">About</span>
            </span>
          </a>
          <RouterLink to="/leaderboards" class="zen-nav-link">
            <span class="nav-text-stack">
              <span class="nav-text nav-text-top">Leaderboards</span>
              <span class="nav-text nav-text-bottom">Leaderboards</span>
            </span>
          </RouterLink>
          <RouterLink to="/blog" class="zen-nav-link">
            <span class="nav-text-stack">
              <span class="nav-text nav-text-top">Blog</span>
              <span class="nav-text nav-text-bottom">Blog</span>
            </span>
          </RouterLink>
          <a href="#join" class="zen-nav-link join">
            <span class="nav-text-stack">
              <span class="nav-text nav-text-top">Join</span>
              <span class="nav-text nav-text-bottom">Join</span>
            </span>
          </a>
        </nav>
        <div class="zen-header-desc">
          <span
            >Zen Dynasty is a social, semi-competitive & competitive family of clans that values
            active game play, communication, helping each other improve, and teamwork.</span
          >
        </div>
      </div>
    </div>
    <div class="scroll-down-indicator">
      <span>Scroll down for more</span>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 12L16 20L24 12"
          stroke="var(--color-gold)"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </header>
  <transition name="fade">
    <div v-if="showSticky" class="zen-header-sticky">
      <span class="zen-logo-sticky">ZEN</span>
      <nav class="zen-nav-sticky">
        <a href="#about" class="zen-nav-link-sticky">
          <span class="nav-text-stack">
            <span class="nav-text nav-text-top">About</span>
            <span class="nav-text nav-text-bottom">About</span>
          </span>
        </a>
        <RouterLink to="/leaderboards" class="zen-nav-link-sticky">
          <span class="nav-text-stack">
            <span class="nav-text nav-text-top">Leaderboards</span>
            <span class="nav-text nav-text-bottom">Leaderboards</span>
          </span>
        </RouterLink>
        <RouterLink to="/blog" class="zen-nav-link-sticky">
          <span class="nav-text-stack">
            <span class="nav-text nav-text-top">Blog</span>
            <span class="nav-text nav-text-bottom">Blog</span>
          </span>
        </RouterLink>
        <a href="#join" class="zen-nav-link-sticky join">
          <span class="nav-text-stack">
            <span class="nav-text nav-text-top">Join</span>
            <span class="nav-text nav-text-bottom">Join</span>
          </span>
        </a>
      </nav>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const showSticky = ref(false)

function handleScroll() {
  const header = document.querySelector('.zen-header')
  if (!header) return
  const rect = header.getBoundingClientRect()
  showSticky.value = rect.bottom <= 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.zen-header {
  width: 100vw;
  min-height: 50vh;
  max-height: 60vh;
  display: block;
  background: var(--color-background);
  border-bottom: 3px solid var(--color-border);
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.13);
  padding: 0;
  position: relative;
}

.zen-header-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  grid-template-rows: 1fr;
  width: 100vw;
  height: 100%;
  min-height: 50vh;
  max-height: 60vh;
}

.zen-header-left {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-right: 2.5px solid var(--color-border);
  height: 100%;
}

.zen-logo {
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
  font-size: 14vw;
  color: var(--color-primary);
  letter-spacing: 0.2em;
  text-shadow:
    3px 3px 0 var(--color-gold),
    0 3px 12px #0008;
  font-weight: bold;
  user-select: none;
  line-height: 1;
  width: 100%;
  text-align: center;
}

.zen-header-right {
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: stretch;
  justify-items: stretch;
  height: 100%;
  background: var(--color-background);
}

.zen-nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.45rem;
  font-weight: 700;
  border-bottom: 2px solid var(--color-border);
  padding: 2.5rem 2rem 1.2rem 2rem;
  height: 100%;
  gap: 0.5rem;
}

.zen-nav-link,
.zen-nav-link-sticky {
  color: var(--color-heading);
  font-size: 2.2rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1.5px;
  padding: 0.4rem 1.2rem;
  border-radius: 1.5rem;
  border: 2px solid transparent;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-width: 0;
  flex: 1 1 0;
  transition: none;
}
.nav-text-stack {
  position: relative;
  width: 100%;
  height: 2.6rem;
  display: block;
}
.nav-text {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 2.6rem;
  line-height: 2.6rem;
  text-align: center;
  font-weight: 1000;
  transition:
    transform 0.28s cubic-bezier(0.4, 1.5, 0.5, 1),
    opacity 0.18s;
  pointer-events: none;
  white-space: nowrap;
  overflow: visible;
  font-size: inherit;
  font-weight: inherit;
}
.nav-text-top {
  top: 0;
  opacity: 1;
  z-index: 2;
  transform: none;
  pointer-events: auto;
}
.nav-text-bottom {
  top: 0;
  opacity: 0;
  z-index: 1;
  transform: translateY(100%);
}
.zen-nav-link:hover .nav-text-top,
.zen-nav-link-sticky:hover .nav-text-top,
.zen-nav-link.join:hover .nav-text-top,
.zen-nav-link-sticky.join:hover .nav-text-top {
  transform: translateY(-100%);
  opacity: 0;
}
.zen-nav-link:hover .nav-text-bottom,
.zen-nav-link-sticky:hover .nav-text-bottom,
.zen-nav-link.join:hover .nav-text-bottom,
.zen-nav-link-sticky.join:hover .nav-text-bottom {
  transform: translateY(0);
  opacity: 1;
}
.zen-nav-link:hover,
.zen-nav-link-sticky:hover,
.zen-nav-link.join:hover,
.zen-nav-link-sticky.join:hover {
  background: none !important;
  border: 2px solid transparent !important;
  color: var(--color-heading);
  box-shadow: none !important;
}
.zen-nav-link.join,
.zen-nav-link-sticky.join {
  font-weight: 900;
  letter-spacing: 2px;
}

.zen-header-desc {
  color: var(--color-heading);
  font-size: 2.5rem;
  font-style: bold;
  font-weight: 600;
  text-shadow: 1.5px 1.5px 0 #000a;
  max-width: 100%;
  text-align: left;
  padding: 2.2rem 2rem 2.2rem 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
}

.scroll-down-indicator {
  position: absolute;
  left: 50%;
  bottom: 3.5rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-gold);
  font-size: 1.08rem;
  font-weight: 600;
  opacity: 0.85;
  animation: bounce 2.2s infinite;
  pointer-events: none;
}
.scroll-down-indicator svg {
  margin-top: 0.2rem;
  animation: arrow-bounce 1.2s infinite alternate;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(10px);
  }
}
@keyframes arrow-bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}

@media (max-width: 900px) {
  .zen-header-grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    min-width: unset;
    width: 100vw;
    max-width: 100vw;
    height: auto;
  }
  .zen-header-left,
  .zen-header-right {
    border-right: none;
    border-bottom: 2.5px solid var(--color-border);
    padding: 1.2rem 1.2rem;
    min-width: unset;
    width: 100%;
    justify-content: center;
    height: auto;
  }
  .zen-header-right {
    grid-template-rows: 1fr 1fr;
  }
  .zen-nav {
    gap: 0.5rem;
    flex-wrap: wrap;
    font-size: 1.1rem;
    padding: 1.2rem 1rem 0.7rem 1rem;
  }
  .nav-text-stack {
    height: 2.1rem;
  }
  .nav-text {
    height: 2.1rem;
    line-height: 2.1rem;
  }
  .zen-header-desc {
    font-size: 1.05rem;
    padding: 1.2rem 1rem 1.2rem 1rem;
  }
}

/* Sticky header styles */
.zen-header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 64px;
  background: var(--color-background-soft);
  border-bottom: 2px solid var(--color-border);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.13);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  padding: 0 2.5rem;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.zen-logo-sticky {
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
  font-size: 2rem;
  color: var(--color-primary);
  letter-spacing: 0.15em;
  text-shadow:
    1.5px 1.5px 0 var(--color-gold),
    0 2px 6px #0008;
  font-weight: bold;
  user-select: none;
  line-height: 1;
}
.zen-nav-sticky {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
}
.zen-nav-link-sticky {
  color: var(--color-heading);
  font-size: 1.15rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;
  padding: 0.2rem 1.1rem;
  border-radius: 1.2rem;
  border: 2px solid transparent;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  height: auto;
  box-shadow: none;
  transition: none;
  overflow: visible;
}
.zen-nav-link-sticky .nav-text-stack {
  position: relative;
  width: 100%;
  height: 1.6em;
  display: block;
}
.zen-nav-link-sticky .nav-text {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1.6em;
  line-height: 1.6em;
  text-align: center;
  transition:
    transform 0.28s cubic-bezier(0.4, 1.5, 0.5, 1),
    opacity 0.18s;
  pointer-events: none;
  white-space: nowrap;
  overflow: visible;
  font-size: inherit;
  font-weight: inherit;
}
.zen-nav-link-sticky .nav-text-top {
  top: 0;
  opacity: 1;
  z-index: 2;
  transform: none;
  pointer-events: auto;
}
.zen-nav-link-sticky .nav-text-bottom {
  top: 0;
  opacity: 0;
  z-index: 1;
  transform: translateY(100%);
}
.zen-nav-link-sticky:hover .nav-text-top,
.zen-nav-link-sticky.join:hover .nav-text-top {
  transform: translateY(-100%);
  opacity: 0;
}
.zen-nav-link-sticky:hover .nav-text-bottom,
.zen-nav-link-sticky.join:hover .nav-text-bottom {
  transform: translateY(0);
  opacity: 1;
}
.zen-nav-link-sticky:hover,
.zen-nav-link-sticky.join:hover {
  background: none !important;
  color: var(--color-heading) !important;
  border: 2px solid transparent !important;
  box-shadow: none !important;
}
.zen-nav-link-sticky.join {
  font-weight: 900;
  letter-spacing: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
