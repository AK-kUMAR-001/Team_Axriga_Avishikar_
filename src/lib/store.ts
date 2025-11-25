import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData, SimulationResult, ResultsHistory } from './types';
import { scenarios } from './scenarios';

interface AppState {
  user: UserData;
  resultsHistory: ResultsHistory[];
  updateUser: (updates: Partial<UserData>) => void;
  addResult: (result: SimulationResult) => void;
  resetUser: () => void;
  completeScenario: (scenarioId: number, result: SimulationResult) => void;
}

const initialUser: UserData = {
  name: "Driver",
  dmsScore: 0,
  awareness: 0,
  empathy: 0,
  patience: 0,
  riskPerception: 0,
  scenariosCompleted: [],
  totalSimulations: 0,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: initialUser,
      resultsHistory: [],
      
      updateUser: (updates) => 
        set((state) => ({
          user: { ...state.user, ...updates }
        })),
      
      addResult: (result) => {
        const scenario = scenarios.find(s => s.id === result.scenarioId);
        const resultWithName: ResultsHistory = {
          ...result,
          scenarioName: scenario?.name || "Unknown Scenario"
        };
        
        set((state) => ({
          resultsHistory: [resultWithName, ...state.resultsHistory]
        }));
      },
      
      completeScenario: (scenarioId, result) => {
        set((state) => {
          const newUser = { ...state.user };
          
          // Update metrics based on result
          newUser.awareness = Math.max(0, Math.min(100, 
            newUser.awareness + result.metricsChange.awareness
          ));
          newUser.empathy = Math.max(0, Math.min(100, 
            newUser.empathy + result.metricsChange.empathy
          ));
          newUser.patience = Math.max(0, Math.min(100, 
            newUser.patience + result.metricsChange.patience
          ));
          newUser.riskPerception = Math.max(0, Math.min(100, 
            newUser.riskPerception + result.metricsChange.riskPerception
          ));
          
          // Calculate new DMS
          newUser.dmsScore = Math.round(
            (newUser.awareness + newUser.empathy + newUser.patience + newUser.riskPerception) / 4
          );
          
          // Mark scenario as completed
          if (!newUser.scenariosCompleted.includes(scenarioId)) {
            newUser.scenariosCompleted.push(scenarioId);
          }
          
          newUser.totalSimulations++;
          
          return { user: newUser };
        });
        
        get().addResult(result);
      },
      
      resetUser: () => set({ user: initialUser, resultsHistory: [] }),
    }),
    {
      name: 'drivemind-storage',
    }
  )
);
