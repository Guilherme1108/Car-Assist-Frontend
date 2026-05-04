import {Home, Wrench, User} from "lucide-react";
import {useNavigate, useLocation} from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navBar">
      <div className="spaceImage">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="containerIcons">
        <div
          className={`item ${isActive("/services") ? "active" : ""}`}
          onClick={() => navigate("/services")}
        >
          <Wrench size={32} />
          <span className="titleNavigationOption">Serviços</span>
        </div>

        <div
          className={`item ${isActive("/home") ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <Home size={32} />
          <span className="titleNavigationOption">Garagem</span>
        </div>

        <div
          className={`item ${isActive("/profile") ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          <User size={32} />
          <span className="titleNavigationOption">Perfil</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
