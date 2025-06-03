import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatSequence, generateOptimalSequence } from "@/utils/layoutUtils";
import { ArrowRight, Wand2 } from "lucide-react";

interface SequenceInputProps {
  departmentCount: number;
  sequence: number[];
  relMatrix: string[][];
  departmentAreas: number[];
  onChange: (sequence: number[]) => void;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  departmentCount,
  sequence,
  relMatrix,
  departmentAreas,
  onChange,
}) => {
  const [sequenceInput, setSequenceInput] = useState("");
  const [error, setError] = useState("");

  // Update input when sequence prop changes
  useEffect(() => {
    // Convert 0-based to 1-based for display
    const displaySequence = sequence.map(num => num + 1).join(", ");
    setSequenceInput(displaySequence);
  }, [sequence]);

  const handleInputChange = (value: string) => {
    setSequenceInput(value);
    setError("");
  };

  const handleSubmit = () => {
    const parsed = formatSequence(sequenceInput, departmentCount);
    if (parsed) {
      onChange(parsed);
      setError("");
    } else {
      setError(`Invalid sequence. Please enter numbers from 1 to ${departmentCount}, separated by commas.`);
    }
  };

  const handleGenerateOptimalSequence = () => {
    // Generate optimal sequence based on REL matrix and department areas
    const optimalSequence = generateOptimalSequence(relMatrix, departmentAreas);
    onChange(optimalSequence);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Label className="block text-base font-semibold text-gray-800">Sequence Visualization:</Label>
        <Button
          onClick={handleGenerateOptimalSequence}
          className="flex items-center gap-1 px-4"
          title="Generate optimal sequence based on relationships and areas"
        >
          <Wand2 className="h-4 w-4" />
          <span className="hidden sm:inline">Sequence Generate</span>
        </Button>
      </div>
      
      <div className="w-full bg-card rounded-lg p-4">
        <div className="flex flex-nowrap gap-4 items-center">
          {sequence.map((num, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-gray-400">→</span>}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                  idx === sequence.length - 1 ? 'bg-primary text-primary-foreground' : 'bg-blue-500 text-white'
                }`}
              >
                {num + 1}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceInput;
