import './Input.css'

// Usamos o ...props para pegar qualquer outra propriedade enviada
const Input = ({ type = 'text', placeholder, name, value, onChange, ...props }) => {
  return (
    <input 
      className="inputDefault" 
      type={type}
      placeholder={placeholder} 
      name={name}
      value={value}
      onChange={onChange}
      {...props} // Aplica automaticamente propriedades como maxLength ou inputmode
    />
  )
}

export default Input;