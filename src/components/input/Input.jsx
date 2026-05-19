import './Input.css'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Input = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  canToggleVisibility = false,
  ...props
}) => {

  const [showText, setShowText] = useState(false)

  const isPasswordLike = type === 'password'

  return (
    <div className="inputContainer">

      <input
        className="inputDefault"

        type={
          canToggleVisibility && isPasswordLike
            ? showText
              ? 'text'
              : 'password'
            : type
        }

        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}

        {...props}
      />

      {canToggleVisibility && isPasswordLike && (
        <button
          type="button"
          className="togglePasswordButton"
          onClick={() => setShowText(!showText)}
        >
          {showText ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}

    </div>
  )
}

export default Input