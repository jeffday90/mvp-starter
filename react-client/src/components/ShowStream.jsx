import React from 'react';
import ShowStreamEntry from './ShowStreamEntry.jsx'
import styled from 'styled-components';


const ShowStream = (props) => {
  return (
    <div>
        <div>
          {props.shows.map(show => <ShowStreamEntry show={show}/>)}
        </div>
    </div>
  )
}

export default ShowStream;