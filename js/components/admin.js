/* ==========================================================================
   ADMIN PORTAL COMPONENT - CATALOG & STUDENT MANAGEMENT
   ========================================================================== */

const AdminComponent = {
  render() {
    const catalog = store.getCatalog();
    const loans = store.getLoans();
    const attendance = store.getAttendance();
    const totalFines = loans.reduce((acc, curr) => acc + (curr.fine || 0), 0);

    return `
      <!-- Admin Metric Stat Cards -->
      <div class="grid-4 mb-lg">
        <div class="neo-card neo-card-yellow">
          <span class="neo-badge neo-badge-yellow">TOTAL CATALOG</span>
          <h2 style="font-size: 2.2rem; margin-top: 0.25rem;">${catalog.length}</h2>
          <p style="font-size: 0.8rem; font-weight: 700; color: #4B5563;">Books, Articles & Magazines</p>
        </div>

        <div class="neo-card neo-card-mint">
          <span class="neo-badge neo-badge-mint">ACTIVE LOANS</span>
          <h2 style="font-size: 2.2rem; margin-top: 0.25rem;">${loans.filter(l => l.status === 'Active').length}</h2>
          <p style="font-size: 0.8rem; font-weight: 700; color: #4B5563;">Currently with students</p>
        </div>

        <div class="neo-card neo-card-pink">
          <span class="neo-badge neo-badge-pink">TOTAL FINES</span>
          <h2 style="font-size: 2.2rem; margin-top: 0.25rem;">$${totalFines.toFixed(2)}</h2>
          <p style="font-size: 0.8rem; font-weight: 700; color: #4B5563;">Unpaid overdue balance</p>
        </div>

        <div class="neo-card neo-card-sky">
          <span class="neo-badge neo-badge-sky">CHECK-INS</span>
          <h2 style="font-size: 2.2rem; margin-top: 0.25rem;">${attendance.length}</h2>
          <p style="font-size: 0.8rem; font-weight: 700; color: #4B5563;">Study pod sessions logged</p>
        </div>
      </div>

      <!-- Main Admin Panels: Add Item Form & Student Data Inspector -->
      <div class="grid-2 mb-lg">
        <!-- 1. Add Books / Articles / Magazines Form -->
        <div class="neo-card">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>➕</span> Add New Catalog Resource
            </div>
            <span class="neo-badge neo-badge-coral">ADMIN ONLY</span>
          </div>

          <form id="adminAddCatalogForm" onsubmit="AdminComponent.handleAddCatalog(event)">
            <div class="grid-2">
              <div class="neo-input-group">
                <label class="neo-input-label">Resource Type</label>
                <select id="adminItemType" class="neo-select" required>
                  <option value="Book">📖 Book</option>
                  <option value="Article">📄 Research Article</option>
                  <option value="Magazine">📰 Periodical / Magazine</option>
                </select>
              </div>

              <div class="neo-input-group">
                <label class="neo-input-label">Category / Genre</label>
                <input type="text" id="adminItemCategory" class="neo-input" placeholder="e.g. Technology, Sci-Fi" required />
              </div>
            </div>

            <div class="neo-input-group">
              <label class="neo-input-label">Title</label>
              <input type="text" id="adminItemTitle" class="neo-input" placeholder="e.g. Clean Architecture" required />
            </div>

            <div class="grid-2">
              <div class="neo-input-group">
                <label class="neo-input-label">Author / Publisher</label>
                <input type="text" id="adminItemAuthor" class="neo-input" placeholder="e.g. Robert C. Martin" required />
              </div>

              <div class="neo-input-group">
                <label class="neo-input-label">Total Copies in Stock</label>
                <input type="number" id="adminItemCopies" class="neo-input" value="3" min="1" max="100" required />
              </div>
            </div>

            <div class="neo-input-group">
              <label class="neo-input-label">Cover Image URL (Optional)</label>
              <input type="url" id="adminItemCover" class="neo-input" placeholder="https://..." value="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" />
            </div>

            <div class="neo-input-group">
              <label class="neo-input-label">Summary / Description</label>
              <textarea id="adminItemDesc" class="neo-textarea" rows="2" placeholder="Brief summary of the content..."></textarea>
            </div>

            <button type="submit" class="neo-btn neo-btn-primary" style="width: 100%;">
              💾 Save to Digital Catalog
            </button>
          </form>
        </div>

        <!-- 2. Add News & Reminders Form -->
        <div class="neo-card">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>📢</span> Broadcast News & Digital Notices
            </div>
            <span class="neo-badge neo-badge-lavender">ANNOUNCEMENTS</span>
          </div>

          <form id="adminAddNoticeForm" onsubmit="AdminComponent.handleAddNotice(event)">
            <div class="neo-input-group">
              <label class="neo-input-label">Notice Headline</label>
              <input type="text" id="adminNoticeTitle" class="neo-input" placeholder="e.g. Fall Reading Sprint Registration" required />
            </div>

            <div class="grid-2">
              <div class="neo-input-group">
                <label class="neo-input-label">Category</label>
                <select id="adminNoticeCategory" class="neo-select">
                  <option value="Event">Event</option>
                  <option value="Notice">Notice</option>
                  <option value="New Arrivals">New Arrivals</option>
                  <option value="Policy">Policy Update</option>
                </select>
              </div>

              <div class="neo-input-group">
                <label class="neo-input-label">Badge Label</label>
                <input type="text" id="adminNoticeBadge" class="neo-input" value="HOT 🔥" required />
              </div>
            </div>

            <div class="neo-input-group">
              <label class="neo-input-label">Announcement Content</label>
              <textarea id="adminNoticeContent" class="neo-textarea" rows="4" placeholder="Detailed message for students..." required></textarea>
            </div>

            <button type="submit" class="neo-btn neo-btn-accent" style="width: 100%;">
              🚀 Publish to Student Notice Board
            </button>
          </form>
        </div>
      </div>

      <!-- 3. Student Data Access & Records -->
      <div class="neo-card">
        <div class="neo-card-header">
          <div class="neo-card-title">
            <span>🎓</span> Student Borrowing Records & Fine Ledger
          </div>
          <span class="neo-badge neo-badge-yellow">STUDENT DATA ACCESS</span>
        </div>

        <div class="table-container">
          <table class="neo-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Item Checked Out</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine Balance</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              ${loans.map(loan => `
                <tr>
                  <td class="mono"><strong>${loan.studentId}</strong></td>
                  <td>${loan.studentName}</td>
                  <td>${loan.bookTitle}</td>
                  <td class="mono">${loan.borrowDate}</td>
                  <td class="mono">${loan.dueDate}</td>
                  <td>
                    <span class="neo-badge ${loan.status === 'Active' ? 'neo-badge-yellow' : loan.fine > 0 ? 'neo-badge-pink' : 'neo-badge-mint'}">
                      ${loan.status}
                    </span>
                  </td>
                  <td class="mono" style="font-weight: 700; color: ${loan.fine > 0 ? 'var(--neo-coral)' : 'inherit'};">
                    $${loan.fine ? loan.fine.toFixed(2) : '0.00'}
                  </td>
                  <td>
                    <button class="neo-btn neo-btn-sm" onclick="AdminComponent.sendStudentReminder('${loan.studentName}', '${loan.bookTitle}')">
                      ✉️ Remind
                    </button>
                    ${loan.fine > 0 ? `
                      <button class="neo-btn neo-btn-sm neo-btn-mint" onclick="App.paySingleFine('${loan.id}')">Waive</button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  handleAddCatalog(e) {
    e.preventDefault();
    const type = document.getElementById('adminItemType').value;
    const category = document.getElementById('adminItemCategory').value;
    const title = document.getElementById('adminItemTitle').value;
    const author = document.getElementById('adminItemAuthor').value;
    const copies = document.getElementById('adminItemCopies').value;
    const cover = document.getElementById('adminItemCover').value;
    const description = document.getElementById('adminItemDesc').value;

    store.addCatalogItem({
      type, category, title, author, copies, cover, description
    });

    App.showToast(`✅ "${title}" added to digital catalog successfully!`);
    document.getElementById('adminAddCatalogForm').reset();
    App.refreshCurrentView();
  },

  handleAddNotice(e) {
    e.preventDefault();
    const title = document.getElementById('adminNoticeTitle').value;
    const category = document.getElementById('adminNoticeCategory').value;
    const badge = document.getElementById('adminNoticeBadge').value;
    const content = document.getElementById('adminNoticeContent').value;

    store.addNews(title, category, content, badge);
    App.showToast(`📢 Announcement "${title}" published!`);
    document.getElementById('adminAddNoticeForm').reset();
    App.refreshCurrentView();
  },

  sendStudentReminder(studentName, bookTitle) {
    App.showToast(`✉️ Automated return alert dispatched to ${studentName} for "${bookTitle}".`);
  }
};
