import apiClient from '@/config/axios'

/**
 * CWL Service - Handles all Clan War League related API calls
 */
export class CWLService {
  /**
   * Get all available CWL seasons
   * @returns {Promise<Array>} Array of available seasons
   */
  static async getAllSeasons() {
    try {
      const response = await apiClient.get('/cwl/seasons')
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch CWL seasons: ${error.message}`)
    }
  }

  /**
   * Get current season data with all metrics
   * @returns {Promise<Object>} Current season data
   */
  static async getCurrentSeason() {
    try {
      const response = await apiClient.get('/cwl/current')
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch current CWL season: ${error.message}`)
    }
  }

  /**
   * Get CWL performance data for a specific season
   * @param {number} year - Year of the season
   * @param {number} month - Month of the season
   * @returns {Promise<Object>} CWL performance data
   */
  static async getCWLPerformance(year, month) {
    try {
      if (!year || !month) {
        throw new Error('Year and month are required parameters')
      }
      const response = await apiClient.get(`/cwl/performance/${year}/${month}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch CWL performance for ${year}/${month}: ${error.message}`)
    }
  }

  /**
   * Get season summary for a specific season
   * @param {number} year - Year of the season
   * @param {number} month - Month of the season
   * @returns {Promise<Object>} Season summary data
   */
  static async getSeasonSummary(year, month) {
    try {
      if (!year || !month) {
        throw new Error('Year and month are required parameters')
      }
      const response = await apiClient.get(`/cwl/summary/${year}/${month}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch season summary for ${year}/${month}: ${error.message}`)
    }
  }

  /**
   * Get missed attacks for a specific season
   * @param {number} year - Year of the season
   * @param {number} month - Month of the season
   * @returns {Promise<Array>} Array of missed attacks
   */
  static async getMissedAttacks(year, month) {
    try {
      if (!year || !month) {
        throw new Error('Year and month are required parameters')
      }
      const response = await apiClient.get(`/cwl/missed/${year}/${month}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch missed attacks for ${year}/${month}: ${error.message}`)
    }
  }

  /**
   * Helper method to get current year and month
   * @returns {Object} Current year and month
   */
  static getCurrentYearMonth() {
    const now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1, // JavaScript months are 0-indexed
    }
  }

  /**
   * Helper method to format season date
   * @param {number} year - Year
   * @param {number} month - Month
   * @returns {string} Formatted season string
   */
  static formatSeason(year, month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${monthNames[month - 1]} ${year}`
  }

  /**
   * Convenience method to get current season performance
   * @returns {Promise<Object>} Current season performance data
   */
  static async getCurrentSeasonPerformance() {
    const { year, month } = this.getCurrentYearMonth()
    return await this.getCWLPerformance(year, month)
  }

  /**
   * Convenience method to get current season summary
   * @returns {Promise<Object>} Current season summary data
   */
  static async getCurrentSeasonSummary() {
    const { year, month } = this.getCurrentYearMonth()
    return await this.getSeasonSummary(year, month)
  }

  /**
   * Convenience method to get current season missed attacks
   * @returns {Promise<Array>} Current season missed attacks
   */
  static async getCurrentSeasonMissedAttacks() {
    const { year, month } = this.getCurrentYearMonth()
    return await this.getMissedAttacks(year, month)
  }
}

export default CWLService
