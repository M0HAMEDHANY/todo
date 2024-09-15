import { Sun, Moon, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState } from 'react'

type NavbarProps = {
    darkMode: boolean
    setDarkMode: (value: boolean) => void
    user: { username: string } | null
    onLogout: () => void
    onLoginClick: () => void
    onSignupClick: () => void
}

export function Navbar({ darkMode, setDarkMode, user, onLogout, onLoginClick, onSignupClick }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl md:text-2xl font-bold">Todo List</h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <NavbarContent
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                                user={user}
                                onLogout={onLogout}
                                onLoginClick={onLoginClick}
                                onSignupClick={onSignupClick}
                            />
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="grid grid-cols-1 px-2 pt-2 pb-3 space-y-1 sm:px-3  justify-center">
                        <NavbarContent
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            user={user}
                            onLogout={onLogout}
                            onLoginClick={onLoginClick}
                            onSignupClick={onSignupClick}
                        />
                    </div>
                </div>
            )}
        </nav>
    )
}

function NavbarContent({ darkMode, setDarkMode, user, onLogout, onLoginClick, onSignupClick }: NavbarProps) {
    return (
        <>
            <div className="flex just space-x-2 m-auto mb-1 ">
                <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="bg-gray-200 dark:bg-gray-700"
                />
                <span>{darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</span>
            </div>
            {user ? (
                <>
                    <span className="text-lg md:text-base text-center">Welcome, {user.username}!</span>
                    <Button onClick={onLogout} variant="outline" size="sm">Logout</Button>
                </>
            ) : (
                <>
                    <Button onClick={onLoginClick} variant="outline" size="sm">Login</Button>
                    <Button onClick={onSignupClick} variant="outline" size="sm">Sign Up</Button>
                </>
            )}
        </>
    )
}