import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('student')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please enter name and email')
      return
    }

    localStorage.setItem(
      'learnWithDeepUser',
      JSON.stringify({ ...formData, role: selectedRole }),
    )
    alert('Login Successful')
    navigate('/')
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl shadow-indigo-900/30 sm:p-10">
        <p className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
          Premium Learning Platform
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
          Welcome to the future of online learning
        </h1>
        <p className="mt-4 text-sm text-indigo-100 sm:text-base">
          LearnWithDeep gives students a smooth experience and teachers powerful tools to grow and
          manage courses.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-white/10 px-3 py-4">
            <p className="text-2xl font-bold">50K+</p>
            <p className="text-xs text-indigo-100">Learners</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-4">
            <p className="text-2xl font-bold">1K+</p>
            <p className="text-xs text-indigo-100">Courses</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-4">
            <p className="text-2xl font-bold">4.9</p>
            <p className="text-xs text-indigo-100">Ratings</p>
          </div>
        </div>
      </section>

      <section className="w-full rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/50 sm:p-8">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Login to LearnWithDeep</h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">Continue your learning journey</p>

        <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              selectedRole === 'student'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('teacher')}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              selectedRole === 'teacher'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Teacher Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500"
          >
            Continue as {selectedRole === 'teacher' ? 'Teacher' : 'Student'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
