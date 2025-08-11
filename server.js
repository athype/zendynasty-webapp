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

// Handle specific SPA routes
app.get('/auth/callback', (req, res) => {
  console.log('Serving index.html for route: /auth/callback')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/blog', (req, res) => {
  console.log('Serving index.html for route: /blog')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/leaderboard', (req, res) => {
  console.log('Serving index.html for route: /leaderboard')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/profile/:discordId', (req, res) => {
  console.log(`Serving index.html for profile route: /profile/${req.params.discordId}`)
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/profile', (req, res) => {
  console.log('Serving index.html for profile route: /profile')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/', (req, res) => {
  console.log('Serving index.html for route: /')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.get('/rules-rcs', (req, res) => {
  console.log('Serving index.html for route: /rules-rcs')
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// Fallback for any other routes - use a more specific pattern
app.use((req, res) => {
  console.log(`Serving fallback for route: ${req.url}`)
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
