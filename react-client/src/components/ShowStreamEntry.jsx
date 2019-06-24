import React from 'react';
import styled from 'styled-components';

const Entry = styled.div`
    border: solid;
    margin-top: 10px;
    padding: 10px;
    margin-left: 100px;
    margin-right: 100px;
    border-width: thin;
    border-radius: 8px 8px 8px 8px;
    border-color: #A9A9A9;
`;

// stream of content will have media widget

const videoStyle = {
  border: "0",
  width: "100%",
  height: "120px",
};

// need to figure out how to render the end point

const ShowStreamEntry = (props) => {
  // split at the end point
  const key = props.show.links[0].split('=')[1];
  const cleanArr = props.show.attendess;
  console.log(key);
  return (
    <Entry>
        <h1>{props.show.artists}</h1>
          <div> at {props.show.venue}</div>
          <iframe width="360" height="205" src={`https://www.youtube.com/embed/${key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <h5>attending: {props.show.attendees}</h5>
    </Entry>
  )
}

export default ShowStreamEntry;

// how do i find out album number 

// https://sleepsl.bandcamp.com/album/dopesmoker
