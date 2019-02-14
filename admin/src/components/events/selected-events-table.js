import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import 'react-virtualized/styles.css'

export class VirtualizedSelectedEventsTable extends Component {
  static propTypes = {}

  render() {
    const { selectedEvents } = this.props
    if (!selectedEvents.length) return 'No events were selected'
    return (
      <Table
        width={600}
        height={400}
        rowHeight={40}
        headerHeight={60}
        overscanRowCount={5}
        rowCount={selectedEvents.length}
        rowGetter={this.rowGetter}
        onRowClick={this.handleClick}
      >
        <Column dataKey="title" label="Title" width={300} />
        <Column dataKey="where" label="Where" width={300} />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.selectedEvents[index]
  handleClick = ({ rowData }) => this.props.toggleSelection(rowData.id)
}

export default connect((state) => ({
  selectedEvents: selectedEventsSelector(state)
}))(VirtualizedSelectedEventsTable)
