import React, { useState, useContext } from 'react'
import { AuthContext } from '../../store/nicknameStore'
const Wellcome = () => {
  const {userData, setUserData} = useContext(AuthContext)
  const [name, setName] = useState('')

  const inputHandler = () => {
    setUserData({...userData, 'name': name})
  };

  return (
    <div>
        <h1>Wellcome {userData.name}</h1>
        <input type="text" value={name} placeholder='Enter your nickname' onChange={(e) => setName(newName => newName = e.target.value)}/>
        <button onClick={inputHandler}>Enter</button>

    </div>
  )
}

export default Wellcome