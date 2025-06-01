import numpy as np
import matplotlib.pyplot as plt
import random
from io import BytesIO # For potential web integration (saving plot to buffer)

# Fixed grid size (can be adjusted if needed)
GRID_ROWS = 5
GRID_COLS = 5

# --- Core Algorithm Functions (mostly unchanged from your original code) ---

def are_adjacent(cell1, cell2):
    """
    Returns True if cell1 and cell2 share an edge on the grid.
    Each cell is a tuple (row, col).
    """
    (r1, c1), (r2, c2) = cell1, cell2
    return abs(r1 - r2) + abs(c1 - c2) == 1

def place_departments(sequence, grid_values_map):
    """
    Given:
      - sequence:       a permutation of department names (length = n_departments)
      - grid_values_map: {dept_name: 1 or 2}
    Attempts to place each department in row-major order on the grid:
      - If grid_values_map[dept] == 2 => place in two horizontally adjacent empty cells
      - If grid_values_map[dept] == 1 => place in one empty cell (first found)
    Returns:
      - grid (list of lists of dept_name or None)
      - positions: {dept_name: [ (r,c), ... ] }
    If any department cannot be placed (no space), returns (None, None).
    """
    grid = [[None for _ in range(GRID_COLS)] for _ in range(GRID_ROWS)]
    positions = {}

    for dept in sequence:
        gv = grid_values_map.get(dept) # Use .get() for safety if dept not in map
        if gv is None:
            # This case should ideally not happen if inputs are consistent
            print(f"Warning: Department '{dept}' from sequence not found in grid_values_map. Skipping.")
            continue
        placed = False

        if gv == 2:
            for r in range(GRID_ROWS):
                for c in range(GRID_COLS - 1):
                    if grid[r][c] is None and grid[r][c+1] is None:
                        grid[r][c] = dept
                        grid[r][c+1] = dept
                        positions[dept] = [(r, c), (r, c+1)]
                        placed = True
                        break
                if placed:
                    break
        else: # gv == 1
            for r in range(GRID_ROWS):
                for c in range(GRID_COLS):
                    if grid[r][c] is None:
                        grid[r][c] = dept
                        positions[dept] = [(r, c)]
                        placed = True
                        break
                if placed:
                    break

        if not placed:
            return None, None  # Cannot place this department

    return grid, positions

def calculate_fitness(positions, relation_dict_weights):
    """
    Given:
      - positions: {dept_name: [ (r,c), ... ]}
      - relation_dict_weights: { (d1,d2): weight, ... } (symmetric)
    For each unordered pair (d1, d2):
      - If any cell of d1 is adjacent to any cell of d2, add weight once.
    Returns sum of weights. If positions is None, returns a large negative penalty.
    """
    if positions is None:
        return -1e9 # Increased penalty for clearer distinction

    score = 0
    counted_pairs = set() # To ensure each pair's adjacency bonus is counted once
    
    # Iterate through unique department pairs present in the current layout
    dept_names_in_layout = list(positions.keys())

    for i in range(len(dept_names_in_layout)):
        for j in range(i + 1, len(dept_names_in_layout)):
            d1 = dept_names_in_layout[i]
            d2 = dept_names_in_layout[j]

            # Get the weight for this pair, could be (d1, d2) or (d2, d1)
            weight = relation_dict_weights.get((d1, d2), relation_dict_weights.get((d2, d1), 0))
            
            if weight == 0: # No defined positive relationship
                continue

            cells1 = positions.get(d1, [])
            cells2 = positions.get(d2, [])
            adjacent_found = False

            for c1 in cells1:
                for c2 in cells2:
                    if are_adjacent(c1, c2):
                        adjacent_found = True
                        break
                if adjacent_found:
                    break
            
            if adjacent_found:
                score += weight
                # No need for counted_pairs if iterating unique pairs and using symmetric relation_dict_weights
                
    return score


