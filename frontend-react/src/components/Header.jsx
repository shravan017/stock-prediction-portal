import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <nav className='navbar container pt-4 pb-4 align-items-start' >
            <b><Link className='navbar-brand text-light' to='/'>STOCK PREDICTION PORTAL</Link></b>
            <div>
                <Button text="Login" class="btn-outline-info" url="login"/>
                &nbsp;
                <Button text="Register" class="btn-info" url="register"/>
            </div>
        </nav>
    </>
  )
}

export default Header