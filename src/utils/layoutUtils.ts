
// REL values and their numeric equivalents for TCR calculation
export const REL_VALUES: Record<string, number> = {
  "A": 6,  // Absolutely necessary
  "E": 5,  // Especially important
  "I": 4,  // Important
  "O": 3,  // Ordinary closeness
  "U": 2,  // Unimportant
  "X": 1   // Undesirable
};

// Default department names
export const DEFAULT_DEPARTMENTS = [
  "Receiving",
  "Raw Materials",
  "Manufacturing",
  "Assembly",
  "Packaging",
  "Warehouse",
  "Shipping",
  "Office"
];

// Convert REL matrix to TCR matrix (numeric values)
export function convertRelToTcr(relMatrix: string[][]): number[][] {
  return relMatrix.map(row => 
    row.map(cell => REL_VALUES[cell] || 0)
  );
}

// Calculate TCR score per department based on sequence and TCR matrix
export function calculateTcrScores(tcrMatrix: number[][], sequence: number[]): number[] {
  const n = sequence.length;
  const scores: number[] = Array(n).fill(0);
  
  // For each department in the sequence
  for (let i = 0; i < n; i++) {
    const deptIndex = sequence[i];
    
    // Check adjacency with left department if it exists
    if (i > 0) {
      const leftDept = sequence[i - 1];
      scores[deptIndex] += tcrMatrix[deptIndex][leftDept];
    }
    
    // Check adjacency with right department if it exists
    if (i < n - 1) {
      const rightDept = sequence[i + 1];
      scores[deptIndex] += tcrMatrix[deptIndex][rightDept];
    }
  }
  
  return scores;
}

// Calculate overall layout score
export function calculateLayoutScore(tcrMatrix: number[][], sequence: number[]): number {
  const n = sequence.length;
  let totalScore = 0;
  
  // For each pair of adjacent departments in the sequence
  for (let i = 0; i < n - 1; i++) {
    const currentDept = sequence[i];
    const nextDept = sequence[i + 1];
    totalScore += tcrMatrix[currentDept][nextDept];
  }
  
  return totalScore;
}

// Create an adjacency matrix from the department sequence
export function createAdjacencyMatrix(sequence: number[], n: number): boolean[][] {
  // Initialize nxn matrix with all false
  const adjMatrix: boolean[][] = Array(n).fill(0).map(() => Array(n).fill(false));
  
  // Mark adjacencies based on sequence
  for (let i = 0; i < sequence.length - 1; i++) {
    const dept1 = sequence[i];
    const dept2 = sequence[i + 1];
    
    adjMatrix[dept1][dept2] = true;
    adjMatrix[dept2][dept1] = true; // Symmetrical
  }
  
  return adjMatrix;
}

// Initialize an empty REL matrix
export function initializeRelMatrix(size: number): string[][] {
  return Array(size).fill(0).map(() => 
    Array(size).fill("") // Empty cells will be filled by the user
  );
}

// Helper to generate a color code based on TCR value
export function getTcrColorClass(value: number): string {
  if (value === 6) return "bg-green-500 text-white";
  if (value === 5) return "bg-blue-500 text-white";
  if (value === 4) return "bg-yellow-500";
  if (value === 3) return "bg-orange-500 text-white";
  if (value === 2) return "bg-gray-300";
  if (value === 1) return "bg-red-500 text-white";
  return "bg-gray-100";
}

// Helper to format and validate sequence
export function formatSequence(input: string, maxDept: number): number[] | null {
  // Parse the input string into an array of numbers
  try {
    const sequence = input
      .split(",")
      .map(s => parseInt(s.trim(), 10) - 1); // Convert to 0-based indexing
    
    // Check if all numbers are valid and within range
    const isValid = sequence.every(
      num => !isNaN(num) && num >= 0 && num < maxDept
    );
    
    // Check for duplicates
    const uniqueValues = new Set(sequence);
    if (!isValid || uniqueValues.size !== sequence.length) {
      return null;
    }
    
    return sequence;
  } catch (error) {
    return null;
  }
}

// Generate sample data for new users
export function generateSampleData(departmentCount: number = 8): {
  departments: string[];
  relMatrix: string[][];
  sequence: number[];
} {
  const departments = DEFAULT_DEPARTMENTS.slice(0, departmentCount);
  
  // Create a REL matrix with some sample values
  const relMatrix: string[][] = Array(departmentCount)
    .fill(0)
    .map(() => Array(departmentCount).fill("U"));
    
  // Set diagonal to empty string
  for (let i = 0; i < departmentCount; i++) {
    relMatrix[i][i] = "";
  }
  
  // Set some sample relationships
  if (departmentCount >= 3) {
    relMatrix[0][1] = "A"; // Receiving - Raw Materials: Absolutely necessary
    relMatrix[1][0] = "A";
    
    relMatrix[1][2] = "E"; // Raw Materials - Manufacturing: Especially important
    relMatrix[2][1] = "E";
  }
  
  if (departmentCount >= 4) {
    relMatrix[2][3] = "A"; // Manufacturing - Assembly: Absolutely necessary
    relMatrix[3][2] = "A";
  }
  
  if (departmentCount >= 5) {
    relMatrix[3][4] = "E"; // Assembly - Packaging: Especially important
    relMatrix[4][3] = "E";
  }
  
  if (departmentCount >= 6) {
    relMatrix[4][5] = "I"; // Packaging - Warehouse: Important
    relMatrix[5][4] = "I";
  }
  
  if (departmentCount >= 7) {
    relMatrix[5][6] = "A"; // Warehouse - Shipping: Absolutely necessary
    relMatrix[6][5] = "A";
  }
  
  if (departmentCount >= 8) {
    relMatrix[7][0] = "O"; // Office - Receiving: Ordinary closeness
    relMatrix[0][7] = "O";
    
    relMatrix[7][6] = "I"; // Office - Shipping: Important
    relMatrix[6][7] = "I";
    
    relMatrix[2][6] = "X"; // Manufacturing - Shipping: Undesirable
    relMatrix[6][2] = "X";
  }
  
  // Generate a simple sequence (just in order)
  const sequence = Array(departmentCount).fill(0).map((_, i) => i);
  
  return {
    departments,
    relMatrix,
    sequence
  };
}
