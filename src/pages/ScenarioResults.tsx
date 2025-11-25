import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/lib/store";
import { getScenarioById } from "@/lib/scenarios";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Clock, Shield, TrendingUp, TrendingDown, Share2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { Badge } from "@/components/ui/badge";

const ScenarioResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resultsHistory, user } = useStore();
  const scenario = getScenarioById(Number(id));
  
  const latestResult = resultsHistory.find(r => r.scenarioId === Number(id));
  
  useEffect(() => {
    if (!latestResult || !scenario) {
      navigate('/dashboard');
      return;
    }
    
    // Trigger confetti for high scores
    if (latestResult.score >= 80) {
      const duration = 3000;
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#0EA5E9', '#8B5CF6', '#10B981']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#0EA5E9', '#8B5CF6', '#10B981']
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }
  }, [latestResult, scenario, navigate]);
  
  if (!latestResult || !scenario) return null;
  
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-primary';
    if (grade.startsWith('C')) return 'text-yellow-500';
    return 'text-danger';
  };
  
  const metrics = [
    { name: "Awareness", icon: Brain, change: latestResult.metricsChange.awareness, value: user.awareness },
    { name: "Empathy", icon: Heart, change: latestResult.metricsChange.empathy, value: user.empathy },
    { name: "Patience", icon: Clock, change: latestResult.metricsChange.patience, value: user.patience },
    { name: "Risk Perception", icon: Shield, change: latestResult.metricsChange.riskPerception, value: user.riskPerception }
  ];
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: latestResult.score >= 80
            ? [
                "radial-gradient(circle at 50% 50%, hsl(160, 84%, 39%, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(160, 84%, 39%, 0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, hsl(160, 84%, 39%, 0.2) 0%, transparent 50%)",
              ]
            : [
                "radial-gradient(circle at 50% 50%, hsl(199, 89%, 48%, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(258, 90%, 66%, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(199, 89%, 48%, 0.1) 0%, transparent 50%)",
              ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-7xl mb-4"
            animate={latestResult.score >= 80 ? { rotate: [0, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {latestResult.score >= 80 ? "🎉" : latestResult.score >= 60 ? "👍" : "💪"}
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">
            {scenario.name}
          </h1>
          <p className="text-xl text-muted-foreground">Simulation Complete</p>
        </motion.div>
        
        {/* Score Card */}
        <motion.div
          className="glass p-12 rounded-3xl mb-12 text-center max-w-2xl mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-muted-foreground mb-4">Overall Performance</p>
          <motion.div
            className={`text-8xl font-bold mb-4 ${getGradeColor(latestResult.grade)}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            {latestResult.grade}
          </motion.div>
          <motion.div
            className="text-5xl font-bold text-gradient mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {latestResult.score}/100
          </motion.div>
          <p className="text-muted-foreground">
            Reaction Time: <span className="font-semibold">{latestResult.reactionTime}ms</span>
          </p>
        </motion.div>
        
        {/* DMS Update */}
        <motion.div
          className="glass p-8 rounded-2xl mb-12 max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Driver Mindset Score Updated</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl font-bold">{user.dmsScore}</span>
            {user.dmsScore >= 70 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Behavioral Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-primary" />
                  {metric.change !== 0 && (
                    <div className="flex items-center gap-1">
                      {metric.change > 0 ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-danger" />
                      )}
                      <span className={`font-bold ${metric.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {metric.change > 0 
                    ? `Improved by ${metric.change} points` 
                    : metric.change < 0 
                    ? `Decreased by ${Math.abs(metric.change)} points`
                    : 'No change'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Insights */}
        <motion.div
          className="glass p-8 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Psychological Insights
          </h2>
          <div className="space-y-4">
            {latestResult.insights.map((insight, i) => (
              <motion.div
                key={i}
                className="flex gap-3 p-4 bg-muted/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                <span className="text-2xl">💡</span>
                <p className="flex-1">{insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Improvement Plan */}
        <motion.div
          className="glass p-8 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Personalized Improvement Plan</h2>
          <div className="space-y-3">
            {latestResult.metricsChange.empathy < 0 && (
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label>Complete 3 empathy-based challenges to improve consideration for others</label>
              </div>
            )}
            {latestResult.metricsChange.patience < 0 && (
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label>Practice patience scenarios to reduce impulsive reactions</label>
              </div>
            )}
            {latestResult.metricsChange.riskPerception < 0 && (
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label>Review risk assessment techniques and retake challenging scenarios</label>
              </div>
            )}
            {latestResult.score < 70 && (
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label>Retry this scenario to improve your decision-making skills</label>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </Button>
          <Button
            size="lg"
            className="gradient-primary gap-2 animate-pulse-glow"
            onClick={() => navigate('/dashboard')}
          >
            Try Another Scenario
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScenarioResults;
