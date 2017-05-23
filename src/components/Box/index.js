import React from 'react'
import styled, { keyframes } from 'styled-components'

import constants from '../../constants'


const RawBox = ({ value, x, y, isMoving, className }) => {
  const styles = {
    transform: `translate(
      ${ constants.CELL_SIZE * (x - 1) + constants.CELL_MARGIN * x }px,
      ${ constants.CELL_SIZE * (y - 1) + constants.CELL_MARGIN * y }px
    )`
  }
  return <div style={ styles } className={ className }>{ value }</div>
}

const appear = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const StyledBox = styled(RawBox)`
  left: 0;
  top: 0;
  position: absolute;
  width: ${ constants.CELL_SIZE }px;
  height: ${ constants.CELL_SIZE }px;
  background-color: ${ props => constants.CELL_BG_COLOR[ props.value ] }
  font-size: 15px;
  letter-spacing: -.5px;
  will-change: transform;
  transition: transform .15s cubic-bezier(0, 0.9, 0.8, 1);
  line-height: ${ constants.CELL_SIZE }px;
  text-align: center;
  border-radius: 2px;
`

export default StyledBox