import "../Transfer.css";
import { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import NavBar from "../../../components/navBar/NavBar";
import api from "../../../services/api";

const Step1 = ({ onSuccess }) => {

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, permission } = transferData;

    if (!email || !password || !permission) {
      alert("Preencha todos os campos");
      return;
    }

    try {

      const response = await api.post("/usuario/login", {
        email,
        password,
      });

      console.log(response.data);

      const user = response.data.data.usuario;

      if (!user) {
        alert("Usuário não encontrado");
        return;
      }
      
      alert("Usuário confirmado com sucesso!");
      
      onSuccess();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Erro ao confirmar usuário"
      );
    }
  };

  return (
    <div className="step1Data">

      <p className="transferSubtitle">
        Informe os dados para transferência do veículo.
      </p>

      <form onSubmit={handleSubmit} className="formTransfer">

        <div className="inputGroup">
          <label>Email</label>

          <Input
            type="email"
            name="email"
            value={transferData.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <label>Senha</label>

          <Input
            type="password"
            name="password"
            value={transferData.password}
            onChange={handleChange}
            canToggleVisibility
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

            Acesso editável
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
          <Button
            text="Transferir"
            variant="primary"
            type="submit"
          />
        </div>

      </form>

    </div>
  );
};

export default Step1;