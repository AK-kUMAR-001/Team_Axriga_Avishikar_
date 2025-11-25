import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { getScenarioById } from "@/lib/scenarios";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const ScenarioLearn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenario = getScenarioById(Number(id));
  const [currentInsight, setCurrentInsight] = useState(0);
  
  useEffect(() => {
    if (!scenario) {
      navigate('/dashboard');
      return;
    }
    
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % scenario.psychologyInsight.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [scenario, navigate]);
  
  if (!scenario) return null;
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(199, 89%, 48%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(258, 90%, 66%, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(199, 89%, 48%, 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-muted-foreground">Step 1 of 3</p>
        </motion.div>
        
        {/* Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <div className="inline-block p-8 rounded-full gradient-primary animate-float">
            <Brain className="w-24 h-24 text-white" />
          </div>
        </motion.div>
        
        {/* Scenario Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            {scenario.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {scenario.description}
          </p>
          <div className="inline-block glass px-6 py-3 rounded-full">
            <span className="text-muted-foreground">Testing: </span>
            <span className="text-gradient font-semibold">{scenario.trait}</span>
          </div>
        </motion.div>
        
        {/* Rotating Insights */}
        <motion.div
          className="glass p-12 rounded-3xl mb-12 min-h-[200px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl md:text-3xl font-medium leading-relaxed">
              💡 {scenario.psychologyInsight[currentInsight]}
            </p>
          </motion.div>
        </motion.div>
        
        {/* Insight dots */}
        <div className="flex justify-center gap-2 mb-12">
          {scenario.psychologyInsight.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentInsight ? 'bg-primary w-8' : 'bg-muted'
              }`}
              animate={i === currentInsight ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            size="lg"
            className="gradient-primary text-xl px-12 py-6 group animate-pulse-glow"
            onClick={() => navigate(`/scenario/${id}/simulate`)}
          >
            I Understand - Let's Begin
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScenarioLearn;
