/* ==========================================================================
   REMINDERS & BOOKS ON DEMAND COMPONENT
   ========================================================================== */

const RemindersComponent = {
  render() {
    const reminders = store.getReminders();

    return `
      <div class="neo-card mb-lg flex-between">
        <div>
          <h2 class="neo-card-title">⏰ Reminders & Books on Demand Alerts</h2>
          <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
            Manage loan return notifications, reservation arrival alerts, and study timers.
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="neo-btn neo-btn-primary" onclick="App.openAddReminderModal()">
            <span>+</span> Add Custom Reminder
          </button>
        </div>
      </div>

      <div class="grid-2">
        <!-- Reminders List -->
        <div class="neo-card">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>🔔</span> Active Alerts & Notifications
            </div>
            <span class="neo-badge neo-badge-yellow">${reminders.filter(r => !r.completed).length} PENDING</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${reminders.map(r => `
              <div class="neo-card ${r.completed ? 'neo-card-mint' : r.urgent ? 'neo-card-pink' : ''}" style="padding: 0.85rem; box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <input 
                    type="checkbox" 
                    ${r.completed ? 'checked' : ''} 
                    onchange="store.toggleReminder('${r.id}')"
                    style="width: 20px; height: 20px; accent-color: #000; cursor: pointer;"
                  />
                  <div>
                    <strong style="${r.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                      ${r.title}
                    </strong>
                    <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 3px;">
                      <span class="neo-badge neo-badge-sky" style="font-size: 0.65rem;">${r.type}</span>
                      <span class="mono" style="font-size: 0.75rem; color: #6B7280;">📅 ${r.dueDate}</span>
                    </div>
                  </div>
                </div>
                ${r.urgent ? `<span class="neo-badge neo-badge-pink">URGENT</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Focused Reading Timer / Pomodoro Widget -->
        <div class="neo-card flex-between" style="flex-direction: column; text-align: center;">
          <div class="neo-card-header" style="width: 100%;">
            <div class="neo-card-title">
              <span>⏱️</span> Focused Reading Session Timer
            </div>
            <span class="neo-badge neo-badge-lavender">POMODORO NOOK</span>
          </div>

          <div style="padding: 1.5rem 0;">
            <div class="mono" id="readingTimerDisplay" style="font-size: 3.5rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1;">
              25:00
            </div>
            <p style="font-size: 0.85rem; font-weight: 700; color: #6B7280; margin-top: 0.5rem;">
              Maintain focus and log active pages read during this interval.
            </p>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; width: 100%;">
            <button class="neo-btn neo-btn-primary" id="timerStartBtn" onclick="App.toggleReadingTimer()">
              ▶️ Start Focus
            </button>
            <button class="neo-btn" onclick="App.resetReadingTimer()">
              🔄 Reset (25m)
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
