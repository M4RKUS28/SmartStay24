// src/components/chat/HotelList.js
import React from 'react';

const HotelList = ({ hotels }) => {
  // Generate random ratings between 7.5 and 9.5 for demo purposes
  const generateRating = () => {
    return (7.5 + Math.random() * 2).toFixed(1);
  };

  // Generate random price between 80 and 250 for demo purposes
  const generatePrice = () => {
    return (80 + Math.random() * 170).toFixed(2);
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

        // Use actual price if available, otherwise generate a random one
        const price = (typeof hotel === 'object' && hotel.price)
          ? parseFloat(hotel.price).toFixed(2)
          : generatePrice();

        return (
          <div key={index} className="hotel-item">
            <div className="hotel-info">
              <span className="hotel-rank">{index + 1}.</span>
              <span className="hotel-name">{hotelName}</span>
            </div>
            <div className="hotel-details">
              <span className="hotel-rating">{rating}</span>
              <span className="hotel-price">{price} €</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelList;