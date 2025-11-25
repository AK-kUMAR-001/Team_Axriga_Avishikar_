import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { scenarios } from "@/lib/scenarios";
import { DmsCircle } from "@/components/DmsCircle";
import { MetricCard } from "@/components/MetricCard";
import { ScenarioCard } from "@/components/ScenarioCard";
import { Brain, Heart, Clock, Shield } from "lucide-react";

const Dashboard = () => {
  const { user } = useStore();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome, <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your Safety Journey Begins Here
          </p>
        </motion.div>
        
        {/* DMS Score */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <DmsCircle score={user.dmsScore} />
        </motion.div>
        
        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            title="Awareness Score"
            value={user.awareness}
            icon={Brain}
            index={0}
          />
          <MetricCard
            title="Empathy Level"
            value={user.empathy}
            icon={Heart}
            index={1}
          />
          <MetricCard
            title="Patience Index"
            value={user.patience}
            icon={Clock}
            index={2}
          />
          <MetricCard
            title="Risk Perception"
            value={user.riskPerception}
            icon={Shield}
            index={3}
          />
        </div>
        
        {/* Scenarios Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Choose Your <span className="text-gradient">Challenge</span>
            </h2>
            <div className="text-muted-foreground">
              {user.scenariosCompleted.length} / {scenarios.length} Completed
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                id={scenario.id}
                name={scenario.name}
                icon={scenario.icon}
                trait={scenario.trait}
                difficulty={scenario.difficulty}
                completed={user.scenariosCompleted.includes(scenario.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Stats Footer */}
        <motion.div
          className="mt-16 glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">
                {user.totalSimulations}
              </p>
              <p className="text-muted-foreground">Total Simulations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-success mb-2">
                {user.scenariosCompleted.length}
              </p>
              <p className="text-muted-foreground">Scenarios Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-secondary mb-2">
                {user.dmsScore >= 70 ? "Excellent" : user.dmsScore >= 40 ? "Good" : "Improving"}
              </p>
              <p className="text-muted-foreground">Current Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