def initialize_population(dept_list_names, user_provided_sequence, pop_size=30):
    """
    Generates pop_size permutations of dept_list_names.
    Ensures that user_provided_sequence (if valid) is included as one individual.
    Returns a list of permutations (each is a list).
    """
    population = []
    # 1) Insert user_provided_sequence as the first chromosome (if it is a valid permutation)
    if (user_provided_sequence and 
        set(user_provided_sequence) == set(dept_list_names) and 
        len(user_provided_sequence) == len(dept_list_names)):
        population.append(user_provided_sequence.copy())
    else:
        # If user sequence is invalid or not provided, add a random one to start
        population.append(random.sample(dept_list_names, len(dept_list_names)))


    # 2) Fill the rest with random permutations
    while len(population) < pop_size:
        perm = random.sample(dept_list_names, len(dept_list_names))
        # Ensure uniqueness in the initial population
        is_duplicate = False
        for p_existing in population:
            if p_existing == perm:
                is_duplicate = True
                break
        if not is_duplicate:
            population.append(perm)
            
    return population

def crossover(parent1, parent2):
    """
    Ordered crossover (one-point slice & fill).
    """
    size = len(parent1)
    child = [None] * size
    
    # Choose two distinct cut points a < b
    start, end = sorted(random.sample(range(size), 2))

    # Copy slice from parent1
    child[start:end+1] = parent1[start:end+1]
    
    # Fill remaining spots from parent2 in order
    pointer_parent2 = 0
    for i in range(size):
        if child[i] is None: # If spot is not filled from parent1
            # Find next item in parent2 that is not already in child
            while parent2[pointer_parent2] in child:
                pointer_parent2 += 1
            child[i] = parent2[pointer_parent2]
            pointer_parent2 += 1
    return child

def mutate(chromosome, mutation_rate=0.2):
    """
    With probability=mutation_rate, swap two randomly chosen genes.
    """
    if random.random() < mutation_rate:
        i, j = random.sample(range(len(chromosome)), 2)
        chromosome[i], chromosome[j] = chromosome[j], chromosome[i]
    return chromosome

def select_parents(population, fitnesses, tournament_size=4):
    """
    Tournament selection.
    Selects tournament_size individuals randomly, the best one wins.
    Returns two parent chromosomes.
    """
    parents = []
    for _ in range(2): # Select two parents
        tournament_indices = random.sample(range(len(population)), tournament_size)
        tournament_fitnesses = [fitnesses[i] for i in tournament_indices]
        winner_index_in_tournament = np.argmax(tournament_fitnesses)
        parents.append(population[tournament_indices[winner_index_in_tournament]])
    return parents[0], parents[1]


def genetic_algorithm(dept_list_names, grid_values_map, relation_dict_weights, 
                      initial_sequence, pop_size=30, generations=100, mutation_rate=0.2, elitism_count=2):
    """
    Runs GA for a fixed number of generations.
    """
    population = initialize_population(dept_list_names, initial_sequence, pop_size)
    
    best_layout_overall = None
    best_positions_overall = None
    best_score_overall = -np.inf
    history_of_best_scores = []

    for gen in range(generations):
        current_gen_fitnesses = []
        current_gen_positions = []

        for individual_sequence in population:
            grid, positions = place_departments(individual_sequence, grid_values_map)
            fitness = calculate_fitness(positions, relation_dict_weights)
            current_gen_fitnesses.append(fitness)
            current_gen_positions.append(positions) # Store positions for the best
            
            if fitness > best_score_overall:
                best_score_overall = fitness
                best_layout_overall = individual_sequence.copy()
                best_positions_overall = positions.copy() if positions else None
        
        history_of_best_scores.append(best_score_overall if best_score_overall > -np.inf else np.nan) # Use NaN if no valid layout yet

        # Build next generation
        new_population = []

        # Elitism: Keep the best individuals from the current generation
        sorted_indices = np.argsort(current_gen_fitnesses)[::-1] # Sort descending
        for i in range(min(elitism_count, pop_size)):
            new_population.append(population[sorted_indices[i]].copy())

        # Fill the rest with new individuals generated through crossover and mutation
        while len(new_population) < pop_size:
            parent1, parent2 = select_parents(population, current_gen_fitnesses)
            child = crossover(parent1, parent2)
            child = mutate(child, mutation_rate)
            new_population.append(child)
        
        population = new_population
        
        if gen % 10 == 0 or gen == generations - 1:
            print(f"Generation {gen:3d} | Best Score so far = {best_score_overall:.2f}")

    return best_layout_overall, best_positions_overall, best_score_overall, history_of_best_scores


def plot_layout(layout_positions, title="Facility Layout", score_history=None):
    """
    Plots the facility layout and optionally the score history.
    """
    if layout_positions is None:
        print("No valid layout to plot.")
        if score_history:
            plt.figure(figsize=(6,4))
            plt.plot(score_history)
            plt.title("Score History (No Valid Layout Found)")
            plt.xlabel("Generation")
            plt.ylabel("Best Score")
            plt.grid(True)
            plt.tight_layout()
            # plt.show() - Comment out for web integration
            return None # Return None if no layout to plot

    num_plots = 2 if score_history and len(score_history) > 0 else 1
    fig_width = 12 if num_plots == 2 else 6
    fig, axs = plt.subplots(1, num_plots, figsize=(fig_width, 6))
    
    ax_layout = axs[0] if num_plots == 2 else axs

    # Draw grid lines
    for r_line in range(GRID_ROWS + 1):
        ax_layout.plot([0, GRID_COLS], [r_line, r_line], color='gray', lw=0.5)
    for c_line in range(GRID_COLS + 1):
        ax_layout.plot([c_line, c_line], [0, GRID_ROWS], color='gray', lw=0.5)

    # Fill each occupied cell & place the dept name inside it
    colors = plt.cm.get_cmap('Pastel2', len(layout_positions))
    dept_colors = {dept: colors(i) for i, dept in enumerate(layout_positions.keys())}

    for dept, cells in layout_positions.items():
        min_r, min_c = GRID_ROWS, GRID_COLS
        max_r, max_c = 0, 0
        
        # Determine bounding box for merged cells
        for (r, c) in cells:
            min_r = min(min_r, r)
            min_c = min(min_c, c)
            max_r = max(max_r, r)
            max_c = max(max_c, c)

        # Draw a single rectangle for the department
        width = (max_c - min_c) + 1
        height = (max_r - min_r) + 1
        
        rect = plt.Rectangle(
            (min_c, min_r), 
            width, 
            height,
            facecolor=dept_colors.get(dept, 'lightgrey'),
            edgecolor='black',
            linewidth=1.5
        )
        ax_layout.add_patch(rect)
        
        # Place text in the center of the bounding box
        center_x = min_c + width / 2.0
        center_y = min_r + height / 2.0
        ax_layout.text(center_x, center_y, dept,
                       ha='center', va='center', fontsize=9, color='black',
                       bbox=dict(facecolor='white', alpha=0.5, pad=0.2, boxstyle='round,pad=0.3'))

    ax_layout.set_xlim(0, GRID_COLS)
    ax_layout.set_ylim(0, GRID_ROWS)
    ax_layout.set_xticks(np.arange(0, GRID_COLS + 1))
    ax_layout.set_yticks(np.arange(0, GRID_ROWS + 1))
    ax_layout.set_xticklabels([])
    ax_layout.set_yticklabels([])
    ax_layout.set_aspect('equal')
    ax_layout.invert_yaxis()  # Row 0 at top
    ax_layout.set_title(title)

    if num_plots == 2:
        ax_score = axs[1]
        ax_score.plot(score_history, marker='o', linestyle='-')
        ax_score.set_title("Score Improvement Over Generations")
        ax_score.set_xlabel("Generation")
        ax_score.set_ylabel("Best Adjacency Score")
        ax_score.grid(True)

    plt.tight_layout()
    
    # For web integration, return the figure instead of showing it
    # plt.show() - Comment out for web integration
    return fig # Return the figure object

