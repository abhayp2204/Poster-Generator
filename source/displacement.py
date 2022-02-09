from walk import *

# Show the results of md and msd for 0 to n steps
def displacement_patterns(max_steps, num_tests):
    print("Steps \t MD \t\tMSD")
    for i in range(max_steps):
        displacement(i, num_tests)
        
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