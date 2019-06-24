import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';


// TODO:     
    // fix -> new show get's added with every count
    // make the page load the new user's blank home screen

const FormLabel = styled.div`
  padding: 5px;
  margin-top: 2px;
  margin-left: 150px;
  margin-right: 120px;
  text-align: left;
`;

const ButtonStyle = styled.div`
  text-align: right;
  display: inline;
`;


class NewAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      zip: '',
    };
    this.grabInputs = this.grabInputs.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
  }

  grabInputs (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  tossUpNewUserInfo (result) {
    const { username, password } = this.state;
    console.log(username, password)
    Axios.get('/user', {
        params: {
          username: username,
          password: password,
        }
      })
      .then((result) => {
        console.log('in toss up nwe user', result);
        this.props.checkAuthenticatedStatus(result.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  submitNewUser (e) {
    e.preventDefault();
    const { firstName, lastName, username, email, password, zip } = this.state;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      zip: zip,
    }

    // check for existence of username

    Axios.post('/user', newUser)
      .then((result) => {
        this.tossUpNewUserInfo();
      })
      .catch ((err) => {
        console.log(err);
      })  

  }


  render() {
    return (
      <div>
        <form onSubmit={this.submitNewUser}>
            <FormLabel>
                <label>
                    First Name:
                        <input type="text" name="firstName" onChange={this.grabInputs}/>
                </label>
            </FormLabel>
            <FormLabel>
                <label>
                    Last Name:
                        <input type="text" name="lastName" onChange={this.grabInputs}/>
                </label>
            </FormLabel>
            <FormLabel>
                <label>
                    Username:
                        <input type="text" name="username" onChange={this.grabInputs}/>
                </label>
            </FormLabel>
            <FormLabel>
                <label>
                    Email:
                        <input type="text" name="email" onChange={this.grabInputs}/>     
                </label>
            </FormLabel>
            <FormLabel>
                <label>
                    Password:
                    <ButtonStyle>
                        <input type="password" name="password" onChange={this.grabInputs}/>
                    </ButtonStyle>
                </label>
            </FormLabel>
            <FormLabel>
                <label>
                    Zip code:
                        <input type="text" name="zip" onChange={this.grabInputs}/>
                </label>   
            </FormLabel>     
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default NewAccount;
