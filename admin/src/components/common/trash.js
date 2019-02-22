import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

class Trash extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const fill = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return dropTarget(
      <div
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          top: 20,
          right: 20
        }}
      >
        {this.getSvg(fill)}
      </div>
    )
  }

  getSvg = (fill) => (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
    >
      <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
    </svg>
  )
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
