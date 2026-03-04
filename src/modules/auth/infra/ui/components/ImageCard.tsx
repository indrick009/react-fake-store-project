import { motion } from "framer-motion";

type Props = {
  src: string;
  isActive: boolean;
  index: number;
};

const ImageCard = ({ src, isActive, index }: Props) => {
  return (
    <motion.div
      className="absolute w-52 h-72 md:w-60 md:h-80 rounded-2xl overflow-hidden shadow-2xl"
      animate={{
        rotate: isActive ? 0 : -15,
        scale: isActive ? 1 : 0.9,
        x: isActive ? 0 : -40,
        opacity: isActive ? 1 : 0.7,
        zIndex: isActive ? 20 : 10,
      }}
      transition={{ duration: 0.6 }}
      style={{
        top: index * 6,
        right: index * 6,
      }}
    >
      <img
        src={src}
        className="w-full h-full object-cover"
        alt="preview"
      />
    </motion.div>
  );
};

export default ImageCard;