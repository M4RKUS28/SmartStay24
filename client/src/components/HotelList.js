// src/components/HotelList.js
import React from 'react';

const HotelList = ({ hotels }) => {
  // Generate random ratings between 7.5 and 9.5 for demo purposes
  const generateRating = () => {
    return (7.5 + Math.random() * 2).toFixed(1);
  };

  return (
    <div className="hotels-list">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-item">
          <span>{hotel}</span>
          <span className="hotel-rating">{generateRating()}</span>
        </div>
      ))}
    </div>
  );
};

export default HotelList;