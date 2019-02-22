import React from 'react'
import EventParticipant from './event-participant'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'

function EventParticipants({ ids, people }) {
  if (!ids.length) return null
  return (
    <div>
      <h5>Participants:</h5>
      <ul>
        {ids.map((id) => (
          <EventParticipant
            key={id}
            person={people.find(({ id: personId }) => personId == id)}
          />
        ))}
      </ul>
    </div>
  )
}

EventParticipants.propTypes = {}

export default connect((state) => ({
  people: peopleSelector(state)
}))(EventParticipants)
