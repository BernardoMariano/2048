// import minBy from 'lodash/fp/minBy'
import _ from 'lodash'


const BOX_INITIAL_VALUES = [2, 4]

const getBox = (boxes, x, y) => _.find(boxes, { x, y })

const getNewBoxValue = () => {
  // 70% -> 2
  // 30% -> 4
  return BOX_INITIAL_VALUES[Math.random() >= .3 ? 0 : 1]
}

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
  box.value = getNewBoxValue()

  return box
}

const initialState = {
  boxes: [],
  size: 4
}

const BoardReducer = (state = initialState, { type: actionType, payload }) => {
  let { boxes, size: boardSize } = state

  switch (actionType) {

    case 'ADD_BOX': {

      const box = newBox(boxes, boardSize)
      const newBoxes = boxes.concat(box)
      const newState = {
        ...state,
        boxes: newBoxes
      }
      if (newBoxes.length === boardSize * boardSize) {
        // This check actualy goes beyond boxes quantity...
        // Have to guarantee that there's no available
        // moves to be done before ending the game
        newState.gameOver = true
      }

      return newState
    }

    case 'MOVE_DOWN': {

      const newBoxes = []

      for (let x = 1; x <= boardSize; x++) {
        var bottomBox = getBox(boxes, x, boardSize)
        if (bottomBox) newBoxes.push(bottomBox)
      }

      for (let forX = 1; forX <= boardSize; forX++) {
        for (let forY = boardSize - 1; forY >= 1; forY--) {

          var box = getBox(boxes, forX, forY),
              belowBox,
              belowIndex = forY + 1,
              isEdge = belowIndex >= boardSize

          if (!box) continue

          while (!belowBox && !isEdge) {
            belowBox = getBox(boxes, forX, forY + (belowIndex++))
            isEdge = belowIndex >= boardSize
          }

          if (isEdge) {
            box.y = belowIndex
          } else if (box.value === belowBox.value) {
            box.y = forY
            box.value *= 2
          } else {
            box.y = belowIndex - 2
          }

          boxes = _.reject(boxes, { forX, belowIndex })
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