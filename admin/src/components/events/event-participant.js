import React from 'react'

function EventParticipant({ person }) {
  return <li>{`${person.firstName}, ${person.lastName} (${person.email})`}</li>
}

EventParticipant.propTypes = {}

export default EventParticipant
