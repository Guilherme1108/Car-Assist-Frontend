import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './pages/login/Login'
import RegisterAccountScreen from './pages/registerAccount/RegisterAccount'
import Layout from './layouts/Layout'
import HomeScreen from './pages/home/Home'
import VehicleScreen from './pages/vehicle/Vehicle'
import MaintenanceScreen from './pages/maintenance/Maintenance'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterAccountScreen />} />
        <Route path="/home" element={<HomeScreen/>} />
        <Route path="/home/veiculo" element={<VehicleScreen/>} />
        <Route path="/home/veiculo/manutencao" element={<MaintenanceScreen/>} />
      </Route>
    </Routes>
  )
}

export default App