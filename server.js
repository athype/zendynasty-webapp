import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Serve static files
app.use(express.static(join(__dirname, 'dist')))

// Handle SPA routes manually
const spaRoutes = ['/auth/callback', '/blog', '/leaderboard', '/']

spaRoutes.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
