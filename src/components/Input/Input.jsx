import React from 'react'
import "./Styles.css"
const Input = ({lable, state, placeholder, setState, type}) => {
  return (
    <div className='input-wrapper'>
         <p className='lable-input'>{lable}</p>
         <input type={type} 
                value={state} 
                placeholder={placeholder} 
                onChange={(e)=>setState(e.target.value)}
                className="custom-input"
                required
         />
    </div>
  )
}

export default Input
