import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const { handleRegister, loading } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        else if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
        
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {
            await handleRegister(username, email, password);
            navigate('/login');
        } catch (error) {
            setGeneralError(error.response?.data?.message || "Error while registering. Please try again.");
            console.log("Error while registering the user: ", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    <p className="mt-4 text-white text-lg font-medium">Creating your account...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden'>
                {/* Header Section */}
                <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 pt-8 pb-6'>
                    <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
                    <p className='text-indigo-100'>Join us today</p>
                </div>

                {/* Form Section */}
                <div className='p-8'>
                    {/* General Error Alert */}
                    {generalError && (
                        <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                            <p className='text-red-700 text-sm font-medium'>{generalError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Username
                            </label>
                            <input 
                                id="username"
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                                    errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                }`}
                            />
                            {errors.username && (
                                <p className='text-red-600 text-xs mt-1 font-medium'>{errors.username}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Email
                            </label>
                            <input 
                                id="email"
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                }`}
                            />
                            {errors.email && (
                                <p className='text-red-600 text-xs mt-1 font-medium'>{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Password
                            </label>
                            <input 
                                id="password"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                }`}
                            />
                            {errors.password && (
                                <p className='text-red-600 text-xs mt-1 font-medium'>{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Confirm Password
                            </label>
                            <input 
                                id="confirmPassword"
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
                                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                                }`}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-600 text-xs mt-1 font-medium'>{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className='w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95'
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='mt-6 relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-2 bg-white text-gray-500'>Already have an account?</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link 
                        to="/login"
                        className='mt-6 block w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 px-4 rounded-lg transition duration-200'
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;