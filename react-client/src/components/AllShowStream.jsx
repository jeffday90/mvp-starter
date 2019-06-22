import React from 'react';
import AllShowStreamEntry from './AllShowStreamEntry.jsx'

const AllShowStream = (props) => {
  return (
    <div>
        <div>
            {props.shows.map(show => <AllShowStreamEntry show={show}/>)}
        </div>
    </div>
  )
}

export default AllShowStream;