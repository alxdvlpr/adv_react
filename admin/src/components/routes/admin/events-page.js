import React, { Component } from 'react'
import EventsTable from '../../events/virtualized-events-table'
import SelectedEventsList from '../../events/selected-events-table'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h4>Selected Events Table:</h4>
        <SelectedEventsList />
        <h4>All Events Table:</h4>
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
