import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import constants from '../constants/constants'

import * as BoardActions from '../actions'
import Box from '../components/Box/Box'
import BoardCell from '../components/BoardCell/BoardCell'


class Board extends Component {

  static propTypes = {
    actions : PropTypes.object.isRequired,
    size    : PropTypes.number,
    gameOver: PropTypes.bool,
    boxes   : PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired
    }))
  }

  componentDidMount() {
    this.props.actions.addBox()
    this.props.actions.addBox()

    const keysDirection = {
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down'
    }

    document.addEventListener('keydown', ({ keyCode }) => {

      if (this.props.gameOver) return

      const direction = keysDirection[keyCode]

      this.props.actions[`move${ direction }`]()
      setTimeout(
        () => this.props.actions.addBox(),
        150
      )
    })
  }

  renderBoxes() {
    return this.props.boxes.map((box, id) => <Box key={ id } { ...box } />)
  }

  renderStructure() {
    const { size } = this.props
    const structure = []
    for (let i = 1; i <= size * size; i++) {
      structure.push(<BoardCell key={ i } />)
    }
    return structure
  }

  render() {
    const {
      boxes,
      size,
      gameOver,
      className
    } = this.props

    if (gameOver) {
      alert('YOU LOSE!')
    }

    return <div className={ className }>
      { boxes ? this.renderBoxes() : null }
      { size ? this.renderStructure() : null }
    </div>
  }
}

const StyledBoard = styled(Board)`
  width: ${ constants.CELL_SIZE * 4 + constants.CELL_MARGIN * 4 }px;
  padding: 5px;
  background-color: brown;
  font-size: 0;
`

const mapStateToProps = ({ board }) => ({
  boxes   : board.boxes,
  size    : board.size,
  gameOver: board.gameOver
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(BoardActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledBoard)
