import { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();
  
  const handleLogout = (e) => {

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
    console.log('Logged out')
    navigate('/login')

  }
  return (
    <>
        <nav className='navbar container pt-4 pb-4 align-items-start' >
            <b><Link className='navbar-brand text-light' to='/'>STOCK PREDICTION PORTAL</Link></b>

            
            <div>
              {isLoggedIn? (
                <>
                  <Button class='btn btn-info' text="Dashboard" url="dashboard"/>
                  &nbsp;
                  <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </>
              ):(
                <>
                  <Button text="Login" class="btn-outline-info" url="login"/>
                  &nbsp;
                  <Button text="Register" class="btn-info" url="register"/>
                </>
                
              )}
                
            </div>
        </nav>
    </>
  )
}

export default Header