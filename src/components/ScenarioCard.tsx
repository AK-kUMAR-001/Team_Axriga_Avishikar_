import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScenarioCardProps {
  id: number;
  name: string;
  icon: string;
  trait: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  index: number;
  locked?: boolean;
}

export const ScenarioCard = ({
  id,
  name,
  icon,
  trait,
  difficulty,
  completed,
  index,
  locked = false
}: ScenarioCardProps) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    Easy: "bg-success/20 text-success",
    Medium: "bg-yellow-500/20 text-yellow-500",
    Hard: "bg-danger/20 text-danger"
  };
  
  return (
    <motion.div
      className="glass p-6 rounded-xl hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={() => !locked && navigate(`/scenario/${id}/learn`)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {locked ? "🔒" : icon}
          </div>
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <CheckCircle2 className="w-6 h-6 text-success" />
            </motion.div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="bg-secondary/20 text-secondary">
            {trait}
          </Badge>
        </div>
        
        {/* Button */}
        <Button
          className="w-full group-hover:gradient-primary group-hover:text-white transition-all"
          variant={locked ? "outline" : "default"}
          disabled={locked}
        >
          {locked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </>
          ) : completed ? (
            "Retry Simulation"
          ) : (
            "Start Simulation"
          )}
        </Button>
      </div>
    </motion.div>
  );
};
