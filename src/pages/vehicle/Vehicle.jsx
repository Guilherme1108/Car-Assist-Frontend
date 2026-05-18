import React from "react";
import "./Vehicle.css";
import defaultCarImage from "../../assets/carNotFOund.png";
import { useNavigate, useLocation } from "react-router-dom";
import { SquarePen, ChevronRight } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";

const VehicleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicle = location.state?.vehicleData;

  if (!vehicle) {
    return (
      <div className="vehicleScreen loadingContainer">
        <h1 className="titleVeiculo">Acesso negado ou veículo não informado.</h1>
        <button onClick={() => navigate("/home")} style={{ marginTop: "20px", padding: "10px 20px" }}>
          Voltar para a Garagem
        </button>

        <NavBar />
        
      </div>
    );
  }

  return (
    <div className="vehicleScreen">
      <div className="cardCarro">
        <div className="superiorCard">
          <h1 className="titleVeiculo">{vehicle.modelo || vehicle.name}</h1>
          <SquarePen size={32} className="btnEditar" />
        </div>

        <img 
          src={vehicle.foto_veiculo ? vehicle.foto_veiculo : defaultCarImage} 
          alt={vehicle.modelo || vehicle.name} 
          className="carImage" 
        />

        <div className="carInformations">
          <div className="cardInformationBlock">
            <span className="titleInformation">Placa</span>
            <span className="contentInformation">{vehicle.placa || vehicle.plate}</span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Cor</span>
            <span className="contentInformation">
              {vehicle.cor ? vehicle.cor.charAt(0).toUpperCase() + vehicle.cor.slice(1).toLowerCase() : "Não informada"}
            </span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Marca</span>
            <span className="contentInformation">{vehicle.marca || "Não informada"}</span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Ano</span>
            <span className="contentInformation">{vehicle.ano}</span>
          </div>
        </div>
      </div>

      <li className="historicoDonos">
        Histórico de donos <ChevronRight />
      </li>

      <div className="containerButtons">
        <button 
          className="buttonGastos" 
          onClick={() => navigate("./gastos")}
        >
          Gastos
        </button>
        <button className="buttonTransferencia">Transferência</button>
      </div>

      <button
        className="buttonHistManutencao"
        onClick={() => navigate("./manutencao")}
      >
        Histórico de Manutenções
      </button>

      <NavBar />
    </div>
  );
};

export default VehicleScreen;