import numpy as np
import random

# Randomly take a step forwards or backwards
def random_step():
    x = random.randint(0, 1)    # x is either 0 or 1
    step = (x - 0.5)*2          # Map {0, 1} to {-1, 1}
    return step

# Random walk: Returns the coordinates of x at each timestamp
def random_walk(num_steps):
    # Initalize an empty table
    shape = (num_steps, 2)
    table = np.empty(shape, dtype=int)
    
    # Spawn at origin
    x = 0
    
    # Fill the table
    for step in range(0, num_steps):
        x += random_step()          # Drunk moves forward or backward

        table[step][0] = step + 1   # Column1: Timesteps
        table[step][1] = x          # Column2: Location
        
    # Return the table
    return table