import React from 'react'
import { Navigate } from 'react-router-dom'
import {useAuth} from '../features/auth/hooks/useAuth'

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth()

    if(loading){
        return (
            <div className='flex justify-center items-center h-[50vh]'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-50'></div>
            </div>
        )
    }

    if(!user){
        return <Navigate to='/login' replace />
    }
    return children 
}

export default ProtectedRoutes