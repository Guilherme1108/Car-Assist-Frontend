import React, { useState, useEffect } from "react";
import "./Vehicle.css";
import defaultCarImage from "../../assets/carNotFOund.png";
import { useNavigate, useParams } from "react-router-dom";
import { SquarePen, ChevronRight } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import api from "../../services/api";

const VehicleScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVehicleDetails = async () => {
      try {
        const response = await api.get(`/veiculo/${id}`);
        
        if (response.data && response.data.status) {
          // O segredo está aqui: pegamos o índice [0] porque o back envia um array
          const vehicleData = response.data.data.veiculo[0]; 
          setVehicle(vehicleData); 
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do veículo:", error);
        alert("Não foi possível carregar os dados deste veículo.");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicleDetails();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="vehicleScreen loadingContainer">
        <h1 className="titleVeiculo">Carregando dados do veículo...</h1>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="vehicleScreen loadingContainer">
        <h1 className="titleVeiculo">Veículo não encontrado.</h1>
      </div>
    );
  }

  return (
    <div className="vehicleScreen">
      <div className="cardCarro">
        <div className="superiorCard">
          <h1 className="titleVeiculo">{vehicle.modelo}</h1>
          <SquarePen size={32} className="btnEditar" />
        </div>

        {/* Ajustado para ler "foto_veiculo" que veio no JSON do Postman */}
        <img 
          src={vehicle.foto_veiculo && vehicle.foto_veiculo !== "civic.jpg" ? vehicle.foto_veiculo : defaultCarImage} 
          alt={vehicle.modelo} 
          className="carImage" 
        />

        <div className="carInformations">
          <div className="cardInformationBlock">
            <span className="titleInformation">Placa</span>
            <span className="contentInformation">{vehicle.placa}</span>
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