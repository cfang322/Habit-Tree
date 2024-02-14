import { useEffect, useRef } from "react";
import gsap from "gsap";
import treePng from '../../assets/tree.png';

const Tree = ({ progress, goal }) => {
  const treeRef = useRef(null);
  const maxHeight = 1.01;
  const maxWidth = 1.15;
  const minHeight = 0.5;
  const minWidth = 0.5;

  useEffect(() => {
    const limitedProgress = Math.min(progress, goal);
    const limitedProgressHeight = Math.max(minHeight, Math.min(limitedProgress, maxHeight));
    const limitedProgressWidth = Math.max(minWidth, Math.min(limitedProgress, maxWidth));

    const treeAnimation = gsap.timeline();

    treeAnimation.to(treeRef.current, { scaleX: limitedProgressWidth, scaleY: limitedProgressHeight, duration: 0 });

    return () => treeAnimation.kill();
  }, [progress, goal, maxHeight, maxWidth, minHeight, minWidth]);

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

