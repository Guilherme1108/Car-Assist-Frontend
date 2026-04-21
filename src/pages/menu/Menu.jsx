import "./Menu.css";
import imagemCarro from '../../assets/carroTeste.webp'
import {useNavigate} from "react-router-dom";
import { CopyPlus } from "lucide-react";
import BottomBar from "../../components/bottomBar/BottomBar";

const MenuScreen = () => {
  return (
    <div className="menuScreen">
      <div className="containerScore">
        <span className="garagePoints">80</span>
        <p className="textScore">Score da garagem</p>
      </div>

      <div className="cards">

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

        </div>

      </div>

      <button className="addCarButton">
        <CopyPlus size={18} />
        <p className="textScore">Adicionar Carro</p>
      </button>

      <BottomBar></BottomBar>

    </div>
    
    
  );
};

export default MenuScreen;
