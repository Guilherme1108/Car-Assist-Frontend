import "./Maintenance.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/button/Button";
import MaintenanceItem from "../../components/maintenanceItem/MaintenanceItem.jsx"

const MaintenanceScreen = () => {
  const navigate = useNavigate();
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    // Simulação de integração com Backend
    const dataFromBackend = [
  { id: 1, date: "29/09/2025", price: "R$99,99", type: "Manutenção Preventiva" },
  { id: 2, date: "15/10/2025", price: "R$150,00", type: "Troca de Óleo" },
  { id: 3, date: "10/11/2025", price: "R$450,00", type: "Revisão Geral" },
  { id: 4, date: "22/11/2025", price: "R$89,90", type: "Alinhamento e Balanceamento" },
  { id: 5, date: "05/12/2025", price: "R$320,00", type: "Troca de Pneus" },
  { id: 6, date: "18/12/2025", price: "R$75,00", type: "Troca de Filtro de Ar" },
  { id: 7, date: "03/01/2026", price: "R$210,00", type: "Troca de Pastilhas de Freio" },
  { id: 8, date: "14/01/2026", price: "R$540,00", type: "Suspensão" },
  { id: 9, date: "28/01/2026", price: "R$120,00", type: "Higienização do Ar-Condicionado" },
  { id: 10, date: "10/02/2026", price: "R$65,00", type: "Troca de Palhetas" },
  { id: 11, date: "21/02/2026", price: "R$430,00", type: "Troca de Bateria" },
  { id: 12, date: "06/03/2026", price: "R$180,00", type: "Limpeza de Bicos Injetores" },
  { id: 13, date: "19/03/2026", price: "R$250,00", type: "Troca de Correia Dentada" },
  { id: 14, date: "02/04/2026", price: "R$95,00", type: "Troca de Fluido de Freio" },
  { id: 15, date: "16/04/2026", price: "R$390,00", type: "Reparo na Embreagem" },
  { id: 16, date: "29/04/2026", price: "R$140,00", type: "Troca de Velas" },
  { id: 17, date: "12/05/2026", price: "R$85,00", type: "Lavagem Técnica" },
  { id: 18, date: "26/05/2026", price: "R$670,00", type: "Revisão Completa" },
  { id: 19, date: "09/06/2026", price: "R$110,00", type: "Troca de Fluido do Radiador" },
  { id: 20, date: "23/06/2026", price: "R$299,90", type: "Troca de Amortecedores" }
]
    setMaintenances(dataFromBackend);
  }, []);

  const handleGenerateRelatory = () => {/* TODO */};

  const handleNewMaintenence = () => {
    navigate("./criar");
  };

  return (
    <div className="maintenanceScreen">
      <h1 className="maintenanceTitle">
        Histórico <br className="removeBr" /> de <br className="removeBr" />{" "}
        Manutenções
      </h1>

      <div className="containerMaintenences">
        {maintenances.map((item) => (
          <MaintenanceItem 
            key={item.id} 
            maintenance={item} 
            onClick={() => navigate(`./detalhes/${item.id}`)} // Exemplo de rota
          />
        ))}
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

export default MaintenanceScreen;