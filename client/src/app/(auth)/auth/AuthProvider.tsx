'use client'

import React, { ReactNode, useContext } from 'react'

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

const Context = React.createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
})

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    return (
    <Context.Provider children={children} value={{login: () => {}, logout: () => {}, isAuthenticated: true}}></Context.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
    return useContext<AuthContextType>(Context);
};