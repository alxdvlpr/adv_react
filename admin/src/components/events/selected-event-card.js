import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import EventParticipants from './event-participants'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, canDrop, isOver } = this.props
    const border = `1px solid ${canDrop ? (isOver ? 'red' : 'green') : 'black'}`

    return dropTarget(
      <div
        style={{
          border,
          width: 400,
          height: 150,
          boxSizing: 'border-box',
          overflow: 'auto'
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
        <EventParticipants ids={event.participants} />
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { addPersonToEvent, event } = props

    addPersonToEvent(monitor.getItem().id, event.id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { addPersonToEvent }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
