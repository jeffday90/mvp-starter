import React from 'react';
import styled from 'styled-components';

const Entry = styled.div`
    border: solid;
    margin-top: 10px;
    padding: 10px;
    margin-left: 100px;
    margin-right: 100px;
`;

// stream of content will have media widget

const videoStyle = {
  border: "0",
  width: "100%",
  height: "120px",
};

// need to figure out how to render the end point

const ShowStreamEntry = (props) => {
  return (
    <Entry>
        <h1>{props.show.artists}</h1>
          <div> at {props.show.venue}</div>
            <iframe style={videoStyle} src="https://bandcamp.com/EmbeddedPlayer/album=dopesmoker/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href={props.show.link}>{props.show.artists}</a></iframe>
          <h5>attending: {props.show.attendees}</h5>
    </Entry>
  )
}

export default ShowStreamEntry;

// how do i find out album number 

// https://sleepsl.bandcamp.com/album/dopesmoker
