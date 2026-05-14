import "./Maintenance.css";
import {useNavigate} from "react-router-dom";
import {ChevronRight} from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/button/Button";

const MaintenanceScreen = () => {
  const navigate = useNavigate();

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
        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>

        <div className="maintenance">
          <div className="informationsMaintenance">
            <div className="topInformationMaintenance">
              <span className="dateMaintenance">29/09/2025</span>
              <span className="price">R$99,99</span>
            </div>

            <span className="typeMaintenance">Manutenção Preventiva</span>
          </div>

          <ChevronRight size={32} className="iconCetaDireita" />
        </div>
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

      <NavBar></NavBar>
    </div>
  );
};

export default MaintenanceScreen;
