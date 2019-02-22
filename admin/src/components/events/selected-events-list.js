import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'

class SelectedEventsList extends Component {
  static propTypes = {}

  render() {
    return (
      <List
        width={400}
        height={300}
        rowCount={this.props.events.length}
        rowHeight={150}
        rowRenderer={this.rowRenderer}
        data={this.props.events} // Overhead for re-rendering then events update
      />
    )
  }

  rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <SelectedEventCard event={this.props.events[index]} />
    </div>
  )
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEventsList)
