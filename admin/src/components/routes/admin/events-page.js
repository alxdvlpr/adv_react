import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvents } from '../../../ducks/events'
import EventList from '../../events/event-list'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    return (
      <div>
        <h2>Event List:</h2>
        <EventList />
      </div>
    )
  }
}

export default connect(
  null,
  { fetchEvents }
)(EventsPage)
