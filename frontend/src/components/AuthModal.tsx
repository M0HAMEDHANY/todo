'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string, password: string) => void
  onSignup: (username: string, password: string) => void
  mode: 'login' | 'signup'
  darkMode: boolean
}

export function AuthModal({ isOpen, onClose, onLogin, onSignup, mode, darkMode }: AuthModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (mode === 'login') {
      onLogin(username, password)
    } else {
      onSignup(username, password)
    }
    setUsername('')
    setPassword('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-full max-w-sm mx-auto ${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className={`text-lg sm:text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`w-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'}`}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'}`}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}