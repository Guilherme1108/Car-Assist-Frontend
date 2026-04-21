import { Home, Wrench, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomBar.css";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottomBar">

        <div
        className={`item ${isActive("/garage") ? "active" : ""}`}
        onClick={() => navigate("/garage")}
      >
        <Wrench size={22} />
      </div>

      
      <div
        className={`item ${isActive("/menu") ? "active" : ""}`}
        onClick={() => navigate("/menu")}
      >
        <Home size={22} />
      </div>

      

      <div
        className={`item ${isActive("/profile") ? "active" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <User size={22} />
      </div>
    </div>
  );
};

export default BottomBar;