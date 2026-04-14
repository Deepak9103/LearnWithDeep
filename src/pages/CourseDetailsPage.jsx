import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllCourses } from '../data/courses'

function CourseDetailsPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const selectedCourse = getAllCourses().find((courseItem) => courseItem.id === id)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="skeleton h-72 w-full rounded-2xl" />
          <div className="mt-5 space-y-3">
            <div className="skeleton h-8 w-2/3 rounded-lg" />
            <div className="skeleton h-4 w-1/4 rounded-md" />
            <div className="skeleton h-4 w-1/5 rounded-md" />
            <div className="skeleton h-4 w-full rounded-md" />
            <div className="skeleton h-4 w-4/5 rounded-md" />
          </div>
        </div>
      </main>
    )
  }

  if (!selectedCourse) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
          Course not found
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <img
          src={selectedCourse.thumbnail}
          alt={selectedCourse.title}
          className="h-72 w-full object-cover"
        />
        <div className="p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {selectedCourse.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-indigo-600">
            Instructor: {selectedCourse.instructor}
          </p>
          <p className="mt-1 text-sm font-semibold text-emerald-600">
            Price: Rs. {selectedCourse.price}
          </p>
          <p className="mt-4 max-w-4xl text-slate-600 dark:text-slate-300">{selectedCourse.description}</p>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">Lessons</h2>
            <div className="space-y-3">
              {selectedCourse.videos.map((videoItem, index) => (
                <Link
                  key={videoItem.id}
                  to={`/watch/${selectedCourse.id}/${videoItem.id}`}
                  className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition-all duration-300 hover:translate-x-1 hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {index + 1}. {videoItem.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CourseDetailsPage
