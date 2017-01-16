import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import constants from '../constants/constants'

import Box from '../components/Box/Box'
import BoardCell from '../components/BoardCell/BoardCell'


class Board extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    size   : React.PropTypes.number,
    boxes  : React.PropTypes.arrayOf(React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      value: React.PropTypes.number.isRequired
    }))
  }

  componentDidMount() {
    this.props.actions.addBox()
    this.props.actions.addBox()
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
      className
    } = this.props

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

const mapStateToProps = state => ({
  boxes: state.board.boxes,
  size : state.board.size
})

const mapDispatchToProps = dispatch => ({
  actions: {
    addBox: quantity => dispatch({ type: 'ADD_BOX', payload: { quantity } })
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledBoard)
