import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx'
import FrontPage from './components/FrontPage.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInfo: [],
      loggedIn: false,
    }
    this.checkAuthenticatedStatusAndGrabInfo = this.checkAuthenticatedStatusAndGrabInfo.bind(this);
  }

  checkAuthenticatedStatusAndGrabInfo(userInfo) {
    //TODO: there is somethign awry with new user routing... make sure to check on this
    this.setState({
      loggedIn: true,
      userInfo: userInfo,
    });
  }

  render () {
    const { loggedIn, userInfo } = this.state;
    return (
    <div style={centerizer}>
      <h1>gigger</h1>
      { !loggedIn && <Login checkAuthenticatedStatus={this.checkAuthenticatedStatusAndGrabInfo}/>}
      { loggedIn && <FrontPage userInfo={this.state.userInfo}/>}
    </div>
    )

  }
}

const centerizer = {
  textAlign: "center"
}

ReactDOM.render(<App />, document.getElementById('app'));