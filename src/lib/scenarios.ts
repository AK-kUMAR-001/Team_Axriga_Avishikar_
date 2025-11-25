import { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: 1,
    name: "The Overtaking Temptation",
    trait: "Impulsiveness",
    difficulty: "Hard",
    icon: "🛣️",
    description: "A narrow gap appears on a busy highway. Will you risk it or wait?",
    psychologyInsight: [
      "Your brain miscalculates stopping distance by 40% when stressed",
      "Overtaking decisions are 70% emotion-driven, not logic-based",
      "Risk perception drops 50% when drivers are in a hurry",
      "Impatience triggers poor judgment in 85% of dangerous overtakes"
    ],
    duration: 10,
    decisions: [
      {
        time: 3,
        options: [
          { 
            label: "WAIT", 
            type: "safe",
            impact: { patience: 5, riskPerception: 3 }
          },
          { 
            label: "ACCELERATE", 
            type: "risky",
            impact: { patience: -5, riskPerception: -8, awareness: 2 }
          }
        ]
      },
      {
        time: 6,
        options: [
          { 
            label: "CHANGE LANE", 
            type: "risky",
            impact: { riskPerception: -5, awareness: 3 }
          },
          { 
            label: "MAINTAIN SPEED", 
            type: "safe",
            impact: { patience: 3, awareness: 4 }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Yellow Light Dilemma",
    trait: "Decision-Making",
    difficulty: "Medium",
    icon: "🚦",
    description: "Traffic light turns yellow 20 meters ahead. What's your move?",
    psychologyInsight: [
      "73% of drivers make yellow light decisions based on emotion, not physics",
      "Your reaction time increases by 30% when rushing",
      "Amber light violations cause 21% of intersection accidents",
      "Patience at signals reduces accident risk by 45%"
    ],
    duration: 10,
    decisions: [
      {
        time: 2,
        options: [
          { 
            label: "BRAKE", 
            type: "safe",
            impact: { patience: 6, riskPerception: 5, awareness: 4 }
          },
          { 
            label: "ACCELERATE", 
            type: "risky",
            impact: { patience: -7, riskPerception: -6, empathy: -3 }
          }
        ]
      },
      {
        time: 5,
        options: [
          { 
            label: "HONK", 
            type: "risky",
            impact: { empathy: -5, patience: -3 }
          },
          { 
            label: "WAIT CALMLY", 
            type: "safe",
            impact: { patience: 5, empathy: 3 }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Zebra Crossing Test",
    trait: "Empathy",
    difficulty: "Easy",
    icon: "🚶",
    description: "A pedestrian waits at the crossing. Do you yield?",
    psychologyInsight: [
      "Empathy drops 60% when drivers are rushing",
      "Pedestrian accidents are 85% preventable with early yielding",
      "Yielding behavior reflects core human empathy levels",
      "Driver empathy directly correlates with overall road safety"
    ],
    duration: 10,
    decisions: [
      {
        time: 3,
        options: [
          { 
            label: "STOP", 
            type: "safe",
            impact: { empathy: 8, awareness: 5, patience: 4 }
          },
          { 
            label: "CONTINUE", 
            type: "risky",
            impact: { empathy: -10, awareness: -5, riskPerception: -7 }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Speed Bump Challenge",
    trait: "Patience",
    difficulty: "Easy",
    icon: "🚗",
    description: "Multiple speed bumps ahead in a residential area.",
    psychologyInsight: [
      "Impatience at speed bumps causes 40% more vehicle damage",
      "Residential area accidents drop 70% with slow, patient driving",
      "Your stress level affects speed control by 50%",
      "Patience in low-speed zones indicates overall driving maturity"
    ],
    duration: 10,
    decisions: [
      {
        time: 4,
        options: [
          { 
            label: "SLOW DOWN", 
            type: "safe",
            impact: { patience: 6, awareness: 5, empathy: 3 }
          },
          { 
            label: "MAINTAIN SPEED", 
            type: "risky",
            impact: { patience: -6, riskPerception: -4 }
          }
        ]
      },
      {
        time: 7,
        options: [
          { 
            label: "HONK", 
            type: "risky",
            impact: { empathy: -5, patience: -4 }
          },
          { 
            label: "WAIT PATIENTLY", 
            type: "safe",
            impact: { patience: 5, empathy: 4 }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Honking Discipline",
    trait: "Emotional Control",
    difficulty: "Medium",
    icon: "📢",
    description: "Traffic jam. Car ahead is slow to move. Your response?",
    psychologyInsight: [
      "Honking triggers aggression in 80% of drivers",
      "Unnecessary honking increases stress levels by 60%",
      "Road rage incidents start with horn usage in 65% of cases",
      "Patience in traffic directly correlates with emotional intelligence"
    ],
    duration: 10,
    decisions: [
      {
        time: 3,
        options: [
          { 
            label: "HONK IMMEDIATELY", 
            type: "risky",
            impact: { empathy: -7, patience: -6, awareness: -3 }
          },
          { 
            label: "WAIT 5 SECONDS", 
            type: "safe",
            impact: { patience: 7, empathy: 5, awareness: 3 }
          }
        ]
      },
      {
        time: 7,
        options: [
          { 
            label: "HONK REPEATEDLY", 
            type: "risky",
            impact: { empathy: -8, patience: -7 }
          },
          { 
            label: "REMAIN CALM", 
            type: "safe",
            impact: { patience: 6, empathy: 5 }
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Lane Merge Empathy",
    trait: "Cooperation",
    difficulty: "Medium",
    icon: "🔀",
    description: "Another vehicle signals to merge into your lane during rush hour.",
    psychologyInsight: [
      "Cooperative driving reduces traffic congestion by 40%",
      "Blocking merge attempts increases accident risk by 55%",
      "Your merge behavior reflects your social empathy level",
      "Zipper merging is 50% faster but requires driver cooperation"
    ],
    duration: 10,
    decisions: [
      {
        time: 4,
        options: [
          { 
            label: "ALLOW MERGE", 
            type: "safe",
            impact: { empathy: 7, awareness: 5, patience: 4 }
          },
          { 
            label: "BLOCK LANE", 
            type: "risky",
            impact: { empathy: -8, patience: -5, riskPerception: -4 }
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Pedestrian Unpredictability",
    trait: "Awareness",
    difficulty: "Hard",
    icon: "🚸",
    description: "School zone. Children playing near roadside. How do you proceed?",
    psychologyInsight: [
      "Pedestrian unpredictability requires 200% more awareness",
      "School zone accidents are 90% preventable with high awareness",
      "Children's movement patterns are impossible to predict",
      "Hyper-awareness in vulnerable zones saves lives"
    ],
    duration: 10,
    decisions: [
      {
        time: 2,
        options: [
          { 
            label: "SLOW TO 20 KM/H", 
            type: "safe",
            impact: { awareness: 8, empathy: 6, riskPerception: 7 }
          },
          { 
            label: "MAINTAIN 40 KM/H", 
            type: "risky",
            impact: { awareness: -9, empathy: -7, riskPerception: -10 }
          }
        ]
      },
      {
        time: 6,
        options: [
          { 
            label: "HONK", 
            type: "risky",
            impact: { empathy: -6, awareness: -4 }
          },
          { 
            label: "STOP IF NEEDED", 
            type: "safe",
            impact: { awareness: 7, empathy: 6 }
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Two-Wheeler Blind Spot",
    trait: "Vigilance",
    difficulty: "Hard",
    icon: "🏍️",
    description: "You're changing lanes. A motorcycle may be in your blind spot.",
    psychologyInsight: [
      "Two-wheeler accidents are 70% caused by blind spot negligence",
      "Checking blind spots takes 2 seconds but saves lives",
      "Motorcyclists are 28x more vulnerable than car drivers",
      "Vigilance in blind spot checks reflects overall driving maturity"
    ],
    duration: 10,
    decisions: [
      {
        time: 3,
        options: [
          { 
            label: "CHECK MIRROR & BLIND SPOT", 
            type: "safe",
            impact: { awareness: 9, riskPerception: 8, empathy: 5 }
          },
          { 
            label: "CHANGE LANE QUICKLY", 
            type: "risky",
            impact: { awareness: -10, riskPerception: -9, empathy: -6 }
          }
        ]
      }
    ]
  }
];

export const getScenarioById = (id: number): Scenario | undefined => {
  return scenarios.find(s => s.id === id);
};

export const calculateScore = (decisions: any[], reactionTime: number): number => {
  let score = 50; // Base score
  
  decisions.forEach(decision => {
    if (decision.type === "safe") score += 20;
    else if (decision.type === "risky") score -= 15;
    else score += 5;
  });
  
  // Reaction time bonus/penalty
  if (reactionTime < 1000) score += 10;
  else if (reactionTime > 3000) score -= 10;
  
  return Math.max(0, Math.min(100, score));
};

export const getGrade = (score: number): string => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};
