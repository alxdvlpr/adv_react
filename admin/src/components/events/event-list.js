import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector } from '../../ducks/events'

class EventList extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        {this.props.events.map((event) => (
          <li key={event.id}>
            {event.title}: {event.url}
          </li>
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  events: eventSelector(state)
}))(EventList)
