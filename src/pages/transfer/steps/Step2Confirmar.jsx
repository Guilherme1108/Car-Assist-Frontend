import "../Transfer.css";
import { useState } from "react";
import Button from "../../../components/button/Button";
import api from "../../../services/api.js";
import { MySwal } from "../../../config/swal.js";

const Step2 = ({ onSuccess, onCancel, permission, carName, carPlate, carId }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);

        try {
            const storageUser = localStorage.getItem("user");
            if (!storageUser) {
                await MySwal.fire({
                    icon: "error",
                    title: "Sessão expirada",
                    text: "Sessão expirada. Faça login novamente.",
                });
                setLoading(false);
                return;
            }
            const loggedUser = JSON.parse(storageUser);

            let papelConcedido = "Visualizador";
            
            if (permission === "editable") {
                papelConcedido = "Editor";
            }
            if (permission === "transfer") {
                papelConcedido = "Proprietário";
            }

            const payload = {
                fk_id_veiculo: Number(carId),
                fk_id_usuario_origem: Number(loggedUser.id),
                papel_concedido: papelConcedido
            };

            const response = await api.post("/transferencia/gerar", payload);

            if (response.data && (response.data.status === true || response.data.status_code === 201)) {
                onSuccess(response.data.data);
            } else {
                await MySwal.fire({
                    icon: "error",
                    title: "Erro na resposta",
                    text: response.data?.message || "O backend não retornou uma resposta válida.",
                });
            }

        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Não foi possível conectar com o servidor.";
            await MySwal.fire({
                icon: "error",
                title: "Erro ao transferir",
                text: `Erro ao gerar transferência: ${mensagemErro}`,
            });
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        if (onCancel) onCancel();
    }

    const renderMessage = () => {
        switch (permission) {
            case "readonly":
                return "Isso dará acesso de Somente Leitura. O usuário poderá ver os dados, mas não alterá-los.";
            case "editable":
                return "Isso dará Acesso Editável. O usuário poderá alterar as informações do veículo.";
            case "transfer":
                return "ATENÇÃO: Você está transferindo a propriedade. Isso removerá todos os usuários atuais vinculados a este veículo.";
            default:
                return "Por favor, confirme as permissões da transferência.";
        }
    };

    return (
        <div className="step2Confirm">
            <p className="confirmTransferText">
                Você tem certeza que deseja gerar um código de transferência para o carro <span className="textConfirm">{carName}</span> com a placa <span className="textConfirm">{carPlate}</span>?
            </p>

            <p className={`permissionWarningText ${permission === 'transfer' ? 'danger' : ''}`}>
                {renderMessage()}
            </p>

            <div className="containerButtonsonfirmTransfer">
                <Button text="Não" variant="secondary" onClick={handleCancel} disabled={loading} />
                <Button text={loading ? "Gerando..." : "Sim"} variant="primary" onClick={handleConfirm} disabled={loading} />
            </div>
        </div>
    );
};

export default Step2;