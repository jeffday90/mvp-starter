import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx'
import FrontPage from './components/FrontPage.jsx'
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Noto+Serif&display=swap');
    font-family: 'Noto Serif', serif;
  }

`;


const Title = styled.div`
  margin-left: 300px;
  margin-right: 300px;
  margin-top: 50px;
  padding: 5px;
`;

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
      <GlobalStyles/>
      <Title>
      <a href="https://fontmeme.com/slayer-font/"><img src="https://fontmeme.com/permalink/190624/028cf0dcbfd3809e74ca36bf7d48e961.png" alt="slayer-font" border="0"></img></a>
      </Title>
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