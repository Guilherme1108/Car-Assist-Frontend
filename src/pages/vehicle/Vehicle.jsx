import React from "react";
import "./Vehicle.css";
import defaultCarImage from "../../assets/carNotFOund.png";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  SquarePen, 
  ChevronRight, 
  CreditCard, 
  Palette, 
  CarFront, 
  CalendarDays, 
  Users, 
  Wallet, 
  ArrowRightLeft, 
  Wrench,
  Gauge
} from "lucide-react";
import NavBar from "../../components/navBar/NavBar";

const VehicleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicle = location.state?.vehicleData;

  if (!vehicle) {
    return (
      <div className="vehicleScreen loadingContainer errorScreen">
        <h1 className="titleVeiculo">Acesso negado ou veículo não informado.</h1>
        <button className="btnVoltar" onClick={() => navigate("/home")}>
          Voltar para a Garagem
        </button>
        <NavBar />
      </div>
    );
  }

  const role = vehicle.papel_usuario;

  const handleEditClick = () => {
    if (role === 'Editor') {
      navigate(`/home/veiculo/editar/${vehicle.id}`, { state: { vehicleData: vehicle } });
    } else {
      alert("Permissão negada. Apenas usuários com perfil de Editor podem editar este veículo.");
    }
  };

  const handleDonosClick = () => {
    if (role === 'Proprietário') {
      alert("Navegando para Histórico de Donos..."); 
    } else {
      alert("Permissão negada. Apenas o Proprietário pode visualizar o histórico de donos.");
    }
  };

  const handleTransferenciaClick = () => {
    if (role === 'Proprietário') {
      navigate("./transferencia", { state: { vehicleData: vehicle } });
    } else {
      alert("Permissão negada. Apenas o Proprietário pode transferir este veículo.");
    }
  };

  return (
    <div className="vehicleScreen">
      
      <div className="vehicleHeader">
        <h1 className="titleVeiculo">{vehicle.modelo}</h1>
        
        <button 
          className="btnEditar" 
          onClick={handleEditClick}
        >
          <SquarePen size={24} />
        </button>
      </div>

      <div className="imageContainer">
        <img
          src={vehicle.foto_veiculo ? vehicle.foto_veiculo : defaultCarImage}
          alt={vehicle.modelo}
          className="carImage"
        />
      </div>

      <div className="infoCardsGrid">
        <div className="infoCard">
          <div className="iconWrapper iconOutline"><CreditCard size={20} /></div>
          <div className="infoTexts">
            <span className="infoLabel">Placa</span>
            <span className="infoValue">{vehicle.placa}</span>
          </div>
        </div>

        <div className="infoCard">
          <div className="iconWrapper iconOutline"><Palette size={20} /></div>
          <div className="infoTexts">
            <span className="infoLabel">Cor</span>
            <span className="infoValue">
              {vehicle.cor ? vehicle.cor.charAt(0).toUpperCase() + vehicle.cor.slice(1).toLowerCase() : "N/A"}
            </span>
          </div>
        </div>

        <div className="infoCard">
          <div className="iconWrapper iconOutline"><CarFront size={20} /></div>
          <div className="infoTexts">
            <span className="infoLabel">Marca</span>
            <span className="infoValue">{vehicle.marca || "N/A"}</span>
          </div>
        </div>

        <div className="infoCard">
          <div className="iconWrapper iconOutline"><CalendarDays size={20} /></div>
          <div className="infoTexts">
            <span className="infoLabel">Ano</span>
            <span className="infoValue">{vehicle.ano}</span>
          </div>
        </div>

        <div className="infoCard">
          <div className="iconWrapper iconOutline"><Gauge size={20} /></div>
          <div className="infoTexts">
            <span className="infoLabel">Quilometragem</span>
            <span className="infoValue">{vehicle.quilometragem}</span>
          </div>
        </div>
      </div>

      {/* Card sempre visível; validação no onClick */}
      <div className="actionCard fullWidthCard donosCard" onClick={handleDonosClick}>
        <div className="cardLeft">
          <div className="iconWrapper iconPrimaryLight"><Users size={24} /></div>
          <div className="cardTexts">
            <h3>Histórico de donos</h3>
            <p>Veja todos os proprietários deste veículo.</p>
          </div>
        </div>
        <div className="cardRight">
          <span className="badgeDonos">Ver donos</span>
          <ChevronRight size={20} className="chevron" />
        </div>
      </div>

      <div className="actionsGrid">
        <div className="actionCard" onClick={() => navigate("./gastos", { state: { vehicleData: vehicle } })}>
          <div className="cardLeft">
            <div className="iconWrapper iconPrimaryLight"><Wallet size={24} /></div>
            <div className="cardTexts">
              <h3>Gastos</h3>
              <p>Acompanhe todos os gastos.</p>
            </div>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>

        {/* Card sempre visível; validação no onClick */}
        <div className="actionCard" onClick={handleTransferenciaClick}>
          <div className="cardLeft">
            <div className="iconWrapper iconPrimaryLight"><ArrowRightLeft size={24} /></div>
            <div className="cardTexts">
              <h3>Transferência</h3>
              <p>Realize a transferência.</p>
            </div>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>

        <div className="actionCard" onClick={() => navigate("./manutencao", { state: { vehicleData: vehicle } })}>
          <div className="cardLeft">
            <div className="iconWrapper iconPrimaryLight"><Wrench size={24} /></div>
            <div className="cardTexts">
              <h3>Manutenções</h3>
              <p>Consulte o histórico.</p>
            </div>
          </div>
          <ChevronRight size={20} className="chevron" />
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default VehicleScreen;