'use client'

import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { AuthModal } from './AuthModal'
import { TodoList } from './TodoList'

type User = {
    username: string
    password: string
}

export default function CircularTodoList() {
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const handleLogin = (username: string, password: string) => {
        // In a real app, you would validate credentials against a backend
        setUser({ username, password })
    }

    const handleSignup = (username: string, password: string) => {
        // In a real app, you would send this data to a backend to create a new user
        setUser({ username, password })
    }

    const handleLogout = () => {
        setUser(null)
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
                {user ? (
                    <TodoList darkMode={darkMode} />
                ) : (
                    <div className="text-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Please log in or sign up to use the Todo List</h2>
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