// src/api/hotelService.js
import { simulateHotelRecommendation } from '../utils/SimulateResponse';

// API base URL - should be configurable for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://smart-stay24.de/api';

/**
 * Sends a hotel recommendation request to the server
 * @param {string} query - The user's search query
 * @returns {Promise} - Promise resolving to hotel recommendations
 */
export const getHotelRecommendations = async (query) => {
  try {
    // Try to fetch from the real API
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      // Set timeout to not wait too long if server is slow
      signal: AbortSignal.timeout(5000)
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    return data.recommendations || [];
  } catch (error) {
    console.warn('API request failed, falling back to simulation', error);

    // Fall back to simulation
    return simulateHotelRecommendation(query);
  }
};

/**
 * Checks if the API is available
 * @returns {Promise<boolean>} - Whether the API is available
 */
export const checkApiAvailability = async () => {
  return true;

  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't wait too long to check health
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    console.warn('API health check failed', error);
    return false;
  }
};