import "./Transfer.css";
import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import NavBar from "../../components/navBar/NavBar";
import Step1 from "./steps/Step1Dados";
import Step2 from "./steps/Step2Confirmar";
import Step3 from "./steps/Step3Concluido";

const TransferScreen = () => {
  const location = useLocation(); 
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPermission, setSelectedPermission] = useState(""); 
  
  const [transferResponse, setTransferResponse] = useState(null);

  const vehicleData = location.state?.vehicleData || { id: null, modelo: "Veículo Desconhecido", placa: "---" };

  const stepTitles = {
    1: "Transferência",
    2: "Confirmar transferência",
    3: "Transferência concluída",
  };

  return (
    <div className="transferScreen">
      <h1 className="transferTitle">{stepTitles[currentStep]}</h1>

      <div className="stepperContainer">
      </div>

      {currentStep === 1 && (
        <Step1 onSuccess={(permission) => {
          setSelectedPermission(permission);
          setCurrentStep(2);
        }} />
      )}

      {currentStep === 2 && (
        <Step2 
          onSuccess={(data) => {
            setTransferResponse(data); 
            setCurrentStep(3);
          }} 
          onCancel={() => setCurrentStep(1)} 
          permission={selectedPermission}
          carName={vehicleData.modelo}
          carPlate={vehicleData.placa}
          carId={vehicleData.id}
        />
      )}

      {currentStep === 3 && (
        <Step3 data={transferResponse} />
      )}

      <NavBar />
    </div>
  );
};

export default TransferScreen;