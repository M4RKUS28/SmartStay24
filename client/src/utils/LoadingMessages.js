// src/utils/LoadingMessages.js

/**
 * Collection of creative loading messages for SmartStay24
 * These messages create the impression of an AI actively
 * working through a sophisticated process to find perfect hotel matches
 */

// First search phase - the AI begins processing the request
export const initialSearchMessages = [
  "Scanning for perfect matches...",
  "Searching thousands of hotels for you...",
  "Analyzing your preferences...",
  "Activating hotel search algorithms...",
  "Starting personalized hotel search...",
  "Initiating your hotel search...",
  "Searching global hotel database...",
  "Reading between the lines of your request...",
  "Preparing to find your ideal stay...",
  "Hotel radar activated...",
  "Activating my hotel search neurons...",
  "Interpreting your travel wishes...",
  "Searching for hidden hotel gems...",
  "Decoding your perfect hotel criteria...",
  "Translating your needs into hotel features..."
];

// Processing phase - the AI evaluates and compares options
export const processingMessages = [
  "Comparing amenities across hundreds of accommodations...",
  "Evaluating price-performance ratios...",
  "Comparing locations with your preferences...",
  "Filtering hotels that match your style...",
  "Calculating optimal price-quality ratios...",
  "Comparing hotel ratings for you...",
  "Prioritizing your essential features...",
  "Assessing hotel proximity to attractions...",
  "Checking availability for your dates...",
  "Analyzing reviews from previous guests...",
  "Weighing comfort factors against price points...",
  "Sifting through thousands of hotel options...",
  "Checking hotel amenities...",
  "Matching your criteria with available accommodations...",
  "Calculating distance to important attractions..."
];

// Refinement phase - the AI finalizes and optimizes results
export const refinementMessages = [
  "Optimizing results for your perfect match...",
  "Sorting the best results for you...",
  "Applying final preference filters...",
  "Ranking hotels by relevance to your needs...",
  "Optimizing recommendations specifically for you...",
  "Creating tailored recommendations...",
  "Refining the perfect hotel selection list...",
  "Making sure we've found your ideal options...",
  "Adding the finishing touches to your results...",
  "Your matching hotels will be displayed shortly...",
  "Preparing your personalized hotel selection...",
  "Verifying the match quality...",
  "Compiling the top recommendations...",
  "Finalizing your perfect hotel matches...",
  "Ordering recommendations by relevance..."
];

// Occasional fun/personality messages that can be randomly inserted
export const personalityMessages = [
  "Hunting for hidden hotel treasures just for you...",
  "Whispering to the hotel databases...",
  "My hotel-finding powers are tingling...",
  "Separating the good hotels from the great ones...",
  "Negotiating with pixels to find your perfect stay...",
  "Consulting the hotel crystal ball...",
  "Brewing the perfect hotel recommendations...",
  "Asking the hotel gods for their wisdom...",
  "Thinking harder than a concierge on New Year's Eve...",
  "My artificial brain is working at full capacity..."
];

// Combined array with all messages for easy random selection
export const allLoadingMessages = [
  ...initialSearchMessages,
  ...processingMessages,
  ...refinementMessages,
  ...personalityMessages
];

/**
 * Returns a random loading message
 * @returns {string} A random loading message
 */
export const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * allLoadingMessages.length);
  return allLoadingMessages[randomIndex];
};

/**
 * Returns a sequence of loading messages based on the search phase
 * @param {number} phase - 0: initial, 1: processing, 2: refinement
 * @returns {string} A loading message appropriate for the current phase
 */
export const getPhaseMessage = (phase) => {
  const phases = [initialSearchMessages, processingMessages, refinementMessages];
  const safePhase = Math.min(Math.max(phase, 0), 2); // Ensure phase is 0-2
  const messageArray = phases[safePhase];
  const randomIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomIndex];
};