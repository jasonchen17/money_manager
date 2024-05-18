import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/add-transaction">Add Transaction</Link>
                </li>
                <li>
                    <Link to="/transactions">Transactions</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation