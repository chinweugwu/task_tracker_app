import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Login = () => {
  const {signIn} = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
 
  const handleLogin = async (e) => {
      e.preventDefault()
      try {
        await signIn(email, password)
        navigate('/tasktracker')
      } catch(error) {
        console.log(error.message);
      }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log in to task tracker</h2>
        <section>
           <input 
               id="signup-input"
               type="email" 
               placeholder="enter your email" 
               name="email" 
               onChange={(e) => setEmail(e.target.value)}
           />
        </section>
        <section>
           <input
            id="signup-input" 
            type="password" 
            placeholder='enter password' 
            name="password" 
            onChange={(e) => setPassword(e.target.value)}
           />
        </section>
        <button id="signup-button">Log in</button>
      </form><br />
      <h4>Don't have an account yet? You can <Link to='/signup'>Sign up </Link>here</h4>

    </div>
  )
}

export default Login
