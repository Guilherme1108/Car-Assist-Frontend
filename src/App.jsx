import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './pages/login/Login'
import RegisterAccountScreen from './pages/registerAccount/RegisterAccount'
import Layout from './layouts/Layout'
import HomeScreen from './pages/home/Home'
import VehicleScreen from './pages/vehicle/Vehicle'
import MaintenanceScreen from './pages/maintenance/Maintenance'
import ExpensesScreen from './pages/expenses/Expenses'
import ProfileScreen from './pages/profile/Profile'
import ServiceScreen from './pages/servicesScreen/Service'
import NewCarScreen from './pages/newCar/NewCar'
import NewMaintenence from './pages/newMaintenence/NewMaintenence'
import TransferScreen from './pages/transfer/Transfer'
import ExpensesDetail from './pages/Category/Category'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterAccountScreen />} />
        

        <Route path="/home" element={<HomeScreen />} />
        <Route path="/perfil" element={<ProfileScreen />} />
        <Route path="/servicos" element={<ServiceScreen />} />
        <Route path="/home/cadastrarveiculo" element={<NewCarScreen />} />
        <Route path="/home/veiculo/editar/:id" element={<NewCarScreen />} />
        
        <Route path="/home/veiculo" element={<VehicleScreen />} />
        <Route path="/home/veiculo/manutencao" element={<MaintenanceScreen />} />
        <Route path="/home/veiculo/manutencao/criar" element={<NewMaintenence />} />
        <Route path="/home/veiculo/manutencao/editar/:id" element={<NewMaintenence />} />
        <Route path="/home/veiculo/gastos" element={<ExpensesScreen />} />
         <Route path="/home/veiculo/gastos/categoria" element={<ExpensesDetail  />} />
        <Route path="/home/veiculo/transferencia" element={<TransferScreen />} />
      </Route>
    </Routes>
  );
}

export default App