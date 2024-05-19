import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
      axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          
        }
      }).catch(err => {
        console.log(err)
      })
  }

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
    <HeaderContainer>
      <h1>Welcome</h1>
      <div>
        <LoginButton onClick={handleLogin}>
          Log In
        </LoginButton>
        <SignupButton onClick={handleSignup}>
          Sign Up
        </SignupButton>
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #181c34;
  width: 100%;
  height: 100px;
  padding: 30px 25%;
  align-items: center;
`

const LoginButton = styled.button`
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
`

const SignupButton = styled.button`
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
`

export default Home