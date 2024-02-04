import { useEffect, useRef } from "react";
import gsap from "gsap";
import treePng from '../../assets/tree.png';

const Tree = ({ progress }) => {
  const treeRef = useRef(null);
  const maxHeight = 100;
  const maxWidth = 100;

  useEffect(() => {
    const limitedProgressHeight = Math.min(progress, maxHeight);
    const limitedProgressWidth = Math.min(progress, maxWidth);

    const treeAnimation = gsap.timeline();


    treeAnimation.to(treeRef.current, { scaleX: limitedProgressWidth / 100, scaleY: limitedProgressHeight / 100, duration: 0 });

    return () => treeAnimation.kill();
  }, [progress]);

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
