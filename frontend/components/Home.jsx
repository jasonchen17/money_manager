import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  const handleDashboard = () => {
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          navigate('/dashboard')
        } else {
          alert('You need to log in to access the dashboard')
          navigate('/')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
        Home
        <button onClick={handleDashboard}>Dashboard</button>
        <button><Link to="/login" >Login</Link></button>
        <button><Link to="/signup" >Signup</Link></button>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home