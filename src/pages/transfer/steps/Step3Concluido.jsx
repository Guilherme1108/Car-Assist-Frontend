import "../Transfer.css";
import { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import NavBar from "../../../components/navBar/NavBar";
import api from "../../../services/api";
import Lottie from "lottie-react";
import confirmGif from "../../../assets/animations/confirmGif.json"

const Step3 = () => {

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
                36282125
                </span>
            </div>

            <div className="alertDiv">
                <p className="textAlert">
                Esse código expira em 24 horas.<br></br>Compartilhe apenas com o novo dono
                </p>
            </div>

        </div>
    );
};

export default Step3;