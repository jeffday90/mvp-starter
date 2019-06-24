import React from 'react';
import styled from 'styled-components';

const OtherShowWrapper = styled.div`
  border: solid;
  border-width: thin;
  border-radius: 8px 8px 8px 8px;
  border-color: #A9A9A9;
  margin-top: 20px;
  margin-right: 200px;

`;


class AllShowStreamEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      currentShow: '',
    }
    this.passToTop = this.passToTop.bind(this);
  }

  passToTop () {
    const currentShow = this.props.show;
    this.setState({
      currentShow: currentShow,
      clicked: true,
    }, () => this.props.addUserToShow(currentShow));
  }


  render () {
    return (
        <OtherShowWrapper>
            <h3> {this.props.show.artists}</h3>
                <div> at {this.props.show.venue}</div>
            <h6>attending: {this.props.show.attendees}</h6>
            <button onClick={this.passToTop}>
                Do you want to go to this event?
            </button>
        </OtherShowWrapper>
    );
  }
}


export default AllShowStreamEntry;