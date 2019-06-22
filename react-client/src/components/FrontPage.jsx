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
    console.log(this.props.userInfo)
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
        <div>Hello {userInfo[0].firstName}, welcome to gigger! </div>
        <Shows currentUser={userInfo}/>
      </div>

    )
  }

}

export default FrontPage;