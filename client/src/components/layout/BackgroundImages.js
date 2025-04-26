// client/src/components/layout/BackgroundImages.js
import React from 'react';

const BackgroundImages = () => {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 1200;

  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div className="background-image left-image">
        <img
          src={process.env.PUBLIC_URL + '/assets/palm3.jpeg'}
          alt=""
          className="background-img"
        />
      </div>

      <div className="background-image right-image">
        <img
          src={process.env.PUBLIC_URL + '/assets/Hotel.png'}
          alt=""
          className="background-img"
        />
      </div>
    </>
  );
};

export default BackgroundImages;