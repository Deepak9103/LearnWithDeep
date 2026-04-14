function CourseGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="skeleton h-44 w-full rounded-2xl" />
          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-24 rounded-md" />
            <div className="skeleton h-5 w-full rounded-md" />
            <div className="skeleton h-5 w-2/3 rounded-md" />
            <div className="skeleton h-4 w-1/2 rounded-md" />
            <div className="skeleton h-10 w-32 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseGridSkeleton
