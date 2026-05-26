import "../Transfer.css";
import Button from "../../../components/button/Button";
import api from "../../../services/api";

const Step2 = ({ onSuccess }) => {

    const handleConfirm = () => {
        onSuccess();
    }

    const handleCancel = () => {

    }

    return (
        <div className="step2Confirm">
            <p className="confirmTransferText">
                Você tem certeza que deseja gerar um código de transferencia para o carro <span className="textConfirm">CIvic SI</span> com a placa <span className="textConfirm">OUB72F</span>
            </p>

            <div className="containerButtonsonfirmTransfer">
                <Button text="Não" variant="secondary" onClick={handleCancel} />
                <Button text="Sim" variant="primary" onClick={handleConfirm} />
            </div>



        </div>
    );
};

export default Step2;