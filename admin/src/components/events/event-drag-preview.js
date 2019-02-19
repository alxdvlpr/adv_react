import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventListSelector } from '../../ducks/events'

class EventDragPreview extends Component {
  render() {
    if (!this.props.event) return null

    return (
      <div>
        <h2>{this.props.event.title}</h2>
      </div>
    )
  }
}

export default connect((state, props) => ({
  event: eventListSelector(state, props)
}))(EventDragPreview)
