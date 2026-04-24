import './Maintenance.css'
import { useNavigate } from 'react-router-dom'
import {SquarePen} from "lucide-react";

const MaintenanceScreen = () => {

    const navigate = useNavigate

    return(
        <div className="maintenenceScreen">
            <h1>Histórico <br /> de <br /> Manutenções</h1>

            <div className="containermaintenences">

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance"></span>
                            <span className="price"></span>
                        </div>

                        <span className="typeMaintenance"></span>
                        
                    </div>
                </div>

                <SquarePen size={32} className="btnEditar" />

            </div>

            <button className="buttonGerarRelatorio">Gerar Relátorio</button>

            <button className="buttonNovaManutencao">Gerar Relátorio</button>

        </div>
    )

}

export default MaintenanceScreen