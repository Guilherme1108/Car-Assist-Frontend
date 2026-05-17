import {useState} from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import api from "../../services/api";
import "./RegisterAccount.css";

const RegisterAccountScreen = ({onToggle}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    email: "",
    senha: "",
    confirmeSenha: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isDesktop = window.innerWidth >= 1024;

  const handleRegister = async () => {
  if (formData.senha.length < 8) {
    alert("A senha deve ter no mínimo 8 caracteres");
    return;
  }

  if (formData.senha !== formData.confirmeSenha) {
    alert("As senhas não são iguais!");
    return;
  }

  try {
    const payload = {
      nome: formData.nome,
      cpf: formData.cpf.replace(/\D/g, ""),
      data_nascimento: formData.data_nascimento,
      email: formData.email,
      senha: formData.senha,
      is_ativo: true
    };

    const response = await api.post("/usuario", payload
    );

    console.log(response.data);

    if (isDesktop) {
      alert("Conta criada com sucesso!");
      onToggle();
    } else {
      navigate("/");
    }

  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Erro ao cadastrar usuário"
    );
  }
};

  const handleCancel = () => {
    if (isDesktop) {
      onToggle();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="registerAccountScreen">
      <span className="titlePage titleCadastrar">Cadastrar</span>

      <div className="form">
        <div className="formElement">
          <label>Nome</label>
          <Input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            type="text"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="formElement">
          <label>CPF</label>
          <Input
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            type="password"
            placeholder="000.000.000-00"
          />
        </div>

        <div className="formElement">
          <label>Data Nascimento</label>
          <Input
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            type="date"
          />
        </div>

        <div className="formElement">
          <label>Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="formElement">
          <label>Senha</label>
          <Input
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            type="password"
            placeholder="Crie uma senha"
          />
        </div>

        <div className="formElement">
          <label>Confirme a Senha</label>
          <Input
            name="confirmeSenha"
            value={formData.confirmeSenha}
            onChange={handleChange}
            type="password"
            placeholder="Escreva a mesma senha"
          />
        </div>
      </div>

      <div className="buttonsRegisterAccount">
        <Button text="Cancelar" variant="secondary" onClick={handleCancel} />
        <Button text="Cadastrar" variant="primary" onClick={handleRegister} />
      </div>
    </div>
  );
};

export default RegisterAccountScreen;
