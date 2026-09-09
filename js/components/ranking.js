/* ==========================================================================
   RANKING SYSTEM & CERTIFICATES COMPONENT
   ========================================================================== */

const RankingComponent = {
  activePeriod: 'weekly',

  render() {
    const list = store.getLeaderboard(this.activePeriod);
    const top3 = list.slice(0, 3);
    const others = list.slice(3);

    return `
      <!-- Header Bar & Period Filter -->
      <div class="neo-card mb-lg flex-between">
        <div>
          <h2 class="neo-card-title">🏆 Student Reading Leaderboard</h2>
          <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
            Compete, track reading speed and streaks, and unlock verified completion certificates!
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button class="filter-pill ${this.activePeriod === 'daily' ? 'active' : ''}" onclick="RankingComponent.setPeriod('daily')">Daily</button>
          <button class="filter-pill ${this.activePeriod === 'weekly' ? 'active' : ''}" onclick="RankingComponent.setPeriod('weekly')">Weekly</button>
          <button class="filter-pill ${this.activePeriod === 'monthly' ? 'active' : ''}" onclick="RankingComponent.setPeriod('monthly')">Monthly</button>
          <button class="filter-pill ${this.activePeriod === 'yearly' ? 'active' : ''}" onclick="RankingComponent.setPeriod('yearly')">Yearly</button>
          <button class="neo-btn neo-btn-primary" onclick="App.openCertificateModal()">
            📜 View My Certificate
          </button>
        </div>
      </div>

      <!-- Top 3 Podium (Neobrutalism aesthetic) -->
      <div class="podium-container">
        <!-- 2nd Place -->
        ${top3[1] ? `
          <div class="podium-slot podium-2">
            <div style="font-size: 1.5rem; margin-bottom: 4px;">🥈</div>
            <strong style="font-size: 0.9rem; margin-bottom: 2px;">${top3[1].name}</strong>
            <span class="neo-badge neo-badge-mint mb-sm" style="font-size: 0.65rem;">${top3[1].points} PTS</span>
            <div class="podium-block">2</div>
          </div>
        ` : ''}

        <!-- 1st Place -->
        ${top3[0] ? `
          <div class="podium-slot podium-1">
            <div style="font-size: 2rem; margin-bottom: 4px;">👑</div>
            <strong style="font-size: 1rem; margin-bottom: 2px;">${top3[0].name}</strong>
            <span class="neo-badge neo-badge-yellow mb-sm" style="font-size: 0.7rem;">${top3[0].points} PTS</span>
            <div class="podium-block">1</div>
          </div>
        ` : ''}

        <!-- 3rd Place -->
        ${top3[2] ? `
          <div class="podium-slot podium-3">
            <div style="font-size: 1.5rem; margin-bottom: 4px;">🥉</div>
            <strong style="font-size: 0.85rem; margin-bottom: 2px;">${top3[2].name}</strong>
            <span class="neo-badge neo-badge-pink mb-sm" style="font-size: 0.65rem;">${top3[2].points} PTS</span>
            <div class="podium-block">3</div>
          </div>
        ` : ''}
      </div>

      <!-- Full Standings List -->
      <div class="neo-card">
        <div class="neo-card-header">
          <div class="neo-card-title">
            <span>📊</span> Full ${this.activePeriod.toUpperCase()} Standings
          </div>
          <span class="neo-badge neo-badge-sky">ACTIVE SPRINT</span>
        </div>

        <div>
          ${list.map(user => `
            <div class="leaderboard-table-item ${user.name.includes('(You)') ? 'neo-card-yellow' : ''}">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="mono" style="font-size: 1.1rem; font-weight: 900; width: 25px;">#${user.rank}</div>
                <div>
                  <strong>${user.name}</strong>
                  <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 2px;">
                    <span class="neo-badge neo-badge-lavender" style="font-size: 0.65rem;">${user.badge}</span>
                    <span class="mono" style="font-size: 0.75rem; color: #4B5563;">${user.pagesRead} pages • ${user.streak} days streak</span>
                  </div>
                </div>
              </div>
              <div class="mono" style="font-size: 1.1rem; font-weight: 900;">
                ${user.points} <span style="font-size: 0.75rem;">PTS</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  setPeriod(period) {
    this.activePeriod = period;
    App.refreshCurrentView();
  }
};
