import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "tween",
        ease: "anticipate",
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
