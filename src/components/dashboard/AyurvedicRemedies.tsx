import React, { useState } from 'react';
import { Leaf, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const AyurvedicRemedies: React.FC = () => {
  const [query, setQuery] = useState('');
  const [remedy, setRemedy] = useState('');
  const [loading, setLoading] = useState(false);

  const getAyurvedicRemedy = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cough') || lowerQuery.includes('throat')) {
      return "Mix 1 tsp honey with a pinch of turmeric and consume slowly. Alternatively, gargle with warm salt water infused with turmeric.";
    } else if (lowerQuery.includes('cold') || lowerQuery.includes('congestion')) {
      return "Boil water with fresh ginger, tulsi leaves, and black pepper. Add honey and drink warm. Steam inhalation with eucalyptus oil also helps.";
    } else if (lowerQuery.includes('indigestion') || lowerQuery.includes('acidity')) {
      return "Chew a small piece of fresh ginger with rock salt before meals, or drink warm water with lemon and a pinch of cumin powder.";
    } else if (lowerQuery.includes('headache')) {
      return "Apply a paste of sandalwood powder and rose water on the forehead. Alternatively, inhale the aroma of fresh mint leaves.";
    } else if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety')) {
      return "Practice pranayama (deep breathing) and drink warm milk with a pinch of nutmeg before bed. Ashwagandha tea can also help.";
    } else {
      return "For general wellness, start your day with warm water and lemon, practice regular yoga, and maintain a balanced diet according to your constitution.";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      const generatedRemedy = getAyurvedicRemedy(query);
      setRemedy(generatedRemedy);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card title="Ayurvedic Home Remedies" subtitle="Traditional wisdom for natural healing">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ask for a natural remedy
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., remedy for dry cough, headache relief..."
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading || !query.trim()}
          variant="secondary"
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Finding Remedy...
            </>
          ) : (
            <>
              <Search size={16} className="mr-2" />
              Get Natural Remedy
            </>
          )}
        </Button>
      </form>

      {remedy && (
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <div className="flex items-start space-x-2">
            <Leaf className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <h4 className="font-medium text-green-800 mb-2">Natural Remedy</h4>
              <p className="text-sm text-green-700 mb-3">{remedy}</p>
              <p className="text-xs text-green-600">
                🌿 This is a traditional remedy and not a medical prescription. Consult an Ayurvedic practitioner for personalized advice.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <button
          onClick={() => {
            setQuery('remedy for dry cough');
            setRemedy('');
          }}
          className="p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-600">💊 Dry Cough</span>
        </button>
        <button
          onClick={() => {
            setQuery('natural stress relief');
            setRemedy('');
          }}
          className="p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-600">🧘 Stress Relief</span>
        </button>
        <button
          onClick={() => {
            setQuery('remedy for indigestion');
            setRemedy('');
          }}
          className="p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-600">🍃 Indigestion</span>
        </button>
        <button
          onClick={() => {
            setQuery('headache relief');
            setRemedy('');
          }}
          className="p-2 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-gray-600">🌸 Headache</span>
        </button>
      </div>
    </Card>
  );
};