import './Input.css'

const Input = ({ type = 'text', placeholder, name, value, onChange }) => {
  return (
    <input 
      className="inputDefault" 
      type={type}
      placeholder={placeholder} 
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input