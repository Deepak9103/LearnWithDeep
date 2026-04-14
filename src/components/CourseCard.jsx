import { Link } from 'react-router-dom'

function CourseCard({ courseData, isTeacher, onDeleteCourse }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative">
        <img
          src={courseData.thumbnail}
          alt={courseData.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between">
          <p className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            Premium Course
          </p>
          <p className="text-sm font-bold text-emerald-600">Rs. {courseData.price}</p>
        </div>
        <h3 className="line-clamp-2 text-xl font-semibold text-slate-900 dark:text-white">
          {courseData.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-300">By {courseData.instructor}</p>
          <p className="text-xs text-amber-500">4.8 ★</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/course/${courseData.id}`}
            className="inline-block rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-violet-500"
          >
            Explore Course
          </Link>
          {isTeacher && (
            <button
              type="button"
              onClick={() => onDeleteCourse(courseData.id)}
              className="rounded-full bg-gradient-to-r from-rose-600 to-red-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
