import React from 'react';
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card } from '../ui/Card';
import { useHealth } from '../../context/HealthContext';

export const EnvironmentalAdvisor: React.FC = () => {
  const { weatherData } = useHealth();

  const getClothingAdvice = () => {
    if (weatherData.temperature > 30) {
      return "Light cotton clothes, hat, and sunscreen recommended";
    } else if (weatherData.temperature < 20) {
      return "Layer up with a light jacket and long sleeves";
    } else {
      return "Comfortable casual wear, perfect weather for outdoor activities";
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600 bg-green-100';
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-100';
    if (aqi <= 150) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card title="Environmental Advisor" subtitle="Hyderabad, Telangana • Saturday, Sep 20, 2025">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-orange-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Temperature</p>
            <p className="font-semibold">{weatherData.temperature}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="text-blue-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Condition</p>
            <p className="font-semibold text-sm">{weatherData.condition}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-cyan-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="font-semibold">{weatherData.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="text-gray-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Air Quality</p>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAQIColor(weatherData.aqi)}`}>
              {weatherData.aqi} AQI
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
        <h4 className="font-medium text-gray-800 mb-2">Today's Clothing Advice</h4>
        <p className="text-gray-700 text-sm">{getClothingAdvice()}</p>
      </div>
    </Card>
  );
};