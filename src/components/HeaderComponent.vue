<template>
  <header class="zen-header">
    <div class="zen-header-grid">
      <div class="zen-header-left">
        <span class="zen-logo">ZEN</span>
      </div>
      <div class="zen-header-right">
        <nav class="zen-nav desktop-only">
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
        <button
          class="hamburger mobile-only"
          :class="{ open: mobileMenuOpen }"
          @click="mobileMenuOpen ? closeMobileMenu() : openMobileMenu()"
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
        <div class="zen-header-desc desktop-only">
          <span
            >Zen Dynasty is a social, semi-competitive & competitive family of clans that values
            active game play, communication, helping each other improve, and teamwork.</span
          >
        </div>
      </div>
    </div>
    <div class="scroll-down-indicator desktop-only">
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
    <div v-if="showSticky" class="zen-header-sticky desktop-only">
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
  <!-- Mobile menu overlay -->
  <transition name="mobile-menu-slide">
    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click.self="closeMobileMenu">
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <transition-group name="mobile-nav-link-fade" tag="div">
            <RouterLink
              v-for="(item, idx) in mobileNavItems"
              :key="item.text"
              :to="item.to"
              class="mobile-nav-link"
              :class="item.class"
              @click="closeMobileMenu"
              :style="{ transitionDelay: (mobileMenuOpen ? idx * 80 : 0) + 'ms' }"
            >
              <span class="mobile-nav-text">{{ item.text }}</span>
              <span class="mobile-underline"></span>
            </RouterLink>
          </transition-group>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const showSticky = ref(false)
const mobileMenuOpen = ref(false)

const mobileNavItems = [
  { text: 'About', to: '/#about', class: '' },
  { text: 'Leaderboards', to: '/leaderboards', class: '' },
  { text: 'Blog', to: '/blog', class: '' },
  { text: 'Join', to: '/#join', class: 'join' },
]

function handleScroll() {
  const header = document.querySelector('.zen-header')
  if (!header) return
  const rect = header.getBoundingClientRect()
  showSticky.value = rect.bottom <= 0
}

function openMobileMenu() {
  mobileMenuOpen.value = true
}
function closeMobileMenu() {
  mobileMenuOpen.value = false
}
function handleKeydown(e) {
  if (e.key === 'Escape') closeMobileMenu()
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
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
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .zen-header {
    min-height: unset;
    max-height: unset;
    height: 64px;
    padding: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.13);
  }
  .zen-header-grid {
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 64px;
    min-height: unset;
    max-height: unset;
    padding: 0;
    border: none;
  }
  .zen-header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: none;
    height: 64px;
    padding-left: 0.7rem;
    background: none !important;
  }
  .zen-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: none;
    height: 64px;
    padding-right: 0.7rem;
    grid-template-rows: none;
    background: none !important;
  }
  .zen-logo {
    font-size: 2.1rem;
    padding: 0;
    width: auto;
    min-width: 0;
    text-align: left;
  }
  .hamburger {
    width: 38px;
    height: 38px;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    z-index: 1301;
    margin-left: 0.5rem;
    position: relative;
    transition: background 0.2s;
  }
  .hamburger span {
    display: block;
    width: 28px;
    height: 4px;
    background: var(--color-heading);
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.4, 1.5, 0.5, 1);
    position: absolute;
    left: 5px;
  }
  .hamburger span:nth-child(1) {
    top: 8px;
  }
  .hamburger span:nth-child(2) {
    top: 17px;
  }
  .hamburger span:nth-child(3) {
    top: 26px;
  }
  .hamburger.open span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
  .zen-header-desc,
  .zen-nav,
  .zen-nav-sticky,
  .scroll-down-indicator {
    display: none !important;
  }
  /* Fix mobile menu overlay and close button */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.82);
    z-index: 1300;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .mobile-menu-content {
    width: 100vw;
    background: var(--color-background);
    box-shadow: 0 4px 32px 0 #000a;
    padding-top: 0.5rem;
    animation: menuDown 0.35s cubic-bezier(0.4, 1.5, 0.5, 1);
    position: relative;
    min-height: 100vh;
  }
  .close-btn {
    position: fixed;
    top: 1.1rem;
    right: 1.5rem;
    font-size: 2.2rem;
    background: none;
    border: none;
    color: var(--color-heading);
    cursor: pointer;
    z-index: 1400;
  }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 3.5rem;
    width: 100vw;
    align-items: flex-start;
  }
  .mobile-nav-link {
    font-size: 2.1rem;
    font-weight: 800;
    color: var(--color-heading);
    text-decoration: none;
    padding: 0.2rem 2.2rem;
    position: relative;
    opacity: 1;
    transform: none;
    transition:
      opacity 0.45s cubic-bezier(0.4, 1.5, 0.5, 1),
      transform 0.45s cubic-bezier(0.4, 1.5, 0.5, 1),
      /* Add transition-delay for staggered effect */ transition-delay 0ms;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  .mobile-nav-link-fade-enter-active,
  .mobile-nav-link-fade-leave-active {
    transition:
      opacity 0.45s cubic-bezier(0.4, 1.5, 0.5, 1),
      transform 0.45s cubic-bezier(0.4, 1.5, 0.5, 1);
  }
  .mobile-nav-link-fade-enter-from,
  .mobile-nav-link-fade-leave-to {
    opacity: 0;
    transform: translateX(-40px);
  }
  .mobile-nav-link-fade-enter-to,
  .mobile-nav-link-fade-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .mobile-nav-link .mobile-underline {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    width: 0;
    background: var(--color-gold);
    border-radius: 2px;
    transition: width 0.32s cubic-bezier(0.4, 1.5, 0.5, 1);
  }
  .mobile-nav-link:hover .mobile-underline,
  .mobile-nav-link:focus .mobile-underline {
    width: 100%;
  }
  .mobile-nav-link.join {
    color: var(--color-primary);
  }
}
.hamburger.mobile-only {
  display: none;
}
</style>
