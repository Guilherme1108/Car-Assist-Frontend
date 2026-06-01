import { useState, useEffect } from "react"; // Importamos o useEffect
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import api from "../../services/api";
import "./Login.css";
import RegisterAccountScreen from "../registerAccount/RegisterAccount";
import imagemCarro from "../../assets/imagemCarroDesktop.svg";
import logoWhite from "../../assets/logo_white.svg";
import carLoginImage from "../../assets/carLoginImage.svg";
import Lottie from "lottie-react";
import animacaoCar from "../../assets/animations/animacao-car.json";

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      navigate("/home");
    }
  }, [navigate]);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = credentials;

    if (!email || !password) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      // Endpoint atual do backend
      const response = await api.post(`/usuario/login`, {
        email,
        password,
      });

      console.log(response.data);

      const user = response.data.data.usuario;

      if (!user) {
        alert("Usuário não encontrado");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => setIsRegister(!isRegister);

  const handleCreateAccountClick = () => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      toggleMode();
    } else {
      navigate("/cadastro");
    }
  };

  return (
    <div className={`loginScreen ${isRegister ? "active-register" : ""}`}>
      <div className="cadastroLeftSide">
        <RegisterAccountScreen
          className="registerAccountInLogin"
          onToggle={toggleMode}
        ></RegisterAccountScreen>
      </div>

      <div className="redSide">
        <img src={logoWhite} alt="logo" className="logoWhite" />

        <span className="phraseLogin">
          Cuide do seu carro, valorize <br></br> seu investimento.
        </span>

        <img src={carLoginImage} alt="carro" className="carLoginimage" />

        {/* <div className="carLoginimage">
          <Lottie.default
            animationData={animacaoCar}
            loop={true}
          />
        </div> */}
      </div>

      <div className="loginRightSide">
        <span className="textWelcome">Bem Vindo</span>

        <div className="containerInputsLogin">
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Senha"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            canToggleVisibility
          />

          <Button text="Login" variant="primary" onClick={handleLogin} />
        </div>

        <div className="containerOpcoes">
          <p className="esqueciSenha">Esqueci minha senha</p>
          <p
            className="criarConta"
            onClick={() => handleCreateAccountClick()}
            style={{ cursor: "pointer" }}
          >
            Criar uma conta
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;