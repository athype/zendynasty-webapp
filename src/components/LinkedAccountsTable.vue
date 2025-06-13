<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  accounts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['refresh'])

function handleAccountAction(account) {
  console.log('Account action clicked for:', account)
  // TODO: Implement account management functionality
  alert(`Manage account: ${account.name} (${account.tag})`)
}
</script>

<template>
  <div class="linked-accounts-table">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading linked accounts...</p>
    </div>

    <div v-else-if="accounts.length === 0" class="empty-state">
      <p>No linked Clash of Clans accounts found.</p>
      <button @click="$emit('refresh')" class="btn btn-primary">Try Again</button>
    </div>

    <div v-else class="table-container">
      <table class="accounts-table">
        <thead>
          <tr>
            <th>Player Tag</th>
            <th>Player Name</th>
            <th>Town Hall</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id" class="account-row">
            <td class="tag-cell">
              <code>{{ account.tag }}</code>
            </td>
            <td class="name-cell">
              <span class="player-name">{{ account.name }}</span>
            </td>
            <td class="th-cell">
              <div class="townhall-badge" :class="`th-${account.townhall}`">
                <span class="th-level">{{ account.townhall }}</span>
              </div>
            </td>
            <td class="actions-cell">
              <button @click="handleAccountAction(account)" class="btn btn-small btn-outline">
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <p class="account-count">
        {{ accounts.length }} account{{ accounts.length !== 1 ? 's' : '' }} linked
      </p>
      <button @click="$emit('refresh')" class="btn btn-outline btn-small">Refresh</button>
    </div>
  </div>
</template>

<style scoped>
.linked-accounts-table {
  width: 100%;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--color-text);
}

.loading-state {
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

.table-container {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.accounts-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-background);
}

.accounts-table th,
.accounts-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.accounts-table th {
  background: var(--color-background-soft);
  font-weight: 600;
  color: var(--color-heading);
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.account-row:hover {
  background: var(--color-background-soft);
}

.tag-cell code {
  background: var(--color-background-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.player-name {
  font-weight: 600;
  color: var(--color-heading);
}

.townhall-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Town Hall level colors */
.th-17 {
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
}
.th-16 {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}
.th-15 {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}
.th-14 {
  background: linear-gradient(135deg, #45b7d1, #3498db);
}
.th-13 {
  background: linear-gradient(135deg, #96ceb4, #85c1a1);
}
.th-12 {
  background: linear-gradient(135deg, #feca57, #ff9ff3);
}
.th-11 {
  background: linear-gradient(135deg, #ff9ff3, #f368e0);
}
.th-10 {
  background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
}

/* Default for other levels */
.townhall-badge:not([class*='th-']) {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.th-level {
  font-size: 0.9rem;
  font-weight: 700;
}

.actions-cell {
  text-align: center;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover, #d41e24);
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

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.account-count {
  margin: 0;
  color: var(--color-text);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .accounts-table th,
  .accounts-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }

  .table-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .townhall-badge {
    width: 35px;
    height: 35px;
  }

  .th-level {
    font-size: 0.8rem;
  }
}
</style>
