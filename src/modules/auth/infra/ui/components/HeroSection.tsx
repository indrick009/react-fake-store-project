import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div
      className="absolute top-0 w-1/2 p-10 h-[450px]"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2019/11/02/15/33/fashion-4596664_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-white-600/80" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-white text-4xl font-bold mb-12 relative z-10"
      >
        Your Digital Experience
      </motion.h1>
    </div>
  );
};

export default HeroSection;
