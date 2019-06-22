import React from 'react';
import Axios from 'axios';

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
    Axios.get('/user', {
        params: {
          username: username,
          password: password,
        }
      })
      .then((results) => {
        console.log(results);
        this.props.checkAuthenticatedStatus(results.data)
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
            <div>
                <label>
                    First Name:
                        <input type="text" name="firstName" onChange={this.grabInputs}/>
                </label>
            </div>
            <div>
                <label>
                    Last Name:
                        <input type="text" name="lastName" onChange={this.grabInputs}/>
                </label>
            </div>
            <div>
                <label>
                    Username:
                        <input type="text" name="username" onChange={this.grabInputs}/>
                </label>
            </div>
            <div>
                <label>
                    Email:
                        <input type="text" name="email" onChange={this.grabInputs}/>     
                </label>
            </div>
            <div>
                <label>
                    Password:
                        <input type="password" name="password" onChange={this.grabInputs}/>
                </label>
            </div>
            <div>
                <label>
                    Zip code:
                        <input type="text" name="zip" onChange={this.grabInputs}/>
                </label>   
            </div>     
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default NewAccount;
