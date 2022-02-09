# Imports
from walk import *
from meet import *
from origin import *
from displacement import *

# Definitions
NUM_TESTS = 10000
MAX_STEPS = 30

# Random Walk
n = 10
table = random_walk(n)

# Task 0
plot_position_vs_time(table)

# Task 1
plot_meet(MAX_STEPS, NUM_TESTS)                 # Part 1
plot_origin(MAX_STEPS, NUM_TESTS)               # Part 2
displacement_patterns(MAX_STEPS, NUM_TESTS)     # Part 3