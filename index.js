const getTransitionRepresentation = (currentState, transition) => {
    const [read, write, direction, successorState] = transition

    return `δ(${currentState} ${read}) → δ(${write} ${direction} ${successorState})`
}

const getTapeRepresentation = (tape) => {
    return tape.join("")
}

const getTapeHeadRepresentation = (transitionFunctionLength, head) => {
    return `${Array(transitionFunctionLength).fill(" ").join("")} \t ${Array(head).fill(" ").join("")}↓`
}

const logOperation = (currentState, transition, resultingTape, head) => {
    const transitionFunction = getTransitionRepresentation(currentState, transition)
    const tapeState = getTapeRepresentation(resultingTape)
    const tapeHead = getTapeHeadRepresentation(transitionFunction.length, head)

    console.log("    " + tapeHead)
    console.log("    " + `${transitionFunction} \t ${tapeState}`)
    console.log()
}

const transitions = {
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

const input = "0010"
const blankSymbol = "_"
const initialState = "q0"
const finalStates = ["q9"]

let currentState = initialState
let tape = [blankSymbol, ...input.split(""), blankSymbol];
let head = 1

while (true) {
    let transition = transitions[currentState].find(([read]) => read === tape[head])

    if (transition) {
        let [ , write, direction, successorState] = transition

        tape[head] = write

        if (direction === "R") {
            head ++

            if (head === tape.length - 1) {
                tape = [...tape, blankSymbol]
            }
        } else if (direction === "L") {
            head --

            if (head === 0) {
                tape = [blankSymbol, ...tape]
                head ++
            }
        }

        logOperation(currentState, transition, tape, head)

        currentState = successorState
    } else {
        const isInFinalState = !! finalStates.find(x => x === currentState)

        console.log("------")
        console.log(`No transition δ(${currentState} ${tape[head]}) available. Halting.`);

        if (isInFinalState) {
            console.log("ACCEPT")
        } else {
            console.log("REJECT")
        }
        console.log("------")

        break;
    }
}
