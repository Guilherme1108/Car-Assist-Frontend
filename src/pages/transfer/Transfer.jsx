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
  
  // NOVO: Estado para guardar o código e a expiração vindos da API
  const [transferResponse, setTransferResponse] = useState(null);

  // IMPORTANTE: Agora também pegamos o "id" do veículo que veio lá da Home.
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
          {/* ... MANTENHA SUAS BOLINHAS DO STEPPER AQUI EXATAMENTE COMO ESTAVAM ... */}
      </div>

      {currentStep === 1 && (
        <Step1 onSuccess={(permission) => {
          setSelectedPermission(permission);
          setCurrentStep(2);
        }} />
      )}

      {currentStep === 2 && (
        <Step2 
          // O "data" aqui é o "response.data.data" enviado pelo Step2
          onSuccess={(data) => {
            setTransferResponse(data); 
            setCurrentStep(3);
          }} 
          onCancel={() => setCurrentStep(1)} 
          permission={selectedPermission}
          carName={vehicleData.modelo}
          carPlate={vehicleData.placa}
          carId={vehicleData.id} // <-- Passando o ID do veículo pro backend
        />
      )}

      {currentStep === 3 && (
        // Passamos a resposta da API para o Step 3 exibir
        <Step3 data={transferResponse} />
      )}

      <NavBar />
    </div>
  );
};

export default TransferScreen;