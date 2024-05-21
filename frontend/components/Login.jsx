import React, { useState } from 'react';
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3000/auth/login", {
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate('/dashboard')
            }
        }).catch(err => {
            console.log(error)
        })
    }

    return (
        <LoginContainer>
            <form className='wrapper' onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <div className='input-box'>
                    <input 
                        type="email" 
                        autoComplete='off'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-box'>
                    <input 
                        type="password" 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Log In</button>
                <div className="register">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .wrapper {
        width: 440px;
        background: var(--secondary-color);
        border-radius: 10px;
        padding: 40px 45px;
    }

    .wrapper h1 {
        font-size: 35px;
        text-align: center;
    }

    .wrapper .input-box {
        width: 100%;
        height: 50px;
        margin: 30px 0;
    }

    .input-box input {
        width:100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        border: 2px solid;
        border-radius: 10px;
        padding: 20px 45px 20px 20px;

        &::placeholder {
            color: var(--placeholder-color);
          }
    }

    .submit-button {
        width: 100%;
        height: 45px;
        border: none;
        outline: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        background: var(--button-color);
        border: 2px solid var(--button-color);
    }

    .register {
        font-size: 14px;
        text-align: center;
        margin: 20px 0 10px;
    }

    .register p a {
        text-decoration: none;
        font-weight: 600;
    }

    .register p a:hover {
        text-decoration: underline;
    }
`;

export default Login