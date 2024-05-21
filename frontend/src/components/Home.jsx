import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    axios.get('http://localhost:3000/users/verify')
      .then(response => {
        // adding else statement here does not work because res returns error before status
        if (response.data.status) {
          navigate('/dashboard')
        }
      }).catch(error => {
        navigate('/login')
        console.log(error)
      })
  }

  const handleSignup = () => {
    axios.get('http://localhost:3000/users/verify')
      .then(response => {
        if (response.data.status) {
          navigate('/dashboard')
        }
      }).catch(error => {
        navigate('/signup')
        console.log(error)
      })
  }


  return (
    <HomeContainer>
      <div className="NavBar">
        <h1>Welcome</h1>
        <div className="Button">
          <div className="login-button" onClick={handleLogin}>
            Log In
          </div>
          <div className="signup-button" onClick={handleSignup}>
            Sign Up
          </div>
        </div>
      </div>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  .NavBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    padding: 30px 25%;
    align-items: center;
    border-bottom: 2px solid;
    background-color: var(--secondary-color);
  }

  .Button {
    display: flex;
  }

  .login-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 15px 15px;
    border: 2px solid;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      color: #0f2c85;
    }
  }

  .signup-button {
    background: #556B2F;
    margin-left: 10px;
    font-weight: 600;
    font-size: 1rem;
    padding: 15px 15px;
    border: 2px solid #556B2F;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      background: var(--hover-color);
    }
  }
  
`;

export default Home