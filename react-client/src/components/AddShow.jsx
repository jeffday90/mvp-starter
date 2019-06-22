import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Wrapper = styled.div`
    margin-top: 200px;

`;

const AddAnArtist = styled.div``;

const AddDetails = styled.div``;


//TODO: make sure the state gets re-set after every show add and artist add

class AddShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistStr: '',
      linkStr: '',
      artists: [],
      links: [],
      venue: '',
      day: '',
      month: '',
      year: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleArtist = this.handleArtist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // for each artist allow the user to add a media (soundcloud/ bandcamp)

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    }, console.log(this.state));
  }
  
  handleArtist (e) {
    const { artistStr, artists, linkStr, links } = this.state;
    e.preventDefault();
    const artistArr = artists;
    artistArr.push(artistStr);
    const linkArr = links
    linkArr.push(linkStr);

    // //TODO: 
    //     // organize by date here!!!!

    this.setState({
      artists: artistArr,
      links: linkArr,
      linkStr: '',
      artistStr: '',
    });

    // render the link
  }

  handleSubmit (e) {
    e.preventDefault();
    const attendeesArr = [];
    attendeesArr.push(this.props.currentUser[0].username)
    const { artists, links, venue, day, month } = this.state;
    const newShow = {
      artists: artists,
      attendees: attendeesArr,
      links: links,
      venue: venue,
      day: day,
      month: month,
    }
    Axios.post('/shows', newShow)
      .then((result) => {
        console.log(result);
        this.props.grabShows();
      })
      .catch ((err) => {
        console.log(err);
      })  
  }

  // allow user to add a link to media (youtube), bandcamp, soundcloud
    // immediately render artist and media, submit when all fields are entered

  render () {
    return (
      <Wrapper>
          <h3>Add an Event Here:</h3>
          <AddAnArtist>
          <form onSubmit={this.handleArtist}>
            <div>
            <label>
                Add Artist(s):
                <input type="text" name="artistStr" onChange={this.handleChange} />
            </label>
            <label>
                Add a link(s):
                <input type="text" name="linkStr" onChange={this.handleChange} />
            </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
          </AddAnArtist>

          <AddDetails>
          <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            Venue:
            <input type="text" name="venue" onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            Day:
            <input type="text" name="day" onChange={this.handleChange} />
          </label>
          </div>
          <div>
          <label>
            Month:
            <input type="text" name="month" onChange={this.handleChange} />
          </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        </AddDetails>
      </Wrapper>
    )
  }



}

export default AddShow;