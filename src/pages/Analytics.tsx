import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { scenarios } from "@/lib/scenarios";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Target, Award } from "lucide-react";

const Analytics = () => {
  const { user, resultsHistory } = useStore();
  
  // Prepare data for charts
  const scenarioDistribution = scenarios.map(scenario => ({
    name: scenario.name.substring(0, 20) + '...',
    completed: user.scenariosCompleted.includes(scenario.id) ? 1 : 0,
    difficulty: scenario.difficulty === 'Hard' ? 3 : scenario.difficulty === 'Medium' ? 2 : 1
  }));
  
  const metricsData = [
    { name: 'Awareness', value: user.awareness, color: '#0EA5E9' },
    { name: 'Empathy', value: user.empathy, color: '#8B5CF6' },
    { name: 'Patience', value: user.patience, color: '#10B981' },
    { name: 'Risk Perception', value: user.riskPerception, color: '#EF4444' }
  ];
  
  const progressData = resultsHistory
    .slice(0, 10)
    .reverse()
    .map((result, index) => ({
      simulation: `#${index + 1}`,
      score: result.score,
      dms: user.dmsScore
    }));
  
  // Mock aggregated data for demo
  const mockStats = {
    totalUsers: 10347,
    avgDmsImprovement: 42,
    successRate: 73,
    commonRisk: "Overtaking Impulsiveness"
  };
  
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
          <h1 className="text-5xl font-bold mb-4">
            Behavioral <span className="text-gradient">Intelligence Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Data-Driven Insights for Road Safety
          </p>
        </motion.div>
        
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "Total Simulations", value: mockStats.totalUsers.toLocaleString(), color: "text-primary" },
            { icon: TrendingUp, label: "Avg DMS Improvement", value: `+${mockStats.avgDmsImprovement}%`, color: "text-success" },
            { icon: Target, label: "Success Rate", value: `${mockStats.successRate}%`, color: "text-secondary" },
            { icon: Award, label: "Your DMS", value: user.dmsScore, color: "text-primary" }
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="glass p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <p className="text-3xl font-bold mb-2">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Behavioral Traits Distribution */}
          <motion.div
            className="glass p-8 rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Behavioral Traits Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metricsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          
          {/* Performance Over Time */}
          <motion.div
            className="glass p-8 rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Performance Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData.length > 0 ? progressData : [{ simulation: 'Start', score: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="simulation" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0EA5E9" 
                  strokeWidth={3}
                  dot={{ fill: '#0EA5E9', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        
        {/* Scenario Difficulty vs Completion */}
        <motion.div
          className="glass p-8 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Scenario Difficulty vs Completion Rate</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scenarioDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
              <Bar dataKey="difficulty" fill="#8B5CF6" name="Difficulty Level" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* Insights */}
        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-lg mb-2">
                <span className="text-primary font-bold">67%</span> of drivers show empathy drop during rush hour scenarios
              </p>
              <p className="text-sm text-muted-foreground">
                Based on 10,000+ simulations across India
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-lg mb-2">
                Overtaking scenarios have the <span className="text-danger font-bold">highest</span> risk-taking behavior
              </p>
              <p className="text-sm text-muted-foreground">
                73% of users make impulsive decisions
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-lg mb-2">
                Yellow light dilemma reveals <span className="text-secondary font-bold">impulsiveness</span> in 73% of users
              </p>
              <p className="text-sm text-muted-foreground">
                Most common behavioral pattern identified
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-lg mb-2">
                Users show <span className="text-success font-bold">85% improvement</span> after 5+ simulations
              </p>
              <p className="text-sm text-muted-foreground">
                Behavioral conditioning proves highly effective
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
