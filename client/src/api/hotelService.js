// src/api/hotelService.js
import { simulateHotelRecommendation } from '../utils/SimulateResponse';

// API base URL - should be configurable for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://smart-stay24.de/api';

/**
 * Sends a hotel recommendation request to the server
 * @param {string} query - The user's search query
 * @param {string} city - The selected city (Copenhagen, Mallorca, New York)
 * @returns {Promise} - Promise resolving to hotel recommendations or appropriate response code
 */
export const getHotelRecommendations = async (query, city = 'Copenhagen') => {
  try {
    // Try to fetch from the real API
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        city // Include the city in the request
      }),
      // Set timeout to not wait too long if server is slow
      signal: AbortSignal.timeout(5000)
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    // Handle different response formats:

    // Case 1: If recommendations is null, it's an invalid query
    if (data && data.recommendations === null) {
      return { type: 'invalid_request' };
    }

    // Case 2: If recommendations is an empty array, no matching hotels
    if (data && Array.isArray(data.recommendations) && data.recommendations.length === 0) {
      return { type: 'no_hotels_found' };
    }

    // Case 3: If recommendations has hotels, return them
    if (data && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
      return {
        type: 'hotels_found',
        hotels: data.recommendations
      };
    }

    // Handle direct array response (maintain backward compatibility)
    if (Array.isArray(data)) {
      return data.length > 0
        ? { type: 'hotels_found', hotels: data }
        : { type: 'no_hotels_found' };
    }

    // Handle string responses (maintain backward compatibility)
    if (typeof data === 'string') {
      if (data === 'Invalid request') {
        return { type: 'invalid_request' };
      } else if (data === 'No hotels found') {
        return { type: 'no_hotels_found' };
      }
      return data;
    }

    // Default fallback for unexpected response format
    return { type: 'no_hotels_found' };
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Checks if the API is available
 * @returns {Promise<boolean>} - Whether the API is available
 */
export const checkApiAvailability = async () => {
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