/* ==========================================================================
   STATE STORE & PERSISTENCE - THE READING NOOK
   ========================================================================== */

// --- SUPABASE CONFIGURATION ---
// Replace these with your actual Supabase project URL and Anon Key
const supabaseUrl = 'https://iikhmctujkrpxrueijos.supabase.co';
const supabaseKey = 'sb_secret_DG2cmyXh1NxZQOHpCGRZFg_T0e4RsjD';

// Initialize only if the Supabase CDN script is loaded in index.html
const supabaseClient = typeof supabase !== 'undefined'
  ? supabase.createClient(supabaseUrl, supabaseKey)
  : null;

class AppStore {
  constructor() {
    this.STORAGE_KEY = 'READING_NOOK_STORE_V1';
    this.listeners = new Map();
    this.state = this.loadState();

    // Initialize real-time camera tracking if Supabase is connected
    if (supabaseClient) {
      this.initRealtimeAttendance();
    }
  }

  initRealtimeAttendance() {
    supabaseClient
      .channel('public:attendance_logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'attendance_logs' }, payload => {
        // A student just walked IN
        const newLog = {
          id: payload.new.id,
          date: payload.new.date,
          checkIn: new Date(payload.new.in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          checkOut: 'In Session',
          hours: 0,
          room: 'Main Reading Hall' // Default camera location
        };
        this.state.attendanceLogs.unshift(newLog);
        this.saveState();
        this.emit('attendanceUpdated', this.state.attendanceLogs);

        // Trigger a global UI toast if the App router is available
        if (window.App) {
          window.App.showToast(`📍 PID: ${payload.new.student_pid} just entered the library!`);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'attendance_logs' }, payload => {
        // A student just walked OUT
        const logIndex = this.state.attendanceLogs.findIndex(l => l.id === payload.new.id || l.checkOut === 'In Session');
        if (logIndex > -1) {
          this.state.attendanceLogs[logIndex].checkOut = new Date(payload.new.out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          this.state.attendanceLogs[logIndex].hours = (payload.new.duration_minutes / 60).toFixed(2);
          this.saveState();
          this.emit('attendanceUpdated', this.state.attendanceLogs);

          if (window.App) {
            window.App.showToast(`👋 PID: ${payload.new.student_pid} left. Duration: ${payload.new.duration_minutes} mins.`);
          }
        }
      })
      .subscribe();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load stored state, using defaults:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
    this.emit('stateChanged', this.state);
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
  }

  // Role Management
  getRole() {
    return localStorage.getItem('NOOK_CURRENT_ROLE') || 'student';
  }

  setRole(role) {
    localStorage.setItem('NOOK_CURRENT_ROLE', role);
    this.emit('roleChanged', role);
  }

  // Student Profile Management
  getCurrentStudent() {
    const saved = localStorage.getItem('SJCEM_CURRENT_STUDENT');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.pid && !parsed.pid.startsWith('EU125')) {
          parsed.pid = 'EU125' + parsed.pid.padStart(4, '0').slice(-4);
        }
        return parsed;
      } catch (e) { }
    }
    return {
      pid: 'EU1251042',
      name: 'Amit Sharma',
      avatar: 'AS'
    };
  }

  setCurrentStudent(studentData) {
    localStorage.setItem('SJCEM_CURRENT_STUDENT', JSON.stringify(studentData));
    this.emit('studentChanged', studentData);
  }

  // --- Reading Goals & Stats ---
  getStats() {
    return this.state.stats;
  }

  updateStats(newStats) {
    this.state.stats = { ...this.state.stats, ...newStats };
    this.saveState();
  }

  // --- Currently Reading ---
  getCurrentlyReading() {
    return this.state.currentlyReading;
  }

  updateBookProgress(bookId, deltaChapter = 1) {
    const book = this.state.currentlyReading.find(b => b.id === bookId);
    if (book) {
      book.currentChapter = Math.min(book.totalChapters, Math.max(0, book.currentChapter + deltaChapter));
      book.progressPercent = Math.round((book.currentChapter / book.totalChapters) * 100);

      // If completed
      if (book.currentChapter === book.totalChapters) {
        this.state.stats.booksRead = (this.state.stats.booksRead || 0) + 1;
        this.addReadingLog({
          date: new Date().toISOString().split('T')[0],
          title: book.title,
          author: book.author,
          rating: 5,
          status: 'Completed',
          notes: 'Finished reading via currently reading tracker!'
        });
      }
      this.saveState();
      this.emit('readingUpdated', this.state.currentlyReading);
    }
  }

  // --- Reading Log ---
  getReadingLog() {
    return this.state.monthlyReadingLog;
  }

  addReadingLog(entry) {
    const newEntry = {
      id: 'log-' + Date.now(),
      date: entry.date || new Date().toISOString().split('T')[0],
      title: entry.title,
      author: entry.author || 'Unknown',
      rating: Number(entry.rating) || 5,
      status: entry.status || 'Completed',
      notes: entry.notes || ''
    };
    this.state.monthlyReadingLog.unshift(newEntry);
    this.saveState();
    this.emit('logUpdated', this.state.monthlyReadingLog);
    return newEntry;
  }

  deleteReadingLog(logId) {
    this.state.monthlyReadingLog = this.state.monthlyReadingLog.filter(l => l.id !== logId);
    this.saveState();
    this.emit('logUpdated', this.state.monthlyReadingLog);
  }

  // --- Quotes ---
  getQuotes() {
    return this.state.favoriteQuotes;
  }

  addQuote(quote, author, book = '') {
    const newQuote = {
      id: 'q-' + Date.now(),
      quote,
      author: author || 'Anonymous',
      book,
      favorite: true
    };
    this.state.favoriteQuotes.unshift(newQuote);
    this.saveState();
    this.emit('quotesUpdated', this.state.favoriteQuotes);
    return newQuote;
  }

  // --- Catalog ---
  getCatalog(type = 'All', search = '') {
    let list = this.state.catalog;
    if (type && type !== 'All') {
      list = list.filter(item => item.type.toLowerCase() === type.toLowerCase());
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return list;
  }

  addCatalogItem(item) {
    const newItem = {
      id: 'cat-' + Date.now(),
      type: item.type || 'Book',
      title: item.title,
      author: item.author,
      category: item.category || 'General',
      isbn: item.isbn || 'ISBN-' + Math.floor(Math.random() * 900000 + 100000),
      year: Number(item.year) || new Date().getFullYear(),
      pages: Number(item.pages) || 250,
      cover: item.cover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      availableCopies: Number(item.copies) || 3,
      totalCopies: Number(item.copies) || 3,
      description: item.description || 'New digital addition to the library collection.'
    };
    this.state.catalog.unshift(newItem);
    this.saveState();
    this.emit('catalogUpdated', this.state.catalog);
    return newItem;
  }

  borrowBook(catalogId) {
    const item = this.state.catalog.find(c => c.id === catalogId);
    if (!item || item.availableCopies <= 0) return { success: false, message: 'No copies available' };

    item.availableCopies -= 1;
    const loan = {
      id: 'loan-' + Date.now(),
      studentId: 'STU-2024-88',
      studentName: 'Amit Sharma',
      bookTitle: item.title,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      returnDate: null,
      status: 'Active',
      fine: 0
    };
    this.state.studentLoans.unshift(loan);
    this.saveState();
    this.emit('loansUpdated', this.state.studentLoans);
    this.emit('catalogUpdated', this.state.catalog);
    return { success: true, loan };
  }

  // --- Loans & Fines ---
  getLoans() {
    return this.state.studentLoans;
  }

  payFine(loanId) {
    const loan = this.state.studentLoans.find(l => l.id === loanId);
    if (loan) {
      loan.fine = 0;
      loan.status = 'Paid & Cleared';
      this.saveState();
      this.emit('loansUpdated', this.state.studentLoans);
    }
  }

  // --- Attendance ---
  getAttendance() {
    return this.state.attendanceLogs;
  }

  checkInAttendance(room = 'Main Reading Hall') {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newLog = {
      date: dateStr,
      checkIn: timeStr,
      checkOut: 'In Session',
      hours: 1.0,
      room
    };
    this.state.attendanceLogs.unshift(newLog);
    this.saveState();
    this.emit('attendanceUpdated', this.state.attendanceLogs);
    return newLog;
  }

  // --- Study Groups ---
  getStudyGroups() {
    return this.state.studyGroups;
  }

  joinStudyGroup(groupId) {
    const group = this.state.studyGroups.find(g => g.id === groupId);
    if (group) {
      group.membersCount += 1;
      group.isJoined = true;
      this.saveState();
      this.emit('studyGroupsUpdated', this.state.studyGroups);
    }
  }

  // --- Reminders & On Demand ---
  getReminders() {
    return this.state.reminders;
  }

  addReminder(title, dueDate, type = 'Custom') {
    const newRem = {
      id: 'rem-' + Date.now(),
      title,
      dueDate,
      type,
      urgent: false,
      completed: false
    };
    this.state.reminders.unshift(newRem);
    this.saveState();
    this.emit('remindersUpdated', this.state.reminders);
    return newRem;
  }

  toggleReminder(remId) {
    const rem = this.state.reminders.find(r => r.id === remId);
    if (rem) {
      rem.completed = !rem.completed;
      this.saveState();
      this.emit('remindersUpdated', this.state.reminders);
    }
  }

  // --- News & Notices ---
  getNews() {
    return this.state.news;
  }

  addNews(title, category, content, badge = 'NOTICE 📢') {
    const newNotice = {
      id: 'news-' + Date.now(),
      title,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      badge,
      content,
      color: 'yellow'
    };
    this.state.news.unshift(newNotice);
    this.saveState();
    this.emit('newsUpdated', this.state.news);
    return newNotice;
  }

  // --- Leaderboards ---
  getLeaderboard(period = 'weekly') {
    return this.state.leaderboards[period] || this.state.leaderboards.weekly;
  }
}

// Global store instance
const store = new AppStore();