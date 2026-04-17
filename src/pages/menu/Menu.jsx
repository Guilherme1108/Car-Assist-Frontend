import "./Menu.css";
import {useNavigate} from "react-router-dom";

const MenuScreen = () => {
  return (
    <div className="menuScreen">
      <div className="containerScore">
        <span className="garagePoints">80</span>
        <p className="textScore">Score da garagem</p>
      </div>

      <div className="cards">

        <div className="card">
          <img className="imgCar" src="" alt="" />

          <span className="carName">Civic SI</span>

          <div lowerInformations>
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src="" alt="" />

          <span className="carName">Civic SI</span>

          <div lowerInformations>
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src="" alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MenuScreen;
