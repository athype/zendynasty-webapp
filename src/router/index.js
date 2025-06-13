import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import AuthCallback from '../components/AuthCallback.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: AuthCallback,
      meta: {
        hideHeader: true,
        hideFooter: true,
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      beforeEnter: (to, from, next) => {
        // Scroll to the top of the page when navigating to the blog
        window.scrollTo(0, 0)
        next()
      },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView,
      beforeEnter: (to, from, next) => {
        // Scroll to the top of the page when navigating to the leaderboard
        window.scrollTo(0, 0)
        next()
      },
    },
    {
      path: '/profile/:discordId',
      name: 'profile',
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        // Scroll to the top of the page when navigating to the profile
        window.scrollTo(0, 0)
        next()
      },
    },
  ],
  // Add scroll behavior for hash links
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// Add navigation guard for debugging
router.beforeEach((to, from, next) => {
  console.log('Router navigation:', {
    to: to.path,
    from: from.path,
    name: to.name,
  })

  // Special handling for auth callback
  if (to.path === '/auth/callback') {
    console.log('Navigating to auth callback with query:', to.query)
  }

  next()
})

export default router
