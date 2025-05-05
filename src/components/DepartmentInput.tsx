
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

interface DepartmentInputProps {
  departments: string[];
  onChange: (departments: string[]) => void;
  onReset: () => void;
}

const DepartmentInput: React.FC<DepartmentInputProps> = ({
  departments,
  onChange,
  onReset,
}) => {
  const [localDepartments, setLocalDepartments] = useState<string[]>(departments);

  useEffect(() => {
    setLocalDepartments(departments);
  }, [departments]);

  const handleDepartmentChange = (index: number, value: string) => {
    const updatedDepartments = [...localDepartments];
    updatedDepartments[index] = value;
    setLocalDepartments(updatedDepartments);
  };

  const handleAddDepartment = () => {
    setLocalDepartments([...localDepartments, `Department ${localDepartments.length + 1}`]);
  };

  const handleRemoveDepartment = (index: number) => {
    if (localDepartments.length <= 2) {
      return; // Don't allow fewer than 2 departments
    }
    const updatedDepartments = localDepartments.filter((_, i) => i !== index);
    setLocalDepartments(updatedDepartments);
  };

  const handleSaveDepartments = () => {
    onChange(localDepartments);
  };

  const handleUseDefaults = () => {
    setLocalDepartments(DEFAULT_DEPARTMENTS.slice());
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
        {localDepartments.map((dept, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Label className="w-8 text-right">{index + 1}.</Label>
            <Input
              value={dept}
              onChange={(e) => handleDepartmentChange(index, e.target.value)}
              placeholder={`Department ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveDepartment(index)}
              disabled={localDepartments.length <= 2}
              className="text-muted-foreground hover:text-destructive"
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
