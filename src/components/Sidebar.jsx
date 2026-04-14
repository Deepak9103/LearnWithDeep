import { Link } from 'react-router-dom'

function Sidebar({ videos, courseId, selectedVideo }) {
  return (
    <aside className="w-full rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 lg:w-96">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Course Lessons</h3>
      <div className="space-y-2.5">
        {videos.map((videoItem, index) => {
          const isSelected = selectedVideo?.id === videoItem.id
          return (
            <Link
              key={videoItem.id}
              to={`/watch/${courseId}/${videoItem.id}`}
              className={`block rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                isSelected
                  ? 'border border-indigo-200 bg-gradient-to-r from-indigo-100 to-violet-100 font-semibold text-indigo-700 dark:border-indigo-500/30 dark:from-indigo-500/20 dark:to-violet-500/20 dark:text-indigo-300'
                  : 'border border-slate-200 bg-white text-slate-700 hover:translate-x-1 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {index + 1}. {videoItem.title}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
