import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Target, Users, Award, Zap } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            About <span className="text-gradient">DriveMind</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing road safety through behavioral psychology and immersive technology
          </p>
        </motion.div>
        
        {/* Mission */}
        <motion.div
          className="glass p-12 rounded-3xl mb-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Brain className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            To transform driver behavior through psychology-powered simulations, reducing India's staggering 
            road fatality rate and creating a culture of safe, empathetic driving. We believe that 
            <span className="text-gradient font-semibold"> every road death is preventable</span> through 
            better behavioral conditioning.
          </p>
        </motion.div>
        
        {/* The Science Behind DriveMind */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            The <span className="text-gradient">Science</span> Behind DriveMind
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Cognitive Psychology",
                description: "Our scenarios are designed based on cognitive load theory and decision-making research to identify and correct unsafe mental patterns."
              },
              {
                icon: Heart,
                title: "Behavioral Science",
                description: "We use operant conditioning and positive reinforcement to create lasting behavioral changes that extend beyond the simulation."
              },
              {
                icon: Target,
                title: "Real-Time Feedback",
                description: "Immediate psychological insights help drivers understand the 'why' behind their decisions, accelerating the learning process."
              },
              {
                icon: Zap,
                title: "Neuroplasticity",
                description: "Repeated exposure to safe decision-making scenarios rewires neural pathways, making safety the default response."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Team */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Meet <span className="text-gradient">Team Axriga</span>
          </h2>
          
          <div className="glass p-12 rounded-3xl max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Team Axriga</h3>
            <p className="text-xl text-muted-foreground mb-6">
              A passionate team of developers, psychologists, and road safety advocates
            </p>
            <p className="text-muted-foreground leading-relaxed">
              United by a common goal: to make Indian roads safer through innovative technology and 
              behavioral science. We combine expertise in software engineering, cognitive psychology, 
              UX design, and data analytics to create experiences that truly change behavior.
            </p>
          </div>
        </motion.div>
        
        {/* Impact Stats */}
        <motion.div
          className="glass p-12 rounded-3xl mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Award className="w-12 h-12 text-success mx-auto mb-4" />
              <p className="text-5xl font-bold text-success mb-2">85%</p>
              <p className="text-muted-foreground">User Improvement Rate</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-5xl font-bold text-primary mb-2">10K+</p>
              <p className="text-muted-foreground">Simulations Completed</p>
            </div>
            <div>
              <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-5xl font-bold text-secondary mb-2">30%</p>
              <p className="text-muted-foreground">Projected Accident Reduction</p>
            </div>
          </div>
        </motion.div>
        
        {/* Partners */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">
            Partner With Us
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're looking to partner with driving schools, government agencies, insurance companies, 
            and corporate fleets to scale our impact across India.
          </p>
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <p className="text-lg mb-6">
              Join us in creating a safer future on Indian roads
            </p>
            <Button size="lg" className="gradient-primary animate-pulse-glow">
              Schedule Partnership Call
            </Button>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Join the Road Safety Revolution
          </h2>
          <Button
            size="lg"
            className="gradient-primary text-xl px-12 py-6 animate-pulse-glow"
            onClick={() => navigate('/dashboard')}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
