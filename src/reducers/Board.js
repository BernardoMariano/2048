// import minBy from 'lodash/fp/minBy'
import _ from 'lodash'


const initialState = {
  boxes: [],
  size: 4
}

const CELL_INITIAL_VALUES = [2, 4]

const getBox = (boxes, x, y) => _.find(boxes, { x, y })

const newBox = (boxes, size) => {
  // Generate a pair of random numbers from 1 to `size`,
  // excluding the ones inside `boxes`
  const availableCells = []

  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
      if (!getBox(boxes, x, y)) {
        availableCells.push({ x, y })
      }
    }
  }

  const box = _.sample(availableCells)
  box.value = _.sample(CELL_INITIAL_VALUES)

  return box
}

const BoardReducer = (state = initialState, { type: actionType, payload }) => {
  const { boxes, size: boardSize } = state
  switch (actionType) {
    case 'ADD_BOX': {
      return {
        ...state,
        boxes: [
          ...boxes,
          newBox(boxes, boardSize)
        ]
      }
    }

    case 'MOVE_DOWN': {
      const newBoxes = []

      // 1. Find the next Box
      // 2. It's empty, skip to next
      // 3. If it finally got out of the while-loop, there is a Box
      // 4.1. It's the same value, double it and return only one of both
      // 4.2. If it's different value, place the Box above
      // 5. Deliver this updated box

      for (let forX = 1; forX <= boardSize; forX++) {
        for (let forY = boardSize - 1; forY >= 1; forY--) {
          const box = getBox(boxes, forX, forY)
          let belowValue = 0
          let belowIndex = 0
          while (belowValue === 0 && belowIndex >= boardSize - 1) {
            belowValue = getBox(boxes, forX, forY + (++belowIndex)).value || 0
          }
          if (box.value === belowValue) {
            box.y = belowIndex
            box.value *= 2
          } else {
            box.y = belowIndex - 1
          }
          newBoxes.push(box)
        }
      }

      return {
        ...state,
        boxes: newBoxes
      }
    }
    default: {
      return state
    }
  }
}

export default BoardReducer
