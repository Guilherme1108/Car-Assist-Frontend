import {useState} from "react"; // 1. Importar o useState
import {useNavigate} from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import api from "../../services/api";
import "./Login.css";
import RegisterAccountScreen from "../registerAccount/RegisterAccount";
import imagemF40 from "../../assets/f40_desktop.svg";
import logoWhite from "../../assets/logo_white.svg";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const {email, password} = credentials;

    if (!email || !password) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await api.get(`/users?email=${email}`);

      if (response.data.length > 0) {
        const user = response.data[0];

        if (user.senha === password) {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        } else {
          alert("Senha incorreta");
        }
      } else {
        alert("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro no login", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => setIsRegister(!isRegister);

  const handleCreateAccountClick = () => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      toggleMode()
    } else {
      navigate("/cadastro");
    }
  };

  return (
    <div className={`loginScreen ${isRegister ? 'active-register' : ''}`}>
      <img src={imagemF40} alt="Carro" className="imgCarroLogin" />

      <div className="cadastroLeftSide">
        <RegisterAccountScreen className="registerAccountInLogin" onToggle={toggleMode}></RegisterAccountScreen>
      </div>

      <div className="redSide">
        <img src={logoWhite} alt="logo" className="logoWhite" />

        <span className="phraseLogin">
          Cuide do seu carro, valorize <br></br> seu investimento.
        </span>
      </div>

      <div className="loginRightSide">
        <span className="textWelcome">Bem Vindo</span>

        <div className="container">
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
          />

          <Button text="Login" variant="primary" onClick={handleLogin} />
        </div>

        <div className="containerOpcoes">
          <p className="esqueciSenha">Esqueci minha senha</p>
          <p
            onClick={() => handleCreateAccountClick()}
            style={{cursor: "pointer"}}
          >
            Criar uma conta
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
