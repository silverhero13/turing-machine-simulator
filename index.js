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

    console.log(tapeHead)
    console.log(`${transitionFunction} \t ${tapeState}`)
    console.log()
}

const transitions = {
    q0: [
        ["H", "h", "R", "q0"],
        ["e", "3", "R", "q0"],
        ["l", "L", "R", "q0"],
        ["o", "0", "R", "q0"],
        [",", ",", "R", "q0"],
        [" ", " ", "R", "q0"],
        ["w", "w", "R", "q0"],
        ["r", "r", "R", "q0"],
        ["d", "d", "R", "q0"],
        ["_", "!", "R", "q1"]
    ],
    q1: [],
}

const input = "Hello, world"
const blankSymbol = "_"
const initialState = "q0"
const finalStates = ["q1"]

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
