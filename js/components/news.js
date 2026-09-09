/* ==========================================================================
   NEWS & DIGITAL NOTICE BOARD COMPONENT
   ========================================================================== */

const NewsComponent = {
  activeCategory: 'All',

  render() {
    const news = store.getNews();
    const catalog = store.getCatalog();
    const categories = ['All', 'Fiction', 'Historical Fiction', 'Self-Improvement', 'Technology', 'Sci-Fi', 'AI & Data Science'];

    const filteredCatalog = this.activeCategory === 'All' 
      ? catalog.slice(0, 6)
      : catalog.filter(c => c.category.toLowerCase().includes(this.activeCategory.toLowerCase()));

    return `
      <!-- Notice Board Header -->
      <div class="neo-card mb-lg flex-between">
        <div>
          <h2 class="neo-card-title">📢 Digital Notice Board & Arrivals</h2>
          <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
            Official announcements, events, reading sprint updates, and categorized new arrivals.
          </p>
        </div>
        ${store.getRole() === 'admin' ? `
          <button class="neo-btn neo-btn-danger" onclick="App.openAddNoticeModal()">
            <span>+</span> Post New Announcement
          </button>
        ` : ''}
      </div>

      <!-- Pinned Digital Notices -->
      <div class="grid-3 mb-lg">
        ${news.map(n => `
          <div class="notice-pin-card">
            <span class="neo-badge notice-pin-badge">${n.badge}</span>
            <div style="font-size: 0.75rem; font-family: var(--font-mono); color: #6B7280; margin-bottom: 0.4rem;">
              📅 ${n.date} • ${n.category}
            </div>
            <h3 style="margin-bottom: 0.5rem; line-height: 1.25; padding-right: 2rem;">${n.title}</h3>
            <p style="font-size: 0.85rem; color: #374151; line-height: 1.4;">
              ${n.content}
            </p>
          </div>
        `).join('')}
      </div>

      <!-- New Books Section By Category -->
      <div class="neo-card">
        <div class="neo-card-header">
          <div class="neo-card-title">
            <span>✨</span> New Books Section by Category
          </div>
          <div class="filter-pills">
            ${categories.map(cat => `
              <button 
                class="filter-pill ${this.activeCategory === cat ? 'active' : ''}" 
                onclick="NewsComponent.setCategory('${cat}')"
              >
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="catalog-grid">
          ${filteredCatalog.map(item => `
            <div class="catalog-card">
              <div class="catalog-cover" style="height: 180px;">
                <img src="${item.cover}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'">
                <span class="neo-badge catalog-type-badge neo-badge-yellow">${item.type}</span>
              </div>
              <div class="catalog-body">
                <span class="neo-badge neo-badge-sky" style="font-size: 0.65rem; width: fit-content;">${item.category}</span>
                <h4 style="margin: 0.2rem 0;">${item.title}</h4>
                <p style="font-size: 0.78rem; color: #6B7280;">By ${item.author}</p>
                <div style="margin-top: 0.5rem;">
                  <button class="neo-btn neo-btn-sm neo-btn-primary" style="width: 100%;" onclick="App.borrowBook('${item.id}')">
                    Borrow Item
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  setCategory(cat) {
    this.activeCategory = cat;
    App.refreshCurrentView();
  }
};
