import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2'
import Title from '../../components/title'
import Description from '../../components/description'
import './styles.css'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nationalityLabels: null,
      nationalityData: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.nationalityData &&
      props.nationalityData['values'] !== state.nationalityData
    ) {
      return {
        nationalityLabels: props.nationalityData['labels'],
        nationalityData: props.nationalityData['values']
      }
    }
    return null
  }

  renderNationalityChart() {
    return (
      <div className="content__wrapper">
        <div>
          <h1>Nationality Breakdown</h1>
        </div>
        <div>
          <Pie
            data={{
              labels: this.state.nationalityLabels,
              datasets: this.state.nationalityData
            }}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="School Analytics" />
            <Description text="University of Springfield Staff and Student Services" />
          </div>
          <div>
            {this.state.nationalityData && this.state.nationalityLabels ? (
              this.renderNationalityChart()
            ) : (
              <h1>Waiting.......</h1>
            )}
          </div>
          <div className="footerDiv" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    nationalityData: state.nationalities
  }
}

export default connect(mapStateToProps)(Screen)
