import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/#about',
      name: 'about',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        // Scroll to the element with id 'about' when navigating to this route
        const element = document.getElementById('about')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        next()
      },
    },
    {
      path: '/#join',
      name: 'join',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        // Scroll to the element with id 'join' when navigating to this route
        const element = document.getElementById('join')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        next()
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
  ],
})

export default router