# --- Main Orchestration Function ---

def run_facility_layout_optimization(department_areas_info, relationship_definitions, 
                                     initial_user_sequence, 
                                     pop_size=50, generations=100, 
                                     mutation_rate=0.2, elitism=2):
    """
    Main function to run the facility layout optimization.

    Args:
        department_areas_info (dict): Dept names as keys, areas as values.
                                      Example: {"Office": 100, "Lab": 250, "Storage": 80}
        relationship_definitions (list): List of tuples defining relationships.
                                         Format: [("Dept1", "Dept2", "REL_CODE"), ...]
                                         REL_CODE: A, E, I, O, U, X
                                         Example: [("Office", "Lab", "A"), ("Lab", "Storage", "E")]
        initial_user_sequence (list): A suggested initial order of departments for placement.
                                      Example: ["Office", "Lab", "Storage"]
                                      Can be empty or None if no specific initial sequence is provided.
        pop_size (int): Population size for the genetic algorithm.
        generations (int): Number of generations for the GA.
        mutation_rate (float): Mutation probability.
        elitism (int): Number of best individuals to carry to the next generation.

    Returns:
        tuple: (best_layout_sequence, best_layout_positions, best_score, score_history_list)
               or (None, None, -np.inf, []) if no solution is found.
    """
    print("=== Facility Layout Optimization Started ===")

    # 1. Process Department Info
    dept_list_names = list(department_areas_info.keys())
    dept_areas = department_areas_info.copy()
    
    if not dept_list_names:
        print("Error: No department information provided.")
        return None, None, -np.inf, []

    n_departments = len(dept_list_names)
    total_area = sum(dept_areas.values())
    avg_area = total_area / n_departments if n_departments > 0 else 0
    
    grid_values_map = {
        d: (2 if dept_areas[d] > avg_area else 1)
        for d in dept_list_names
    }
    print(f"Departments: {dept_list_names}")
    print(f"Average area = {avg_area:.2f}. Grid values assigned: {grid_values_map}")
    
    # Check if total required cells exceed grid capacity
    total_cells_needed = sum(grid_values_map.values())
    if total_cells_needed > GRID_ROWS * GRID_COLS:
        print(f"Error: Total cells needed ({total_cells_needed}) exceeds grid capacity ({GRID_ROWS * GRID_COLS}).")
        print("Consider increasing grid size or reducing department areas/count.")
        return None, None, -np.inf, []


    # 2. Process Relationship Info
    relation_dict_weights = {}
    rel_weights_map = {'A': 243, 'E': 81, 'I': 27, 'O': 9, 'U': 3, 'X': 0}
    for rel_item in relationship_definitions:
        if len(rel_item) == 3:
            fr_dept, to_dept, rel_code = rel_item
            rel_code = rel_code.strip().upper()
            w = rel_weights_map.get(rel_code, 0)
            
            # Ensure departments exist
            if fr_dept not in dept_list_names or to_dept not in dept_list_names:
                print(f"Warning: Unknown department in relationship: {fr_dept} or {to_dept}. Skipping {rel_item}.")
                continue

            relation_dict_weights[(fr_dept, to_dept)] = w
            relation_dict_weights[(to_dept, fr_dept)] = w # Ensure symmetry
        else:
            print(f"Warning: Malformed relationship item: {rel_item}. Expected (Dept1, Dept2, REL_CODE).")

    print(f"Processed relationship weights: {relation_dict_weights}")

    # 3. Validate Initial Sequence (optional, GA can start without it)
    if initial_user_sequence:
        if not (set(initial_user_sequence) == set(dept_list_names) and \
                len(initial_user_sequence) == n_departments):
            print("Warning: Provided initial sequence is invalid (doesn't match departments or has duplicates). Will generate a random one.")
            initial_user_sequence = None # Let GA generate initial population randomly
    else:
         print("No initial user sequence provided. GA will start with random sequences.")


    # 4. Run Genetic Algorithm
    print(f"\nRunning Genetic Algorithm (Pop: {pop_size}, Gen: {generations}, MutRate: {mutation_rate}, Elitism: {elitism})...")
    best_layout, best_positions, best_score, score_history = genetic_algorithm(
        dept_list_names=dept_list_names,
        grid_values_map=grid_values_map,
        relation_dict_weights=relation_dict_weights,
        initial_sequence=initial_user_sequence,
        pop_size=pop_size,
        generations=generations,
        mutation_rate=mutation_rate,
        elitism_count=elitism
    )

    print("\n=== Genetic Algorithm Finished ===")
    if best_layout:
        print("Optimal Sequence (permutation):", best_layout)
        print("Optimal Adjacency Score:", best_score)
        # print("Positions:", best_positions) # Can be verbose
    else:
        print("No valid layout could be found.")
        print("Consider increasing generations, population size, or grid dimensions if departments don't fit.")

    # Comment out the plotting code as we'll handle it separately for the web interface
    # if best_positions:
    #     plot_title = f"Optimal Layout (Score: {best_score:.0f})"
    #     plot_layout(best_positions, title=plot_title, score_history=score_history)
    # elif score_history:
    #     plot_layout(None, score_history=score_history)

    return best_layout, best_positions, best_score, score_history

