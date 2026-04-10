import React from 'react'
import './Login.css'

const LoginScreen = () => {
  return (
    <div className='loginScreen'>
        <img src="" alt="logo" />

        <span>BEM VINDO</span>

        <div className='container'>
            <input type="Email" />

            <input type="Senha" />

            <button>Login</button>
        </div>

        

        <p>Esqueci minha senha</p>
        <p>Criar uma conta</p>
    </div>
  )
}

export default LoginScreen