'use client'

import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { AuthModal } from './AuthModal'
import { TodoList } from './TodoList'
import { AlertComponent } from './Alert'
import { ListTodo } from 'lucide-react'
import axios from 'axios';

type User = {
    username: string
    password: string
}

type AlertType = 'success' | 'info' | 'warning' | 'error'

export default function CircularTodoList() {
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const API_URL = 'http://localhost:8000/auth/';
    
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [darkMode])
    
    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}signup/`, { username, password });
            return response.data;
        } catch (error) {
            return { error: 'An error occurred during signup' };
        }
    };
    
    
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}login/`, { username, password });
            return response.data;
        } catch (error) {
            return { error: 'An error occurred during login' };
        }
    };

    const handleLogin = async (username: string, password: string) => {
        setLoading(true)
        setProgress(0)
        try {
            const response = await login(username, password)
            setProgress(50)
            if (response.error) {
                setAlert({ type: 'error', message: response.error })
                setProgress(100)
            } else {
                const userData = { username, password }
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
                setAlert({ type: 'success', message: 'Login successful!' })
                setProgress(100)
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'An error occurred during login' })
        } finally {
            setLoading(false)
        }
    }

    const handleSignup = async (username: string, password: string) => {
        setLoading(true)
        setProgress(0)
        try {
            const response = await register(username, password)
            setProgress(50)
            if (response.error) {
                setAlert({ type: 'error', message: response.error })
                setProgress(100)
            } else {
                const userData = { username, password }
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
                setAlert({ type: 'success', message: 'Signup successful!' })
                setProgress(100)
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'An error occurred during signup' })
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('user')
        setAlert({ type: 'info', message: 'You have been logged out' })
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                onLogout={handleLogout}
                onLoginClick={() => { setAuthMode('login'); setIsAuthModalOpen(true) }}
                onSignupClick={() => { setAuthMode('signup'); setIsAuthModalOpen(true) }}
            />
            <div className="container mx-auto px-4 py-8">
                {alert && (
                    <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}
                {loading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
                {user ? (
                    <TodoList darkMode={darkMode} />
                ) : (
                    <div className="text-center">
                        <ListTodo className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Login to see your Todo List</h2>
                    </div>
                )}
            </div>
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
                onSignup={handleSignup}
                mode={authMode}
                darkMode={darkMode}
            />
        </div>
    )
}