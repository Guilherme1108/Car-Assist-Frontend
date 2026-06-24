import "../Transfer.css";
import Lottie from "lottie-react";
import confirmGif from "../../../assets/animations/confirmGif.json";
import { MySwal } from "../../../config/swal";

const Step3 = ({ data }) => {
    const codigoVerificacao = data?.codigo_verificacao || "------";
    const tempoExpiracao = data?.expira_em_minutos || 0;

    return (
        <div className="step3Code">

            <div className="topDiv">
                <div className="confirmGif">
                    <Lottie.default
                        animationData={confirmGif}
                        loop={false}
                    />
                </div>

                <p className="textsCodeScreen">
                    O código abaixo foi gerado para o<br></br>novo dono finalizar a transferência.
                </p>
            </div>
            
            <div className="containerCode">
                <span className="textCode">
                    Código de transferência
                </span>
                <span className="code">
                    {codigoVerificacao}
                </span>
            </div>

            <div className="alertDiv">
                <p className="textAlert">
                    Esse código expira em {tempoExpiracao} minutos.<br></br>Compartilhe apenas com o novo dono.
                </p>
            </div>

        </div>
    );
};

export default Step3;