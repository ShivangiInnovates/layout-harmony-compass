// src/components/OptimizationResults.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import { optimizationAPI } from '../services/api';

interface OptimizationResultsProps {
  departments: Record<string, number>;
  relationships: [string, string, string][];
  sequence: string[];
}

export function OptimizationResults({
  departments,
  relationships,
  sequence,
}: OptimizationResultsProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);

    try {
      const optimizationResult = await optimizationAPI.optimize({
        departments,
        relationships,
        sequence,
        popSize: 50,
        generations: 100,
        mutationRate: 0.2,
        elitism: 2,
      });
      setResult(optimizationResult);
    } catch (err) {
      setError('Failed to optimize layout: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Button 
            onClick={handleOptimize} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Run Optimization Algorithm'
            )}
          </Button>
          
          {error && (
            <div className="bg-red-50 p-4 rounded text-red-500">
              {error}
            </div>
          )}
          
          {result && (
            <div className="space-y-6">
              <div className="text-lg font-medium">
                Optimization Score: {result.bestScore.toFixed(2)}
              </div>
              
              {result.plotImage && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Optimized Layout:</h3>
                  <img 
                    src={`data:image/png;base64,${result.plotImage}`} 
                    alt="Optimized Layout"
                    className="w-full border rounded-md"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
