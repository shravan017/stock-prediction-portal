import React, { useState, useContext, createContext } from 'react'

const AuthContext = createContext();
const AuthProvider = ( {children} ) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    //check true or false
    !!localStorage.getItem('access_token')
  )
  return (
    <AuthContext.Provider value={{isLoggedIn ,setIsLoggedIn}}>
      { children }
    </AuthContext.Provider>
    
  )
}

export default AuthProvider

export { AuthContext }