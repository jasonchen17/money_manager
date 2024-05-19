import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          navigate('/dashboard')
        } else {
          navigate('/login')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const handleSignup = () => {
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          navigate('/dashboard')
        } else {
          navigate('/signup')
        }
      }).catch(err => {
        console.log(err)
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
    background-color: #181c34;
    width: 100%;
    height: 100px;
    padding: 30px 25%;
    align-items: center;
  }

  .Button {
    display: flex;
  }

  .login-button {
    font-weight: 600;
    font-size: 1rem;
    padding: 15px 15px;
    background-color: #181c34;
    border: 2px solid #8B4513;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      background-color: #e1e4f1;
      border: 2px solid #fbebe0;
    }
  }

  .signup-button {
    margin-left: 10px;
    font-weight: 600;
    font-size: 1rem;
    padding: 15px 15px;
    background-color: #6B8E23;
    border: 2px solid #6B8E23;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      background-color: #f2f8e4;
      border: 2px solid #f2f8e4;
    }
  }
  
`;

export default Home