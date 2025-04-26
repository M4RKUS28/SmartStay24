// src/components/BackgroundImages.js
import React from 'react';

// Styles as JavaScript objects instead of CSS
const leftBackgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '60vw',
  zIndex: -1,
  opacity: 0.9,
  pointerEvents: 'none',
  overflow: 'hidden'
};

const rightBackgroundStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  width: '30vw',
  zIndex: -1,
  opacity: 0.9,
  pointerEvents: 'none',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const BackgroundImages = () => {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 1200;

  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div style={leftBackgroundStyle}>
        <img
          src={process.env.PUBLIC_URL + '/assets/palm3.jpeg'}
          alt=""
          style={{...imageStyle, objectPosition: 'right center'}}
        />
      </div>

      <div style={rightBackgroundStyle}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Hotel.png'}
          alt=""
          style={{...imageStyle, objectPosition: 'left center'}}
        />
      </div>
    </>
  );
};

export default BackgroundImages;