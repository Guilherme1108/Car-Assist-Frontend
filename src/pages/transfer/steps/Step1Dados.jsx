import "../Transfer.css";
import { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import api from "../../../services/api";
import { MySwal } from "../../../config/swal";

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
      await MySwal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Preencha todos os campos antes de continuar.",
      });
      return;
    }

    const storageUser = localStorage.getItem("user");
    
    if (!storageUser) {
      await MySwal.fire({
        icon: "error",
        title: "Sessão expirada",
        text: "Faça login novamente para continuar.",
      });
      return;
    }

    const loggedUser = JSON.parse(storageUser);

    if (email.trim().toLowerCase() !== loggedUser.email.trim().toLowerCase()) {
      await MySwal.fire({
        icon: "error",
        title: "Acesso negado",
        text: "O e-mail informado não corresponde à sua conta atual.",
      });
      return;
    }

    try {
      const response = await api.post("/usuario/login", {
        email,
        password,
      });

      const user = response.data.data.usuario;

      if (!user) {
        await MySwal.fire({
          icon: "error",
          title: "Erro de autenticação",
          text: "Usuário não encontrado.",
        });
        return;
      }

      if (user.id !== loggedUser.id) {
        await MySwal.fire({
          icon: "error",
          title: "Acesso negado",
          text: "Credenciais inválidas para o usuário atual.",
        });
        return;
      }

      await MySwal.fire({
        icon: "success",
        title: "Confirmado!",
        text: "Usuário confirmado com sucesso!",
      });

      onSuccess(transferData.permission);
    } catch (error) {
      console.log(error);

      await MySwal.fire({
        icon: "error",
        title: "Erro ao confirmar",
        text: error.response?.data?.message || "Erro ao confirmar usuário.",
      });
    }
  };

  return (
    <div className="step1Data">
      <p className="transferSubtitle">
        Para confirmar a realização da transferência do veículo, por favor,
        valide os seus dados abaixo.
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
          <Button text="Transferir" variant="primary" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Step1;