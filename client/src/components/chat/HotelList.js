// client/src/components/chat/HotelList.js
import React, { useState } from 'react';
import { FaInfoCircle, FaChevronUp } from 'react-icons/fa';

const HotelList = ({ hotels }) => {
  // State to track which hotel details are expanded (if any)
  const [expandedHotel, setExpandedHotel] = useState(null);

  // Toggle hotel details expansion
  const toggleDetails = (hotelIndex) => {
    if (expandedHotel === hotelIndex) {
      // If already expanded, collapse it
      setExpandedHotel(null);
    } else {
      // Otherwise expand this one and collapse others
      setExpandedHotel(hotelIndex);
    }
  };

  // Generate random ratings between 7.5 and 9.5 for demo purposes
  const generateRating = () => {
    return (7.5 + Math.random() * 2).toFixed(1);
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "€--";
    return `€${parseFloat(price).toFixed(2)}`;
  };

  // Format attribute name to be more readable and remove "Amenity " prefix
  const formatAttributeName = (key) => {
    return key
      .replace(/^amenity_/i, '') // Remove amenity_ prefix (case insensitive)
      .replace(/^Amenity /i, '') // Remove Amenity prefix (case insensitive)
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  };

  return (
    <div className="hotels-list">
      {hotels.map((hotel, index) => {
        // Check if hotel is a string (old format) or an object (new format)
        const hotelName = typeof hotel === 'string' ? hotel : hotel.name || hotel.hotel_name;

        // Use actual rating if available, otherwise generate a random one
        const rating = (typeof hotel === 'object' && hotel.rating)
          ? parseFloat(hotel.rating).toFixed(1)
          : generateRating();

        // Get price if available
        const price = typeof hotel === 'object' ?
          (hotel.pricepernight || hotel.price) : null;

        // Get all hotel attributes for details section
        const hotelDetails = typeof hotel === 'object' ? hotel : { name: hotelName, rating };

        return (
          <div key={index} className="hotel-item-container">
            <div className="hotel-item">
              <span className="hotel-info">
                <span className="hotel-rank">{index + 1}.</span>
                <span className="hotel-name">{hotelName}</span>
              </span>
              <div className="hotel-item-actions">
                <span className="hotel-rating">{rating}</span>
                <span className="hotel-price">{formatPrice(price)}</span>
                <button
                  className="info-button"
                  onClick={() => toggleDetails(index)}
                  aria-label="Show hotel details"
                >
                  <FaInfoCircle className="info-icon" />
                </button>
              </div>
            </div>

            {/* Expandable details section */}
            {expandedHotel === index && (
              <div className="hotel-details fade-in">
                <div className="hotel-details-content">
                  <h4>Hotel Details</h4>
                  <ul className="hotel-attributes-list">
                    {Object.entries(hotelDetails).map(([key, value]) => {
                      // Skip rendering certain fields or null values
                      if (
                        key === 'name' ||
                        key === 'hotel_name' ||
                        key === 'rating' ||
                        key === 'price' ||
                        key === 'pricepernight' ||
                        value === null ||
                        value === undefined
                      ) {
                        return null;
                      }

                      // Format the key name to be more readable
                      const formattedKey = formatAttributeName(key);

                      // Format the value based on its type
                      let formattedValue = value;
                      if (typeof value === 'boolean') {
                        formattedValue = value ? 'Yes' : 'No';
                      } else if (typeof value === 'number') {
                        if (key.includes('price') || key.includes('cost')) {
                          formattedValue = `€${value.toFixed(2)}`;
                        } else if (key.includes('rating')) {
                          formattedValue = value.toFixed(1);
                        } else if (value === 0 || value === 1) {
                          formattedValue = value === 1 ? 'Yes' : 'No';
                        }
                      }

                      return (
                        <li key={key} className="hotel-attribute">
                          <span className="attribute-name">{formattedKey}:</span>
                          <span className="attribute-value">{formattedValue}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="close-details-button"
                    onClick={() => setExpandedHotel(null)}
                  >
                    <FaChevronUp />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HotelList;