# --- Example Usage ---
if __name__ == "__main__":
    # Define your inputs here
    department_data = {
        "Reception": 100,
        "Office A": 150,
        "Office B": 150,
        "Meeting Room": 200,
        "Lab": 300, # Likely to get grid_value = 2
        "Storage": 80,
        "Break Room": 120
    }

    # (Dept1, Dept2, Relationship_Code)
    # A=Absolutely Necessary, E=Especially Important, I=Important, O=Ordinary, U=Unimportant, X=Undesirable (0 weight)
    relationship_data = [
        ("Reception", "Office A", "A"),
        ("Reception", "Meeting Room", "E"),
        ("Office A", "Office B", "I"),
        ("Office A", "Lab", "U"), # Example of U, will have low impact
        ("Lab", "Storage", "A"),
        ("Meeting Room", "Lab", "X"), # Example of X, will have 0 weight for adjacency
        ("Office B", "Meeting Room", "O"),
        ("Break Room", "Office A", "I"),
        ("Break Room", "Office B", "I"),
    ]

    # An initial guess for the sequence of placement (can be None or empty list)
    # Order matters for the initial placement attempt by the GA, and for this specific seed.
    user_initial_sequence = ["Reception", "Office A", "Meeting Room", "Lab", "Office B", "Storage", "Break Room"]
    # user_initial_sequence = [] # Or None, to let GA start completely random

    # Run the optimization
    best_seq, best_pos, best_s, hist = run_facility_layout_optimization(
        department_areas_info=department_data,
        relationship_definitions=relationship_data,
        initial_user_sequence=user_initial_sequence,
        pop_size=60,      # Number of layouts in each generation
        generations=150,  # How many generations to run
        mutation_rate=0.25, # Chance of a random swap in a layout sequence
        elitism=3         # Number of best layouts to carry over directly
    )

    # Example with fewer departments to fit a smaller grid if needed
    # department_data_small = {
    #     "D1": 10, "D2": 25, "D3": 10, "D4": 30 # D2, D4 might get gv=2
    # }
    # relationship_data_small = [
    #     ("D1", "D2", "A"), ("D2", "D3", "E"), ("D3", "D4", "A"), ("D1","D4","I")
    # ]
    # user_initial_sequence_small = ["D1", "D2", "D3", "D4"]

    # best_seq, best_pos, best_s, hist = run_facility_layout_optimization(
    #     department_areas_info=department_data_small,
    #     relationship_definitions=relationship_data_small,
    #     initial_user_sequence=user_initial_sequence_small,
    #     pop_size=30, generations=50
    # )
