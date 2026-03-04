import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import ImageCard from "./ImageCard";

const images = [
  "https://cdn.pixabay.com/photo/2019/02/21/11/18/shopping-4011117_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/03/11/10/08/camera-4921646_1280.jpg",
  "https://cdn.pixabay.com/photo/2019/02/07/17/31/wardrobe-3981732_1280.jpg",
  "https://cdn.pixabay.com/photo/2019/02/07/17/31/wardrobe-3981732_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/03/15/28/beautiful-2576851_1280.jpg",
];

const ImageStack = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const progress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1],
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      setActive(Math.round(v));
    });
    return () => unsubscribe();
  }, [progress]);

  return (
    <div ref={ref} className="relative h-[350px] w-[250px]">
      {images.map((img, i) => (
        <ImageCard key={i} src={img} index={i} isActive={i === active} />
      ))}
    </div>
  );
};

export default ImageStack;
