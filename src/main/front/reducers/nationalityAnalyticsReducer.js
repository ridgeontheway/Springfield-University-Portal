import { NATIONALITY_ANALYTICS } from '../actions/types'

export default function nationalityAnalyticsReducer(state = null, action) {
  switch (action.type) {
    case NATIONALITY_ANALYTICS:
      const data = action.result
      const formattedLabels = Object.keys(data)
      const chartColors = []
      // Generating random chart colors based on data
      formattedLabels.forEach(element => {
        var r = Math.floor(Math.random() * 200)
        var g = Math.floor(Math.random() * 200)
        var b = Math.floor(Math.random() * 200)
        const color = 'rgb(' + r + ', ' + g + ', ' + b + ')'
        chartColors.push(color)
      })

      const parsedData = {
        labels: formattedLabels,
        values: [
          {
            backgroundColor: chartColors,
            borderColor: 'rgb(0, 0, 0)',
            data: Object.values(data)
          }
        ]
      }
      return parsedData || false
    default:
      return state
  }
}
