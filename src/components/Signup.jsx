import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createNewUser } = UserAuth();
  const navigate = useNavigate();
  //const auth = getAuth();

const submitUser = (e) => {
    createNewUser(email, password)
    .then(userCredential => (userCredential.user))
    .catch(error => {
      console.log(error);
    })
    navigate('/tasktracker') 
}

  return (
    <div>
      <form onSubmit={submitUser}>
        <h2>Sign up to task tracker</h2>
        <section>
           <input
            id="signup-input-email" 
            type="text" 
            placeholder='enter your email' 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
           />
        </section>
        <section>
           <input
               id="signup-input-pass" 
               type="password" 
               placeholder="choose a password" 
               name="password"
               onChange={(e) => setPassword(e.target.value)}
           />
        </section>
        <button id="signup-button" type='submit'>Sign up</button>
      </form><br />
      <h4>Already have an account yet? You can <Link to='/'>Sign in here</Link></h4>
    </div>
  )
}

export default Signup
