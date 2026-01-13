import React, { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = (e) => {
    e.preventDefault();
    const userData = {
      username, email, password
    }
    console.log("User Data ==>",userData)
  }
  return (
    <>
      <div className="container">
        <div className='row justify-content-center'>
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className='text-light text-center mb-5'>Create an Account</h3>
            <form onSubmit={handleRegistration}>
              <input type="text" className='form-control mb-4' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" className='form-control mb-4' placeholder='Email Address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" className="form-control mb-5" placeholder='Set Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register