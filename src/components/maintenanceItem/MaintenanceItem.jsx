import React from "react";
import { ChevronRight } from "lucide-react";
import "../../pages/maintenance/Maintenance.css";

const MaintenanceItem = ({ maintenance, onClick }) => {
  return (
    <div className="maintenance" onClick={onClick}>
      <div className="informationsMaintenance">
        <div className="topInformationMaintenance">
          <span className="dateMaintenance">{maintenance.date}</span>
          <span className="price">{maintenance.price}</span>
        </div>
        <span className="typeMaintenance">{maintenance.type}</span>
      </div>
      <ChevronRight size={32} className="iconCetaDireita" />
    </div>
  );
};

export default MaintenanceItem;