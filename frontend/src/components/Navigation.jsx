import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Navigation = () => {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('http://localhost:3000/users/logout')
        .then(res => {
          if (res.data.status) {
            navigate('/')
          }
        }).catch(error => {
          console.log(error)
        })
    }

    return (
        <NavStyled>
            <div>
                <div className="user">
                <i className="fa-solid fa-circle-user"></i>
                    <h2>Jason Chen</h2>
                </div>
                <ul className="menu-items">
                    <li onClick={() => navigate('/dashboard')}>
                        <i className="fa-solid fa-chart-line"></i>
                        <span>Dashboard</span>
                    </li>
                    <li onClick={() => navigate('/transactions')}>
                        <i className="fa-solid fa-credit-card"></i>
                        <span>Transactions</span>
                    </li>
                    <li onClick={() => navigate('/add-transaction')}>
                        <i className="fa-solid fa-money-bill-transfer"></i>
                        <span>Add Transaction</span>
                    </li>
                </ul>    
            </div>

            <ul className="menu-items">
                <li onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </li>
            </ul>
        </NavStyled>
    )
}

const NavStyled = styled.div`
    width: 300px;
    margin-left: 2rem;
    height: 77rem;
    top: 50%;
    transform: translateY(-50%);
    position: fixed;
    padding: 30px 0px;
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: var(--secondary-color);

    .user {
        display: flex;
        align-items:center;
        justify-content: left;
        width: 100%;
        padding-bottom: 20px;
        margin-left: 10px;
    }

    .user h2 {
        font-size: 20px;
        font-weight: 600px;
    }

    .fa-circle-user {
        font-size: 40px;
        color: white;
        margin-right: 10px;
        margin-left: 10px;
    }

    ul {
        padding: 10px 10px;
    }

    ul li {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 5px;
        padding: 10px 10px;
        border-radius: 5px;
    }

    ul li span {
        margin-left: 10px;
    }

    ul li:hover {
        background: var(--hover-color);
    }

`;

export default Navigation