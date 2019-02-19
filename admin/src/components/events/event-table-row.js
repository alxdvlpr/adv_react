import React from 'react'

function EventTableRow({ event, onClick }) {
  return (
    <tr className="test__events-table--item" onClick={onClick}>
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )
}

EventTableRow.propTypes = {}

export default EventTableRow
