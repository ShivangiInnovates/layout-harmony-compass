
import { useState, useEffect } from "react";
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
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <Label htmlFor="sequence" className="block mb-3 text-base font-semibold text-gray-800">
          Department Sequence (1-based):
        </Label>
        <div className="flex gap-2">
          <Input
            id="sequence"
            value={sequenceInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={() => handleSubmit()}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="e.g., 1, 3, 2, 5, 4, 7, 6, 8"
            className={`text-base ${error ? "border-destructive" : ""}`}
          />
          <Button
            onClick={handleGenerateOptimalSequence}
            className="flex items-center gap-1 px-4"
            title="Generate optimal sequence based on relationships and areas"
          >
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">Generate</span>
          </Button>
        </div>
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      </div>

      <div className="flex-grow">
        <div className="mb-3">
          <Label className="block text-base font-semibold text-gray-800">Sequence Visualization:</Label>
        </div>
        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 min-h-[120px] items-center justify-center">
          {sequence.map((deptIndex, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <ArrowRight className="h-5 w-5 mx-2 text-gray-500" />}
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
                {deptIndex + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm font-medium text-blue-800 mb-2">Sequence Information:</div>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
            <div>Total Departments: <span className="font-semibold">{sequence.length}</span></div>
            <div>Current Order: <span className="font-semibold">{sequence.map(i => i + 1).join(', ')}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequenceInput;
