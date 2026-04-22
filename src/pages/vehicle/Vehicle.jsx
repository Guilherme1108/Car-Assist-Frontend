import "./Vehicle.css"
import imagemCarro from '../../assets/carroTeste.webp'
import { SquarePen } from "lucide-react";


const VehicleScreen = () => {
    return (
        <div className="vehicleScreen">
            <div className="cardCarro">
                <div className="superiorCard">
                    <h1 className="titleVeiculo">Veiculo</h1>
                    <img src={SquarePen} alt="" className="buttonEdit" />
                </div>
                <img src={imagemCarro} alt="" className="carImage" />

                <div className="carInformations">

                    <div className="containerPlate">
                        <span className="titleInformations">Placa</span>
                        <span className="contentInformation">EXE3006</span>
                    </div>

                    <div className="containerPlate">
                        <span className="titleInformations">Cor</span>
                        <span className="contentInformation">Vermelho</span>
                    </div> 

                    <div className="containerPlate">
                        <span className="titleInformations">Marca</span>
                        <span className="contentInformation">Honda</span>
                    </div>

                    <div className="containerPlate">
                        <span className="titleInformations">Ano</span>
                        <span className="contentInformation">2008</span>
                    </div>
                </div>

                <span>Histórico de donos</span>

                <div className="containerButtons">
                    <button className="buttonGastos">Gastos</button>
                    <button className="buttonTransferencia">Transferência</button>
                </div>
                <button className="buttonHistManutencao">Histórico de Manutenções</button>
                
            </div>
            
        </div>
        
    )
}

export default VehicleScreen