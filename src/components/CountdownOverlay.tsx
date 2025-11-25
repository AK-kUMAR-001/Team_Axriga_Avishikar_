import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownOverlayProps {
  onComplete: () => void;
}

export const CountdownOverlay = ({ onComplete }: CountdownOverlayProps) => {
  const [count, setCount] = useState(3);
  
  useEffect(() => {
    if (count === 0) {
      setTimeout(onComplete, 500);
      return;
    }
    
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [count, onComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative"
          >
            <motion.div
              className="text-9xl font-bold text-gradient"
              animate={{
                textShadow: [
                  "0 0 20px hsl(199, 89%, 48%)",
                  "0 0 60px hsl(258, 90%, 66%)",
                  "0 0 20px hsl(199, 89%, 48%)"
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {count}
            </motion.div>
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 border-4 border-primary rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="go"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-8xl font-bold gradient-primary bg-clip-text text-transparent"
          >
            GO!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
