import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import './RegisterAccount.css'

const RegisterAccountScreen = () => {

    const navigate = useNavigate()

    const handleCancel = () => {
        navigate('/')
    }

    return (
        <div className="registerAccountScreen">

            <span className="titlePage">Cadastrar</span>
            <div className='form'>
                <div className="formElement">
                    <label htmlFor="">Nome</label>
                    <Input type='text' placeholder=''></Input>
                </div>

                <div className="formElement">
                    <label htmlFor="">CPF</label>
                    <Input type='text' placeholder=''></Input>
                </div>

                <div className="formElement">
                    <label htmlFor="">Data Nascimento</label>
                    <Input type='date' placeholder=''></Input>
                </div>

                <div className="formElement">
                    <label htmlFor="">Email</label>
                    <Input type='text' placeholder=''></Input>
                </div>

                <div className="formElement">
                    <label htmlFor="">Senha</label>
                    <Input type='text' placeholder=''></Input>
                </div>

                <div className="formElement">
                    <label htmlFor="">Confirme a Senha</label>
                    <Input type='text' placeholder=''></Input>
                </div>
            </div>


            <div className="buttons">
                <Button text='Cancelar' variant='secondary' onClick={handleCancel}></Button>
                <Button text='Cadastrar' variant='primary'></Button>
            </div>

        </div>
    )
}

export default RegisterAccountScreen