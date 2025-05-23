import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTcrColorClass } from "@/utils/layoutUtils";
import SequenceInput from "@/components/SequenceInput";

interface ResultsDisplayProps {
  departments: string[];
  relMatrix: string[][];
  tcrMatrix: number[][];
  sequence: number[];
  scores: number[];
  layoutScore: number;
  departmentAreas: number[];
  onSequenceChange: (sequence: number[]) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  departments,
  relMatrix,
  tcrMatrix,
  sequence,
  scores,
  layoutScore,
  departmentAreas,
  onSequenceChange,
}) => {
  // Calculate the maximum possible score for reference
  const maxPossibleScore = useMemo(() => {
    let total = 0;
    const n = departments.length;
    
    // Count the number of adjacencies in the sequence (n-1)
    const adjacencies = n - 1;
    
    // Get all TCR values sorted by highest first
    const allTcrValues = tcrMatrix.flatMap((row, i) => 
      row.flatMap((val, j) => i !== j ? val : [])
    ).sort((a, b) => b - a);
    
    // Sum the highest n-1 values
    for (let i = 0; i < Math.min(adjacencies, allTcrValues.length); i++) {
      if (allTcrValues[i] > 0) { // Only count positive values
        total += allTcrValues[i];
      }
    }
    
    return total;
  }, [departments.length, tcrMatrix]);
  
  // Calculate a normalized score as a percentage of the maximum possible
  const normalizedScore = maxPossibleScore > 0 
    ? Math.round((layoutScore / maxPossibleScore) * 100) 
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Department Sequence</CardTitle>
          <CardDescription>
            Arrange the layout sequence of your departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SequenceInput 
            departmentCount={departments.length} 
            sequence={sequence} 
            relMatrix={relMatrix}
            departmentAreas={departmentAreas}
            onChange={onSequenceChange} 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Scores</CardTitle>
          <CardDescription>
            TCR scores per department based on adjacencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sequence.map((deptIndex, seqPos) => (
              <div 
                key={seqPos} 
                className="flex items-center p-2 rounded-md bg-secondary"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                  {seqPos + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{departments[deptIndex]}</div>
                  <div className="text-sm text-muted-foreground">
                    Department {deptIndex + 1}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{scores[deptIndex]}</div>
                  <div className="text-sm text-muted-foreground">
                    TCR Score
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Grid Table */}
      <div className="md:col-span-2">
        <div className="mt-6">
          <h3 className="font-bold text-xl mb-2">Department Grid Assignment</h3>
          {departments.length > 0 && (
            (() => {
              const totalArea = departmentAreas.reduce((sum, area) => sum + area, 0);
              const avgArea = departments.length > 0 ? Math.round(totalArea / departments.length) : 0;
              return (
                <>
                  <div className="mb-4 text-base font-semibold">Average Area: {avgArea}</div>
                  <table className="min-w-full border border-gray-400 rounded-md">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 border border-gray-400 font-bold">Department</th>
                        <th className="px-4 py-2 border border-gray-400 font-bold">Grid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sequence.map((deptIndex, seqPos) => {
                        const area = Math.round(departmentAreas[deptIndex]);
                        const grid = area < avgArea ? 1 : 2;
                        return (
                          <tr key={seqPos} className="text-center">
                            <td className="px-4 py-2 border border-gray-400">{departments[deptIndex]} ({area})</td>
                            <td className="px-4 py-2 border border-gray-400 font-bold">{grid}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
