from walk import *

# Graph: Probability of drunk returning to the origin vs Number of steps
def plot_origin(max_steps, num_tests):
    X = []
    Y = []
    for i in range(max_steps + 1):
        X.append(i)
        Y.append(prob_origin(i, num_tests))
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