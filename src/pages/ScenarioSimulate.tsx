import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { getScenarioById, calculateScore, getGrade } from "@/lib/scenarios";
import { useStore } from "@/lib/store";
import { CountdownOverlay } from "@/components/CountdownOverlay";
import { Button } from "@/components/ui/button";
import { X, Timer } from "lucide-react";
import { SimulationResult } from "@/lib/types";

const ScenarioSimulate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenario = getScenarioById(Number(id));
  const { completeScenario } = useStore();
  
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [decisionStartTime, setDecisionStartTime] = useState<number>(0);
  
  useEffect(() => {
    if (!scenario) {
      navigate('/dashboard');
    }
  }, [scenario, navigate]);
  
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishSimulation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);
  
  useEffect(() => {
    if (!isActive || !scenario) return;
    
    const currentTime = 10 - timeLeft;
    const nextDecision = scenario.decisions[currentDecisionIndex];
    
    if (nextDecision && currentTime >= nextDecision.time && decisionStartTime === 0) {
      setDecisionStartTime(Date.now());
    }
  }, [timeLeft, isActive, scenario, currentDecisionIndex, decisionStartTime]);
  
  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setIsActive(true);
    setTimeLeft(10);
  };
  
  const handleDecision = (option: any) => {
    const reactionTime = Date.now() - decisionStartTime;
    
    setDecisions([...decisions, {
      time: 10 - timeLeft,
      choice: option.label,
      type: option.type,
      impact: option.impact
    }]);
    
    setReactionTimes([...reactionTimes, reactionTime]);
    setCurrentDecisionIndex(currentDecisionIndex + 1);
    setDecisionStartTime(0);
  };
  
  const finishSimulation = () => {
    if (!scenario) return;
    
    const avgReactionTime = reactionTimes.length > 0 
      ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length 
      : 2000;
    
    const score = calculateScore(decisions, avgReactionTime);
    const grade = getGrade(score);
    
    // Calculate metrics changes
    const metricsChange = {
      awareness: 0,
      empathy: 0,
      patience: 0,
      riskPerception: 0
    };
    
    decisions.forEach(decision => {
      if (decision.impact.awareness) metricsChange.awareness += decision.impact.awareness;
      if (decision.impact.empathy) metricsChange.empathy += decision.impact.empathy;
      if (decision.impact.patience) metricsChange.patience += decision.impact.patience;
      if (decision.impact.riskPerception) metricsChange.riskPerception += decision.impact.riskPerception;
    });
    
    // Generate insights based on decisions
    const insights: string[] = [];
    const riskyDecisions = decisions.filter(d => d.type === "risky").length;
    const safeDecisions = decisions.filter(d => d.type === "safe").length;
    
    if (riskyDecisions > safeDecisions) {
      insights.push("High risk-taking behavior detected - consider consequences before acting");
    } else if (safeDecisions > riskyDecisions) {
      insights.push("Excellent safety consciousness - you prioritize careful decision-making");
    }
    
    if (avgReactionTime < 1500) {
      insights.push("Quick reaction time - excellent awareness of your surroundings");
    } else if (avgReactionTime > 2500) {
      insights.push("Slower reaction time detected - work on staying more alert while driving");
    }
    
    if (metricsChange.empathy > 5) {
      insights.push("Strong empathy shown - you consider other road users' safety");
    } else if (metricsChange.empathy < -5) {
      insights.push("Low empathy detected - remember to consider vulnerable road users");
    }
    
    const result: SimulationResult = {
      scenarioId: scenario.id,
      timestamp: new Date(),
      score,
      grade,
      reactionTime: Math.round(avgReactionTime),
      decisions,
      metricsChange,
      insights
    };
    
    completeScenario(scenario.id, result);
    navigate(`/scenario/${id}/results`);
  };
  
  if (!scenario) return null;
  
  const currentTime = 10 - timeLeft;
  const nextDecision = scenario.decisions[currentDecisionIndex];
  const showDecision = nextDecision && currentTime >= nextDecision.time && decisionStartTime > 0;
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence>
        {showCountdown && (
          <CountdownOverlay onComplete={handleCountdownComplete} />
        )}
      </AnimatePresence>
      
      {!showCountdown && (
        <>
          {/* Animated background based on scenario */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br"
            animate={{
              background: [
                `linear-gradient(to bottom right, hsl(199, 89%, 48%, 0.2), transparent)`,
                `linear-gradient(to bottom right, hsl(258, 90%, 66%, 0.2), transparent)`,
                `linear-gradient(to bottom right, hsl(199, 89%, 48%, 0.2), transparent)`,
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Top bar */}
          <div className="relative z-10 glass border-b border-border/50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Timer className="w-5 h-5 text-primary animate-pulse" />
                <motion.div
                  className="text-3xl font-bold"
                  animate={{
                    color: timeLeft <= 3 ? "hsl(0, 84%, 60%)" : "hsl(199, 89%, 48%)",
                    scale: timeLeft <= 3 ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {timeLeft}s
                </motion.div>
              </div>
              
              <h2 className="text-xl font-semibold">{scenario.name}</h2>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Simulation visualization */}
          <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
            <motion.div
              className="glass p-12 rounded-3xl max-w-4xl w-full text-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Scenario icon */}
              <motion.div
                className="text-9xl mb-8"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {scenario.icon}
              </motion.div>
              
              {/* Scenario description */}
              <motion.p
                className="text-2xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {scenario.description}
              </motion.p>
              
              {/* Visual elements based on scenario */}
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-full gradient-primary"
                    animate={{
                      x: [0, 20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>
              
              {/* Risk level indicator */}
              <motion.div
                className="inline-block px-6 py-3 rounded-full mb-8"
                animate={{
                  backgroundColor: [
                    "hsl(160, 84%, 39%, 0.2)",
                    "hsl(38, 92%, 50%, 0.2)",
                    "hsl(0, 84%, 60%, 0.2)",
                    "hsl(38, 92%, 50%, 0.2)",
                    "hsl(160, 84%, 39%, 0.2)",
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <span className="text-lg font-semibold">
                  Risk Level: {timeLeft > 7 ? "LOW" : timeLeft > 3 ? "MEDIUM" : "HIGH"}
                </span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decision buttons */}
          <AnimatePresence>
            {showDecision && (
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-20 glass border-t border-border/50 p-8"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
              >
                <div className="container mx-auto">
                  <p className="text-center text-lg mb-6 text-muted-foreground">
                    Make your decision now!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {nextDecision.options.map((option, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                      >
                        <Button
                          size="lg"
                          className={`text-xl px-8 py-6 animate-pulse-glow ${
                            option.type === "safe" 
                              ? "gradient-success" 
                              : option.type === "risky"
                              ? "gradient-danger"
                              : "gradient-primary"
                          }`}
                          onClick={() => handleDecision(option)}
                        >
                          {option.label}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default ScenarioSimulate;
