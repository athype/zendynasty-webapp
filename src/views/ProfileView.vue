<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '@/services/authService'
import { LinkService } from '@/services/linkService'
import LinkedAccountsTable from '@/components/LinkedAccountsTable.vue'

const router = useRouter()
const route = useRoute()
const user = ref(null)
const linkedAccounts = ref([])
const loadingAccounts = ref(false)
const autoImportInfo = ref(null)
const error = ref(null)

async function loadUserProfile() {
  try {
    // First check if we have a stored user profile
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      user.value = currentUser
      return
    }

    // If no stored profile, try to fetch from backend
    if (AuthService.isAuthenticated()) {
      const profile = await AuthService.getProfile()
      user.value = profile.user || profile
    } else {
      // No authentication, redirect to home
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to load user profile:', error)
    // If profile loading fails, redirect to home
    router.push('/')
  }
}

async function handleGetLinkedAccounts() {
  if (!AuthService.isAuthenticated()) {
    error.value = 'Please log in to view linked accounts'
    return
  }

  loadingAccounts.value = true
  error.value = null

  try {
    console.log('Fetching linked players from API...')
    const response = await LinkService.getMyLinkedPlayers()

    // Transform the API response to match table format
    linkedAccounts.value = LinkService.formatLinkedPlayersForTable(response.linkedPlayers)
    autoImportInfo.value = response.autoImport

    console.log('Linked accounts loaded:', linkedAccounts.value)

    // Show auto-import info if available
    if (autoImportInfo.value) {
      console.log('Auto-import info:', autoImportInfo.value)
      if (autoImportInfo.value.attempted && autoImportInfo.value.imported > 0) {
        // You could show a toast notification here
        console.log(`Auto-imported ${autoImportInfo.value.imported} players`)
      }
      if (autoImportInfo.value.errors && autoImportInfo.value.errors.length > 0) {
        console.warn('Auto-import errors:', autoImportInfo.value.errors)
      }
    }
  } catch (err) {
    console.error('Failed to load linked accounts:', err)
    error.value = err.message
    linkedAccounts.value = []
  } finally {
    loadingAccounts.value = false
  }
}

async function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    try {
      await AuthService.logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logout even if backend call fails
      AuthService.clearAuthToken()
      AuthService.clearStoredUserData()
      router.push('/')
    }
  }
}

function getDiscordAvatarUrl(discordId, avatarHash) {
  if (!discordId || !avatarHash) return null
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.png?size=128`
}

onMounted(() => {
  loadUserProfile()
  // Automatically load linked accounts on mount
  handleGetLinkedAccounts()
})
</script>

<template>
  <div class="profile-view">
    <div class="profile-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-avatar">
          <img
            v-if="user?.avatar"
            :src="getDiscordAvatarUrl(user.discord_id, user.avatar)"
            :alt="`${user.username}'s avatar`"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            {{ user?.username?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
        </div>
        <div class="profile-info">
          <h1 class="profile-username">{{ user?.username || 'Unknown User' }}</h1>
          <p class="profile-discord-id">Discord ID: {{ user?.discord_id || 'Not available' }}</p>
          <span class="profile-role" :class="`role-${user?.role || 'member'}`">
            {{ user?.role?.toUpperCase() || 'MEMBER' }}
          </span>
        </div>
      </div>

      <!-- Profile Actions -->
      <div class="profile-actions">
        <button
          @click="handleGetLinkedAccounts"
          class="btn btn-primary"
          :disabled="loadingAccounts"
        >
          <span v-if="loadingAccounts">Loading...</span>
          <span v-else>{{ linkedAccounts.length > 0 ? 'Refresh' : 'Get' }} Linked Accounts</span>
        </button>
        <button @click="handleLogout" class="btn btn-secondary">Logout</button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="handleGetLinkedAccounts" class="btn btn-outline btn-small">
          Try Again
        </button>
      </div>

      <!-- Auto-Import Info -->
      <div v-if="autoImportInfo && autoImportInfo.attempted" class="auto-import-info">
        <h3>Auto-Import Results</h3>
        <p v-if="autoImportInfo.imported > 0" class="success-message">
          ✅ Successfully imported {{ autoImportInfo.imported }} player(s)
        </p>
        <div v-if="autoImportInfo.errors && autoImportInfo.errors.length > 0" class="error-list">
          <p class="error-title">⚠️ Import Errors:</p>
          <ul>
            <li v-for="error in autoImportInfo.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>

      <!-- Linked Accounts Section -->
      <div class="linked-accounts-section">
        <h2>Linked Clash of Clans Accounts</h2>
        <LinkedAccountsTable
          :accounts="linkedAccounts"
          :loading="loadingAccounts"
          @refresh="handleGetLinkedAccounts"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  min-height: 80vh;
  padding: 2rem;
  background: var(--color-background);
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
  background: linear-gradient(
    135deg,
    var(--color-background-soft) 0%,
    var(--color-background) 100%
  );
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--color-primary);
  object-fit: cover;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--color-primary);
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
}

.profile-info {
  flex: 1;
}

.profile-username {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
}

.profile-discord-id {
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  font-family: 'Courier New', monospace;
}

.profile-role {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-admin {
  background: var(--color-primary);
  color: white;
}

.role-moderator {
  background: var(--color-gold);
  color: var(--color-background);
}

.role-member {
  background: var(--color-border);
  color: var(--color-text);
}

.profile-actions {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #d41e24);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 35, 35, 0.3);
}

.btn-secondary {
  background: var(--color-border);
  color: var(--color-text);
}

.btn-secondary:hover {
  background: var(--color-text);
  color: var(--color-background);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.error-message {
  padding: 1.5rem 2rem;
  background: #fee;
  border: 1px solid #fcc;
  border-left: 4px solid #f00;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message p {
  margin: 0;
  color: #c00;
  font-weight: 600;
}

.auto-import-info {
  padding: 1.5rem 2rem;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.auto-import-info h3 {
  margin: 0 0 1rem 0;
  color: var(--color-heading);
  font-size: 1.2rem;
}

.success-message {
  color: #22c55e;
  font-weight: 600;
  margin: 0.5rem 0;
}

.error-title {
  color: #f59e0b;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem 0;
}

.error-list ul {
  margin: 0.5rem 0 0 1rem;
  color: var(--color-text);
}

.linked-accounts-section {
  padding: 2rem;
}

.linked-accounts-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 1.5rem 0;
}

@media (max-width: 768px) {
  .profile-view {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-username {
    font-size: 2rem;
  }

  .profile-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .error-message {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
