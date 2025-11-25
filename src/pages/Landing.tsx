import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Target, ArrowRight, TrendingUp, Users, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [deaths, setDeaths] = useState(0);
  
  useEffect(() => {
    let current = 0;
    const target = 150000;
    const increment = target / 100;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDeaths(target);
        clearInterval(interval);
      } else {
        setDeaths(Math.floor(current));
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              DriveMind
            </motion.div>
            
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button variant="ghost" onClick={() => navigate('/about')}>
                About
              </Button>
              <Button variant="ghost" onClick={() => navigate('/analytics')}>
                Analytics
              </Button>
              <Button className="gradient-primary animate-pulse-glow" onClick={() => navigate('/dashboard')}>
                Get Started
              </Button>
            </motion.div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient">Transform Drivers.</span>
              <br />
              <span className="text-foreground">Save Lives.</span>
              <br />
              <span className="text-gradient">Change Behavior.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              India's First Psychology-Powered Road Safety Simulator
            </p>
            
            {/* Death counter */}
            <motion.div
              className="glass p-8 rounded-2xl max-w-md mx-auto mb-12"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-danger text-5xl font-bold mb-2">
                {deaths.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">
                Road deaths annually in India
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Every death is preventable through better behavior
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="gradient-primary text-lg px-8 py-6 group animate-pulse-glow"
                onClick={() => navigate('/dashboard')}
              >
                Start Your Behavioral Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Features */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              {
                icon: Brain,
                title: "Psychology-Based",
                description: "Rooted in behavioral science and cognitive psychology to create lasting change"
              },
              {
                icon: Zap,
                title: "Real-Time AI Analysis",
                description: "Instant feedback on your decisions with detailed psychological insights"
              },
              {
                icon: Target,
                title: "Proven Behavior Change",
                description: "Track improvements across 4 key behavioral metrics with personalized plans"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass p-8 rounded-2xl text-center hover:scale-105 transition-transform"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="inline-block p-4 rounded-full gradient-primary mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* How It Works */}
        <section className="container mx-auto px-6 py-20">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-gradient"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              { step: 1, title: "Choose a Scenario", desc: "Select from 8 real-world driving situations" },
              { step: 2, title: "Learn Psychology", desc: "Understand the science behind your decisions" },
              { step: 3, title: "Experience Simulation", desc: "Make real-time choices in immersive scenarios" },
              { step: 4, title: "Get AI Insights", desc: "Receive personalized behavioral analysis and improvement plans" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-6 mb-12 items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div className="glass p-6 rounded-xl flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Stats */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="glass p-12 rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
              Impact Metrics
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-success" />
                </div>
                <p className="text-5xl font-bold text-success mb-2">85%</p>
                <p className="text-muted-foreground">Average behavioral improvement</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <p className="text-5xl font-bold text-primary mb-2">10K+</p>
                <p className="text-muted-foreground">Simulations completed</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-12 h-12 text-secondary" />
                </div>
                <p className="text-5xl font-bold text-secondary mb-2">30%</p>
                <p className="text-muted-foreground">Projected accident reduction</p>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your Driving?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of drivers who are making Indian roads safer through behavioral change
            </p>
            <Button
              size="lg"
              className="gradient-primary text-lg px-12 py-6 group animate-pulse-glow"
              onClick={() => navigate('/dashboard')}
            >
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground">
                © 2025 DriveMind by <span className="text-gradient font-bold">Axriga</span>. Transforming road safety through psychology.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">Privacy</Button>
                <Button variant="ghost" size="sm">Terms</Button>
                <Button variant="ghost" size="sm">Contact</Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
