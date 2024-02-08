import { useEffect, useRef } from "react";
import gsap from "gsap";
import treePng from '../../assets/tree.png';

const Tree = ({ progress, goal }) => {
  const treeRef = useRef(null);
  const maxHeight = 100;
  const maxWidth = 100;

  useEffect(() => {

    const limitedProgress = Math.min(progress, goal);
    const limitedProgressHeight = Math.min(limitedProgress, maxHeight);
    const limitedProgressWidth = Math.min(limitedProgress, maxWidth);

    const treeAnimation = gsap.timeline();

    treeAnimation.to(treeRef.current, { scaleX: limitedProgressWidth, scaleY: limitedProgressHeight, duration: 0 });

    return () => treeAnimation.kill();
  }, [progress, goal]);

  return (
    <div className="tree-container">
      <img
        ref={treeRef}
        src={treePng}
        alt="tree"
        className="tree-image"
        height={500}
        width={500}
      />
    </div>
  );
};

export default Tree;

