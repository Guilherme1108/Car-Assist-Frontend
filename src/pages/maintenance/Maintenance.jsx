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
  const { idVeiculo } = useParams(); // Caso use rotas como /manutencao/:idVeiculo

  const [maintenances, setMaintenances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tenta pegar o ID do veículo da URL, ou do state enviado no navigate, ou assume o 4 (do seu Postman)
  const idVeiculoAtual = idVeiculo || location.state?.idVeiculo || 4; 

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Faz a requisição na rota exata do seu Postman usando sua instância do Axios
        const response = await api.get(`/manutencao-veiculo/${idVeiculoAtual}`);
        
        if (response.data && response.data.status) {
          // Acessa a lista correta dentro de data.manutencao
          setMaintenances(response.data.data.manutencao || []);
        } else {
          setError("Erro ao carregar o histórico de manutenções.");
        }
      } catch (err) {
        console.error("Erro ao buscar manutenções:", err);
        if (err.response?.status === 404) {
          setMaintenances([]); // Se retornar 404, define como lista vazia pacificamente
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

  const handleGenerateRelatory = () => {/* TODO */};

  const handleNewMaintenence = () => {
    navigate("./criar", { state: { idVeiculo: idVeiculoAtual } });
  };

  const handleEditMaintenance = (item) => {
    // Passa o objeto completo vindo da API para a mochila de edição
    navigate(`./editar/${item.id}`, { state: { maintenanceToEdit: item } });
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
          text="Gerar Relatório"
          variant="primary"
          onClick={handleGenerateRelatory}
        />
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

// Função auxiliar apenas para organizar o mapeamento limpo na renderização
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