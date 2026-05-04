import './Maintenance.css'
import { useNavigate } from 'react-router-dom'
import {SquarePen} from "lucide-react";
import NavBar from "../../components/navBar/NavBar";

const MaintenanceScreen = () => {

    const navigate = useNavigate

    return(
        <div className="maintenanceScreen">
            <h1 className='maintenanceTitle'>Histórico <br /> de <br /> Manutenções</h1>

            <div className="containerMaintenences">

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                <div className="maintenance">
                    <div className="informationsMaintenance">
                        <div className="topInformationMaintenance">
                            <span className="dateMaintenance">29/09/2025</span>
                            <span className="price">R$99,99</span>
                        </div>

                        <span className="typeMaintenance">Manutenção Preventiva</span>
                        
                    </div>

                    <SquarePen size={32} className="btnEditar" />
                </div>

                

                

            </div>

            <div className="buttonsMaintenance">
                <button className="buttonGerarRelatorio">Gerar Relátorio</button>

                <button className="buttonNovaManutencao">Nova Manutenção</button>
            </div>

            

            <NavBar></NavBar>

        </div>
    )

}

export default MaintenanceScreen