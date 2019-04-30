import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {createStructuredSelector} from 'reselect'
import Filter from './components/Filter'

class Home extends Component {

  renderBestMatch() {

    const {isLoading, bestMatch} = this.props.Home

    if (isLoading) return <div className="text-center text-success">Loading...</div>

    if (!bestMatch) return <div className="text-center text-danger">No city found</div>

    return <div className="row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mx-auto">
        <div className="card bg-secondary mb-3">
          <div className="card-header p-2">
            <h4 className="m-0 font-weight-bold text-success">{bestMatch.name}</h4>
          </div>
          <div className="card-body p-2">
            Temperature: {bestMatch.main.temp}*C
            Humidity: {bestMatch.main.humidity}%
          </div>
        </div>
      </div>
    </div>
  }

  renderRelevant() {

    const {isLoading, relevantMatches} = this.props.Home

    if (isLoading) return <div className="text-center text-success">Loading...</div>

    if (relevantMatches.length === 0) return <div className="text-center text-danger">No cities found</div>

    return <div className="row">
      {relevantMatches.map((item, i) => <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mx-auto">
        <div className="card bg-secondary mb-3">
          <div className="card-header p-2">
            <h5 className="h5 m-0 font-weight-bold">#{i + 1}&nbsp;{item.name}</h5>
          </div>
          <div className="card-body p-2">
            Temperature: {item.main.temp}*C
            Humidity: {item.main.humidity}%
          </div>
        </div>
      </div>)}
    </div>
  }

  render() {

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">The best weather on earth</h1>

          <Filter/>

          <h2 className="text-center">Best match</h2>
          {this.renderBestMatch()}

          <h2 className="text-center">Relevant results</h2>
          {this.renderRelevant()}

        </div>
      </div>


    </div>
  }
}

Home.propTypes = {
  Home: PropTypes.any.isRequired
}

const selectors = createStructuredSelector({
  Home: store => store.Home
})

export default connect(selectors)(Home);
