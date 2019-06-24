import React from 'react';
import NewAccount from './NewAccount.jsx'
import Axios from 'axios';
import styled from 'styled-components';

const NewUserDiv = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  padding: 10px;
  margin-bottom: 10px;

`;

const FormDiv = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;


const Wrapper = styled.div`
  border: solid;
  padding: 20px;
  margin-left: 350px;
  margin-right: 350px;
  margin-top: 100px;
  border-width: thin;
  border-radius: 8px 8px 8px 8px;
  border-color: #A9A9A9;

`;

const Footer = styled.div`
  margin-top: 170px;
`;

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      newAccount: false,
      validUserName: false,
      showPasswordError: false,
    }
    this.grabInputs = this.grabInputs.bind(this);
    this.makeNewAccount = this.makeNewAccount.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
  }

  grabInputs (e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  makeNewAccount (e) {
    e.preventDefault();
    this.setState({
      newAccount: !this.state.newAccount
    })
  }

  checkUserName (e) {
    e.preventDefault();
    const { username, password, newAccount } = this.state;
    
    if (password === '') {
      this.setState({
        showPasswordError: true,
      })
      return;
    }

    Axios.get('/user', {
        params: {
          username: username,
          password: password,
        }
      })
      .then((results) => {
        if (results.data === 'account not found') {
          this.setState({
            newAccount: !newAccount
          })

          // maybe make a modal here that shows account doesn't exist

        } else if (results.data === 'Wrong password') {
          this.setState({
            showPasswordError: true,
          })
        } else {
          this.props.checkAuthenticatedStatus(results.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render () {
    const { newAccount, showPasswordError } = this.state;
    return (
      <div>
      <Wrapper>
      { !newAccount && 
      <FormDiv>
          <form onSubmit={this.checkUserName}>
            <div>
              { showPasswordError && 
              <div>THIS IS NOT THE CORRECT PASSWORD</div>}
              <label>
                Username:
                <input type="text" name="username" onChange={this.grabInputs}/>
              </label>
            </div>
            <div>
              <label>
                Password:
                <input type="password" name="password" onChange={this.grabInputs}/>
              </label>
            </div>
            <input type="submit" value="Submit"/>
          </form>
      </FormDiv>
      }
            <div>
                <div>
                  { !newAccount && 
                    <NewUserDiv>
                      <div>New to Concerto?</div>
                        <button onClick={this.makeNewAccount}>
                            Sign Up
                        </button>
                    </NewUserDiv>
                  }
                </div>
      { newAccount && <NewAccount checkAuthenticatedStatus={this.props.checkAuthenticatedStatus}/>}
      </div>
    </Wrapper>
    <Footer>By logging in, you agree to <span className="highlight">Concerto's</span> Terms of Service and Privacy Policy.</Footer>
    </div>
    )
  }

}

// get and or post to database to grab client

export default Login;