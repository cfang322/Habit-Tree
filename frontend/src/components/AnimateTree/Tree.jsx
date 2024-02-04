import { useEffect, useRef } from "react";
import gsap from "gsap";
import treePng from '../../assets//treePng/tree1.png'

const Tree = ({ progress }) => {
  const treeRef = useRef(null);

  useEffect(() => {
    const treeAnimation = gsap.timeline();

    // Your tree drawing animation logic here
    // For simplicity, let's just scale the tree based on progress
    treeAnimation.to(treeRef.current, { scaleX: progress / 100, scaleY: progress / 100, duration: 1 });

    // Cleanup the animation on component unmount
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
