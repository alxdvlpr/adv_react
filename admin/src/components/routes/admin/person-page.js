import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../../ducks/people'
import NewPersonForm from '../../people/new-person-form'
import PeopleList from '../../people/people-list'
import SelectedEventsList from '../../events/selected-events-list'
import EventLazyTable from '../../events/virtualized-lazy-table'
import Trash from '../../common/trash'

class PersonPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Add new person</h2>
        <SelectedEventsList />
        <PeopleList />
        <EventLazyTable />
        <NewPersonForm onSubmit={this.props.addPerson} />
        <Trash />
      </div>
    )
  }
}

export default connect(
  null,
  { addPerson }
)(PersonPage)
