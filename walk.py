from matplotlib import pyplot as plt
import numpy as np
import random

def plot_position_vs_time(table):
    # Get X and Y axes from dataframe
    timestep = table[:,0]
    location = table[:,1]
    num_steps = len(timestep)
    
    # Title
    plt.title("Random walk for " + str(num_steps) + " timesteps")
    
    # Labels
    plt.xlabel("Time(t)")
    plt.ylabel("Location(x)")
    
    # Ticks
    limit = num_steps + 1
    plt.yticks(range(-limit, limit))
    plt.xticks(range(0, limit))
    
    # Draw graph
    plt.plot(timestep, location)
    plt.show()

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

# Randomly take a step forwards or backwards
def random_step():
    x = random.randint(0, 1)    # x is either 0 or 1
    step = (x - 0.5)*2          # Map {0, 1} to {-1, 1}
    return step

def get_location(table):
    # No steps means he/she is still at the origin
    size = len(table)
    if(size == 0):
        return 0
    
    x = table[size-1, 1]
    return x

def test_random_walk(a, b):
    for num_steps in range(a, b):
        print("-----------" + str(num_steps) + " steps"+ "-----------")
        print(random_walk(num_steps))
        print()