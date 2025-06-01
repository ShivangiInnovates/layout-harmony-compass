# Layout Harmony Compass with ML Optimization

This application helps design optimal facility layouts using relationship matrices and genetic algorithms.

## Features

- Department input with area specification
- Relationship matrix definition (A, E, I, O, U, X)
- Sequence calculation based on TCR values
- Machine Learning optimization using genetic algorithms
- Visual representation of layout results

## Getting Started

### Prerequisites

- Node.js (v16 or later) for the React frontend
- Python (v3.8 or later) for the optimization algorithm
- Required Python packages: `flask`, `flask-cors`, `numpy`, `matplotlib`

### Installation

1. Clone the repository
2. Install JavaScript dependencies:
   ```
   npm install
   ```
3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

You can start both the React frontend and Flask API server using the provided batch file:

```
start_servers.bat
```

Or start them separately:

1. Start the Python API server:
   ```
   python server.py
   ```

2. Start the React development server:
   ```
   npm run dev
   ## Usage

1. Input department names and areas
2. Define the relationship matrix between departments
3. Calculate the initial sequence
4. Click "Optimize Layout with ML" to run the genetic algorithm
5. View the optimized layout visualization

## Algorithm Details

The optimization uses a genetic algorithm to find the best department placement:

- **Input**: Department areas, relationship matrix, initial sequence
- **Process**: Multiple generations of selection, crossover, and mutation
- **Output**: Optimized layout with highest adjacency score
- **Parameters**: Population size, generations, mutation rate

## License

This project is licensed under the MIT License
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a7fa38c7-26f8-4f0d-b472-e73da11f1d45) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
