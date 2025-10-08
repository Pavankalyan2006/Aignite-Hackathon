import React from 'react';
import { Pill, Check, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useHealth } from '../../context/HealthContext';

export const MedicationTracker: React.FC = () => {
  const { medications, markMedicationTaken } = useHealth();

  const getPendingCount = () => {
    return medications.filter(med => !med.taken).length;
  };

  return (
    <Card title="Medication Schedule" subtitle={`${getPendingCount()} pending for today`}>
      <div className="space-y-4">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              medication.taken
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  medication.taken ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {medication.taken ? (
                    <Check className="text-green-600" size={20} />
                  ) : (
                    <Pill className="text-blue-600" size={20} />
                  )}
                </div>
                
                <div>
                  <h4 className={`font-medium ${
                    medication.taken ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {medication.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {medication.dosage} • {medication.frequency}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{medication.time}</span>
                  </div>
                </div>
              </div>
              
              {!medication.taken && (
                <Button
                  size="sm"
                  onClick={() => markMedicationTaken(medication.id)}
                  className="ml-4"
                >
                  Mark Taken
                </Button>
              )}
              
              {medication.taken && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Check size={16} />
                  <span className="text-sm font-medium">Taken</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {medications.some(med => med.name === 'Metformin' && med.taken) && (
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start space-x-2">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-sm text-blue-700">
              Great! A light 15-minute walk is recommended after taking Metformin for better absorption.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          💡 Consistent medication timing improves effectiveness
        </p>
      </div>
    </Card>
  );
};