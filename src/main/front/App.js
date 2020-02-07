const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    render() {
        return (
            <h2>Hello World??</h2>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)