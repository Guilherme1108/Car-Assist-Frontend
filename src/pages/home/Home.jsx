import "./Home.css";
import imagemCarro from "../../assets/carroTeste.webp";
import {useNavigate} from "react-router-dom";
import {CopyPlus} from "lucide-react";
import NavBar from "../../components/navBar/NavBar";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="homeScreen">
      <span className="titleHome">Garagem</span>

      <div className="containerScore">
        <div className="textsScore">
          <span className="garagePoints">80</span>
          <p className="textScore">Score da garagem</p>
        </div>

        <div className="bar">
          <div className="filledBar"></div>
        </div>
      </div>

      <div className="cards">
        <div
          className="card"
          onClick={() => {
            navigate("./veiculo");
          }}
        >
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

          <div className="alinhamentoBtn">
            <button className="buttonVerDetalhes">Ver Detalhes</button>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

          <div className="alinhamentoBtn">
            <button className="buttonVerDetalhes">Ver Detalhes</button>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

          <div className="alinhamentoBtn">
            <button className="buttonVerDetalhes">Ver Detalhes</button>
          </div>

        </div>

        <div className="card">
          <img className="imgCar" src={imagemCarro} alt="" />

          <span className="carName">Civic SI</span>

          <div className="lowerInformations">
            <span className="carPlate">EXE3006</span>
            <span className="carPoints">100</span>
          </div>

          <div className="alinhamentoBtn">
            <button className="buttonVerDetalhes" onClick={() => {navigate("./intermediate")}}>Ver Detalhes</button>
          </div>

        </div>
      </div>

      <button className="addCarButton">
        <CopyPlus size={18} />
        <p className="textScore">Adicionar Carro</p>
      </button>

      <NavBar></NavBar>
    </div>
  );
};

export default HomeScreen;
