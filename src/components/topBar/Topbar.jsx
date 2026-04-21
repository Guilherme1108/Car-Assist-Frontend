import logo from '../../assets/logo.svg'
import { Calendar, MessageSquare } from "lucide-react"
import { useLocation } from "react-router-dom"
import './Topbar.css'

const Topbar = () => {
  const location = useLocation();

  const pagesWithIcons = ["/menu"]; // adiciona mais rotas aqui depois
  const showIcons = pagesWithIcons.includes(location.pathname)

  return (
    <div className="topBar">
  <div className="side left">
    {showIcons && (
      <>
        <Calendar size={32} />
        <MessageSquare size={32} />
      </>
    )}
  </div>

  <img src={logo} alt="logo" className="logo" />

  <div className="side right" />
</div>
  )
}

export default Topbar