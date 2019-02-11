import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { isSignInErrorSelector } from '../../ducks/auth'

class SignInForm extends Component {
  static propTypes = {}

  render() {
    const { isSignInError } = this.props
    console.log(this.props)
    return (
      <div>
        <h3>Sign In</h3>
        {!isSignInError ? this.renderForm : this.renderError}
      </div>
    )
  }

  get renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <div>email:</div>
          <div>
            <Field component="input" name="email" />
          </div>
        </div>
        <div>
          <div>password:</div>
          <div>
            <Field component="input" name="password" type="password" />
          </div>
        </div>
        <button type="submit">Sign In</button>
      </form>
    )
  }

  get renderError() {
    return <h4>It was third attempt to sing in. Good bye...</h4>
  }
}

export default connect(
  (state) => ({
    isSignInError: isSignInErrorSelector(state)
  }),
  null,
  null,
  { pure: false }
)(
  reduxForm({
    form: 'sign-in'
  })(SignInForm)
)
