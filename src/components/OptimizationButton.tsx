// src/components/OptimizationButton.tsx
import { useState } from 'react';
import { Button } from './ui/button';
import { PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { OptimizationResults } from './OptimizationResults';
import { convertRelMatrixToRelationships } from '@/utils/layoutUtils';

interface OptimizationButtonProps {
  departments: {name: string; score: number | ''}[];
  relMatrix: string[][];
  sequence: number[];
}

export function OptimizationButton({
  departments,
  relMatrix,
  sequence,
}: OptimizationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Format department data for the optimization API
  const departmentData = departments.reduce((acc, dept) => {
    acc[dept.name] = typeof dept.score === 'number' ? dept.score : 0;
    return acc;
  }, {} as Record<string, number>);
  
  // Format relationship data for the optimization API
  const formattedRelationships = convertRelMatrixToRelationships(departments, relMatrix);
  
  // Format sequence for the optimization API (convert index to name)
  const sequenceNames = sequence.map(idx => departments[idx].name);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusSquare className="h-4 w-4" />
          Optimize Layout with ML
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Layout Optimization with Machine Learning</DialogTitle>
          <DialogDescription>
            Generate an optimized facility layout using a genetic algorithm based on your departments and relationships.
          </DialogDescription>
        </DialogHeader>
        
        <OptimizationResults
          departments={departmentData}
          relationships={formattedRelationships}
          sequence={sequenceNames}
        />
      </DialogContent>
    </Dialog>
  );
}
