import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Handle Discord redirect BEFORE static files
app.get('/discord', (req, res) => {
  console.log('Redirecting to Discord invite')
  res.redirect(301, 'https://discord.gg/mQ3u9cps3G')
})

// Serve static files
app.use(express.static(join(__dirname, 'dist')))

// Handle SPA routes manually
const spaRoutes = ['/auth/callback', '/blog', '/leaderboard', '/']

spaRoutes.forEach((route) => {
  app.get(route, (req, res) => {
    console.log(`Serving index.html for route: ${route}`)
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
})

// Fallback for any other routes
app.get('*', (req, res) => {
  console.log(`Serving fallback for route: ${req.url}`)
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
