import apiClient from '@/config/axios'

/**
 * Upload Service - Handles file uploads and upload history
 */
export class UploadService {
  /**
   * Upload CWL CSV file
   * @param {File} csvFile - The CSV file to upload
   * @param {Function} onProgress - Optional progress callback function
   * @returns {Promise<Object>} Upload response data
   */
  static async uploadCWLCSV(csvFile, onProgress = null) {
    try {
      if (!csvFile) {
        throw new Error('CSV file is required')
      }

      // Validate file type
      if (!csvFile.type.includes('csv') && !csvFile.name.endsWith('.csv')) {
        throw new Error('Please select a valid CSV file')
      }

      // Create FormData object
      const formData = new FormData()
      formData.append('csvFile', csvFile)

      // Upload with progress tracking
      const response = await apiClient.post('/upload/cwl-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.lengthComputable) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(percentCompleted)
          }
        },
      })

      return response.data
    } catch (error) {
      if (error.response?.status === 413) {
        throw new Error('File size too large. Please select a smaller CSV file.')
      }
      if (error.response?.status === 415) {
        throw new Error('Unsupported file type. Please upload a CSV file.')
      }
      throw new Error(`Failed to upload CWL CSV: ${error.response?.data?.message || error.message}`)
    }
  }

  /**
   * Get upload history
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (optional)
   * @param {number} options.limit - Items per page (optional)
   * @param {string} options.sortBy - Sort field (optional)
   * @param {string} options.order - Sort order: 'asc' or 'desc' (optional)
   * @returns {Promise<Object>} Upload history data
   */
  static async getUploadHistory(options = {}) {
    try {
      const params = new URLSearchParams()

      // Add query parameters if provided
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.order) params.append('order', options.order)

      const queryString = params.toString()
      const url = queryString ? `/upload/history?${queryString}` : '/upload/history'

      const response = await apiClient.get(url)
      return response.data
    } catch (error) {
      throw new Error(
        `Failed to fetch upload history: ${error.response?.data?.message || error.message}`,
      )
    }
  }

  /**
   * Get recent uploads (convenience method)
   * @param {number} limit - Number of recent uploads to fetch (default: 10)
   * @returns {Promise<Object>} Recent upload history
   */
  static async getRecentUploads(limit = 10) {
    return await this.getUploadHistory({
      limit,
      sortBy: 'createdAt',
      order: 'desc',
    })
  }

  /**
   * Validate CSV file before upload
   * @param {File} file - File to validate
   * @returns {Object} Validation result
   */
  static validateCSVFile(file) {
    const result = {
      isValid: true,
      errors: [],
    }

    // Check if file exists
    if (!file) {
      result.isValid = false
      result.errors.push('No file selected')
      return result
    }

    // Check file type
    if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
      result.isValid = false
      result.errors.push('File must be a CSV file')
    }

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      result.isValid = false
      result.errors.push('File size must be less than 10MB')
    }

    // Check if file is empty
    if (file.size === 0) {
      result.isValid = false
      result.errors.push('File cannot be empty')
    }

    return result
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * Format upload date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  static formatUploadDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Get upload status color for UI
   * @param {string} status - Upload status
   * @returns {string} CSS class or color
   */
  static getStatusColor(status) {
    const statusColors = {
      success: 'green',
      completed: 'green',
      processing: 'orange',
      pending: 'orange',
      failed: 'red',
      error: 'red',
    }
    return statusColors[status?.toLowerCase()] || 'gray'
  }
}

export default UploadService
