export const courseList = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals for Beginners',
    instructor: 'Rahul Verma',
    price: 1499,
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80',
    description:
      'Learn React basics from scratch including components, props, state, and routing with practical mini projects.',
    videos: [
      {
        id: 'intro-react',
        title: 'Introduction to React',
        videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
      },
      {
        id: 'jsx-components',
        title: 'JSX and Components',
        videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
      },
      {
        id: 'hooks-basics',
        title: 'useState and useEffect Basics',
        videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
      },
    ],
  },
  {
    id: 'javascript-mastery',
    title: 'JavaScript Mastery Bootcamp',
    instructor: 'Neha Sharma',
    price: 1299,
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    description:
      'Strengthen your JavaScript concepts with modern ES6+ syntax, asynchronous programming, and real coding patterns.',
    videos: [
      {
        id: 'js-variables',
        title: 'Variables, Data Types and Operators',
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      },
      {
        id: 'js-functions',
        title: 'Functions and Arrow Functions',
        videoUrl: 'https://www.youtube.com/embed/N8ap4k_1QEQ',
      },
      {
        id: 'js-async',
        title: 'Promises and Async Await',
        videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s',
      },
    ],
  },
  {
    id: 'tailwind-ui',
    title: 'Tailwind CSS and UI Design',
    instructor: 'Aman Kapoor',
    price: 999,
    thumbnail:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
    description:
      'Build modern responsive interfaces quickly using Tailwind utility classes and reusable layout patterns.',
    videos: [
      {
        id: 'tw-setup',
        title: 'Tailwind Setup in React',
        videoUrl: 'https://www.youtube.com/embed/6biMWgD6_JY',
      },
      {
        id: 'tw-layout',
        title: 'Responsive Layout Techniques',
        videoUrl: 'https://www.youtube.com/embed/lCxcTsOHrjo',
      },
      {
        id: 'tw-components',
        title: 'Building UI Components',
        videoUrl: 'https://www.youtube.com/embed/pfaSUYaSgRo',
      },
    ],
  },
]

const storageKey = 'learnWithDeepCourses'

export const getAllCourses = () => {
  const savedCourses = localStorage.getItem(storageKey)
  if (!savedCourses) return courseList

  try {
    const parsedCourses = JSON.parse(savedCourses)
    return Array.isArray(parsedCourses) ? parsedCourses : courseList
  } catch {
    return courseList
  }
}

export const saveAllCourses = (updatedCourses) => {
  localStorage.setItem(storageKey, JSON.stringify(updatedCourses))
}
