function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">LearnWithDeep</h3>
          <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
            LearnWithDeep is a modern learning platform for students and educators to build skills,
            publish practical courses, and grow careers through structured learning paths.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>About Us</li>
            <li>Careers</li>
            <li>Support</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Follow Us
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Copyright {new Date().getFullYear()} LearnWithDeep. All rights reserved.
      </div>
    </footer>
  )
}

export default SiteFooter
