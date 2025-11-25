export interface UserData {
  name: string;
  dmsScore: number;
  awareness: number;
  empathy: number;
  patience: number;
  riskPerception: number;
  scenariosCompleted: number[];
  totalSimulations: number;
}

export interface Scenario {
  id: number;
  name: string;
  trait: string;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: string;
  description: string;
  psychologyInsight: string[];
  duration: number;
  decisions: Decision[];
}

export interface Decision {
  time: number; // seconds into simulation
  options: DecisionOption[];
}

export interface DecisionOption {
  label: string;
  type: "safe" | "risky" | "neutral";
  impact: {
    awareness?: number;
    empathy?: number;
    patience?: number;
    riskPerception?: number;
  };
}

export interface SimulationResult {
  scenarioId: number;
  timestamp: Date;
  score: number;
  grade: string;
  reactionTime: number;
  decisions: {
    time: number;
    choice: string;
    type: string;
  }[];
  metricsChange: {
    awareness: number;
    empathy: number;
    patience: number;
    riskPerception: number;
  };
  insights: string[];
}

export interface ResultsHistory extends SimulationResult {
  scenarioName: string;
}
