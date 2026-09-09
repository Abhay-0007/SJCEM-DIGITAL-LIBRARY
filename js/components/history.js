/* ==========================================================================
   DIGITAL HISTORY COMPONENT - LOANS, FINES, ATTENDANCE
   ========================================================================== */

const HistoryComponent = {
  render() {
    const loans = store.getLoans();
    const attendance = store.getAttendance();
    const totalFines = loans.reduce((acc, curr) => acc + (curr.fine || 0), 0);

    return `
      <div class="grid-2 mb-lg">
        <!-- Fines Summary Banner -->
        <div class="neo-card ${totalFines > 0 ? 'neo-card-pink' : 'neo-card-mint'} flex-between">
          <div>
            <span class="neo-badge ${totalFines > 0 ? 'neo-badge-pink' : 'neo-badge-mint'}">OUTSTANDING FINES</span>
            <h2 style="font-size: 2rem; margin-top: 0.25rem;">$${totalFines.toFixed(2)}</h2>
            <p style="font-weight: 600; font-size: 0.85rem; color: #4B5563;">
              ${totalFines > 0 ? '⚠️ You have unpaid overdue library fines.' : '🎉 All library dues and fines are completely cleared!'}
            </p>
          </div>
          ${totalFines > 0 ? `
            <button class="neo-btn neo-btn-danger" onclick="App.clearAllFines()">Pay & Clear Fines</button>
          ` : `
            <span class="neo-badge neo-badge-green" style="font-size: 1rem; padding: 0.5rem 1rem;">STATUS: CLEAN</span>
          `}
        </div>

        <!-- Attendance Punch Banner -->
        <div class="neo-card neo-card-yellow flex-between">
          <div>
            <span class="neo-badge neo-badge-yellow">LIBRARY PASS & ATTENDANCE</span>
            <h2 style="font-size: 2rem; margin-top: 0.25rem;">16.15 Hours</h2>
            <p style="font-weight: 600; font-size: 0.85rem; color: #4B5563;">Logged study time in physical pods & reading halls this week.</p>
          </div>
          <button class="neo-btn neo-btn-primary" onclick="App.checkInAttendance()">
            📍 Check-In Now
          </button>
        </div>
      </div>

      <!-- Borrowed Books History Table -->
      <div class="neo-card mb-lg">
        <div class="neo-card-header">
          <div class="neo-card-title">
            <span>📚</span> Borrowed Books & Items
          </div>
          <span class="neo-badge neo-badge-yellow">${loans.length} TOTAL RECORDS</span>
        </div>

        <div class="table-container">
          <table class="neo-table">
            <thead>
              <tr>
                <th>Item Title</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Accrued Fine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${loans.map(loan => `
                <tr>
                  <td><strong>${loan.bookTitle}</strong></td>
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
                    ${loan.fine > 0 ? `
                      <button class="neo-btn neo-btn-sm neo-btn-danger" onclick="App.paySingleFine('${loan.id}')">Pay Fine</button>
                    ` : loan.status === 'Active' ? `
                      <button class="neo-btn neo-btn-sm neo-btn-accent" onclick="App.renewLoan('${loan.id}')">Renew Loan</button>
                    ` : `
                      <span class="mono" style="font-size: 0.75rem; color: #6B7280;">Archived</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Attendance History Table -->
      <div class="neo-card">
        <div class="neo-card-header">
          <div class="neo-card-title">
            <span>🕒</span> Library Attendance & Desk Sessions
          </div>
          <span class="neo-badge neo-badge-sky">VERIFIED CHECK-INS</span>
        </div>

        <div class="table-container">
          <table class="neo-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Study Pod / Location</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              ${attendance.map(att => `
                <tr>
                  <td class="mono"><strong>${att.date}</strong></td>
                  <td class="mono">${att.checkIn}</td>
                  <td class="mono">${att.checkOut}</td>
                  <td><span class="neo-badge neo-badge-lavender">${att.room}</span></td>
                  <td class="mono" style="font-weight: 700;">${att.hours} hrs</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
