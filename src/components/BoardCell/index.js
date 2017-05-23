import styled from 'styled-components'

import constants from '../../constants'


const BoardCell = styled.div`
  width: ${ constants.CELL_SIZE }px;
  height: ${ constants.CELL_SIZE }px;
  border-radius: 2px;
  display: inline-block;
  margin: 5px;
  background-color: burlywood;
`

export default BoardCell