
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REL_VALUES } from "@/utils/layoutUtils";

interface RelationshipMatrixProps {
  departments: string[];
  matrix: string[][];
  onChange: (matrix: string[][]) => void;
}

const RelationshipMatrix: React.FC<RelationshipMatrixProps> = ({
  departments,
  matrix,
  onChange,
}) => {
  // Define relationship values in order
  const relationshipValues = ["A", "E", "I", "O", "U", "X"];
  
  // State to track the TCR (numeric counts) matrix
  const [tcrMatrix, setTcrMatrix] = useState<number[][]>([]);

  // Initialize if matrix doesn't match departments length
  useEffect(() => {
    // Only initialize if we have departments and the matrix size doesn't match
    if (departments.length > 0 && (matrix.length !== departments.length || !matrix.every(row => row.length === departments.length))) {
      try {
        // Create a new properly sized matrix
        const newMatrix = Array(departments.length)
          .fill(null)
          .map(() => Array(departments.length).fill(""));
        
        // Copy over existing values if possible
        const minSize = Math.min(matrix.length, departments.length);
        for (let i = 0; i < minSize; i++) {
          for (let j = 0; j < minSize; j++) {
            if (matrix[i] && matrix[i][j] !== undefined) {
              newMatrix[i][j] = matrix[i][j];
            }
          }
        }
        
        onChange(newMatrix);
      } catch (error) {
        console.error("Error initializing relationship matrix:", error);
        // Provide a safe fallback
        const fallbackMatrix = Array(departments.length)
          .fill(null)
          .map(() => Array(departments.length).fill(""));
        onChange(fallbackMatrix);
      }
    }
  }, [departments.length, matrix, onChange]);

  // Update TCR matrix when relationship matrix changes
  useEffect(() => {
    // Initialize TCR matrix
    const newTcrMatrix = departments.map(() => 
      relationshipValues.map(() => 0) // Initialize count for each relationship type
    );

    // Count occurrences of each relationship type for each department
    if (matrix.length > 0) {
      matrix.forEach((row, rowIndex) => {
        row.forEach((cell) => {
          if (cell && relationshipValues.includes(cell)) {
            const relIndex = relationshipValues.indexOf(cell);
            newTcrMatrix[rowIndex][relIndex]++;
          }
        });
      });
    }

    setTcrMatrix(newTcrMatrix);
  }, [matrix, departments, relationshipValues]);

  // Handle cell change in relationship matrix
  const handleCellChange = (row: number, col: number, value: string) => {
    if (row === col) return; // Skip diagonal cells
    
    const newMatrix = [...matrix.map(row => [...row])];
    newMatrix[row][col] = value;
    newMatrix[col][row] = value; // Mirror the change (symmetric matrix)
    onChange(newMatrix);
  };

  // Clear a cell (handle removal of value)
  const handleClearCell = (row: number, col: number) => {
    if (row === col) return; // Skip diagonal cells
    
    const newMatrix = [...matrix.map(row => [...row])];
    newMatrix[row][col] = "";
    newMatrix[col][row] = ""; // Mirror the change (symmetric matrix)
    onChange(newMatrix);
  };



  // Calculate TCR (Total Closeness Rating) for each row
  const calculateRowTcr = (row: number[]): number => {
    return row.reduce((sum, value, index) => {
      // Multiply count by the REL value
      const relValue = REL_VALUES[relationshipValues[index]] || 0;
      return sum + (value * relValue);
    }, 0);
  };
  
  const getRelValueClass = (value: string) => {
    if (!value) return "";
    return `rel-value-${value}`;
  };

  return (
    <div className="overflow-x-auto space-y-8">
      {/* Original Relationship Matrix */}
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <h3 className="font-medium mb-4">Relationship (REL) Matrix</h3>
        <div className="mb-3">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(REL_VALUES).map(([key, value]) => (
              <div key={key} className={`inline-flex items-center px-2 py-1 rounded-md rel-value-${key}`}>
                <span className="font-medium">{key}</span>
                <span className="text-xs ml-1">({value})</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            A: Absolutely necessary, E: Especially important, I: Important, 
            O: Ordinary closeness, U: Unimportant, X: Undesirable
          </div>
        </div>
        
        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="layout-matrix-header"></th>
                {departments.map((dept, idx) => (
                  <th key={idx} className="layout-matrix-header">
                    {idx + 1}. {dept}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, row) => (
                <tr key={row}>
                  <th className="layout-matrix-header text-left pl-2">
                    {row + 1}. {dept}
                  </th>
                  {departments.map((_, col) => (
                    <td key={col} className={`layout-matrix-cell ${getRelValueClass(matrix[row]?.[col] || "")}`}>
                      {row === col ? (
                        "-"
                      ) : (
                        <Select
                          value={matrix[row]?.[col] || "none"}
                          onValueChange={(value) => {
                            if (value === "none") {
                              handleClearCell(row, col);
                            } else {
                              handleCellChange(row, col, value);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full h-8 border-0 bg-transparent">
                            <SelectValue placeholder="-" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">-</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="E">E</SelectItem>
                            <SelectItem value="I">I</SelectItem>
                            <SelectItem value="O">O</SelectItem>
                            <SelectItem value="U">U</SelectItem>
                            <SelectItem value="X">X</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* TCR Matrix */}
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <h3 className="font-medium mb-4">TCR Matrix</h3>
        <p className="text-sm text-muted-foreground mb-4">
          The table below shows the count of each relationship type per department and the calculated TCR score.
        </p>
        
        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2"></th>
                {relationshipValues.map((rel) => (
                  <th key={rel} className="border p-2 text-center">
                    {rel}
                  </th>
                ))}
                <th className="border p-2 text-center">TCR</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, deptIndex) => (
                <tr key={deptIndex}>
                  <th className="border p-2 text-left">
                    {deptIndex + 1}. {dept}
                  </th>
                  {relationshipValues.map((rel, relIndex) => (
                    <td key={relIndex} className="border p-2 text-center">
                      {tcrMatrix[deptIndex]?.[relIndex] || 0}
                    </td>
                  ))}
                  <td className="border p-2 text-center font-medium">
                    {tcrMatrix[deptIndex] ? calculateRowTcr(tcrMatrix[deptIndex]) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RelationshipMatrix;
