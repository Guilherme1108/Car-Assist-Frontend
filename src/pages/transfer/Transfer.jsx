import "./Transfer.css";
import { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Step1 from "./steps/Step1Dados";
import Step2 from "./steps/Step2Confirmar";
import Step3 from "./steps/Step3Concluido";

const TransferScreen = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const stepTitles = {
    1: "Transferência",
    2: "Confirmar transferência",
    3: "Transferência concluída",
  };

  return (
    <div className="transferScreen">

      <h1 className="transferTitle">
      {stepTitles[currentStep]}
      </h1>

      <div className="stepperContainer">

        <div className={`stepItem ${currentStep >= 1 ? "active" : ""}`}>
          <div className="stepCircle">1</div>
          <span>Dados</span>
        </div>

        <div className={`stepLine ${currentStep >= 2 ? "active" : ""}`}></div>

        <div className={`stepItem ${currentStep >= 2 ? "active" : ""}`}>
          <div className="stepCircle">2</div>
          <span>Confirmar</span>
        </div>

        <div className={`stepLine ${currentStep >= 3 ? "active" : ""}`}></div>

        <div className={`stepItem ${currentStep >= 3 ? "active" : ""}`}>
          <div className="stepCircle">3</div>
          <span>Concluído</span>
        </div>

      </div>

      {currentStep === 1 && (
        <Step1 onSuccess={() => setCurrentStep(2)} />
      )}

      {currentStep === 2 && (
        <Step2 onSuccess={() => setCurrentStep(3)} />
      )}

      {currentStep === 3 && (
        <Step3 />
      )}

      <NavBar />

    </div>
  );
};

export default TransferScreen;