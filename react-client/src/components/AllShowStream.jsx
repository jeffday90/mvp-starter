import React from 'react';
import AllShowStreamEntry from './AllShowStreamEntry.jsx'
import styled from 'styled-components';


const AllShowStream = (props) => {
  return (
    <div>
        {props.completeShowList.map(show => <AllShowStreamEntry addUserToShow={props.addUserToShow} show={show}/>)}
    </div>
  )
}

export default AllShowStream;