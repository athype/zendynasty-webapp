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
      const discordAuthUrl = `${backendUrl}/auth/discord`

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
      const response = await apiClient.get('/auth/discord/callback', {
        params: { code, state },
      })

      // Store auth token if provided
      if (response.data.token) {
        this.setAuthToken(response.data.token)
        // Store Discord ID when token is received
        this.storeUserData(response.data.token)
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

      // Store user data including Discord ID when profile is fetched
      if (response.data.user || response.data) {
        const userData = response.data.user || response.data
        this.storeDiscordId(userData.discord_id)
        this.storeUserProfile(userData)
      }

      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear invalid token and stored data
        this.clearAuthToken()
        this.clearStoredUserData()
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

      // Clear local auth token and stored user data
      this.clearAuthToken()
      this.clearStoredUserData()

      return response.data
    } catch (error) {
      // Even if logout fails on backend, clear local data
      this.clearAuthToken()
      this.clearStoredUserData()
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
      sessionStorage.removeItem('authToken')
    } else {
      sessionStorage.setItem('authToken', token)
      localStorage.removeItem('authToken')
    }

    // Store user data from token when setting auth token
    this.storeUserData(token)
  }

  /**
   * Clear authentication token
   */
  static clearAuthToken() {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
  }

  /**
   * Store Discord ID in local storage
   * @param {string} discordId - Discord user ID
   */
  static storeDiscordId(discordId) {
    if (discordId) {
      localStorage.setItem('discordId', discordId)
      console.log('Discord ID stored:', discordId)
    }
  }

  /**
   * Get stored Discord ID
   * @returns {string|null} Discord ID or null
   */
  static getDiscordId() {
    return localStorage.getItem('discordId')
  }

  /**
   * Store user profile data in local storage
   * @param {Object} userData - User profile data
   */
  static storeUserProfile(userData) {
    if (userData) {
      const profileData = {
        id: userData.id || userData.user_id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        email: userData.email,
        role: userData.role,
        discord_id: userData.discord_id,
        roles: userData.roles || [],
        stored_at: Date.now(),
      }

      localStorage.setItem('userProfile', JSON.stringify(profileData))
      this.storeDiscordId(userData.discord_id)
      console.log('User profile stored:', profileData.username)
    }
  }

  /**
   * Get stored user profile
   * @returns {Object|null} User profile data or null
   */
  static getStoredUserProfile() {
    try {
      const profileData = localStorage.getItem('userProfile')
      return profileData ? JSON.parse(profileData) : null
    } catch (error) {
      console.error('Error parsing stored user profile:', error)
      return null
    }
  }

  /**
   * Store user data from JWT token
   * @param {string} token - JWT token
   */
  static storeUserData(token) {
    const userData = this.getUserFromToken(token)
    if (userData) {
      this.storeUserProfile(userData)
    }
  }

  /**
   * Clear all stored user data
   */
  static clearStoredUserData() {
    localStorage.removeItem('discordId')
    localStorage.removeItem('userProfile')
    console.log('Stored user data cleared')
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
   * @param {string} token - Optional token parameter, uses stored token if not provided
   * @returns {Object|null} User info from token or null
   */
  static getUserFromToken(token = null) {
    const authToken = token || this.getAuthToken()
    if (!authToken) return null

    const payload = this.parseJWT(authToken)
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
   * Get current user data (from storage or token)
   * @returns {Object|null} Current user data
   */
  static getCurrentUser() {
    // Try to get from stored profile first (faster)
    const storedProfile = this.getStoredUserProfile()
    if (storedProfile) {
      return storedProfile
    }

    // Fallback to parsing token
    return this.getUserFromToken()
  }

  /**
   * Handle authentication errors globally
   * @param {Error} error - Error object
   * @returns {boolean} Whether error was handled
   */
  static handleAuthError(error) {
    if (error.response?.status === 401) {
      this.clearAuthToken()
      this.clearStoredUserData()
      return true
    }
    return false
  }
}

export default AuthService
