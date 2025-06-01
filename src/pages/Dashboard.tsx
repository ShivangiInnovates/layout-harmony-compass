
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Save } from "lucide-react";
import DepartmentInput from "@/components/DepartmentInput";
import { OptimizationButton } from "@/components/OptimizationButton";

interface Department {
  name: string;
  score: number | '';
}

import RelationshipMatrix from "@/components/RelationshipMatrix";
import SequenceInput from "@/components/SequenceInput";
import ResultsDisplay from "@/components/ResultsDisplay";
import VisualizationDisplay from "@/components/VisualizationDisplay";
import {
  convertRelToTcr,
  calculateTcrScores,
  calculateRelationshipTcrScores,
  calculateLayoutScore,
  initializeRelMatrix,
  generateSampleData,
  DEFAULT_DEPARTMENTS
} from "@/utils/layoutUtils";

// Mock database for saved layouts
let MOCK_USER_LAYOUTS: Record<string, any[]> = {
  "1": [], // Admin
  "2": []  // Regular user
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // State for departments and matrix
  const [departments, setDepartments] = useState<Department[]>(DEFAULT_DEPARTMENTS.map(name => ({ name, score: 0 })));
  const [relMatrix, setRelMatrix] = useState<string[][]>([]);
  const [sequence, setSequence] = useState<number[]>([]);
  
  // State for computed results
  const [tcrMatrix, setTcrMatrix] = useState<number[][]>([]);
  const [departmentScores, setDepartmentScores] = useState<number[]>([]);
  const [layoutScore, setLayoutScore] = useState<number>(0);
  
  // State for UI
  const [resultsVisible, setResultsVisible] = useState<boolean>(false);
  const [savedLayouts, setSavedLayouts] = useState<any[]>([]);
  
  // Initialize with sample data
  useEffect(() => {
    const { departments, relMatrix, sequence } = generateSampleData();
    setDepartments(departments.map((name: string) => ({ name, score: 0 })));
    setRelMatrix(initializeRelMatrix(departments.length));
    setSequence(sequence);
    
    // Load saved layouts for the current user
    if (user) {
      setSavedLayouts(MOCK_USER_LAYOUTS[user.id] || []);
    }
  }, [user?.id]);
  
  // Recalculate when departments change
  useEffect(() => {
    if (departments.length > 0) {
      try {
        // If matrix doesn't match department size, initialize it properly
        if (relMatrix.length !== departments.length) {
          // First create a safe copy of the current matrix to preserve existing relationships
          const newMatrix = initializeRelMatrix(departments.length);
          
          // Copy over any existing relationships that still fit in the new matrix
          const minSize = Math.min(relMatrix.length, departments.length);
          for (let i = 0; i < minSize; i++) {
            for (let j = 0; j < minSize; j++) {
              if (relMatrix[i] && relMatrix[i][j]) {
                newMatrix[i][j] = relMatrix[i][j];
              }
            }
          }
          
          setRelMatrix(newMatrix);
        }
        
        // Reset sequence if department count changes
        if (sequence.length !== departments.length) {
          setSequence(Array(departments.length).fill(0).map((_, i) => i));
        }
      } catch (error) {
        console.error("Error updating matrix after department change:", error);
        // Fallback to a fresh matrix if there was an error
        setRelMatrix(initializeRelMatrix(departments.length));
      }
    }
  }, [departments, relMatrix.length, sequence.length]);

  // Calculate results
  const calculateResults = () => {
    // Validate the REL matrix
    const hasInvalidCells = relMatrix.some((row, i) => 
      row.some((cell, j) => i !== j && !cell)
    );
    
    if (hasInvalidCells) {
      toast({
        title: "Incomplete Matrix",
        description: "Please fill in all cells in the REL matrix",
        variant: "destructive",
      });
      return;
    }
    
    // Convert REL values to TCR
    const tcr = convertRelToTcr(relMatrix);
    setTcrMatrix(tcr);
    
    // Calculate scores per department based on relationship counts (same as TCR matrix)
    const scores = calculateRelationshipTcrScores(relMatrix);
    setDepartmentScores(scores);
    
    // Calculate overall layout score
    const total = calculateLayoutScore(tcr, sequence);
    setLayoutScore(total);
    
    setResultsVisible(true);
    
    toast({
      title: "Calculation Complete",
      description: `Layout Score: ${total}`,
    });
  };

  // Reset everything
  const handleReset = () => {
    const { departments, relMatrix, sequence } = generateSampleData();
    setDepartments(departments.map((name: string) => ({ name, score: 0 })));
    setRelMatrix(relMatrix);
    setSequence(sequence);
    setResultsVisible(false);
    
    toast({
      title: "Reset Complete",
      description: "All inputs have been reset to default values",
    });
  };

  // Save current layout
  const saveCurrentLayout = () => {
    if (!user) return;
    
    const newLayout = {
      id: `layout_${Date.now()}`,
      name: `Layout ${savedLayouts.length + 1}`,
      departments: [...departments],
      relMatrix: relMatrix.map(row => [...row]),
      sequence: [...sequence],
      score: layoutScore,
      date: new Date().toISOString(),
    };
    
    // Update local state
    const updatedLayouts = [...savedLayouts, newLayout];
    setSavedLayouts(updatedLayouts);
    
    // Update mock database
    MOCK_USER_LAYOUTS[user.id] = updatedLayouts;
    
    toast({
      title: "Layout Saved",
      description: `Layout saved successfully as "${newLayout.name}"`,
    });
  };

  // Load a saved layout
  const loadLayout = (layout: any) => {
    setDepartments(layout.departments);
    setRelMatrix(layout.relMatrix);
    setSequence(layout.sequence);
    
    // Recalculate results
    const tcr = convertRelToTcr(layout.relMatrix);
    setTcrMatrix(tcr);
    
    const scores = calculateTcrScores(tcr, layout.sequence);
    setDepartmentScores(scores);
    
    const total = calculateLayoutScore(tcr, layout.sequence);
    setLayoutScore(total);
    
    setResultsVisible(true);
    
    toast({
      title: "Layout Loaded",
      description: `Layout "${layout.name}" loaded successfully`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Layout Harmony Compass</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{user?.name || user?.email}</div>
              <div className="text-sm text-muted-foreground">
                {user?.role === "admin" ? "Administrator" : "User"}
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid gap-8">
          {/* Department Configuration */}
          <div>
            <DepartmentInput 
              departments={departments} 
              onChange={setDepartments} 
              onReset={handleReset} 
            />
          </div>
          
          {/* Relationship Matrix */}
          <RelationshipMatrix 
            departments={departments.map(department => department.name)} 
            matrix={relMatrix} 
            onChange={setRelMatrix} 
          />
          
          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              Reset All
            </Button>
            <div className="flex gap-2">
              {resultsVisible && (
                <Button 
                  variant="outline" 
                  onClick={saveCurrentLayout}
                >
                  <Save className="h-4 w-4 mr-2" /> Save Layout
                </Button>
              )}
              <Button onClick={calculateResults}>
                Sequence Calculation
              </Button>
              {resultsVisible && (
                <OptimizationButton
                  departments={departments}
                  relMatrix={relMatrix}
                  sequence={sequence}
                />
              )}
            </div>
          </div>
          
          {/* Results Section */}
          {resultsVisible && (
            <div className="mt-4 space-y-8">
              <h2 className="text-xl font-semibold">Layout Analysis Results</h2>
              
              <ResultsDisplay 
                departments={departments.map(d => d.name)}
                relMatrix={relMatrix}
                tcrMatrix={tcrMatrix}
                sequence={sequence}
                scores={departmentScores}
                layoutScore={layoutScore}
                departmentAreas={departments.map(d => typeof d.score === 'number' ? d.score : 0)}
                onSequenceChange={setSequence}
              />
              
              <VisualizationDisplay 
                departments={departments.map(d => d.name)}
                sequence={sequence}
                tcrMatrix={tcrMatrix}
              />
            </div>
          )}
          
          {/* Saved Layouts */}
          {savedLayouts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Saved Layouts</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {savedLayouts.map(layout => (
                  <div 
                    key={layout.id} 
                    className="bg-card border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => loadLayout(layout)}
                  >
                    <h3 className="font-medium">{layout.name}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(layout.date).toLocaleDateString()}
                    </div>
                    <div className="flex justify-between">
                      <span>Departments: {layout.departments.length}</span>
                      <span className="font-medium">Score: {layout.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
