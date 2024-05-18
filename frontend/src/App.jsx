import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "../components/Signup"
import Login from "../components/Login"
import Home from "../components/Home"
import Dashboard from "../components/Dashboard"
import AddTransaction from "../components/AddTransaction"
import Transactions from "../components/Transactions"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add-transaction" element={<AddTransaction />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
