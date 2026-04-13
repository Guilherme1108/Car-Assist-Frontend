import './Login.css'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

  const navigate = useNavigate();

  return (
    <div className='loginScreen'>

      <div className='container'>
        <input type="text" placeholder='Email' />

        <input className='senha' type="Senha" placeholder='Senha' />

        <button>Login</button>
      </div>

      <div className='containerOpcoes'>
        <p className='esqueciSenha'>Esqueci minha senha</p>
        <p onClick={() => navigate('/cadastro')}>Criar uma conta</p>
      </div>

    </div>
  )
}

export default LoginScreen