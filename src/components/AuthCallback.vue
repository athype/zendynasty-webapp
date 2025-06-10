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
    console.log('Current URL:', window.location.href)
    console.log('Route query:', route.query)
    console.log('URL search params:', new URLSearchParams(window.location.search))

    // Try multiple methods to get the token
    let token = null

    // Method 1: Vue Router query
    token = route.query.token

    // Method 2: Direct URL parsing (fallback for production issues)
    if (!token) {
      const urlParams = new URLSearchParams(window.location.search)
      token = urlParams.get('token')
    }

    // Method 3: Check hash fragment (if backend uses hash routing)
    if (!token && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      token = hashParams.get('token')
    }

    console.log('Extracted token:', token ? 'Found' : 'Not found')

    // Clean URL immediately after extracting token
    if (token) {
      // Remove token from URL for security
      const cleanUrl = window.location.origin + window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }

    if (!token) {
      throw new Error('No authentication token found in URL')
    }

    // Store the token
    AuthService.setAuthToken(token, true)
    console.log('Token stored successfully')

    // Try to get user info from token first (faster)
    const userFromToken = AuthService.getUserFromToken()
    if (userFromToken) {
      user.value = userFromToken
      console.log('User from token:', userFromToken.username)
    }

    // Then verify with backend
    try {
      const profile = await AuthService.getProfile()
      user.value = profile.user || profile
      console.log('Profile verified with backend')
    } catch (profileError) {
      console.warn('Backend verification failed, using token data:', profileError.message)
      // Continue with token data if backend verification fails
      if (!user.value) {
        throw profileError
      }
    }

    // Clear loading state
    isLoading.value = false

    // Redirect to home page after a short delay
    setTimeout(() => {
      const redirectTo = sessionStorage.getItem('auth_redirect') || '/'
      sessionStorage.removeItem('auth_redirect') // Clean up
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
  // Add a small delay to ensure route is fully loaded
  setTimeout(() => {
    handleAuthCallback()
  }, 100)
})
</script>

<style scoped>
/* ...existing styles remain the same... */
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
</style>
