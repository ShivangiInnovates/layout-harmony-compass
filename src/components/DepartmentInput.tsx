
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { DEFAULT_DEPARTMENTS } from "@/utils/layoutUtils";

interface Department {
  name: string;
  score: number | '';
}

interface DepartmentInputProps {
  departments: Department[];
  onChange: (departments: Department[]) => void;
  onReset: () => void;
}

const DepartmentInput: React.FC<DepartmentInputProps> = ({
  departments,
  onChange,
  onReset,
}) => {
  const [localDepartments, setLocalDepartments] = useState<Department[]>(departments);

  useEffect(() => {
    setLocalDepartments(departments);
  }, [departments]);

  const handleDepartmentNameChange = (index: number, value: string) => {
    const updatedDepartments = [...localDepartments];
    updatedDepartments[index] = { ...updatedDepartments[index], name: value };
    setLocalDepartments(updatedDepartments);
  };

  const handleDepartmentScoreChange = (index: number, value: string) => {
    const updatedDepartments = [...localDepartments];
    if (/^\d*(\.\d*)?$/.test(value)) {
      updatedDepartments[index] = { ...updatedDepartments[index], score: value === '' ? '' : Number(value) };
      setLocalDepartments(updatedDepartments);
    }
  };

  const handleAddDepartment = () => {
    setLocalDepartments([
      ...localDepartments,
      { name: `Department ${localDepartments.length + 1}`, score: 0 },
    ]);
  };

  const handleRemoveDepartment = (index: number) => {
    if (localDepartments.length <= 2) {
      return; // Don't allow fewer than 2 departments
    }
    const updatedDepartments = localDepartments.filter((_, i) => i !== index);
    setLocalDepartments(updatedDepartments);
  };

  const handleSaveDepartments = () => {
    const sanitized = localDepartments.map(d => ({
      name: d.name,
      score: d.score === '' ? 0 : Number(d.score),
    }));
    onChange(sanitized);
  };

  const handleUseDefaults = () => {
    setLocalDepartments(DEFAULT_DEPARTMENTS.map(name => ({ name, score: 0 })));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Departments</CardTitle>
        <CardDescription>
          Define the departments for your layout analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 items-center font-semibold text-sm">
          <Label className="w-8 text-right"></Label>
          <span className="w-32">Department Name</span>
          <span className="w-24">Area</span>
          <span className="w-10"></span>
        </div>
        {localDepartments.map((dept, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Label className="w-8 text-right">{index + 1}.</Label>
            <Input
              value={dept.name}
              onChange={(e) => handleDepartmentNameChange(index, e.target.value)}
              placeholder={`Department ${index + 1}`}
              className="w-32"
              maxLength={32}
            />
            <Input
              value={dept.score === '' ? '' : String(dept.score)}
              onChange={(e) => handleDepartmentScoreChange(index, e.target.value)}
              placeholder="0"
              className="w-24"
              inputMode="decimal"
              pattern="^\\d*(\\.\\d*)?$"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveDepartment(index)}
              disabled={localDepartments.length <= 2}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Delete Department"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleAddDepartment}
            disabled={localDepartments.length >= 12}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Department
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUseDefaults}
          >
            Use Default List
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Reset All
        </Button>
        <Button onClick={handleSaveDepartments}>
          <Save className="h-4 w-4 mr-2" /> Save Departments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartmentInput;
