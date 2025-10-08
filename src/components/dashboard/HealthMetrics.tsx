import React, { useState } from 'react';
import { Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useHealth } from '../../context/HealthContext';

export const HealthMetrics: React.FC = () => {
  const { logHealthMetric } = useHealth();
  const [bloodSugar, setBloodSugar] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [lastReading, setLastReading] = useState(145);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(bloodSugar);
    if (value) {
      logHealthMetric('bloodSugar', value);
      setLastReading(value);
      setBloodSugar('');
      setShowForm(false);
    }
  };

  const getBloodSugarStatus = (value: number) => {
    if (value < 70) return { label: 'Low', color: 'text-red-600 bg-red-100' };
    if (value <= 140) return { label: 'Normal', color: 'text-green-600 bg-green-100' };
    if (value <= 180) return { label: 'High', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Very High', color: 'text-red-600 bg-red-100' };
  };

  const status = getBloodSugarStatus(lastReading);

  return (
    <Card title="Health Metrics" subtitle="Track your vital signs and chronic conditions">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="text-blue-600" size={20} />
            <h4 className="font-medium text-gray-800">Fasting Blood Sugar</h4>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">{lastReading} mg/dL</p>
              <p className="text-xs text-gray-500">Last recorded: Today 7:00 AM</p>
            </div>
            <div className="text-right">
              <TrendingUp className={lastReading > 140 ? 'text-red-500' : 'text-green-500'} size={24} />
              <p className="text-xs text-gray-500">Trending</p>
            </div>
          </div>
        </div>

        {lastReading > 180 && (
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-red-800">High Blood Sugar Detected</p>
                <p className="text-xs text-red-700">Your meal plan has been adjusted to conservative options for the next few days.</p>
              </div>
            </div>
          </div>
        )}

        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Log New Reading
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="number"
              label="Blood Sugar (mg/dL)"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              placeholder="Enter reading..."
              required
            />
            <div className="flex space-x-2">
              <Button type="submit" size="sm" className="flex-1">
                Save Reading
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>💡 Tip: Log readings weekly for better health insights</p>
      </div>
    </Card>
  );
};