import apiClient from '@/config/axios'

/**
 * Link Service - Handles player linking operations
 */
export class LinkService {
  /**
   * Get all linked players for the current user
   * @returns {Promise<Object>} Response containing linkedPlayers and autoImport info
   */
  static async getMyLinkedPlayers() {
    try {
      const response = await apiClient.get('/player-links/my-players')

      console.log('Linked players response:', response.data)

      return {
        linkedPlayers: response.data.linkedPlayers || [],
        autoImport: response.data.autoImport || null,
        success: true,
      }
    } catch (error) {
      console.error('Failed to fetch linked players:', error)

      // Handle different error scenarios
      if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.')
      } else if (error.response?.status === 404) {
        throw new Error('No linked players found.')
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.')
      } else {
        throw new Error(
          `Failed to fetch linked players: ${error.response?.data?.message || error.message}`,
        )
      }
    }
  }

  /**
   * Transform API response to match the format expected by LinkedAccountsTable
   * @param {Array} linkedPlayers - Array of linked players from API
   * @returns {Array} Formatted accounts for the table
   */
  static formatLinkedPlayersForTable(linkedPlayers) {
    return linkedPlayers.map((player) => ({
      id: player.link_id,
      tag: player.player_tag,
      name: player.player_name,
      townhall: player.town_hall_level,
      isMain: player.is_main_account,
      linkedAt: player.linked_at,
      playerId: player.player_id,
      userId: player.user_id,
    }))
  }

  /**
   * Link a new player account
   * @param {string} playerTag - Player tag to link
   * @param {boolean} isMainAccount - Whether this is the main account
   * @returns {Promise<Object>} Link result
   */
  static async linkPlayer(playerTag, isMainAccount = false) {
    try {
      const response = await apiClient.post('/player-links', {
        player_tag: playerTag,
        is_main_account: isMainAccount,
      })

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Failed to link player:', error)
      throw new Error(`Failed to link player: ${error.response?.data?.message || error.message}`)
    }
  }

  /**
   * Unlink a player account
   * @param {number} linkId - Link ID to remove
   * @returns {Promise<Object>} Unlink result
   */
  static async unlinkPlayer(linkId) {
    try {
      const response = await apiClient.delete(`/player-links/${linkId}`)

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Failed to unlink player:', error)
      throw new Error(`Failed to unlink player: ${error.response?.data?.message || error.message}`)
    }
  }

  /**
   * Set a player as the main account
   * @param {number} linkId - Link ID to set as main
   * @returns {Promise<Object>} Update result
   */
  static async setMainAccount(linkId) {
    try {
      const response = await apiClient.patch(`/player-links/${linkId}/set-main`)

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Failed to set main account:', error)
      throw new Error(
        `Failed to set main account: ${error.response?.data?.message || error.message}`,
      )
    }
  }
}

export default LinkService
