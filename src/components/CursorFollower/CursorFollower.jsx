import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './CursorFollower.module.css';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const animationId = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Smooth animation function
  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Smooth interpolation for cursor (slower follow)
    const cursorLerpFactor = 0.15;
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * cursorLerpFactor;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * cursorLerpFactor;

    // Faster interpolation for dot (quicker follow)
    const dotLerpFactor = 0.8;
    dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotLerpFactor;
    dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotLerpFactor;

    // Use transform for better performance
    cursor.style.transform = `translate3d(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px, 0)`;
    dot.style.transform = `translate3d(${dotPos.current.x - 2}px, ${dotPos.current.y - 2}px, 0)`;

    animationId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Initialize positions
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    dot.style.left = '0px';
    dot.style.top = '0px';

    const moveCursor = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        setIsHovering(true);
        setCursorText('');
      }
      
      // Check for project cards
      if (target.closest('[data-cursor="project"]')) {
        setIsHovering(true);
        setCursorText('View');
      }
      
      // Check for navigation items
      if (target.closest('[data-cursor="nav"]')) {
        setIsHovering(true);
        setCursorText('Go');
      }
      
      // Check for social links
      if (target.closest('[data-cursor="social"]')) {
        setIsHovering(true);
        setCursorText('Visit');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    const handleMouseMove = (e) => {
      moveCursor(e);
      
      // Start animation if not already running
      if (!animationId.current) {
        animate();
      }
    };

    // Initialize mouse position
    const initializePosition = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      cursorPos.current.x = e.clientX;
      cursorPos.current.y = e.clientY;
      dotPos.current.x = e.clientX;
      dotPos.current.y = e.clientY;
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', initializePosition, { once: true });
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, select, [data-cursor]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    // Start animation loop
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', initializePosition);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      // Cancel animation
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [animate]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isHovering ? styles.hovering : ''}`}
      >
        {cursorText && (
          <span className={styles.cursorText}>{cursorText}</span>
        )}
      </div>
      
      <div
        ref={dotRef}
        className={styles.cursorDot}
      />
    </>
  );
};

export default CursorFollower;