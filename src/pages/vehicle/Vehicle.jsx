import "./Vehicle.css";
import {useNavigate} from "react-router-dom";
import imagemCarro from "../../assets/carroTeste.webp";
import {SquarePen} from "lucide-react";
import BottomBar from "../../components/bottomBar/BottomBar";

const VehicleScreen = () => {

  const navigate = useNavigate();

  return (
    <div className="vehicleScreen">
      <div className="cardCarro">
        <div className="superiorCard">
          <h1 className="titleVeiculo">Civic SI</h1>
          <SquarePen size={32} className="btnEditar" />
        </div>

        <img src={imagemCarro} alt="" className="carImage" />

        <div className="carInformations">
          <div className="cardInformationBlock">
            <span className="titleInformation">Placa</span>
            <span className="contentInformation">EXE3006</span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Cor</span>
            <span className="contentInformation">Vermelho</span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Marca</span>
            <span className="contentInformation">Honda</span>
          </div>

          <div className="cardInformationBlock">
            <span className="titleInformation">Ano</span>
            <span className="contentInformation">2008</span>
          </div>
        </div>
      </div>

      <li className="historicoDonos">Histórico de donos</li>

      <div className="dividingLine"></div>

      <div className="containerButtons">
        <button className="buttonGastos">Gastos</button>
        <button className="buttonTransferencia">Transferência</button>
      </div>

      <button
        className="buttonHistManutencao"
        onClick={() => {
          navigate("./manutencao");
        }}
      >
        Histórico de Manutenções
      </button>

      <BottomBar></BottomBar>
    </div>
  );
};

export default VehicleScreen;