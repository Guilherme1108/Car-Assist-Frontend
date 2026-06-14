import "./Maintenance.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/button/Button";
import MaintenanceItem from "../../components/maintenanceItem/MaintenanceItem.jsx";
import api from "../../services/api";

const MaintenanceScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idVeiculo } = useParams();

  const role = location.state?.vehicleData?.papel_usuario;
  const idVeiculoAtual = idVeiculo || location.state?.vehicleData?.id || location.state?.idVeiculo || 4; 

  const [maintenances, setMaintenances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(`/manutencao-veiculo/${idVeiculoAtual}`);
        
        if (response.data && response.data.status) {
          setMaintenances(response.data.data.manutencao || []);
        } else {
          setError("Erro ao carregar o histórico de manutenções.");
        }
      } catch (err) {
        console.error("Erro ao buscar manutenções:", err);
        if (err.response?.status === 404) {
          setMaintenances([]);
        } else {
          setError("Não foi possível conectar ao servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (idVeiculoAtual) {
      fetchMaintenances();
    }
  }, [idVeiculoAtual]);

  const handleNewMaintenence = () => {
    if (role === 'Visualizador') {
      alert("Acesso Negado: Como visualizador, você não tem permissão para adicionar novas manutenções.");
      return;
    }
    navigate("./criar", { state: { idVeiculo: idVeiculoAtual, role: role } });
  };

  const handleEditMaintenance = (item) => {
    navigate(`./editar/${item.id}`, { state: { maintenanceToEdit: item, role: role } });
  };

  return (
    <div className="maintenanceScreen">
      <h1 className="maintenanceTitle">
        Histórico <br className="removeBr" /> de <br className="removeBr" />{" "}
        Manutenções
      </h1>

      <div className="containerMaintenences">
        {isLoading && <p style={{ textAlign: "center" }}>Carregando histórico...</p>}
        
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
        
        {!isLoading && !error && maintenances.length === 0 && (
          <p style={{ textAlign: "center", color: "gray" }}>Nenhuma manutenção registrada para este veículo.</p>
        )}

        {!isLoading && !error && PureMaintenancesList(maintenances, handleEditMaintenance)}
      </div>

      <div className="buttonsMaintenance">
        <Button
          text="Nova Manutenção"
          variant="primary"
          onClick={handleNewMaintenence}
        />
      </div>

      <NavBar />
    </div>
  );
};

const PureMaintenancesList = (list, onEditClick) => {
  return list.map((item) => (
    <MaintenanceItem 
      key={item.id} 
      maintenance={item} 
      onClick={() => onEditClick(item)} 
    />
  ));
};

export default MaintenanceScreen;