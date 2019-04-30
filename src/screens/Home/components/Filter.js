import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {createStructuredSelector} from 'reselect'
import {CHANGE_SEX, LOAD_WEATHER_REQUEST} from "../actions";

class Filter extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: LOAD_WEATHER_REQUEST,
    })
  }

  changeSex = payload => () => {
    this.props.dispatch({
      type: CHANGE_SEX,
      payload
    })
  }

  render() {

    const {currentSex} = this.props.Home

    return <div>

      <label>
        <input type="checkbox"
               checked={currentSex === 'male'}
               onChange={this.changeSex('male')}/>
        &nbsp;Male
      </label>

      <label>
        <input type="checkbox"
               checked={currentSex === 'female'}
               onChange={this.changeSex('female')}/>
        &nbsp;Female
      </label>

    </div>
  }
}

Filter.propTypes = {
  Home: PropTypes.any.isRequired
}

const selectors = createStructuredSelector({
  Home: store => store.Home
})

export default connect(selectors)(Filter);
