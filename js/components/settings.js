/* ==========================================================================
   SETTINGS & ACCESSIBILITY COMPONENT
   ========================================================================== */

const SettingsComponent = {
  render() {
    const isHighContrast = document.body.classList.contains('high-contrast');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const isDyslexic = document.body.classList.contains('dyslexia-font');

    return `
      <div class="neo-card mb-lg">
        <div class="neo-card-header">
          <div>
            <h2 class="neo-card-title">⚙️ Settings & Accessibility Controls</h2>
            <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
              Customize visual accessibility, font scales, reading preferences, and permissions.
            </p>
          </div>
          <span class="neo-badge neo-badge-yellow">CUSTOM PREFERENCES</span>
        </div>

        <div class="grid-2">
          <!-- Visual & Accessibility -->
          <div class="neo-card" style="box-shadow: var(--shadow-sm);">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">🎨 Visual Accessibility & Contrast</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="flex-between">
                <div>
                  <strong>High Contrast Neobrutalism</strong>
                  <p style="font-size: 0.8rem; color: #6B7280;">Intensifies borders and maximizes color luminance.</p>
                </div>
                <button class="neo-btn neo-btn-sm ${isHighContrast ? 'neo-btn-primary' : ''}" onclick="SettingsComponent.toggleContrast()">
                  ${isHighContrast ? 'Enabled ✓' : 'Enable'}
                </button>
              </div>

              <div class="flex-between">
                <div>
                  <strong>Dark Mode Theme</strong>
                  <p style="font-size: 0.8rem; color: #6B7280;">High-contrast dark canvas for nighttime reading.</p>
                </div>
                <button class="neo-btn neo-btn-sm ${isDarkMode ? 'neo-btn-primary' : ''}" onclick="SettingsComponent.toggleDarkMode()">
                  ${isDarkMode ? 'Enabled ✓' : 'Enable'}
                </button>
              </div>

              <div class="flex-between">
                <div>
                  <strong>Dyslexia-Friendly Typography</strong>
                  <p style="font-size: 0.8rem; color: #6B7280;">Increases letter spacing and distinct font shapes.</p>
                </div>
                <button class="neo-btn neo-btn-sm ${isDyslexic ? 'neo-btn-primary' : ''}" onclick="SettingsComponent.toggleDyslexia()">
                  ${isDyslexic ? 'Enabled ✓' : 'Enable'}
                </button>
              </div>
            </div>
          </div>

          <!-- Account & Permissions -->
          <div class="neo-card" style="box-shadow: var(--shadow-sm);">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">🔒 Permissions & Library Profile</h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div class="neo-input-group">
                <label class="neo-input-label">Student Name</label>
                <input type="text" class="neo-input" value="Amit Sharma" readonly />
              </div>

              <div class="neo-input-group">
                <label class="neo-input-label">Student Library Pass ID</label>
                <input type="text" class="neo-input mono" value="STU-2024-88" readonly />
              </div>

              <div class="neo-input-group">
                <label class="neo-input-label">Borrowing Tier Level</label>
                <input type="text" class="neo-input" value="Tier 3 (Max 5 items / 14 days loan)" readonly />
              </div>

              <button class="neo-btn neo-btn-danger" style="margin-top: 0.5rem;" onclick="SettingsComponent.resetAllData()">
                🗑️ Reset All Local Application State
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleContrast() {
    document.body.classList.toggle('high-contrast');
    App.showToast('Accessibility contrast mode updated.');
    App.refreshCurrentView();
  },

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    App.showToast('Theme mode toggled.');
    App.refreshCurrentView();
  },

  toggleDyslexia() {
    document.body.classList.toggle('dyslexia-font');
    App.showToast('Dyslexia typography toggled.');
    App.refreshCurrentView();
  },

  resetAllData() {
    if (confirm('Are you sure you want to reset all mock data to defaults?')) {
      localStorage.removeItem('READING_NOOK_STORE_V1');
      location.reload();
    }
  }
};
