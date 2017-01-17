export const addBox = quantity => ({ type: 'ADD_BOX', payload: { quantity } })

export const moveDown = () => ({ type: 'MOVE_DOWN' })

export const moveUp = () => ({ type: 'MOVE_UP' })

export const moveLeft = () => ({ type: 'MOVE_LEFT' })

export const moveRight = () => ({ type: 'MOVE_RIGHT' })