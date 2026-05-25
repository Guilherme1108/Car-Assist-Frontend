import "./Transfer.css";
import { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import NavBar from "../../components/navBar/NavBar";
import Step1 from "./steps/Step1Dados";

const TransferScreen = () => {

  const [transferData, setTransferData] = useState({
    email: "",
    password: "",
    permission: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (permissionType) => {
    setTransferData((prevState) => ({
      ...prevState,
      permission: permissionType,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados para transferência enviados:", transferData);
  };

  return (
    <div className="transferScreen">
      <h1 className="transferMainTitle">Transferência</h1>


      <div className="stepperContainer">

        <div className="stepItem active">
          <div className="stepCircle">1</div>
          <span>Dados</span>
        </div>

        <div className="stepLine"></div>

        <div className="stepItem">
          <div className="stepCircle">2</div>
          <span>Confirmar</span>
        </div>

        <div className="stepLine"></div>

        <div className="stepItem">
          <div className="stepCircle">3</div>
          <span>Concluído</span>
        </div>
        
      </div>

      <Step1></Step1>

      <NavBar></NavBar>
    </div>
  );
};

export default TransferScreen;