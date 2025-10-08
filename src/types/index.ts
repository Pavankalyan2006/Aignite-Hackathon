export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  location: string;
  familyHistory: string;
  healthStatus: string;
  wellnessGoals: string;
  createdAt: Date;
}

export interface HealthMetrics {
  bloodSugar: number;
  bloodPressure: { systolic: number; diastolic: number };
  weight: number;
  heartRate: number;
  date: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
}

export interface ActivityData {
  steps: number;
  calories: number;
  heartRate: number;
  activeMinutes: number;
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  aqi: number;
}