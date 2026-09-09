/* ==========================================================================
   INITIAL SEED DATA - THE READING NOOK & DIGITAL LIBRARY
   ========================================================================== */

const INITIAL_DATA = {
  // Reading Goals & Stats
  stats: {
    year: 2024,
    booksRead: 24,
    booksTarget: 50,
    currentStreak: 19,
    hoursReadThisMonth: 38.5,
    points: 1420
  },

  // Currently Reading list (matches image.png)
  currentlyReading: [
    {
      id: 'cr-1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      currentChapter: 14,
      totalChapters: 35,
      progressPercent: 40,
      genre: 'Fiction',
      format: 'Book'
    },
    {
      id: 'cr-2',
      title: 'Pachinko',
      author: 'Min Jin Lee',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      currentChapter: 18,
      totalChapters: 42,
      progressPercent: 43,
      genre: 'Historical Fiction',
      format: 'Book'
    },
    {
      id: 'cr-3',
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      currentChapter: 8,
      totalChapters: 20,
      progressPercent: 40,
      genre: 'Self-Improvement',
      format: 'Book'
    }
  ],

  // Monthly Reading Log (matches image.png structure)
  monthlyReadingLog: [
    {
      id: 'log-1',
      date: '2024-01-14',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      rating: 5,
      status: 'Completed',
      notes: 'Thought-provoking look into alternate lives and regret.'
    },
    {
      id: 'log-2',
      date: '2024-02-02',
      title: 'Pachinko',
      author: 'Min Jin Lee',
      rating: 4,
      status: 'In Progress',
      notes: 'Rich multi-generational family saga in Japan.'
    },
    {
      id: 'log-3',
      date: '2024-05-18',
      title: 'Pachinko Vol 2',
      author: 'Min Jin Lee',
      rating: 4,
      status: 'Completed',
      notes: 'Intense emotional journey.'
    },
    {
      id: 'log-4',
      date: '2024-06-11',
      title: 'Atomic Habits',
      author: 'James Clear',
      rating: 4,
      status: 'In Progress',
      notes: 'Super practical framework for building sustainable systems.'
    },
    {
      id: 'log-5',
      date: '2024-11-04',
      title: 'A Song of Ice and Fire',
      author: 'George R.R. Martin',
      rating: 5,
      status: 'Completed',
      notes: 'Masterpiece of epic worldbuilding and character dynamics.'
    }
  ],

  // Quotes Archive (matches image.png)
  favoriteQuotes: [
    {
      id: 'q-1',
      quote: 'A reader lives a thousand lives before he dies. The man who never reads lives only one.',
      author: 'George R.R. Martin',
      book: 'A Dance with Dragons',
      favorite: true
    },
    {
      id: 'q-2',
      quote: 'Between the pages of a book is a lovely place to be.',
      author: 'Anonymous',
      book: 'Literary Anthology',
      favorite: true
    },
    {
      id: 'q-3',
      quote: 'You can never get a cup of tea large enough or a book long enough to suit me.',
      author: 'C.S. Lewis',
      book: 'Essays & Reflections',
      favorite: false
    },
    {
      id: 'q-4',
      quote: 'Books are a uniquely portable magic.',
      author: 'Stephen King',
      book: 'On Writing',
      favorite: true
    }
  ],

  // Digital Library Catalog (Books, Articles, Magazines)
  catalog: [
    {
      id: 'cat-1',
      type: 'Book',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      category: 'Fiction',
      isbn: '978-0525559474',
      year: 2020,
      pages: 304,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      availableCopies: 4,
      totalCopies: 5,
      description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life.'
    },
    {
      id: 'cat-2',
      type: 'Book',
      title: 'Pachinko',
      author: 'Min Jin Lee',
      category: 'Historical Fiction',
      isbn: '978-1455563937',
      year: 2017,
      pages: 496,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      availableCopies: 2,
      totalCopies: 4,
      description: 'An expansive family chronicle tracking four generations of a Korean family living in Japan through war, discrimination, and resilience.'
    },
    {
      id: 'cat-3',
      type: 'Book',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Improvement',
      isbn: '978-0735211292',
      year: 2018,
      pages: 320,
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      availableCopies: 6,
      totalCopies: 8,
      description: 'An easy & proven way to build good habits & break bad ones, powered by cognitive psychology and behavioral insights.'
    },
    {
      id: 'cat-4',
      type: 'Book',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Technology',
      isbn: '978-1449373320',
      year: 2017,
      pages: 616,
      cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=400',
      availableCopies: 3,
      totalCopies: 3,
      description: 'The definitive guide to the architecture, scalability, reliability, and maintainability of modern data systems.'
    },
    {
      id: 'cat-5',
      type: 'Book',
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      category: 'Sci-Fi',
      isbn: '978-0593318171',
      year: 2021,
      pages: 320,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
      availableCopies: 1,
      totalCopies: 3,
      description: 'The story of Klara, an Artificial Friend with outstanding observational qualities, exploring what it means to love.'
    },
    {
      id: 'cat-6',
      type: 'Article',
      title: 'Attention Is All You Need: The Transformer Revolution',
      author: 'Vaswani et al.',
      category: 'AI & Data Science',
      isbn: 'arXiv:1706.03762',
      year: 2017,
      pages: 15,
      cover: 'https://images.unsplash.com/photo-1507842229451-7f01be7f7358?auto=format&fit=crop&q=80&w=400',
      availableCopies: 12,
      totalCopies: 12,
      description: 'The foundational research paper introducing the Transformer self-attention architecture that powers modern Generative AI models.'
    },
    {
      id: 'cat-7',
      type: 'Article',
      title: 'A Philosophy of Software Design',
      author: 'John Ousterhout',
      category: 'Technology',
      isbn: 'STAN-CS-2018',
      year: 2018,
      pages: 28,
      cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
      availableCopies: 8,
      totalCopies: 8,
      description: 'Key insights into managing software complexity, strategic vs tactical programming, and deep module boundaries.'
    },
    {
      id: 'cat-8',
      type: 'Magazine',
      title: 'MIT Technology Review: AI In 2026',
      author: 'MIT Editorial Board',
      category: 'Science & Tech',
      isbn: 'ISSN 0001-4966',
      year: 2026,
      pages: 84,
      cover: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400',
      availableCopies: 5,
      totalCopies: 6,
      description: 'Special annual issue on autonomous agents, neural biology, climate computing, and the next frontier of quantum networking.'
    },
    {
      id: 'cat-9',
      type: 'Magazine',
      title: 'The New Yorker: Fiction & Society',
      author: 'Condé Nast',
      category: 'Culture & Arts',
      isbn: 'ISSN 0028-792X',
      year: 2026,
      pages: 96,
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
      availableCopies: 3,
      totalCopies: 4,
      description: 'Essays, investigative journalism, contemporary short fiction, and cultural commentary from top literary voices.'
    }
  ],

  // Student Loans & History
  studentLoans: [
    {
      id: 'loan-1',
      studentId: 'STU-2024-88',
      studentName: 'Amit Sharma',
      bookTitle: 'The Midnight Library',
      borrowDate: '2026-08-20',
      dueDate: '2026-09-15',
      returnDate: null,
      status: 'Active',
      fine: 0
    },
    {
      id: 'loan-2',
      studentId: 'STU-2024-88',
      studentName: 'Amit Sharma',
      bookTitle: 'Introduction to Algorithms',
      borrowDate: '2026-07-01',
      dueDate: '2026-08-01',
      returnDate: '2026-08-08',
      status: 'Returned (Late)',
      fine: 3.50
    },
    {
      id: 'loan-3',
      studentId: 'STU-2024-88',
      studentName: 'Amit Sharma',
      bookTitle: 'Deep Work',
      borrowDate: '2026-06-10',
      dueDate: '2026-06-25',
      returnDate: '2026-06-23',
      status: 'Returned on time',
      fine: 0
    }
  ],

  // Student Attendance Log
  attendanceLogs: [
    { date: '2026-09-07', checkIn: '09:15 AM', checkOut: '12:40 PM', hours: 3.4, room: 'Silent Study Pod A' },
    { date: '2026-09-06', checkIn: '02:00 PM', checkOut: '05:30 PM', hours: 3.5, room: 'Main Reading Hall' },
    { date: '2026-09-04', checkIn: '10:00 AM', checkOut: '01:15 PM', hours: 3.25, room: 'Digital Resource Lab' },
    { date: '2026-09-02', checkIn: '08:45 AM', checkOut: '11:30 AM', hours: 2.75, room: 'Study Group Room 3' },
    { date: '2026-08-30', checkIn: '01:30 PM', checkOut: '04:45 PM', hours: 3.25, room: 'Silent Study Pod B' }
  ],

  // Leaderboard Data (Ranking System: Daily, Weekly, Monthly, Yearly)
  leaderboards: {
    daily: [
      { rank: 1, name: 'Elena Rostova', pagesRead: 145, booksFinished: 1, streak: 32, points: 290, badge: '🔥 Bookworm' },
      { rank: 2, name: 'Amit Sharma (You)', pagesRead: 120, booksFinished: 0, streak: 19, points: 240, badge: '⚡ Speed Reader' },
      { rank: 3, name: 'Kenji Sato', pagesRead: 98, booksFinished: 0, streak: 14, points: 195, badge: '🎯 Focused' },
      { rank: 4, name: 'Sophia Chen', pagesRead: 75, booksFinished: 0, streak: 22, points: 150, badge: '📖 Avid' },
      { rank: 5, name: 'Lucas Rivera', pagesRead: 60, booksFinished: 0, streak: 8, points: 120, badge: '🌱 Rising' }
    ],
    weekly: [
      { rank: 1, name: 'Amit Sharma (You)', pagesRead: 640, booksFinished: 2, streak: 19, points: 1280, badge: '👑 Weekly Champ' },
      { rank: 2, name: 'Elena Rostova', pagesRead: 590, booksFinished: 2, streak: 32, points: 1180, badge: '🔥 Bookworm' },
      { rank: 3, name: 'Sophia Chen', pagesRead: 510, booksFinished: 1, streak: 22, points: 1020, badge: '📖 Avid' },
      { rank: 4, name: 'Kenji Sato', pagesRead: 440, booksFinished: 1, streak: 14, points: 880, badge: '🎯 Focused' },
      { rank: 5, name: 'Aaliyah Khan', pagesRead: 390, booksFinished: 1, streak: 11, points: 780, badge: '✨ Curious' }
    ],
    monthly: [
      { rank: 1, name: 'Elena Rostova', pagesRead: 2450, booksFinished: 7, streak: 32, points: 4900, badge: '🏆 Grandmaster' },
      { rank: 2, name: 'Sophia Chen', pagesRead: 2180, booksFinished: 6, streak: 22, points: 4360, badge: '🌟 Star Reader' },
      { rank: 3, name: 'Amit Sharma (You)', pagesRead: 1940, booksFinished: 5, streak: 19, points: 3880, badge: '⚡ Speed Reader' },
      { rank: 4, name: 'Kenji Sato', pagesRead: 1650, booksFinished: 4, streak: 14, points: 3300, badge: '🎯 Focused' },
      { rank: 5, name: 'Lucas Rivera', pagesRead: 1420, booksFinished: 3, streak: 8, points: 2840, badge: '🌱 Rising' }
    ],
    yearly: [
      { rank: 1, name: 'Sophia Chen', pagesRead: 18400, booksFinished: 46, streak: 124, points: 36800, badge: '👑 Legend of Lore' },
      { rank: 2, name: 'Elena Rostova', pagesRead: 16900, booksFinished: 41, streak: 98, points: 33800, badge: '🏆 Grandmaster' },
      { rank: 3, name: 'Amit Sharma (You)', pagesRead: 12800, booksFinished: 24, streak: 19, points: 25600, badge: '⚡ Speed Reader' },
      { rank: 4, name: 'Kenji Sato', pagesRead: 11200, booksFinished: 22, streak: 54, points: 22400, badge: '🎯 Focused' },
      { rank: 5, name: 'Maya Lin', pagesRead: 9800, booksFinished: 19, streak: 45, points: 19600, badge: '📚 Dedicated' }
    ]
  },

  // Study Groups
  studyGroups: [
    {
      id: 'sg-1',
      name: 'Modern Web & Systems Dev',
      topic: 'Systems Architecture & Clean Code',
      membersCount: 14,
      nextSession: 'Today @ 4:00 PM',
      color: 'yellow',
      icon: '💻',
      description: 'Collaborative code walk-throughs, book discussions on Kleppmann & Ousterhout, and tech interview prep.',
      pinnedResource: 'Designing Data-Intensive Applications Ch. 4'
    },
    {
      id: 'sg-2',
      name: 'Fiction & Contemporary Literature',
      topic: 'Speculative Fiction & Storytelling',
      membersCount: 22,
      nextSession: 'Tomorrow @ 6:00 PM',
      color: 'pink',
      icon: '📚',
      description: 'Weekly breakdown of Nobel & Booker prize winners, analyzing world-building, dialogue, and pacing.',
      pinnedResource: 'Klara and the Sun Group Notes PDF'
    },
    {
      id: 'sg-3',
      name: 'AI Research & Paper Review',
      topic: 'LLMs, Transformers & Agentic AI',
      membersCount: 31,
      nextSession: 'Friday @ 5:00 PM',
      color: 'mint',
      icon: '🤖',
      description: 'Reading seminal papers in machine learning, neural architectures, and participating in monthly reading challenges.',
      pinnedResource: 'Attention Is All You Need Annotated Slides'
    }
  ],

  // Digital Reminders & Books on Demand
  reminders: [
    {
      id: 'rem-1',
      title: 'Due Date Alert: The Midnight Library',
      dueDate: '2026-09-15',
      type: 'Loan Due',
      urgent: false,
      completed: false
    },
    {
      id: 'rem-2',
      title: 'Book on Demand: Quantum Computing for Everyone arrived!',
      dueDate: '2026-09-09',
      type: 'Book On Demand',
      urgent: true,
      completed: false
    },
    {
      id: 'rem-3',
      title: 'Weekly Study Group: Systems Architecture sync',
      dueDate: 'Today at 4:00 PM',
      type: 'Study Group',
      urgent: false,
      completed: true
    }
  ],

  // Digital Notice Board & News
  news: [
    {
      id: 'news-1',
      title: 'Autumn Reading Marathon 2026 Announced!',
      category: 'Event',
      date: 'Sep 06, 2026',
      badge: 'HOT 🔥',
      content: 'Join the annual 30-day Reading Sprint. Top 10 readers win certified physical badges, custom bookplates, and exclusive reserve privileges.',
      color: 'yellow'
    },
    {
      id: 'news-2',
      title: 'New AI & Technology Section Expansion',
      category: 'New Arrivals',
      date: 'Sep 04, 2026',
      badge: 'NEW 🚀',
      content: 'Over 60 new hardcovers and e-papers have been added to the Digital Archive, covering Agentic Workflows, Neural Design, and Distributed Databases.',
      color: 'mint'
    },
    {
      id: 'news-3',
      title: 'Extended Study Pod Hours During Finals Week',
      category: 'Notice',
      date: 'Sep 01, 2026',
      badge: 'INFO 📢',
      content: 'Library study rooms and silent hubs will stay open 24/7 starting next Monday. Reserve group rooms in advance via the Study Groups tab.',
      color: 'lavender'
    }
  ]
};
