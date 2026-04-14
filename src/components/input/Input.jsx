import './Input.css'

const Input = ({ type = 'text', placeholder }) => {
  return (
    <input 
      className="inputDefault" 
      type={type}
      placeholder={placeholder} 
    />
  )
}

export default Input