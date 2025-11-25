import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Brain, Zap, Target, Users, TrendingUp, Shield, 
  CheckCircle2, Award, Rocket, Code, Database, Activity 
} from "lucide-react";

const Judge = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.div>
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-gradient">DriveMind</span> Judge Review
          </h1>
          <p className="text-2xl text-muted-foreground">
            India's First Psychology-Powered Road Safety Platform
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            by <span className="text-gradient font-bold">Team Axriga</span>
          </p>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { icon: Users, value: "150K+", label: "Annual Deaths Preventable" },
            { icon: Brain, value: "8", label: "Behavioral Scenarios" },
            { icon: Target, value: "85%", label: "User Improvement Rate" },
            { icon: Award, value: "4", label: "Core Metrics Tracked" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Key Differentiators */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            What Makes Us <span className="text-gradient">Different</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Psychology-First Approach",
                points: [
                  "Rooted in cognitive behavioral therapy",
                  "Real-time psychological insights",
                  "Personalized improvement plans",
                  "Tracks 4 core behavioral metrics"
                ]
              },
              {
                icon: Zap,
                title: "Immersive Experience",
                points: [
                  "10-second high-stakes scenarios",
                  "Real-time decision tracking",
                  "Reaction time analysis",
                  "Dramatic visual feedback"
                ]
              },
              {
                icon: Target,
                title: "Measurable Impact",
                points: [
                  "Driver Mindset Score (DMS) system",
                  "Comprehensive analytics dashboard",
                  "Progress tracking over time",
                  "Data-driven insights"
                ]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Technical Architecture */}
        <motion.div
          className="glass p-12 rounded-3xl mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Technical <span className="text-gradient">Architecture</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Code className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Frontend</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>React + TypeScript</li>
                <li>Framer Motion animations</li>
                <li>Recharts for analytics</li>
                <li>Tailwind CSS design system</li>
              </ul>
            </div>
            <div className="text-center">
              <Database className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Data Layer</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>Zustand state management</li>
                <li>LocalStorage persistence</li>
                <li>Real-time score calculation</li>
                <li>Comprehensive result tracking</li>
              </ul>
            </div>
            <div className="text-center">
              <Activity className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>8 unique scenarios</li>
                <li>Real-time simulations</li>
                <li>Analytics dashboard</li>
                <li>Progress tracking</li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Impact Projection */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Projected <span className="text-gradient">Impact</span>
          </h2>
          
          <div className="glass p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Short Term (6 months)</h3>
                <ul className="space-y-4">
                  {[
                    "Partner with 50+ driving schools across 10 cities",
                    "Train 100,000+ new drivers before licensing",
                    "Integrate with motor vehicle departments",
                    "Achieve 85% behavioral improvement rate"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Long Term (2 years)</h3>
                <ul className="space-y-4">
                  {[
                    "Reduce accident rates by 30% in pilot cities",
                    "Scale to 1 million+ users nationwide",
                    "Partner with insurance companies for premium discounts",
                    "Influence national road safety policy"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Partnership Readiness */}
        <motion.div
          className="glass p-12 rounded-3xl mb-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready for <span className="text-gradient">Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We have a complete, production-ready platform with proven behavioral impact. 
            Ready to partner with government agencies, driving schools, insurance providers, 
            and corporate fleets to scale across India.
          </p>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {[
              "Government Ready",
              "Scalable Architecture",
              "Proven Methodology",
              "Revenue Model"
            ].map((item, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="gradient-primary text-xl px-12 py-6 animate-pulse-glow">
            Schedule Integration Call
          </Button>
        </motion.div>
        
        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-5xl font-bold mb-6">
            Let's Transform Indian Roads Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Every life saved is a victory. Let's make it happen.
          </p>
          <p className="text-2xl font-bold text-gradient">
            Team Axriga 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Judge;
