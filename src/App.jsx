import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './pages/login/Login'
import RegisterAccount from './pages/registerAccount/RegisterAccount'
import Layout from './layouts/Layout'
import MenuScreen from './pages/menu/Menu'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterAccount />} />
        <Route path="/menu" element={<MenuScreen/>} />
      </Route>
    </Routes>
  )
}

export default App
