import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DmsCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const DmsCircle = ({ score, size = "lg", showLabel = true }: DmsCircleProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  const getColor = (value: number) => {
    if (value >= 71) return "hsl(160, 84%, 39%)"; // Green
    if (value >= 41) return "hsl(38, 92%, 50%)"; // Orange
    return "hsl(0, 84%, 60%)"; // Red
  };
  
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };
  
  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl"
  };
  
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;
  const shouldGlow = score >= 70;
  
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className={`${sizeClasses[size]} relative`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <svg className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke={getColor(animatedScore)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: shouldGlow ? `drop-shadow(0 0 8px ${getColor(animatedScore)})` : "none"
            }}
            className={shouldGlow ? "animate-pulse-glow" : ""}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`${textSizes[size]} font-bold`}
            style={{ color: getColor(animatedScore) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {animatedScore}
          </motion.span>
        </div>
      </motion.div>
      
      {showLabel && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">Driver Mindset Score</p>
          <p className="text-xs text-muted-foreground">(DMS)</p>
        </motion.div>
      )}
    </div>
  );
};
