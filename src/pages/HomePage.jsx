import { useEffect, useMemo, useState } from 'react'
import CourseCard from '../components/CourseCard'
import CourseGridSkeleton from '../components/LoadingSkeleton'
import { getAllCourses, saveAllCourses } from '../data/courses'

function HomePage() {
  const userData = JSON.parse(localStorage.getItem('learnWithDeepUser') || 'null')
  const isTeacher = userData?.role === 'teacher'
  const [courses, setCourses] = useState(getAllCourses())
  const [isLoading, setIsLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [courseForm, setCourseForm] = useState({
    title: '',
    instructor: userData?.name || '',
    price: '',
    thumbnail: '',
    description: '',
  })

  const filteredCourses = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase()
    if (!searchValue) return courses
    return courses.filter((courseItem) =>
      courseItem.title.toLowerCase().includes(searchValue),
    )
  }, [courses, searchText])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const handleCourseChange = (event) => {
    const { name, value } = event.target
    setCourseForm((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleAddCourse = (event) => {
    event.preventDefault()

    if (
      !courseForm.title.trim() ||
      !courseForm.instructor.trim() ||
      !courseForm.price.toString().trim() ||
      !courseForm.thumbnail.trim() ||
      !courseForm.description.trim()
    ) {
      alert('Please fill all course fields')
      return
    }

    const newCourseId = `${courseForm.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    const newCourse = {
      id: newCourseId,
      title: courseForm.title.trim(),
      instructor: courseForm.instructor.trim(),
      price: Number(courseForm.price),
      thumbnail: courseForm.thumbnail.trim(),
      description: courseForm.description.trim(),
      videos: [
        {
          id: `intro-${Date.now()}`,
          title: `${courseForm.title.trim()} Introduction`,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
      ],
    }

    const updatedCourses = [newCourse, ...courses]
    setCourses(updatedCourses)
    saveAllCourses(updatedCourses)
    setCourseForm({
      title: '',
      instructor: userData?.name || '',
      price: '',
      thumbnail: '',
      description: '',
    })
    alert('Course added successfully')
  }

  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter((courseItem) => courseItem.id !== courseId)
    setCourses(updatedCourses)
    saveAllCourses(updatedCourses)
    alert('Course deleted successfully')
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-800 p-7 text-white shadow-xl shadow-indigo-500/20 sm:p-10">
        <p className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
          Next Generation Learning Experience
        </p>
        <div className="mt-5 grid items-end gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              LearnWithDeep helps you master in-demand skills with confidence
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-indigo-100 sm:text-base">
              Join curated programs, track real outcomes, and learn from instructors focused on
              practical career growth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">{courses.length}+</p>
              <p className="text-xs text-indigo-100">Live Courses</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs text-indigo-100">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-7 rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
        <input
          type="text"
          placeholder="Search courses by title..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
        />
      </section>

      {isTeacher && (
        <div className="mb-8 rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-7">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Teacher Course Manager</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Publish a new course for your students</p>
          <form onSubmit={handleAddCourse} className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="title"
              placeholder="Course title"
              value={courseForm.title}
              onChange={handleCourseChange}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor name"
              value={courseForm.instructor}
              onChange={handleCourseChange}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
            />
            <input
              type="number"
              name="price"
              placeholder="Course price in rupees"
              value={courseForm.price}
              onChange={handleCourseChange}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40"
            />
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail image URL"
              value={courseForm.thumbnail}
              onChange={handleCourseChange}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40 sm:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Course description"
              value={courseForm.description}
              onChange={handleCourseChange}
              className="h-28 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900/40 sm:col-span-2"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-violet-500 sm:w-fit"
            >
              Add Course
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <CourseGridSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((courseData) => (
            <CourseCard
              key={courseData.id}
              courseData={courseData}
              isTeacher={isTeacher}
              onDeleteCourse={handleDeleteCourse}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/70 bg-white p-10 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          No courses found for your search.
        </div>
      )}

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Our Vision</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
            Learning that creates real outcomes
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            We help students move from tutorials to confidence by combining structured lessons,
            teacher guidance, and practical projects built for real-world goals.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            For Students
          </p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Skill paths with clear progress</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Follow curated journeys, revisit lesson videos, and focus on high-impact topics that
            improve your technical confidence and interview readiness.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            For Teachers
          </p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Create and manage courses easily</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Publish courses quickly, update course pricing, and maintain a fresh catalog so learners
            always discover relevant and up-to-date content.
          </p>
        </article>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Platform Features
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Why teams choose LearnWithDeep</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
            Built like a production-ready LMS with role-based flows, course management, and
            discoverable learning experiences.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Role-Based Access</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Separate login flow for students and teachers.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Course Management</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Teachers can add and delete courses with pricing.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Smart Discovery</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Search experience to find relevant courses fast.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Video Learning</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Focused watch page with lesson navigation sidebar.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Trusted by learners and educators</h2>
          <div className="mt-6 space-y-4">
            <article className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                LearnWithDeep made online learning feel organized and practical. I improved my
                frontend skills much faster than before.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priya S., Student
              </p>
            </article>
            <article className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                As a teacher, adding and updating courses is smooth. The platform feels clean and
                professional.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Arjun M., Instructor
              </p>
            </article>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Everything you need to know</h2>
          <div className="mt-6 space-y-4">
            <article className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Can teachers create paid courses?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes, teachers can add new courses with custom pricing and make them instantly visible
                to students.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Do students see course updates immediately?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes, newly added or deleted courses update right away because the platform stores
                course data in local storage.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Is this ready for backend integration later?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Absolutely. The structure is designed so APIs can replace local storage with minimal
                UI changes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-8 text-white sm:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-100">
              Build your future with confidence
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Start learning and teaching on LearnWithDeep
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-indigo-100 sm:text-base">
              One platform for modern education experiences, crafted for growth-focused students and
              expert instructors.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              GitHub
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
