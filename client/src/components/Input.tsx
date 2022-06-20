import React, { FC } from 'react'
import '../css/input.css'

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const Input: FC<InputProps> = ({ value, setValue, placeholder }) => {
  return (
    <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input"
          placeholder={placeholder}
        />
  )
}

export default Input