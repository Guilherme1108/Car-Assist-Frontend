import './Login.css'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'

const LoginScreen = () => {

  const navigate = useNavigate();

  const handleApprove= () => {
    navigate('/menu')
  }

  return (
    <div className='loginScreen'>

      <span className="textWelcome">Bem Vindo</span>

      <div className='container'>
        <Input type='text' placeholder='Nome'></Input>

        <Input type='text' placeholder='Nome'></Input>

        <Button text='Login' variant='primary' onClick={handleApprove}></Button>
      </div>

      <div className='containerOpcoes'>
        <p className='esqueciSenha'>Esqueci minha senha</p>
        <p onClick={() => navigate('/cadastro')}>Criar uma conta</p>
      </div>

    </div>
  )
}

export default LoginScreen