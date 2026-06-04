import { createContext } from "react";
import { useState, useEffect } from "react";
import { registerUser, loginUser, getMe, logoutUser } from '../services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({ children }){
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    const handleLogin = async(username, email, password) => {
        setloading(true)
        try {
            const response = await loginUser(username, email, password)
            setuser(response.user)
            if (response.token) {
                localStorage.setItem('token', response.token)
            }
        } catch (error) {
            console.log("Error while logging in...", error)
        }
        finally{
            setloading(false)
        }
    }

    const handleRegister = async(username, email, password) => {
        setloading(true)
        try {
            const response = await registerUser(username, email, password)
            setuser(response.user)
            if (response.token) {
                localStorage.setItem('token', response.token)
            }
        } catch (error) {
            console.log("Error while registering user...", error)
        }
        finally{
            setloading(false)
        }
    }

    const handleLogout = async() => {
        setloading(true)
        try {
            await logoutUser()
            setuser(null)
            localStorage.removeItem('token')
        } catch (error) {
            console.log("Error while logging out...", error)
        }
        finally{
            setloading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await getMe();
            setuser(response.user);
        } catch (err) {
            if (err.response?.status !== 401) {
                console.log("Error fetching user:", err);
            }
        }
        finally{
            setloading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout, fetchUser }}>
            { children }
        </AuthContext.Provider>
    )
}