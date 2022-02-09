from walk import *

# Graph: Probability of drunks meeting vs Number of steps
def plot_meet(max_steps, num_tests):
    X = []
    Y = []
    for i in range(max_steps + 1):
        X.append(i)
        Y.append(prob_meet(i, num_tests))
    plt.plot(X, Y)
    plt.show()
    
    # Probability that the drunks meet
def prob_meet(N, num_tests):
    num_meet = 0
    
    for i in range(num_tests):
        num_meet += meet(N)
        
    prob = num_meet/num_tests
    return prob

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