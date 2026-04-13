import Topbar from '../components/Topbar'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <Topbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout