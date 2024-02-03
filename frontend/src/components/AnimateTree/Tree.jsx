import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Tree = ({ progress }) => {
  const treeRef = useRef();

  useEffect(() => {
    // Use GSAP to animate tree growth
    gsap.to(treeRef.current, {
      scaleY: progress, // Adjust scaleY based on your progress
      duration: 1, // Animation duration in seconds
      ease: 'power2.out', // Easing function
    });
  }, [progress]);

  return (
    <div ref={treeRef} className="tree">
      {/* Your tree components here */}
      {/* For example, you might have tree branches and leaves as child elements */}
    </div>
  );
};

export default Tree;
