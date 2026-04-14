import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('learnWithDeepTheme') || 'light')

  const userData = useMemo(() => {
    const savedUser = localStorage.getItem('learnWithDeepUser')
    return savedUser ? JSON.parse(savedUser) : null
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('learnWithDeepUser')
    navigate('/login')
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
    localStorage.setItem('learnWithDeepTheme', themeMode)
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'))
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
        isScrolled
          ? 'border-slate-200/70 bg-white/80 shadow-lg shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/40'
          : 'border-transparent bg-white/60 dark:bg-slate-900/60'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            LW
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            LearnWithDeep
          </span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`
            }
          >
            Account
          </NavLink>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {themeMode === 'dark' ? 'Light' : 'Dark'}
          </button>
          {userData ? (
            <>
              <p className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:block">
                Welcome {userData.name} ({userData.role === 'teacher' ? 'Teacher' : 'Student'})
              </p>
              <button
                onClick={handleLogout}
                className="rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-slate-700 hover:to-slate-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-violet-500"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
