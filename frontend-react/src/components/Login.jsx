import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async(e) => {
    e.preventDefault();
    const userData = {
      username, password
    }
    console.log("user Data :", userData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      console.log(response.data)
    } catch(error){
      console.error('Invalid Credentials')
    }
    
  }

  return (
    <>
      <div className="container">
        <div className='row justify-content-center'>
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className='text-light text-center mb-5'>Login to The Portal</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-4">
                <input type="password" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              {loading ? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin />Please Wait...</button>
              ) : (
                <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
              )}
              
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login