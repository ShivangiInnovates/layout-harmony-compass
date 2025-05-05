
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatSequence } from "@/utils/layoutUtils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shuffle } from "lucide-react";

interface SequenceInputProps {
  departmentCount: number;
  sequence: number[];
  onChange: (sequence: number[]) => void;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  departmentCount,
  sequence,
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

  const generateRandomSequence = () => {
    // Create array of department indices
    const indices = Array.from({ length: departmentCount }, (_, i) => i);
    
    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    onChange(indices);
    // Update the input field
    setSequenceInput(indices.map(i => i + 1).join(", "));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Sequence</CardTitle>
        <CardDescription>
          Enter the layout sequence for your departments (comma-separated numbers)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sequence" className="block mb-2">
            Department Sequence (1-based):
          </Label>
          <Input
            id="sequence"
            value={sequenceInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="e.g., 1, 3, 2, 5, 4, 7, 6, 8"
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>
        
        <div>
          <Label className="block mb-2">Sequence Visualization:</Label>
          <div className="flex flex-wrap gap-2">
            {sequence.map((deptIndex, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <ArrowRight className="h-4 w-4 mx-1 text-muted-foreground" />}
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {deptIndex + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={generateRandomSequence}>
          <Shuffle className="h-4 w-4 mr-2" /> Random
        </Button>
        <Button onClick={handleSubmit}>
          Apply Sequence
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SequenceInput;
