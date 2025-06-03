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
    <div className="space-y-8">
      {/* Department Sequence Section - Full Width, Horizontal */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Department Sequence</CardTitle>
          <CardDescription className="text-base font-medium text-gray-700">
            Arrange the layout sequence of your departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <SequenceInput
              departmentCount={departments.length}
              sequence={sequence}
              relMatrix={relMatrix}
              departmentAreas={departmentAreas}
              onChange={onSequenceChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Grid Section - Below Sequence */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Department Grid</CardTitle>
          <CardDescription className="text-base font-medium text-gray-700">
            Grid allocation based on department areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {departments.length > 0 && (
            (() => {
              const totalArea = departmentAreas.reduce((sum, area) => sum + area, 0);
              const avgArea = departments.length > 0 ? Math.round(totalArea / departments.length) : 0;
              return (
                <>
                  <div className="mb-4 text-lg font-bold text-gray-800">Average Area: {avgArea}</div>
                  <table className="min-w-full border border-gray-400 rounded-md">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 border border-gray-400 font-bold text-gray-900">Department</th>
                        <th className="px-4 py-3 border border-gray-400 font-bold text-gray-900">Grid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sequence.map((deptIndex, seqPos) => {
                        const area = Math.round(departmentAreas[deptIndex]);
                        const grid = area < avgArea ? 1 : 2;
                        return (
                          <tr key={seqPos} className="text-center">
                            <td className="px-4 py-3 border border-gray-400 font-semibold text-gray-800">{departments[deptIndex]} ({area})</td>
                            <td className="px-4 py-3 border border-gray-400 font-bold text-gray-900">{grid}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              );
            })()
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
