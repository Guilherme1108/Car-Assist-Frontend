import logo from '../../assets/logo.svg'
import { Calendar, MessageSquare, ChevronLeft } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import './Topbar.css'

const Topbar = () => {
  const location = useLocation();

  const navigate = useNavigate()

  const pagesWithIcons = ["/home"]; // adicionar mais rotas aqui depois
  const showIcons = pagesWithIcons.includes(location.pathname)

  const pagesWithreturnIcon = [ "/home/veiculo", "/home/veiculo/manutencao", "/home/veiculo/gastos",
                                "/perfil", "/servicos"
                              ]; // adicionar mais rotas aqui depois

  const pagesWithNoShadowBox = [ "/"]


  const showReturnIcon = pagesWithreturnIcon.includes(location.pathname)

  return (
    <div className="topBar">
  <div className="side left">
    {showIcons && (
      <>
        <Calendar size={32} />
        <MessageSquare size={32} />
      </>
    )}

{showReturnIcon && (
      <>
        <ChevronLeft size={32} 
        onClick={() => {
          navigate(-1)
        }} />
      </>
    )}

  </div>

  <img src={logo} alt="logo" className="logo" />

  <div className="side right" />
</div>
  )
}

export default Topbar