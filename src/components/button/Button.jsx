import './Button.css'

//A variant deve ser primary ou secondary, isso irá mudar a cor do botão entre primaria e secundaria
const Button = ({ text, variant, onClick }) => {
    return (
        <button
            className={`buttonDefault ${variant}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button