
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdjacencyMatrix, getTcrColorClass } from "@/utils/layoutUtils";

interface VisualizationDisplayProps {
  departments: string[];
  sequence: number[];
  tcrMatrix: number[][];
}

const VisualizationDisplay: React.FC<VisualizationDisplayProps> = ({
  departments,
  sequence,
  tcrMatrix,
}) => {
  // Create adjacency matrix
  const adjacencyMatrix = useMemo(() => {
    return createAdjacencyMatrix(sequence, departments.length);
  }, [sequence, departments.length]);

  // Calculate node positions in a circle
  const nodePositions = useMemo(() => {
    const numNodes = departments.length;
    const radius = 150;
    const center = { x: 200, y: 200 };
    
    return sequence.map((deptIndex, i) => {
      const angle = (i / numNodes) * 2 * Math.PI;
      return {
        id: deptIndex,
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        name: departments[deptIndex],
      };
    });
  }, [departments, sequence]);

  // Create edges based on adjacency
  const edges = useMemo(() => {
    const result = [];
    
    for (let i = 0; i < sequence.length - 1; i++) {
      const source = sequence[i];
      const target = sequence[i + 1];
      const value = tcrMatrix[source][target];
      
      result.push({
        source,
        target,
        value,
        colorClass: getTcrColorClass(value),
      });
    }
    
    return result;
  }, [sequence, tcrMatrix]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout Visualization</CardTitle>
        <CardDescription>
          Visual representation of the department sequence and relationships
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] border rounded-md overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {/* Draw edges first so they're behind the nodes */}
            {edges.map((edge, i) => {
              const source = nodePositions.find(n => n.id === edge.source)!;
              const target = nodePositions.find(n => n.id === edge.target)!;
              
              // Get class without the bg- prefix
              const colorClass = edge.colorClass.replace('bg-', 'stroke-');
              
              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    className={`${colorClass} stroke-[3]`}
                  />
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-current font-bold"
                    dy="-8"
                  >
                    {edge.value}
                  </text>
                </g>
              );
            })}
            
            {/* Draw the nodes */}
            {nodePositions.map((node, i) => (
              <g key={`node-${node.id}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  className="fill-primary stroke-2 stroke-primary-foreground"
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-primary-foreground font-bold"
                >
                  {node.id + 1}
                </text>
                <text
                  x={node.x}
                  y={node.y + 35}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-current font-medium"
                >
                  {node.name.length > 12 ? node.name.substring(0, 10) + "..." : node.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Legend</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-xs">Department</span>
            </div>
            {[5, 4, 3, 2, 1, -1].map(value => (
              <div key={value} className="flex items-center gap-1">
                <div className={`w-4 h-1 ${getTcrColorClass(value)}`}></div>
                <span className="text-xs">
                  {value === 6 ? "A (6)" : 
                   value === 5 ? "E (5)" : 
                   value === 4 ? "I (4)" : 
                   value === 3 ? "O (3)" : 
                   value === 2 ? "U (2)" : "X (1)"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationDisplay;
