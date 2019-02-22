import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDragPreview extends Component {
  render() {
    if (!this.props.person) return null

    return (
      <div>
        <h2>{this.props.person.email}</h2>
      </div>
    )
  }
}

export default connect((state, props) => ({
  person: personSelector(state, props)
}))(PersonDragPreview)
