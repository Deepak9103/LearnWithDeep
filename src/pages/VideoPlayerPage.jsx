import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { getAllCourses } from '../data/courses'

function VideoPlayerPage() {
  const { courseId, videoId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const selectedCourse = getAllCourses().find((courseItem) => courseItem.id === courseId)
  const selectedVideo = selectedCourse?.videos.find((videoItem) => videoItem.id === videoId)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(timer)
  }, [courseId, videoId])

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton aspect-video w-full rounded-2xl" />
            <div className="mt-4 space-y-3">
              <div className="skeleton h-6 w-2/3 rounded-md" />
              <div className="skeleton h-4 w-full rounded-md" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-6 w-1/2 rounded-md" />
            <div className="mt-4 space-y-3">
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
              <div className="skeleton h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!selectedCourse || !selectedVideo) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
          Video not found
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-3xl">{selectedCourse.title}</h1>
        <Link
          to={`/course/${selectedCourse.id}`}
          className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-all duration-300 hover:scale-105 dark:bg-indigo-500/20 dark:text-indigo-300"
        >
          Back to Course
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-2xl">
            {selectedVideo.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Keep learning consistently. Every lesson you complete takes you one step closer to
            mastery.
          </p>
        </div>

        <Sidebar
          videos={selectedCourse.videos}
          courseId={selectedCourse.id}
          selectedVideo={selectedVideo}
        />
      </div>
    </main>
  )
}

export default VideoPlayerPage
