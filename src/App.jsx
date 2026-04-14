import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SiteFooter from './components/SiteFooter'
import CourseDetailsPage from './pages/CourseDetailsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import VideoPlayerPage from './pages/VideoPlayerPage'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />
      <div key={location.pathname} className="page-fade">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/watch/:courseId/:videoId" element={<VideoPlayerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  )
}

export default App
