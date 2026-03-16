<script setup>
import AboutComponentPrimeCarousel from '@/components/AboutComponentPrimeCarousel.vue'
import TimelineHistory from '@/components/TimelineHistory.vue'
</script>

<template>
  <div id="about">
    <AboutComponentPrimeCarousel />
  </div>
  <main class="landing-container">
    <div id="history" class="history">
      <TimelineHistory />
    </div>
    <div id="join" class="join-section">
      <div class="join-background">
        <div class="floating-icons">
          <div class="icon" style="top: 10%; left: 10%">⚔️</div>
          <div class="icon" style="top: 20%; right: 15%">🏆</div>
          <div class="icon" style="top: 60%; left: 15%">🛡️</div>
          <div class="icon" style="top: 70%; right: 10%">👑</div>
          <div class="icon" style="top: 85%; left: 50%">💎</div>
        </div>
      </div>

      <div class="join-content">
        <div class="join-header">
          <h1 class="join-title">Ready to Join the Dynasty?</h1>
          <p class="join-subtitle">Become part of our legendary Clash of Clans community</p>
        </div>

        <div class="join-features">
          <div class="feature-card">
            <i class="fas fa-users feature-icon"></i>
            <h3>Active Community</h3>
            <p>Join 50+ active members in our Discord server</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-trophy feature-icon"></i>
            <h3>Competitive Wars</h3>
            <p>Participate in strategic clan wars and tournaments</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-handshake feature-icon"></i>
            <h3>Friendly Environment</h3>
            <p>Learn and grow with supportive clan mates</p>
          </div>
        </div>

        <div class="join-stats">
          <div class="stat">
            <span class="stat-number">50+</span>
            <span class="stat-label">Active Members</span>
          </div>
          <div class="stat">
            <span class="stat-number">87%</span>
            <span class="stat-label">Win Rate</span>
          </div>
          <div class="stat">
            <span class="stat-number">5</span>
            <span class="stat-label">Years Strong</span>
          </div>
        </div>

        <div class="join-actions">
          <a
            href="https://discord.gg/mQ3u9cps3G"
            class="join-btn primary"
            target="_blank"
            rel="noopener"
          >
            <i class="fab fa-discord"></i>
            Join Discord Server
          </a>
          <button class="join-btn secondary" onclick="navigator.clipboard.writeText('#ZEN2020')">
            <i class="fas fa-copy"></i>
            Copy Clan Tag
          </button>
        </div>

        <div class="join-clan-tag">
          <span>Clan Tag: <strong>#ZEN2020</strong></span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: var(--color-background);
}

.history {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

.join-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    var(--color-background) 0%,
    var(--color-background-soft) 100%
  );
  overflow: hidden;
}

.join-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-icons .icon {
  position: absolute;
  font-size: 3rem;
  opacity: 0.05;
  animation: float 6s ease-in-out infinite;
}

.floating-icons .icon:nth-child(2) {
  animation-delay: -2s;
}
.floating-icons .icon:nth-child(3) {
  animation-delay: -4s;
}
.floating-icons .icon:nth-child(4) {
  animation-delay: -1s;
}
.floating-icons .icon:nth-child(5) {
  animation-delay: -3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.join-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  width: 100%;
  background: var(--color-background-soft);
  border-radius: 2rem;
  padding: 4rem 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--color-border);
  text-align: center;
}

.join-header {
  margin-bottom: 3rem;
}

.join-title {
  color: var(--color-primary);
  font-size: 3.5rem;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 0 var(--color-gold);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow:
      2px 2px 0 var(--color-gold),
      0 0 10px rgba(237, 28, 36, 0.5);
  }
  to {
    text-shadow:
      2px 2px 0 var(--color-gold),
      0 0 20px rgba(237, 28, 36, 0.8);
  }
}

.join-subtitle {
  color: var(--color-gold);
  font-size: 1.4rem;
  margin-bottom: 0;
  opacity: 0.9;
}

.join-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: var(--color-background);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(237, 28, 36, 0.2);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
}

.feature-card p {
  color: var(--color-text);
  margin: 0;
  opacity: 0.8;
}

.join-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--color-background);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
  font-family: 'Supercell Magic', Impact, 'Segoe UI', Arial, sans-serif;
}

.stat-label {
  display: block;
  color: var(--color-gold);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.join-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.join-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  min-width: 200px;
  justify-content: center;
}

.join-btn.primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(237, 28, 36, 0.3);
}

.join-btn.primary:hover {
  background: var(--vt-c-primary-dark);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 25px rgba(237, 28, 36, 0.4);
}

.join-btn.secondary {
  background: var(--color-background);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.join-btn.secondary:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 25px rgba(237, 28, 36, 0.4);
}

.join-clan-tag {
  color: var(--color-text);
  font-size: 1.1rem;
  opacity: 0.8;
}

.join-clan-tag strong {
  color: var(--color-gold);
  font-family: 'Courier New', monospace;
  background: var(--color-background);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .join-content {
    padding: 2.5rem 1.5rem;
  }

  .join-title {
    font-size: 2.5rem;
  }

  .join-subtitle {
    font-size: 1.2rem;
  }

  .join-features {
    grid-template-columns: 1fr;
  }

  .join-stats {
    gap: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .join-actions {
    flex-direction: column;
    align-items: center;
  }

  .join-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
