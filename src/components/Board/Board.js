import React, { Component } from 'react'
import styled from 'styled-components'

import constants from '../../constants/constants'

import Box from '../Box/Box'
import BoardCell from '../BoardCell/BoardCell'


class Board extends Component {
  constructor() {
    super()
    this.state = {
      boxes: [
        {
          x: 2,
          y: 2,
          value: 2
        },
        {
          x: 1,
          y: 4,
          value: 4
        }
      ],
      size: 4
    }
  }

  getBoxes() {
    const { boxes } = this.state
    return boxes.map((box, key) => <Box key={ key } { ...box } />)
  }

  componentDidMount() {
    const board = []
    const { size } = this.state
    for (let i = 1; i <= size * size; i++) {
      board.push(<BoardCell />)
    }
    this.setState({ board })
  }

  render() {
    return (
      <div className={ this.props.className }>
        { this.getBoxes() }
        { this.state.board }
      </div>
    )
  }
}

const StyledBoard = styled(Board)`
  width: ${ constants.CELL_SIZE * 4 + constants.CELL_MARGIN * 4 }px;
  padding: 5px;
  background-color: brown;
  font-size: 0;
`

export default StyledBoard
