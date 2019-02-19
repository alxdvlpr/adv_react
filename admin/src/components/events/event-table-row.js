import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './event-drag-preview'

class EventTableRow extends Component {
  componentDidMount() {
    this.props.dragPreview(getEmptyImage())
  }

  render() {
    const { event, dragSource, isDragging } = this.props
    const style = { opacity: isDragging ? 0.3 : 1 }

    return dragSource(
      <tr className="test__events-table--item">
        <td>{event.title}</td>
        <td>{event.when}</td>
        <td>{event.where}</td>
      </tr>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.event.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(EventTableRow)
