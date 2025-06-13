<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AuthService } from '@/services/authService'
import LinkedAccountsTable from '@/components/LinkedAccountsTable.vue'

const router = useRouter()
const route = useRoute()
const user = ref(null)
const linkedAccounts = ref([])
const loadingAccounts = ref(false)

// Dummy data for development
const dummyAccounts = [
  {
    tag: '#2PP0JQVQ0',
    name: 'AthypeW',
    townhall: 17,
    id: 1,
  },
  {
    tag: '#LU2Q8QRR',
    name: 'Medzsi',
    townhall: 15,
    id: 2,
  },
  {
    tag: '#89YGPL0QJ',
    name: 'Athype',
    townhall: 13,
    id: 3,
  },
]

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
  loadingAccounts.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiClient.get(`/users/${user.value.discord_id}/linked-accounts`)
    // linkedAccounts.value = response.data.accounts || []

    // For now, use dummy data
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    linkedAccounts.value = dummyAccounts

    console.log('Linked accounts loaded:', linkedAccounts.value)
  } catch (error) {
    console.error('Failed to load linked accounts:', error)
    // Handle error - maybe show a toast notification
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
  // Load dummy accounts on mount for development
  linkedAccounts.value = dummyAccounts
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
        <button @click="handleGetLinkedAccounts" class="btn btn-primary">
          Get Linked Accounts
        </button>
        <button @click="handleLogout" class="btn btn-secondary">Logout</button>
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

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
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
}
</style>
