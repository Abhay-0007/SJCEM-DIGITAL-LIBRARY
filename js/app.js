/* ==========================================================================
   APP CONTROLLER & ROUTER - THE READING NOOK
   ========================================================================== */

const App = {
  currentView: 'dashboard',
  timerInterval: null,
  timerSecondsRemaining: 25 * 60,
  timerRunning: false,

  init() {
    this.bindRoleSwitcher();
    this.bindNavigation();
    this.bindStoreEvents();
    this.switchView('dashboard');
    this.updateRoleUI();
  },

  bindRoleSwitcher() {
    const studentBtn = document.getElementById('roleBtnStudent');
    const adminBtn = document.getElementById('roleBtnAdmin');

    if (studentBtn) {
      studentBtn.addEventListener('click', () => {
        store.setRole('student');
        this.updateRoleUI();
        this.switchView('dashboard');
        this.showToast('👤 Switched to Student Profile');
      });
    }

    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        store.setRole('admin');
        this.updateRoleUI();
        this.switchView('admin');
        this.showToast('🛡️ Switched to Administrator Portal');
      });
    }
  },

  updateRoleUI() {
    const role = store.getRole();
    const studentBtn = document.getElementById('roleBtnStudent');
    const adminBtn = document.getElementById('roleBtnAdmin');
    const adminNavSection = document.getElementById('adminNavSection');
    const userRoleTag = document.getElementById('userRoleTag');

    if (role === 'admin') {
      studentBtn?.classList.remove('active');
      adminBtn?.classList.add('active', 'admin-active');
      if (adminNavSection) adminNavSection.style.display = 'block';
      if (userRoleTag) {
        userRoleTag.textContent = 'ADMINISTRATOR';
        userRoleTag.className = 'neo-badge neo-badge-pink';
      }
    } else {
      studentBtn?.classList.add('active');
      adminBtn?.classList.remove('active', 'admin-active');
      if (adminNavSection) adminNavSection.style.display = 'none';
      if (userRoleTag) {
        userRoleTag.textContent = 'STUDENT';
        userRoleTag.className = 'neo-badge neo-badge-yellow';
      }
    }
  },

  bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        if (view) {
          this.switchView(view);
          // Close mobile sidebar if open
          document.getElementById('appSidebar')?.classList.remove('mobile-open');
        }
      });
    });

    const mobileToggle = document.getElementById('mobileNavToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        document.getElementById('appSidebar')?.classList.toggle('mobile-open');
      });
    }
  },

  bindStoreEvents() {
    store.on('stateChanged', () => this.refreshCurrentView());
    store.on('readingUpdated', () => this.refreshCurrentView());
    store.on('logUpdated', () => this.refreshCurrentView());
    store.on('catalogUpdated', () => this.refreshCurrentView());
    store.on('loansUpdated', () => this.refreshCurrentView());
    store.on('attendanceUpdated', () => this.refreshCurrentView());
    store.on('remindersUpdated', () => this.refreshCurrentView());
    store.on('studyGroupsUpdated', () => this.refreshCurrentView());
  },

  switchView(viewName) {
    this.currentView = viewName;

    // Update active state in sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Render corresponding view in container
    const container = document.getElementById('mainContentArea');
    if (!container) return;

    switch (viewName) {
      case 'dashboard':
        container.innerHTML = DashboardComponent.render();
        break;
      case 'library':
        container.innerHTML = LibraryComponent.render();
        break;
      case 'history':
        container.innerHTML = HistoryComponent.render();
        break;
      case 'inquiry':
        container.innerHTML = InquiryComponent.render();
        break;
      case 'ranking':
        container.innerHTML = RankingComponent.render();
        break;
      case 'studygroups':
        container.innerHTML = StudyGroupsComponent.render();
        break;
      case 'reminders':
        container.innerHTML = RemindersComponent.render();
        break;
      case 'news':
        container.innerHTML = NewsComponent.render();
        break;
      case 'admin':
        container.innerHTML = AdminComponent.render();
        break;
      case 'settings':
        container.innerHTML = SettingsComponent.render();
        break;
      default:
        container.innerHTML = DashboardComponent.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  refreshCurrentView() {
    this.switchView(this.currentView);
  },

  // --- Interactive Actions & Modals ---

  updateBookProgress(bookId, delta) {
    store.updateBookProgress(bookId, delta);
    this.showToast('📖 Reading progress updated!');
  },

  borrowBook(catalogId) {
    const res = store.borrowBook(catalogId);
    if (res.success) {
      this.showToast('🎉 Book borrowed successfully! Added to your loan history.');
      this.closeModal();
    } else {
      this.showToast('⚠️ ' + res.message);
    }
  },

  viewBookDetail(bookId) {
    const book = store.getCatalog().find(b => b.id === bookId);
    if (!book) return;

    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem; font-size: 1.15rem;">${book.title}</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <div class="neo-modal-body">
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
          <img src="${book.cover}" style="width: 140px; height: 190px; object-fit: cover; border: var(--border-medium); border-radius: var(--radius-xs);">
          <div style="flex: 1; min-width: 200px;">
            <span class="neo-badge neo-badge-yellow">${book.type}</span>
            <span class="neo-badge neo-badge-sky">${book.category}</span>
            <h2 style="margin: 0.5rem 0 0.2rem 0; font-size: 1.4rem;">${book.title}</h2>
            <p style="font-weight: 700; color: #4B5563; margin-bottom: 0.5rem;">By ${book.author} (${book.year})</p>
            <p class="mono" style="font-size: 0.8rem; margin-bottom: 0.5rem;">ISBN: ${book.isbn} • ${book.pages} Pages</p>
            <p style="font-size: 0.9rem; line-height: 1.4;">${book.description}</p>
          </div>
        </div>
      </div>
      <div class="neo-modal-footer">
        <button class="neo-btn" onclick="App.closeModal()">Close</button>
        <button class="neo-btn neo-btn-primary" onclick="App.borrowBook('${book.id}')" ${book.availableCopies === 0 ? 'disabled' : ''}>
          ${book.availableCopies > 0 ? `Borrow Item (${book.availableCopies} available)` : 'Reserved'}
        </button>
      </div>
    `);
  },

  openAddLogModal() {
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Add Entry to Monthly Reading Log</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleSaveLog(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Book Title</label>
            <input type="text" id="logTitle" class="neo-input" placeholder="e.g. Sapiens" required />
          </div>
          <div class="grid-2">
            <div class="neo-input-group">
              <label class="neo-input-label">Author</label>
              <input type="text" id="logAuthor" class="neo-input" placeholder="e.g. Yuval Noah Harari" required />
            </div>
            <div class="neo-input-group">
              <label class="neo-input-label">Date Finished / Logged</label>
              <input type="date" id="logDate" class="neo-input mono" value="${new Date().toISOString().split('T')[0]}" required />
            </div>
          </div>
          <div class="grid-2">
            <div class="neo-input-group">
              <label class="neo-input-label">Star Rating (1 to 5)</label>
              <select id="logRating" class="neo-select">
                <option value="5">★★★★★ (5 Stars)</option>
                <option value="4">★★★★☆ (4 Stars)</option>
                <option value="3">★★★☆☆ (3 Stars)</option>
                <option value="2">★★☆☆☆ (2 Stars)</option>
                <option value="1">★☆☆☆☆ (1 Star)</option>
              </select>
            </div>
            <div class="neo-input-group">
              <label class="neo-input-label">Status</label>
              <select id="logStatus" class="neo-select">
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="DNF">DNF (Did Not Finish)</option>
              </select>
            </div>
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Personal Reflection Notes</label>
            <textarea id="logNotes" class="neo-textarea" rows="2" placeholder="Key takeaways or quotes..."></textarea>
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-primary">Save to Log</button>
        </div>
      </form>
    `);
  },

  handleSaveLog(e) {
    e.preventDefault();
    const title = document.getElementById('logTitle').value;
    const author = document.getElementById('logAuthor').value;
    const date = document.getElementById('logDate').value;
    const rating = document.getElementById('logRating').value;
    const status = document.getElementById('logStatus').value;
    const notes = document.getElementById('logNotes').value;

    store.addReadingLog({ title, author, date, rating, status, notes });
    this.showToast(`✨ Logged "${title}" in your reading record!`);
    this.closeModal();
    this.refreshCurrentView();
  },

  deleteLog(logId) {
    if (confirm('Delete this reading log entry?')) {
      store.deleteReadingLog(logId);
      this.showToast('🗑️ Reading log entry removed.');
    }
  },

  openAddQuoteModal() {
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Add Favorite Quote</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleSaveQuote(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Quote Content</label>
            <textarea id="quoteText" class="neo-textarea" rows="3" placeholder="Enter memorable quote..." required></textarea>
          </div>
          <div class="grid-2">
            <div class="neo-input-group">
              <label class="neo-input-label">Author</label>
              <input type="text" id="quoteAuthor" class="neo-input" placeholder="e.g. Neil Gaiman" required />
            </div>
            <div class="neo-input-group">
              <label class="neo-input-label">Book / Source</label>
              <input type="text" id="quoteBook" class="neo-input" placeholder="e.g. American Gods" />
            </div>
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-primary">Save Quote</button>
        </div>
      </form>
    `);
  },

  handleSaveQuote(e) {
    e.preventDefault();
    const quote = document.getElementById('quoteText').value;
    const author = document.getElementById('quoteAuthor').value;
    const book = document.getElementById('quoteBook').value;

    store.addQuote(quote, author, book);
    this.showToast('💬 Quote saved to your archive!');
    this.closeModal();
    this.refreshCurrentView();
  },

  openEditGoalModal() {
    const stats = store.getStats();
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Adjust 2024 Reading Challenge</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleSaveGoal(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Books Read So Far</label>
            <input type="number" id="goalBooksRead" class="neo-input" value="${stats.booksRead}" min="0" required />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Annual Target Target Goal</label>
            <input type="number" id="goalBooksTarget" class="neo-input" value="${stats.booksTarget}" min="1" required />
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-primary">Update Goal</button>
        </div>
      </form>
    `);
  },

  handleSaveGoal(e) {
    e.preventDefault();
    const booksRead = Number(document.getElementById('goalBooksRead').value);
    const booksTarget = Number(document.getElementById('goalBooksTarget').value);

    store.updateStats({ booksRead, booksTarget });
    this.showToast('🎯 Reading target updated!');
    this.closeModal();
    this.refreshCurrentView();
  },

  openCertificateModal() {
    const stats = store.getStats();
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Verified Reading Achievement</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <div class="neo-modal-body">
        <div class="certificate-frame">
          <div class="cert-seal">🏅</div>
          <h4 class="mono" style="letter-spacing: 0.1em; color: #6B7280; font-size: 0.8rem;">SJCEM DIGITAL LIBRARY • ACADEMIC BOARD</h4>
          <h2 style="font-size: 1.8rem; margin: 0.5rem 0; text-transform: uppercase;">Certificate of Distinction</h2>
          <p style="font-size: 0.95rem; margin-bottom: 0.5rem;">This certifies that</p>
          <h1 style="font-size: 2.2rem; color: #111; text-decoration: underline; text-underline-offset: 6px;">Amit Sharma</h1>
          <p style="font-size: 0.9rem; margin-top: 1rem; line-height: 1.5; max-width: 480px; margin-left: auto; margin-right: auto;">
            Has demonstrated outstanding academic diligence, finishing <strong>${stats.booksRead} volumes</strong> with a continuous reading streak of <strong>${stats.currentStreak} days</strong> and earning <strong>${stats.points} Distinction Points</strong>.
          </p>
          <div style="display: flex; justify-content: space-around; margin-top: 2rem; border-top: 2px dashed #000; padding-top: 1rem;">
            <div>
              <p class="mono" style="font-weight: 700; font-size: 0.8rem;">Sep 08, 2026</p>
              <span style="font-size: 0.7rem; color: #6B7280;">DATE ISSUED</span>
            </div>
            <div>
              <p class="mono" style="font-weight: 700; font-size: 0.8rem;">Dr. E. Hawthorne</p>
              <span style="font-size: 0.7rem; color: #6B7280;">CHIEF LIBRARIAN</span>
            </div>
          </div>
        </div>
      </div>
      <div class="neo-modal-footer">
        <button class="neo-btn" onclick="App.closeModal()">Close</button>
        <button class="neo-btn neo-btn-primary" onclick="window.print()">🖨️ Print / Download PDF</button>
      </div>
    `);
  },

  openRequestBookModal() {
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Request Book on Demand</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleRequestBook(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Requested Title / Topic</label>
            <input type="text" id="reqTitle" class="neo-input" placeholder="e.g. Designing Machine Learning Systems by Chip Huyen" required />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Author (If known)</label>
            <input type="text" id="reqAuthor" class="neo-input" placeholder="e.g. Chip Huyen" />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Reason / Purpose</label>
            <textarea id="reqReason" class="neo-textarea" rows="2" placeholder="Course project, research paper, reading sprint..."></textarea>
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-accent">Submit Request</button>
        </div>
      </form>
    `);
  },

  handleRequestBook(e) {
    e.preventDefault();
    const title = document.getElementById('reqTitle').value;
    store.addReminder(`Book on Demand Request: "${title}" pending staff review`, '3-5 business days', 'Book On Demand');
    this.showToast('✨ On-demand book request dispatched to librarian!');
    this.closeModal();
  },

  openCreateStudyGroupModal() {
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Create Study Group Room</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleCreateStudyGroup(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Group Name</label>
            <input type="text" id="sgName" class="neo-input" placeholder="e.g. Quantum Computing Guild" required />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Focus Subject / Topic</label>
            <input type="text" id="sgTopic" class="neo-input" placeholder="e.g. Qubits, Algorithms, Qiskit" required />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Meeting Schedule</label>
            <input type="text" id="sgSchedule" class="neo-input" placeholder="e.g. Thursdays @ 5:00 PM" required />
          </div>
          <div class="neo-input-group">
            <label class="neo-input-label">Brief Description</label>
            <textarea id="sgDesc" class="neo-textarea" rows="2" placeholder="What will the group achieve together?"></textarea>
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-primary">Create Room</button>
        </div>
      </form>
    `);
  },

  handleCreateStudyGroup(e) {
    e.preventDefault();
    const name = document.getElementById('sgName').value;
    const topic = document.getElementById('sgTopic').value;
    const schedule = document.getElementById('sgSchedule').value;
    const desc = document.getElementById('sgDesc').value;

    const newGroup = {
      id: 'sg-' + Date.now(),
      name,
      topic,
      membersCount: 1,
      nextSession: schedule,
      color: 'yellow',
      icon: '🧠',
      description: desc || 'Student peer collaboration room.',
      pinnedResource: 'Group Syllabus & Study Log',
      isJoined: true
    };

    store.state.studyGroups.unshift(newGroup);
    store.saveState();
    this.showToast(`👥 Study group "${name}" created!`);
    this.closeModal();
    this.refreshCurrentView();
  },

  joinStudyGroup(groupId) {
    store.joinStudyGroup(groupId);
    this.showToast('🎉 Joined study group room! Pinned resources unlocked.');
  },

  openAddReminderModal() {
    this.openModal(`
      <div class="neo-modal-header">
        <div class="window-dots">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <h3 style="margin: 0 1rem;">Add Custom Reminder</h3>
        <button class="neo-btn neo-btn-sm" onclick="App.closeModal()">✕</button>
      </div>
      <form onsubmit="App.handleSaveReminder(event)">
        <div class="neo-modal-body">
          <div class="neo-input-group">
            <label class="neo-input-label">Reminder Title</label>
            <input type="text" id="remTitle" class="neo-input" placeholder="e.g. Return Algorithm textbook" required />
          </div>
          <div class="grid-2">
            <div class="neo-input-group">
              <label class="neo-input-label">Due Date / Time</label>
              <input type="text" id="remDueDate" class="neo-input" placeholder="e.g. Tomorrow 3 PM" required />
            </div>
            <div class="neo-input-group">
              <label class="neo-input-label">Type</label>
              <select id="remType" class="neo-select">
                <option value="Loan Due">Loan Due</option>
                <option value="Study Group">Study Group</option>
                <option value="Reading Goal">Reading Goal</option>
                <option value="Custom">Custom Alert</option>
              </select>
            </div>
          </div>
        </div>
        <div class="neo-modal-footer">
          <button type="button" class="neo-btn" onclick="App.closeModal()">Cancel</button>
          <button type="submit" class="neo-btn neo-btn-primary">Save Reminder</button>
        </div>
      </form>
    `);
  },

  handleSaveReminder(e) {
    e.preventDefault();
    const title = document.getElementById('remTitle').value;
    const dueDate = document.getElementById('remDueDate').value;
    const type = document.getElementById('remType').value;

    store.addReminder(title, dueDate, type);
    this.showToast('⏰ Reminder created!');
    this.closeModal();
    this.refreshCurrentView();
  },

  // Fines & Attendance
  clearAllFines() {
    store.getLoans().forEach(loan => {
      loan.fine = 0;
      loan.status = 'Paid & Cleared';
    });
    store.saveState();
    this.showToast('💳 Outstanding fines paid and cleared in full!');
  },

  paySingleFine(loanId) {
    store.payFine(loanId);
    this.showToast('💳 Fine cleared successfully!');
  },

  renewLoan(loanId) {
    const loan = store.getLoans().find(l => l.id === loanId);
    if (loan) {
      loan.dueDate = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
      store.saveState();
      this.showToast(`🔄 Loan for "${loan.bookTitle}" extended by 14 days!`);
    }
  },

  checkInAttendance() {
    const log = store.checkInAttendance('Main Reading Hall');
    this.showToast(`📍 Attendance check-in confirmed at ${log.checkIn}!`);
  },

  // Reading Focus Timer
  toggleReadingTimer() {
    const btn = document.getElementById('timerStartBtn');
    if (this.timerRunning) {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      if (btn) btn.textContent = '▶️ Resume Focus';
      this.showToast('⏸️ Focus timer paused.');
    } else {
      this.timerRunning = true;
      if (btn) btn.textContent = '⏸️ Pause Focus';
      this.showToast('🚀 Focus reading sprint started! Stay focused.');
      
      this.timerInterval = setInterval(() => {
        if (this.timerSecondsRemaining > 0) {
          this.timerSecondsRemaining -= 1;
          const mins = Math.floor(this.timerSecondsRemaining / 60).toString().padStart(2, '0');
          const secs = (this.timerSecondsRemaining % 60).toString().padStart(2, '0');
          const display = document.getElementById('readingTimerDisplay');
          if (display) display.textContent = `${mins}:${secs}`;
        } else {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
          this.showToast('🎉 Focus sprint completed! Great reading session.');
          if (btn) btn.textContent = '▶️ Start Focus';
        }
      }, 1000);
    }
  },

  resetReadingTimer() {
    clearInterval(this.timerInterval);
    this.timerRunning = false;
    this.timerSecondsRemaining = 25 * 60;
    const display = document.getElementById('readingTimerDisplay');
    if (display) display.textContent = '25:00';
    const btn = document.getElementById('timerStartBtn');
    if (btn) btn.textContent = '▶️ Start Focus';
    this.showToast('🔄 Timer reset to 25 minutes.');
  },

  // Modal Backdrop Handler
  openModal(htmlContent) {
    const backdrop = document.getElementById('appModalBackdrop');
    const modalContent = document.getElementById('appModalContainer');
    if (backdrop && modalContent) {
      modalContent.innerHTML = htmlContent;
      backdrop.classList.add('active');
    }
  },

  closeModal() {
    const backdrop = document.getElementById('appModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  },

  // Snappy Neobrutalism Toast
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'neo-toast';
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
