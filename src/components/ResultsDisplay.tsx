
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTcrColorClass } from "@/utils/layoutUtils";

interface ResultsDisplayProps {
  departments: string[];
  relMatrix: string[][];
  tcrMatrix: number[][];
  sequence: number[];
  scores: number[];
  layoutScore: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  departments,
  relMatrix,
  tcrMatrix,
  sequence,
  scores,
  layoutScore,
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
          <CardTitle>TCR Matrix</CardTitle>
          <CardDescription>
            Numeric representation of department relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="layout-matrix-header"></th>
                  {departments.map((dept, idx) => (
                    <th key={idx} className="layout-matrix-header text-center w-12">
                      {idx + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, row) => (
                  <tr key={row}>
                    <th className="layout-matrix-header text-center">
                      {row + 1}
                    </th>
                    {departments.map((_, col) => (
                      <td 
                        key={col} 
                        className={`layout-matrix-cell ${getTcrColorClass(tcrMatrix[row][col])}`}
                      >
                        {row === col ? "-" : tcrMatrix[row][col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-semibold mb-2">Layout Evaluation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-md bg-muted">
                  <div className="text-sm text-muted-foreground">
                    Total Layout Score
                  </div>
                  <div className="text-2xl font-bold">{layoutScore}</div>
                </div>
                <div className="p-3 rounded-md bg-muted">
                  <div className="text-sm text-muted-foreground">
                    Quality Rating
                  </div>
                  <div className="text-2xl font-bold">{normalizedScore}%</div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Maximum possible score for this configuration: {maxPossibleScore}</p>
                <p className="mt-1">
                  The quality rating represents how close this layout is to the theoretical optimal arrangement.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
