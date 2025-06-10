import apiClient from '@/config/axios'

/**
 * Auth Service - Handles authentication, Discord OAuth, and user profile management
 */
export class AuthService {
  /**
   * Initiate Discord OAuth authentication
   * Redirects to Discord OAuth flow
   */
  static initiateDiscordAuth() {
    try {
      // Get the backend URL from your axios config or environment
      const backendUrl = apiClient.defaults.baseURL || window.location.origin
      const discordAuthUrl = `${backendUrl}/auth/discord` // Fixed: Added /api prefix

      // Redirect to Discord OAuth
      window.location.href = discordAuthUrl
    } catch (error) {
      throw new Error(`Failed to initiate Discord authentication: ${error.message}`)
    }
  }

  /**
   * Handle Discord OAuth callback
   * This method processes the callback from Discord
   * @param {string} code - Authorization code from Discord
   * @param {string} state - State parameter for security
   * @returns {Promise<Object>} Authentication result
   */
  static async handleDiscordCallback(code, state) {
    try {
      // The callback is typically handled by the backend
      // This method can be used if you need to process the callback client-side
      const response = await apiClient.get('/auth/discord/callback', {
        params: { code, state },
      })

      // Store auth token if provided
      if (response.data.token) {
        this.setAuthToken(response.data.token)
      }

      return response.data
    } catch (error) {
      throw new Error(
        `Discord authentication failed: ${error.response?.data?.error || error.message}`,
      )
    }
  }

  /**
   * Get user profile (requires authentication)
   * @returns {Promise<Object>} User profile data
   */
  static async getProfile() {
    try {
      const response = await apiClient.get('/auth/profile')
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear invalid token
        this.clearAuthToken()
        throw new Error('Authentication required. Please log in again.')
      }
      throw new Error(`Failed to fetch profile: ${error.response?.data?.message || error.message}`)
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>} Logout response
   */
  static async logout() {
    try {
      const response = await apiClient.post('/auth/logout')

      // Clear local auth token
      this.clearAuthToken()

      return response.data
    } catch (error) {
      // Even if logout fails on backend, clear local token
      this.clearAuthToken()
      throw new Error(`Logout failed: ${error.response?.data?.message || error.message}`)
    }
  }

  /**
   * Check if user is currently authenticated
   * @returns {boolean} Authentication status
   */
  static isAuthenticated() {
    const token = this.getAuthToken()
    if (!token) return false

    try {
      // Basic token validation (check if it's expired)
      const payload = this.parseJWT(token)
      if (!payload || !payload.exp) return true // Assume valid if no expiration

      const now = Date.now() / 1000
      return payload.exp > now
    } catch (error) {
      return false
    }
  }

  /**
   * Get stored authentication token
   * @returns {string|null} Auth token or null
   */
  static getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  }

  /**
   * Store authentication token
   * @param {string} token - JWT token
   * @param {boolean} remember - Whether to use localStorage (persistent) or sessionStorage
   */
  static setAuthToken(token, remember = true) {
    if (remember) {
      localStorage.setItem('authToken', token)
      sessionStorage.removeItem('authToken') // Clear session storage
    } else {
      sessionStorage.setItem('authToken', token)
      localStorage.removeItem('authToken') // Clear local storage
    }
  }

  /**
   * Clear authentication token
   */
  static clearAuthToken() {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
  }

  /**
   * Parse JWT token to get payload
   * @param {string} token - JWT token
   * @returns {Object|null} Parsed payload or null
   */
  static parseJWT(token) {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      return null
    }
  }

  /**
   * Get user information from stored token
   * @returns {Object|null} User info from token or null
   */
  static getUserFromToken() {
    const token = this.getAuthToken()
    if (!token) return null

    const payload = this.parseJWT(token)
    return payload
      ? {
          id: payload.user_id || payload.id || payload.sub,
          username: payload.username,
          discriminator: payload.discriminator,
          avatar: payload.avatar,
          email: payload.email,
          role: payload.role,
          discord_id: payload.discord_id,
          roles: payload.roles || [],
        }
      : null
  }

  /**
   * Handle authentication errors globally
   * @param {Error} error - Error object
   * @returns {boolean} Whether error was handled
   */
  static handleAuthError(error) {
    if (error.response?.status === 401) {
      this.clearAuthToken()
      // Optionally redirect to login or show auth modal
      return true
    }
    return false
  }
}

export default AuthService
