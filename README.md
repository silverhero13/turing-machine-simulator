# turing-machine-simulator
Simulate a deterministic Turing Machine through the Node.js REPL

## examples

### multiplying two numbers

Multiply two numbers, _a_ and _b_, where the numbers are represented by zeroes and the multiplication operator is represented by _1_.

For example, multiplying 2 by 3 is represented by `001000`.

Transitions:

    {
        q0: [["0", "0", "R", "q0"], ["1", "1", "R", "q0"], ["_", "$", "L", "q1"]],
        q1: [["0", "0", "L", "q1"], ["1", "1", "L", "q1"], ["_", "_", "R", "q2"]],
        q2: [["0", "0", "R", "q2"], ["1", "1", "R", "q3"]],
        q3: [["Y", "Y", "R", "q3"], ["0", "Y", "L", "q4"], ["$", "_", "L", "q8"]],
        q4: [["0", "0", "L", "q4"], ["1", "1", "L", "q4"], ["X", "X", "L", "q4"], ["Y", "Y", "L", "q4"], ["$", "$", "L", "q4"], ["_", "_", "R", "q5"]],
        q5: [["X", "X", "R", "q5"], ["0", "X", "R", "q6"], ["1", "1", "L", "q7"]],
        q6: [["0", "0", "R", "q6"], ["1", "1", "R", "q6"], ["Y", "Y", "R", "q6"], ["$", "$", "R", "q6"], ["_", "0", "L", "q4"]],
        q7: [["X", "0", "L", "q7"], ["_", "_", "R", "q2"]],
        q8: [["0", "_", "L", "q8"], ["1", "_", "L", "q8"], ["X", "_", "L", "q8"], ["Y", "_", "L", "q8"], ["_", "_", "R", "q9"]],
        q9: []
    }

Inputs:

1. 001000
1. 000100
1. 00001000
1. 100
1. 001
