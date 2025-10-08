import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityData, MealPlan, WeatherData, Medication } from '../types';
import { useAuth } from './AuthContext';

interface HealthContextType {
  activityData: ActivityData;
  mealPlan: MealPlan;
  weatherData: WeatherData;
  medications: Medication[];
  isYogaActive: boolean;
  updateActivityData: (data: Partial<ActivityData>) => void;
  updateMealPlan: (plan: Partial<MealPlan>) => void;
  toggleYogaSession: () => void;
  markMedicationTaken: (id: string) => void;
  logSymptom: (symptom: string) => void;
  logHealthMetric: (metric: string, value: number) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile } = useAuth();
  
  const [activityData, setActivityData] = useState<ActivityData>({
    steps: 3247,
    calories: 156,
    heartRate: 72,
    activeMinutes: 24,
  });

  const [mealPlan, setMealPlan] = useState<MealPlan>({
    breakfast: "Oatmeal with berries and nuts",
    lunch: "Grilled chicken salad with quinoa",
    dinner: "Baked salmon with steamed vegetables",
    snacks: ["Apple with almonds", "Greek yogurt"],
  });

  const [weatherData] = useState<WeatherData>({
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    aqi: 85,
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00',
      taken: false,
    },
    {
      id: '2',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '09:00',
      taken: false,
    },
  ]);

  const [isYogaActive, setIsYogaActive] = useState(false);

  // AI-driven meal plan adjustments based on activity
  useEffect(() => {
    if (activityData.steps < 2000) {
      setMealPlan(prev => ({
        ...prev,
        dinner: "Light vegetable soup with whole grain bread",
        snacks: ["Green tea", "Small portion of mixed nuts"],
      }));
    } else if (activityData.steps > 8000) {
      setMealPlan(prev => ({
        ...prev,
        dinner: "Protein-rich grilled chicken with quinoa and sweet potato",
        snacks: ["Protein smoothie", "Energy bars"],
      }));
    }
  }, [activityData.steps]);

  const updateActivityData = (data: Partial<ActivityData>) => {
    setActivityData(prev => ({ ...prev, ...data }));
  };

  const updateMealPlan = (plan: Partial<MealPlan>) => {
    setMealPlan(prev => ({ ...prev, ...plan }));
  };

  const toggleYogaSession = () => {
    setIsYogaActive(prev => {
      if (!prev) {
        // Starting yoga session
        return true;
      } else {
        // Completing yoga session - adjust meal plan for recovery
        setMealPlan(prevPlan => ({
          ...prevPlan,
          dinner: "Post-workout recovery bowl with quinoa, grilled chicken, and avocado",
          snacks: [...prevPlan.snacks, "Protein smoothie for recovery"],
        }));
        return false;
      }
    });
  };

  const markMedicationTaken = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id
          ? { ...med, taken: true }
          : med
      )
    );

    // AI adjustment: Light walk after Metformin
    const medication = medications.find(med => med.id === id);
    if (medication?.name === 'Metformin') {
      // Suggest light activity adjustment
      updateActivityData({ activeMinutes: activityData.activeMinutes + 15 });
    }
  };

  const logSymptom = (symptom: string) => {
    // AI override for acute symptoms
    if (symptom.toLowerCase().includes('stomach') || symptom.toLowerCase().includes('nausea')) {
      setMealPlan({
        breakfast: "Light toast with ginger tea",
        lunch: "Clear vegetable broth with crackers",
        dinner: "BRAT diet: Banana, Rice, Apple sauce, Toast",
        snacks: ["Ginger tea", "Electrolyte solution"],
      });
    } else if (symptom.toLowerCase().includes('fever') || symptom.toLowerCase().includes('cold')) {
      setMealPlan({
        breakfast: "Warm lemon water with honey",
        lunch: "Chicken soup with vegetables",
        dinner: "Light khichdi with turmeric",
        snacks: ["Herbal tea", "Warm milk with turmeric"],
      });
    }
  };

  const logHealthMetric = (metric: string, value: number) => {
    if (metric === 'bloodSugar' && value > 180) {
      // High blood sugar detected - conservative plan override
      setMealPlan({
        breakfast: "Steel-cut oats with cinnamon (no sugar)",
        lunch: "Grilled fish with leafy greens",
        dinner: "Cauliflower rice with lean protein",
        snacks: ["Nuts (portion controlled)", "Cucumber slices"],
      });
    }
  };

  const value = {
    activityData,
    mealPlan,
    weatherData,
    medications,
    isYogaActive,
    updateActivityData,
    updateMealPlan,
    toggleYogaSession,
    markMedicationTaken,
    logSymptom,
    logHealthMetric,
  };

  return (
    <HealthContext.Provider value={value}>
      {children}
    </HealthContext.Provider>
  );
};