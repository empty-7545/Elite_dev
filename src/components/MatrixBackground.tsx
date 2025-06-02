import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the Y position of each column
    const drops: number[] = [];
    
    // Initialize drops at random Y positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Matrix rain effect
    const draw = () => {
      // Create a semi-transparent black overlay to fade characters
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the character color and font
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;
      
      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        // Select a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Randomize the green color with some intensity variations
        const greenIntensity = 128 + Math.floor(Math.random() * 128);
        ctx.fillStyle = `rgba(0, ${greenIntensity}, 65, 0.8)`;
        
        // Draw the character
        ctx.fillText(text, x, y);
        
        // Move to the next position or reset if at bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment Y position
        drops[i]++;
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recalculate columns and reset drops
      const newColumns = Math.floor(canvas.width / fontSize);
      
      // Keep existing drops and add new ones if needed
      const newDrops: number[] = [];
      for (let i = 0; i < newColumns; i++) {
        newDrops[i] = i < drops.length ? drops[i] : Math.random() * -100;
      }
      
      // Update drops array
      while (drops.length > 0) {
        drops.pop();
      }
      newDrops.forEach(drop => drops.push(drop));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-bg"
    />
  );
};

export default MatrixBackground;