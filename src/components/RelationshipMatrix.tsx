
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  // Initialize if matrix doesn't match departments length
  useEffect(() => {
    if (matrix.length !== departments.length) {
      const newMatrix = Array(departments.length)
        .fill(null)
        .map(() => Array(departments.length).fill(""));
      onChange(newMatrix);
    }
  }, [departments.length, matrix.length]);

  // Handle cell change
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

  const getRelValueClass = (value: string) => {
    if (!value) return "";
    return `rel-value-${value}`;
  };

  return (
    <div className="overflow-x-auto">
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
                            <SelectItem value="A">A (6)</SelectItem>
                            <SelectItem value="E">E (5)</SelectItem>
                            <SelectItem value="I">I (4)</SelectItem>
                            <SelectItem value="O">O (3)</SelectItem>
                            <SelectItem value="U">U (2)</SelectItem>
                            <SelectItem value="X">X (1)</SelectItem>
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
    </div>
  );
};

export default RelationshipMatrix;
