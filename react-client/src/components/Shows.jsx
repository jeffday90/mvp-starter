import React from 'react';
import AddShow from './AddShow.jsx';
import Axios from 'axios';
import ShowStream from './ShowStream.jsx';
import styled from 'styled-components';

const OtherShows = styled.div``;

class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      allShows: [],
    };
    this.grabShows = this.grabShows.bind(this);
  }

  componentWillMount() {
    this.grabAllShows();
    this.grabShows();
  }

  grabShows () {
    const username = this.props.currentUser[0].username;
    Axios.get('/shows', {
        params: {
          username: username
        }
      })
      .then((result) => {
        this.setState({
          shows: result.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  grabAllShows () {
    Axios.get('/shows')
      .then((result) => {
        this.setState({
          allShows: result.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render () {
    return (
      <div>
        <OtherShows>
          <div>Other shows: <AllShowStream allShows={this.state.allShows}/> </div>
        </OtherShows>
        <h3>Upcoming events: </h3>
        <ShowStream currentUser={this.props.currentUser} shows={this.state.shows}/>
        <AddShow currentUser={this.props.currentUser} grabShows={this.grabShows}/>
      </div>
    )
  }
}

export default Shows;