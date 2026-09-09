/* ==========================================================================
   DASHBOARD COMPONENT - "THE READING NOOK"
   ========================================================================== */

const DashboardComponent = {
  render() {
    const stats = store.getStats();
    const currentlyReading = store.getCurrentlyReading();
    const readingLog = store.getReadingLog();
    const quotes = store.getQuotes();

    const progressPct = Math.round((stats.booksRead / stats.booksTarget) * 100);
    const strokeDash = Math.min(283, Math.round((progressPct / 100) * 283));

    return `
      <!-- Hero Banner (image.png layout) -->
      <div class="nook-hero-banner">
        <div class="nook-hero-graphic">
          <svg class="hero-art-svg" viewBox="0 0 1000 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Room & Bookshelf Background -->
            <rect width="1000" height="240" fill="#2563EB"/>
            <!-- Window with yellow warm light -->
            <rect x="50" y="30" width="160" height="150" fill="#FEF08A" stroke="#000" stroke-width="3.5"/>
            <line x1="130" y1="30" x2="130" y2="180" stroke="#000" stroke-width="3"/>
            <line x1="50" y1="105" x2="210" y2="105" stroke="#000" stroke-width="3"/>
            <!-- Lamp -->
            <path d="M70 140 L90 140 L85 100 L75 100 Z" fill="#EF4444" stroke="#000" stroke-width="3"/>
            <line x1="80" y1="140" x2="80" y2="175" stroke="#000" stroke-width="3"/>
            
            <!-- Comfy Armchair -->
            <rect x="250" y="70" width="150" height="130" rx="16" fill="#3B82F6" stroke="#000" stroke-width="3.5"/>
            <rect x="230" y="110" width="40" height="80" rx="10" fill="#2563EB" stroke="#000" stroke-width="3.5"/>
            <rect x="380" y="110" width="40" height="80" rx="10" fill="#2563EB" stroke="#000" stroke-width="3.5"/>
            <rect x="270" y="100" width="110" height="40" rx="8" fill="#FACC15" stroke="#000" stroke-width="3.5"/>
            <line x1="260" y1="200" x2="250" y2="225" stroke="#000" stroke-width="4"/>
            <line x1="390" y1="200" x2="400" y2="225" stroke="#000" stroke-width="4"/>

            <!-- Stack of books by chair -->
            <rect x="180" y="180" width="60" height="14" rx="2" fill="#F43F5E" stroke="#000" stroke-width="3"/>
            <rect x="185" y="166" width="52" height="14" rx="2" fill="#10B981" stroke="#000" stroke-width="3"/>
            <rect x="190" y="152" width="45" height="14" rx="2" fill="#FBBF24" stroke="#000" stroke-width="3"/>

            <!-- Bookshelf Wall on Right -->
            <rect x="470" y="20" width="500" height="200" fill="#1E3A8A" stroke="#000" stroke-width="4"/>
            <line x1="470" y1="85" x2="970" y2="85" stroke="#000" stroke-width="4"/>
            <line x1="470" y1="150" x2="970" y2="150" stroke="#000" stroke-width="4"/>
            <line x1="630" y1="20" x2="630" y2="220" stroke="#000" stroke-width="4"/>
            <line x1="800" y1="20" x2="800" y2="220" stroke="#000" stroke-width="4"/>

            <!-- Shelf Books Layer 1 -->
            <rect x="480" y="32" width="18" height="50" fill="#EF4444" stroke="#000" stroke-width="2.5"/>
            <rect x="500" y="28" width="22" height="54" fill="#F59E0B" stroke="#000" stroke-width="2.5"/>
            <rect x="524" y="36" width="16" height="46" fill="#10B981" stroke="#000" stroke-width="2.5"/>
            <rect x="542" y="30" width="24" height="52" fill="#6366F1" stroke="#000" stroke-width="2.5"/>
            <rect x="568" y="34" width="20" height="48" fill="#EC4899" stroke="#000" stroke-width="2.5"/>
            <rect x="590" y="26" width="25" height="56" fill="#F43F5E" stroke="#000" stroke-width="2.5"/>

            <rect x="642" y="35" width="20" height="47" fill="#FBBF24" stroke="#000" stroke-width="2.5"/>
            <rect x="664" y="30" width="26" height="52" fill="#3B82F6" stroke="#000" stroke-width="2.5"/>
            <rect x="692" y="38" width="16" height="44" fill="#10B981" stroke="#000" stroke-width="2.5"/>
            <rect x="710" y="28" width="28" height="54" fill="#EF4444" stroke="#000" stroke-width="2.5"/>

            <rect x="815" y="30" width="24" height="52" fill="#EC4899" stroke="#000" stroke-width="2.5"/>
            <rect x="841" y="34" width="20" height="48" fill="#F59E0B" stroke="#000" stroke-width="2.5"/>
            <rect x="863" y="26" width="26" height="56" fill="#6366F1" stroke="#000" stroke-width="2.5"/>
            <rect x="891" y="32" width="22" height="50" fill="#10B981" stroke="#000" stroke-width="2.5"/>

            <!-- Shelf Books Layer 2 -->
            <rect x="480" y="98" width="24" height="49" fill="#3B82F6" stroke="#000" stroke-width="2.5"/>
            <rect x="506" y="92" width="28" height="55" fill="#EF4444" stroke="#000" stroke-width="2.5"/>
            <rect x="536" y="102" width="18" height="45" fill="#FBBF24" stroke="#000" stroke-width="2.5"/>
            <rect x="556" y="95" width="22" height="52" fill="#10B981" stroke="#000" stroke-width="2.5"/>
            
            <rect x="642" y="94" width="22" height="53" fill="#EC4899" stroke="#000" stroke-width="2.5"/>
            <rect x="666" y="100" width="19" height="47" fill="#F59E0B" stroke="#000" stroke-width="2.5"/>
            <rect x="687" y="90" width="30" height="57" fill="#3B82F6" stroke="#000" stroke-width="2.5"/>

            <rect x="815" y="95" width="25" height="52" fill="#EF4444" stroke="#000" stroke-width="2.5"/>
            <rect x="842" y="90" width="22" height="57" fill="#10B981" stroke="#000" stroke-width="2.5"/>
            <rect x="866" y="102" width="26" height="45" fill="#FBBF24" stroke="#000" stroke-width="2.5"/>
            <rect x="894" y="92" width="20" height="55" fill="#6366F1" stroke="#000" stroke-width="2.5"/>

            <!-- Shelf Books Layer 3 -->
            <rect x="480" y="162" width="22" height="55" fill="#F59E0B" stroke="#000" stroke-width="2.5"/>
            <rect x="504" y="168" width="19" height="49" fill="#3B82F6" stroke="#000" stroke-width="2.5"/>
            <rect x="525" y="158" width="28" height="59" fill="#EC4899" stroke="#000" stroke-width="2.5"/>

            <rect x="642" y="160" width="26" height="57" fill="#10B981" stroke="#000" stroke-width="2.5"/>
            <rect x="670" y="165" width="21" height="52" fill="#EF4444" stroke="#000" stroke-width="2.5"/>

            <rect x="815" y="162" width="30" height="55" fill="#3B82F6" stroke="#000" stroke-width="2.5"/>
            <rect x="847" y="158" width="24" height="59" fill="#FBBF24" stroke="#000" stroke-width="2.5"/>
            <rect x="873" y="166" width="22" height="51" fill="#EF4444" stroke="#000" stroke-width="2.5"/>
          </svg>
        </div>
        <div class="nook-hero-title-bar">
          <div>
            <h1>SJCEM Digital Library</h1>
            <div class="subtitle">Book Lover's & Student Dashboard</div>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button class="neo-btn neo-btn-primary" onclick="App.openAddLogModal()">
              <span>+</span> Add Reading Log
            </button>
            <button class="neo-btn neo-btn-accent" onclick="App.switchView('inquiry')">
              <span>🤖</span> Ask NookBot
            </button>
          </div>
        </div>
      </div>

      <!-- Top Row: Currently Reading (Left) & Reading Goals Donut (Right) -->
      <div class="grid-reading-row">
        <!-- Currently Reading Section -->
        <div class="neo-card currently-reading-card">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>📖</span> Currently Reading
            </div>
            <div class="filter-pills">
              <span class="neo-badge neo-badge-yellow">${currentlyReading.length} ACTIVE</span>
            </div>
          </div>

          <div class="book-gallery-grid">
            ${currentlyReading.map(book => `
              <div class="book-gallery-item">
                <div class="book-cover-wrap">
                  <img src="${book.cover}" alt="${book.title}" class="book-cover-img" onerror="this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'">
                  <span class="neo-sticker" style="top: 8px; right: 8px; font-size: 0.65rem; background: var(--neo-yellow); padding: 2px 6px;">
                    ${book.progressPercent}%
                  </span>
                </div>
                <div class="book-item-info">
                  <h4 title="${book.title}">${book.title}</h4>
                  <p>${book.author}</p>
                </div>
                <div class="neo-progress-bar">
                  <div class="neo-progress-fill neo-progress-fill-teal" style="width: ${book.progressPercent}%"></div>
                </div>
                <div class="book-chapter-text">
                  <span>Ch. ${book.currentChapter}/${book.totalChapters}</span>
                  <div style="display: flex; gap: 4px;">
                    <button class="neo-btn neo-btn-sm" onclick="App.updateBookProgress('${book.id}', -1)" title="Previous chapter">-</button>
                    <button class="neo-btn neo-btn-sm neo-btn-primary" onclick="App.updateBookProgress('${book.id}', 1)" title="Next chapter">+</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2024 Challenge Donut Meter (image.png layout) -->
        <div class="neo-card flex-center" style="flex-direction: column;">
          <div class="neo-card-header" style="width: 100%;">
            <div class="neo-card-title">
              <span>🎯</span> Goals & Progress
            </div>
            <span class="neo-badge neo-badge-sky">2024 CHALLENGE</span>
          </div>

          <div class="goals-donut-container">
            <div class="donut-svg-wrap">
              <svg viewBox="0 0 100 100" width="160" height="160">
                <circle class="donut-circle-bg" cx="50" cy="50" r="40" />
                <circle 
                  class="donut-circle-bar" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke-dasharray="251.2" 
                  stroke-dashoffset="${251.2 - (251.2 * progressPct / 100)}"
                />
              </svg>
              <div class="donut-inner-content">
                <div class="stat-number">${stats.booksRead} / ${stats.booksTarget}</div>
                <div class="stat-label">Books Read</div>
              </div>
            </div>

            <div style="margin-top: 0.75rem; width: 100%; text-align: center;">
              <p style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.4rem;">
                🔥 <strong>${stats.currentStreak} Day</strong> Reading Streak!
              </p>
              <button class="neo-btn neo-btn-sm neo-btn-primary" onclick="App.openEditGoalModal()">
                ⚙️ Adjust Goal
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Monthly Reading Log Table & Heatmap/Quotes -->
      <div class="grid-dashboard-main">
        <!-- Monthly Reading Log Table -->
        <div class="neo-card">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>📑</span> Monthly Reading Log
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="neo-badge neo-badge-mint">TODAYS +</span>
              <button class="neo-btn neo-btn-sm neo-btn-primary" onclick="App.openAddLogModal()">+ New</button>
            </div>
          </div>

          <div class="table-container">
            <table class="neo-table">
              <thead>
                <tr>
                  <th>📅 Date</th>
                  <th>📖 Book Title</th>
                  <th>✍️ Author</th>
                  <th>⭐ Rating</th>
                  <th>🏷️ Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${readingLog.map(item => `
                  <tr>
                    <td class="mono">${item.date}</td>
                    <td><strong>${item.title}</strong></td>
                    <td>${item.author}</td>
                    <td>
                      <div class="star-rating">
                        ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
                      </div>
                    </td>
                    <td>
                      <span class="neo-badge ${item.status === 'Completed' ? 'neo-badge-mint' : 'neo-badge-yellow'}">
                        ${item.status}
                      </span>
                    </td>
                    <td>
                      <button class="neo-btn neo-btn-sm neo-btn-danger" style="padding: 2px 6px;" onclick="App.deleteLog('${item.id}')" title="Delete entry">✕</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Heatmap & Favorite Quotes Column -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <!-- Reading Tracker Heatmap -->
          <div class="neo-card">
            <div class="neo-card-header">
              <div class="neo-card-title">
                <span>📅</span> Reading Tracker
              </div>
              <span class="neo-badge neo-badge-lavender">DAILY MATRIX</span>
            </div>
            
            <div class="heatmap-container">
              <div class="heatmap-grid" id="dashboardHeatmap">
                <!-- Heatmap cells generated dynamically -->
                ${Array.from({ length: 70 }).map((_, i) => {
                  const lvls = ['heatmap-lvl-0', 'heatmap-lvl-1', 'heatmap-lvl-2', 'heatmap-lvl-3', 'heatmap-lvl-4'];
                  const lvl = (i % 7 === 0 || i % 3 === 0 || i % 5 === 0) ? lvls[i % 5] : 'heatmap-lvl-1';
                  return `<div class="heatmap-cell ${lvl}" title="Day ${i + 1}: ${((i % 4) + 1) * 20} mins read"></div>`;
                }).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-family: var(--font-mono); color: #6B7280; margin-top: 4px;">
                <span>Less</span>
                <div style="display: flex; gap: 3px; align-items: center;">
                  <span style="width: 10px; height: 10px; background: #fff; border: 1px solid #000;"></span>
                  <span style="width: 10px; height: 10px; background: #BAE6FD; border: 1px solid #000;"></span>
                  <span style="width: 10px; height: 10px; background: #38BDF8; border: 1px solid #000;"></span>
                  <span style="width: 10px; height: 10px; background: #0284C7; border: 1px solid #000;"></span>
                  <span style="width: 10px; height: 10px; background: #F97316; border: 1px solid #000;"></span>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          <!-- Favorite Quotes Box -->
          <div class="neo-card">
            <div class="neo-card-header">
              <div class="neo-card-title">
                <span>💬</span> Favorite Quotes
              </div>
              <button class="neo-btn neo-btn-sm neo-btn-yellow" onclick="App.openAddQuoteModal()">+ Add</button>
            </div>

            <div id="quotesContainer">
              ${quotes.slice(0, 2).map(q => `
                <div class="quote-box">
                  <div class="quote-text">"${q.quote}"</div>
                  <div class="quote-author">— ${q.author} ${q.book ? `(${q.book})` : ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
