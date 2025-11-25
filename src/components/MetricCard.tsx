import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  change?: number;
  index?: number;
}

export const MetricCard = ({ title, value, icon: Icon, change = 0, index = 0 }: MetricCardProps) => {
  const getColor = (val: number) => {
    if (val >= 71) return "text-success";
    if (val >= 41) return "text-yellow-500";
    return "text-danger";
  };
  
  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-danger" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };
  
  return (
    <motion.div
      className="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {change !== 0 && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${change > 0 ? 'text-success' : 'text-danger'}`}>
              {Math.abs(change)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className={`text-3xl font-bold ${getColor(value)}`}>
          {value}
        </span>
        <span className="text-muted-foreground mb-1">/100</span>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: value >= 71 ? "hsl(160, 84%, 39%)" : 
                           value >= 41 ? "hsl(38, 92%, 50%)" : 
                           "hsl(0, 84%, 60%)"
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
};
