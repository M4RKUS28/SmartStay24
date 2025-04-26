// src/utils/SimulateResponse.js

// Sample hotel names for demonstration
const CITY_HOTELS = {
  'Copenhagen': [
    "Copenhagen Grand Hotel",
    "Tivoli Gardens Resort",
    "Nyhavn Waterfront Hotel",
    "Danish Design Hotel",
    "Harbor View Copenhagen",
    "Scandic Royal Copenhagen",
    "Nordic Comfort Hotel",
    "Copenhagen City Plaza",
    "Øresund Bay Resort",
    "The Little Mermaid Hotel"
  ],
  'Mallorca': [
    "Mallorca Beach Resort",
    "Palma Bay Hotel & Spa",
    "Mediterranean Sunset Resort",
    "Playa de Palma Grand Hotel",
    "Alcudia Beach Club",
    "Port de Sóller Retreat",
    "Sierra de Tramuntana Lodge",
    "Balearic Sea View Hotel",
    "Cala d'Or Luxury Resort",
    "Mallorca Golf & Spa Resort"
  ],
  'New York': [
    "Manhattan Skyline Hotel",
    "Central Park Plaza",
    "Times Square Executive Hotel",
    "Broadway Lights Boutique Hotel",
    "Hudson River View Resort",
    "Empire State Luxury Suites",
    "Fifth Avenue Grand Hotel",
    "SoHo Designer Hotel",
    "Brooklyn Bridge View Inn",
    "Greenwich Village Boutique Hotel"
  ]
};

// Keywords that indicate hotel-related queries
const HOTEL_KEYWORDS = [
  'hotel', 'unterkunft', 'zimmer', 'resort', 'hostel', 'motel', 'apartment',
  'frühstück', 'breakfast', 'pool', 'spa', 'sauna', 'strand', 'beach', 'meer', 'lake',
  'zentrum', 'city', 'innenstadt', 'downtown', 'wifi', 'wlan', 'parken', 'parking',
  'bar', 'restaurant', 'fitness', 'gym', 'haustiere', 'pets', 'aussicht', 'view',
  'familie', 'family', 'kinder', 'children', 'preis', 'price', 'budget', 'luxus', 'luxury'
];

/**
 * Simulates a hotel recommendation API response
 * @param {string} query - The user's search query
 * @param {string} city - The selected city (Copenhagen, Mallorca, New York)
 * @returns {Array|string} - List of hotels, "No hotels found", or "Invalid request"
 */
export const simulateHotelRecommendation = (query, city = 'Copenhagen') => {
  // Convert query to lowercase for easier matching
  const queryLower = query.toLowerCase();

  // Make sure we have a valid city
  const validCity = CITY_HOTELS[city] ? city : 'Copenhagen';
  const cityHotels = CITY_HOTELS[validCity];

  // Check if query is hotel-related
  const isHotelQuery = HOTEL_KEYWORDS.some(keyword => queryLower.includes(keyword));

  if (!isHotelQuery) {
    return "Invalid request";
  }

  // Determine if there should be matches based on query complexity and specificity
  // This is just a simulation - in a real API, this would be determined by actual matching
  const queryComplexity = queryLower.split(' ').length;
  const hasVerySpecificTerms = queryLower.includes('5 sterne') && queryLower.includes('20 euro');

  if (hasVerySpecificTerms || (Math.random() < 0.2 && queryComplexity > 6)) {
    return [];
  }

  // Generate a random number of matching hotels (1-10)
  const numMatches = Math.floor(Math.random() * 10) + 1;

  // Shuffle the sample hotels array and take the first 'numMatches' hotels
  return shuffleArray(cityHotels).slice(0, numMatches);
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};