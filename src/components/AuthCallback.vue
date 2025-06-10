<template>
  <div class="auth-callback">
    <div class="auth-callback-container">
      <div class="auth-callback-content">
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <h2>Completing authentication...</h2>
          <p>Please wait while we log you in.</p>
        </div>

        <div v-else-if="error" class="error-state">
          <div class="error-icon">❌</div>
          <h2>Authentication Failed</h2>
          <p>{{ error }}</p>
          <button @click="redirectToHome" class="retry-btn">Return to Home</button>
        </div>

        <div v-else class="success-state">
          <div class="success-icon">✅</div>
          <h2>Successfully Logged In!</h2>
          <p>Welcome back, {{ user?.username }}!</p>
          <p>Redirecting you to the homepage...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthService } from '@/services/authService'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const error = ref(null)
const user = ref(null)

async function handleAuthCallback() {
  try {
    // Get token from URL query parameters
    const token = route.query.token

    if (token) {
      window.history.replaceState({}, document.title, '/auth/callback')
    }

    if (!token) {
      throw new Error('No authentication token found in URL')
    }

    // Store the token
    AuthService.setAuthToken(token, true)
    console.log('Token stored successfully:', token)

    // Get user profile to verify token is valid
    const profile = await AuthService.getProfile()
    user.value = profile.user || profile

    // Clear loading state
    isLoading.value = false

    // Redirect to home page after a short delay
    setTimeout(() => {
      const redirectTo = route.query.redirect || '/'
      router.push(redirectTo)
    }, 2000)
  } catch (err) {
    console.error('Auth callback error:', err)
    error.value = err.message || 'Authentication failed'
    isLoading.value = false

    // Clear any invalid token
    AuthService.clearAuthToken()
  }
}

function redirectToHome() {
  router.push('/')
}

onMounted(() => {
  handleAuthCallback()
})
</script>

<style scoped>
.auth-callback {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: 2rem;
}

.auth-callback-container {
  max-width: 500px;
  width: 100%;
}

.auth-callback-content {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.loading-state,
.error-state,
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-icon,
.success-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.auth-callback-content h2 {
  color: var(--color-heading);
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.auth-callback-content p {
  color: var(--color-text);
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.5;
}

.retry-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 1rem;
}

.retry-btn:hover {
  background: var(--color-primary-hover, #d41e24);
}

.error-state {
  color: var(--color-text);
}

.success-state {
  color: var(--color-text);
}

@media (max-width: 600px) {
  .auth-callback {
    padding: 1rem;
  }

  .auth-callback-content {
    padding: 2rem 1.5rem;
  }

  .auth-callback-content h2 {
    font-size: 1.5rem;
  }

  .auth-callback-content p {
    font-size: 1rem;
  }
}
</style>
