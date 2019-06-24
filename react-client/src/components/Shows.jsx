import React from 'react';
import AddShow from './AddShow.jsx';
import Axios from 'axios';
import ShowStream from './ShowStream.jsx';
import AllShowStream from './AllShowStream.jsx'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
`;

const MainStream = styled.div`
  float: left;
  margin-left: -520px;
  margin-top: 100px;
`;


// const AddShowDiv = styled.div`
//   float: right;
//   position:fixed;
//   margin-left: 760px;
//   margin-top: -50px;
// `;

const Upcoming = styled.h3`
  float: left;
  transform: scale(0.5);
  margin-left: 140px;
  margin-bottom: -10px;
`;

const OtherShows = styled.div`
  margin-left: 790px;
  margin-right: 100px;
  margin-top: 400px;
  float: right;
  position: absolute;
`;

const AddShowDiv = styled.div`
  float: right;
  margin-right: 100px;
  padding: 20px;
  margin-left: 600px;
  position: absolute;
  margin-top: 50px;
`;

const FontContainer = styled.div`
  transform: scale(0.5);
  float: right;
  margin-left: 550px;
  margin-top: 340px;
  margin-right: 50px;
  position: absolute;
`;


class Shows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      allShows: [],
      username: '',
    };
    this.grabShows = this.grabShows.bind(this);
    this.addUserToShow = this.addUserToShow.bind(this);
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
        console.log('hello');
        this.setState({
          shows: result.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addUserToShow (show) {
    const showObj = {
      showId: show._id,
      username: this.state.username
    }
    Axios.put('/shows', showObj)
      .then((result) => {
        console.log('after add user to show'), this.grabShows();
        this.grabAllShows();
      })
      .catch((err) => {

      })
  }

  grabAllShows () {
    Axios.get('/getAllShows')
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
      <Wrapper>
        <Upcoming>
        <a href="https://fontmeme.com/slayer-font/"><img src="https://fontmeme.com/permalink/190624/6205b1a7181be4fb54ed85c49155a9c7.png" alt="slayer-font" border="0"></img></a>
        </Upcoming>
        <MainStream>
          <ShowStream currentUser={this.props.currentUser} shows={this.state.shows}/>
        </MainStream>
        <AddShowDiv>
          <AddShow currentUser={this.props.currentUser} grabShows={this.grabShows} grabAllShows={this.grabAllShows}/>
        </AddShowDiv>
        <FontContainer>
          <a href="https://fontmeme.com/slayer-font/"><img src="https://fontmeme.com/permalink/190624/bad9d146d4dabdfdc388083249c42a6f.png" alt="slayer-font" border="0"></img></a>
        </FontContainer>
        <OtherShows>
          <AllShowStream completeShowList={this.state.allShows} currentUser={this.props.currentUser} addUserToShow={this.addUserToShow}/> 
          </OtherShows>
      </Wrapper>
    )
  }
}

export default Shows;