// src/components/HotelList.js
import React from 'react';

const HotelList = ({ hotels }) => {
  // Generate random ratings between 7.5 and 9.5 for demo purposes
  const generateRating = () => {
    return (7.5 + Math.random() * 2).toFixed(1);
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

        return (
          <div key={index} className="hotel-item">
            <span>{hotelName}</span>
            <span className="hotel-rating">{rating}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HotelList;