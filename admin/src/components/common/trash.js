import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

class Trash extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const border = `3px solid ${canDrop ? (isOver ? 'red' : 'green') : 'black'}`

    return dropTarget(
      <div
        style={{
          border,
          width: 200,
          height: 200,
          position: 'absolute',
          top: 20,
          right: 20
        }}
      />
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { deleteEvent, deletePerson } = props
    const itemTypeToDelete = monitor.getItemType()
    const { id: itemId } = monitor.getItem()
    const actions = {
      person: deletePerson,
      event: deleteEvent
    }

    actions[itemTypeToDelete](itemId)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { deleteEvent, deletePerson }
)(DropTarget(['person', 'event'], spec, collect)(Trash))
