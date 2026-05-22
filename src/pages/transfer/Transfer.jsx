import "./Transfer.css";
import { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import NavBar from "../../components/navBar/NavBar";

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
    <div className="transferContainer">
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

      <p className="transferSubtitle">
        Informe os dados para transferência do veículo.
      </p>


      <form onSubmit={handleSubmit} className="formTransfer">
        <div className="inputGroup">
          <label>Email</label>
          <Input
            type="email"
            name="email"
            placeholder=""
            value={transferData.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <label>Senha</label>
          <Input
            type="password"
            name="password"
            placeholder=""
            value={transferData.password}
            onChange={handleChange}
          />
        </div>


        <div className="checkboxGroup">
          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={transferData.permission === "readonly"}
              onChange={() => handleCheckboxChange("readonly")}
            />
            <span className="customCheckbox"></span>
            Somente leitura
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={transferData.permission === "editable"}
              onChange={() => handleCheckboxChange("editable")}
            />
            <span className="customCheckbox"></span>
            Acesso de editável
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={transferData.permission === "transfer"}
              onChange={() => handleCheckboxChange("transfer")}
            />
            <span className="customCheckbox"></span>
            Transferir propriedade
          </label>
        </div>

        <div className="transferButtonContainer">
          <Button text="Transferir" variant="primary" type="submit" />
        </div>
      </form>

      <NavBar></NavBar>
    </div>
  );
};

export default TransferScreen;