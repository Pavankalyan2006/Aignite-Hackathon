import React from 'react';
import { Coffee, Sun, Moon, Apple } from 'lucide-react';
import { Card } from '../ui/Card';
import { useHealth } from '../../context/HealthContext';

export const MealPlan: React.FC = () => {
  const { mealPlan, activityData } = useHealth();

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast': return <Coffee className="text-amber-600" size={20} />;
      case 'lunch': return <Sun className="text-yellow-600" size={20} />;
      case 'dinner': return <Moon className="text-indigo-600" size={20} />;
      default: return <Apple className="text-green-600" size={20} />;
    }
  };

  const getAdjustmentBadge = () => {
    if (activityData.steps < 2000) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
          Adjusted for low activity
        </span>
      );
    } else if (activityData.steps > 8000) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Enhanced for high activity
        </span>
      );
    }
    return null;
  };

  return (
    <Card title="Today's Meal Plan" subtitle="AI-optimized based on your activity">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="font-medium text-gray-800">Personalized Recommendations</h4>
        {getAdjustmentBadge()}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
          {getMealIcon('breakfast')}
          <div className="flex-1">
            <h5 className="font-medium text-gray-800 mb-1">Breakfast</h5>
            <p className="text-sm text-gray-600">{mealPlan.breakfast}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
          {getMealIcon('lunch')}
          <div className="flex-1">
            <h5 className="font-medium text-gray-800 mb-1">Lunch</h5>
            <p className="text-sm text-gray-600">{mealPlan.lunch}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
          {getMealIcon('dinner')}
          <div className="flex-1">
            <h5 className="font-medium text-gray-800 mb-1">Dinner</h5>
            <p className="text-sm text-gray-600">{mealPlan.dinner}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
          {getMealIcon('snacks')}
          <div className="flex-1">
            <h5 className="font-medium text-gray-800 mb-1">Snacks</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {mealPlan.snacks.map((snack, index) => (
                <li key={index}>• {snack}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};