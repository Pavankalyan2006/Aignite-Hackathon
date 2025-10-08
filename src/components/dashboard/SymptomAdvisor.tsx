import React, { useState } from 'react';
import { MessageCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useHealth } from '../../context/HealthContext';

export const SymptomAdvisor: React.FC = () => {
  const { logSymptom } = useHealth();
  const [symptom, setSymptom] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const getAdvice = (symptom: string) => {
    const lowerSymptom = symptom.toLowerCase();
    
    if (lowerSymptom.includes('stomach') || lowerSymptom.includes('nausea') || lowerSymptom.includes('vomit')) {
      return "For stomach discomfort: Rest, sip clear fluids, try ginger tea, and eat bland foods like toast or crackers. Avoid dairy and spicy foods.";
    } else if (lowerSymptom.includes('fever') || lowerSymptom.includes('cold') || lowerSymptom.includes('flu')) {
      return "For fever/cold: Stay hydrated, rest plenty, use a humidifier, and consider warm salt water gargles. Monitor temperature regularly.";
    } else if (lowerSymptom.includes('headache') || lowerSymptom.includes('head')) {
      return "For headaches: Rest in a dark, quiet room, apply a cold compress, stay hydrated, and consider gentle neck stretches.";
    } else if (lowerSymptom.includes('cough')) {
      return "For cough: Stay hydrated, use honey with warm water, avoid irritants, and consider steam inhalation with mint.";
    } else {
      return "General advice: Rest, stay hydrated, monitor symptoms, and consult a healthcare provider if symptoms persist or worsen.";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptom.trim()) return;

    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const generatedAdvice = getAdvice(symptom);
      setAdvice(generatedAdvice);
      logSymptom(symptom);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card title="Acute Symptom Advisor" subtitle="Immediate guidance for sudden symptoms">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your symptom
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={3}
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="e.g., I have stomach pain, feeling feverish, headache..."
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading || !symptom.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              AI Analyzing...
            </>
          ) : (
            <>
              <MessageCircle size={16} className="mr-2" />
              Get Immediate Advice
            </>
          )}
        </Button>
      </form>

      {advice && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start space-x-2">
              <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Recommended Care</h4>
                <p className="text-sm text-blue-700">{advice}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Plan Override Active</h4>
                <p className="text-sm text-yellow-700">Your daily meal and activity plans have been adjusted for recovery focus.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              ⚠️ This is not medical advice. Consult a healthcare provider if symptoms persist or worsen.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};