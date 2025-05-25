<template>
  <div class="scroll-down-indicator desktop-only">
    <span>Scroll down for more</span>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 12L16 20L24 12"
        stroke="var(--color-gold)"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
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
</style>
