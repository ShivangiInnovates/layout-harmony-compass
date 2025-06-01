// src/services/OptimizationService.ts

export async function optimizeLayout(
  departments: Record<string, number>,
  relationships: [string, string, string][],
  sequence: string[],
  options?: {
    popSize?: number;
    generations?: number;
    mutationRate?: number;
    elitism?: number;
  }
) {
  try {
    const response = await fetch('http://localhost:5000/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departments,
        relationships,
        sequence,
        ...options,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Optimization request failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during optimization:', error);
    throw error;
  }
}
