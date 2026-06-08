import React from "react";
import { ChevronRight } from "lucide-react";
import "../../pages/maintenance/Maintenance.css";

const formatarDataBR = (isoData) => {
  if (!isoData) return "";
  const date = new Date(isoData);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const formatarMoedaBR = (valorStr) => {
  if (!valorStr) return "R$ 0,00";
  const valor = parseFloat(valorStr);
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const MaintenanceItem = ({ maintenance, onClick }) => {
  return (
    <div className="maintenance" onClick={onClick}>
      <div className="informationsMaintenance">
        <div className="topInformationMaintenance">
          <span className="dateMaintenance">
            {formatarDataBR(maintenance.data_manutencao)}
          </span>
          <span className="price">
            {formatarMoedaBR(maintenance.custo)}
          </span>
        </div>
        <span className="typeMaintenance">
          {maintenance.tipo_manutencao?.nome || "Manutenção Geral"}
        </span>
      </div>
      <ChevronRight size={32} className="iconCetaDireita" />
    </div>
  );
};

export default MaintenanceItem;