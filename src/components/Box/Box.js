import React from 'react'
import styled from 'styled-components'

import constants from '../../constants/constants.js'


const RawBox = ({ value, x, y, isMoving, className }) => {
  const styles = {
    left: constants.CELL_SIZE * (x - 1) + constants.CELL_MARGIN * x,
    top : constants.CELL_SIZE * (y - 1) + constants.CELL_MARGIN * y
  }
  return <div style={ styles } className={ className }>{ value }</div>
}

const StyledBox = styled(RawBox)`
  position: absolute;
  width: ${ constants.CELL_SIZE }px;
  height: ${ constants.CELL_SIZE }px;
  background-color: ${ props => constants.CELL_BG_COLOR[ props.value ] }
  font-size: 12px;
  transition: top .15s ease-in-out;
  line-height: ${ constants.CELL_SIZE }px;
  text-align: center;
  border-radius: 2px;
`

export default StyledBox