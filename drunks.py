# Imports
from matplotlib import pyplot as plt
from os import system
from walk import *

# Definitions
NUM_TESTS = 10000
MAX_STEPS = 30

def test_random_walk(a, b):
    for num_steps in range(a, b):
        print("-----------" + str(num_steps) + " steps"+ "-----------")
        print(random_walk(num_steps))
        print()

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
    
def get_location(table):
    # No steps means he/she is still at the origin
    size = len(table)
    if(size == 0):
        return 0
    
    x = table[size-1, 1]
    return x
    
def meet(N):
    table1 = random_walk(N)
    table2 = random_walk(N)
    
    # They must meet if nobody moves
    if(N == 0):
        return True
    
    # Get the final position from the table
    x1 = get_location(table1)
    x2 = get_location(table2)
    
    # print(x1)
    # print(x2)

    # Return meet status
    return (x1 == x2)

# Probability that the drunks meet
def prob_meet(N, num_tests):
    num_meet = 0
    
    for i in range(num_tests):
        num_meet += meet(N)
        
    prob = num_meet/num_tests
    return prob

# Graph: Probability of drunks meeting vs Number of steps
def plot_meet(max_steps, num_tests):
    X = []
    Y = []
    for i in range(max_steps + 1):
        X.append(i)
        Y.append(prob_meet(i, num_tests))
    plt.plot(X, Y)
    plt.show()
   
# Probability that the drunk returns to the origin
def prob_origin(N, num_tests):
    num_origin = 0
    
    for i in range(num_tests):
        # Get final location after a random walk
        table = random_walk(N)
        x = get_location(table)
        
        # Update if at oorigin
        num_origin += (x == 0)
        
    prob = num_origin/num_tests
    return prob

# Graph: Probability of drunk returning to the origin vs Number of steps
def plot_origin(max_steps, num_tests):
    X = []
    Y = []
    for i in range(max_steps + 1):
        X.append(i)
        Y.append(prob_origin(i, num_tests))
    plt.plot(X, Y)
    plt.show()

# Calculate mean displacement(md) and mean square displacement(msd) for N steps
def displacement(N, num_tests):
    # Displacement variables
    displacement = 0
    square_displacement = 0
    mean_displacement = 0
    mean_square_displacement = 0
    
    # Calculate total displacement and total square displacement
    for i in range(num_tests):
        table = random_walk(N)
        x = get_location(table)
        
        displacement += x
        square_displacement += x**2
        
    # Get mean
    mean_displacement = displacement/num_tests
    mean_square_displacement = square_displacement/num_tests
    
    # print("Mean displacement = ", mean_displacement)
    # print("Mean square displacement = ", mean_square_displacement)
    print(str(N) + ":\t" + str(mean_displacement) + "\t\t" + str(mean_square_displacement))
    
# Show the results of md and msd for 0 to n steps
def displacement_patterns(max_steps, num_tests):
    print("Steps \t MD \t\tMSD")
    for i in range(max_steps):
        displacement(i, num_tests)

# Tasks
n = 10

# Task 0
table = random_walk(n)
plot_position_vs_time(table)

# Task 1
# plot_meet(MAX_STEPS, NUM_TESTS)                 # Part 1
# plot_origin(MAX_STEPS, NUM_TESTS)               # Part 2
# displacement_patterns(MAX_STEPS, NUM_TESTS)     # Part 3