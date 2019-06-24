import React from 'react';
import Shows from './Shows.jsx';

class FrontPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userInfo: [],
      shows: [],
    }
  }

  componentWillMount() {
    this.fillUserInfo();
  }

  fillUserInfo () {
    this.setState({
      userInfo: this.props.userInfo
    })
  }

  render () {
    const { userInfo } = this.state;
    return (
      <div>
        <h4>Hello {userInfo[0].firstName}, welcome to Concerto! </h4>
        <Shows currentUser={userInfo}/>
      </div>

    )
  }

}

export default FrontPage;