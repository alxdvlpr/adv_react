import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import EventParticipants from './event-participants'
import DragPreview from './event-drag-preview'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, dragSource, canDrop, isOver } = this.props
    const border = `1px solid ${canDrop ? (isOver ? 'red' : 'green') : 'black'}`

    if (!event) return null
    return dragSource(
      dropTarget(
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
    )
  }
}

const specTarget = {
  drop(props, monitor) {
    const { addPersonToEvent, event } = props
    addPersonToEvent(monitor.getItem().id, event.id)
  }
}

const specSource = {
  beginDrag(props) {
    return {
      id: props.event.id,
      DragPreview
    }
  }
}

const collectTarget = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

const collectSource = (connect) => ({
  dragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default connect(
  null,
  { addPersonToEvent }
)(
  DropTarget('person', specTarget, collectTarget)(
    DragSource('event', specSource, collectSource)(SelectedEventCard)
  )
)
