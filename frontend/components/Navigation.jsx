import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Navigation = () => {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
        .then(res => {
          if (res.data.status) {
            navigate('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }

    return (
        <NavStyled>
            <div>
                <div className="user">
                <i class="fa-solid fa-circle-user"></i>
                    <h2>Jason Chen</h2>
                </div>
                <ul className="menu-items">
                    <li>
                        <i class="fa-solid fa-chart-line"></i>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <i class="fa-solid fa-credit-card"></i>
                        <Link to="/transactions">Transactions</Link>
                    </li>
                    <li>
                        <i class="fa-solid fa-money-bill-transfer"></i>
                        <Link to="/add-transaction">Add Transaction</Link>
                    </li>
                </ul>    
            </div>

            <ul className="menu-items">
                <li onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </li>
            </ul>
        </NavStyled>
    )
}

const NavStyled = styled.div`
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 30px 0px;
    background: grey;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .user {
        display: flex;
        align-items:center;
        justify-content: left;
        width: 100%;
        padding-bottom: 10px;
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
        margin-bottom: 10px;
        padding: 10px 10px;
        border-radius: 5px;
    }

    ul li span {
        margin-left: 10px;
    }

    ul li:hover {
        background: #333;
    }

    ul li a {
        text-decoration: none;
        padding-left: 10px;
        font-size: 16px;
    }



`;

export default Navigation