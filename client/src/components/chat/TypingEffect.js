// src/components/TypingEffect.js
import React, { useState, useEffect } from 'react';
import '../../styles/TypingEffect.css'; // Changed to use styles folder

const TypingEffect = ({ content, typingSpeed = 8, onComplete = () => {} }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Reset when content changes
    setDisplayedContent('');
    setCurrentIndex(0);
    setShowCursor(true);
  }, [content]);

  useEffect(() => {
    if (typeof content !== 'string') {
      // Handle non-string content
      setDisplayedContent(content);
      setShowCursor(false);
      onComplete();
      return;
    }

    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (currentIndex === content.length) {
      const timer = setTimeout(() => {
        setShowCursor(false);
        onComplete();
      }, 500); // Small pause after typing completes

      return () => clearTimeout(timer);
    }
  }, [content, currentIndex, typingSpeed, onComplete]);

  return (
    <div className="typing-effect">
      {displayedContent}
      {showCursor && <span className="typing-cursor">|</span>}
    </div>
  );
};

export default TypingEffect;