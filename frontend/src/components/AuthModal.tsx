'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Eye, EyeOff } from 'lucide-react'

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
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({ username: '', password: '', confirmPassword: '' })

  const validateForm = () => {
    let isValid = true
    const newErrors = { username: '', password: '', confirmPassword: '' }

    if (!username) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      if (mode === 'login') {
        onLogin(username, password)
      } else {
        onSignup(username, password)
      }
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      onClose()
    }
  }

  const getInputClass = (error: string) => 
    `w-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900'} ${
      error ? 'border-red-500' : ''
    }`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-full max-w-sm mx-auto ${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className={`text-lg sm:text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={getInputClass(errors.username)}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={getInputClass(errors.password)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {mode === 'signup' && (
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={getInputClass(errors.confirmPassword)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}
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