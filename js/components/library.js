/* ==========================================================================
   DIGITAL LIBRARY COMPONENT - BOOKS, ARTICLES, MAGAZINES
   ========================================================================== */

const LibraryComponent = {
  activeTypeFilter: 'All',
  searchQuery: '',

  render() {
    const items = store.getCatalog(this.activeTypeFilter, this.searchQuery);

    return `
      <div class="neo-card mb-lg">
        <div class="neo-card-header">
          <div>
            <h2 class="neo-card-title">📚 Digital Library Collection</h2>
            <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
              Explore and borrow books, research articles, and monthly digital periodicals.
            </p>
          </div>
          <div class="filter-pills">
            <button class="filter-pill ${this.activeTypeFilter === 'All' ? 'active' : ''}" onclick="LibraryComponent.setType('All')">All (${store.getCatalog().length})</button>
            <button class="filter-pill ${this.activeTypeFilter === 'Book' ? 'active' : ''}" onclick="LibraryComponent.setType('Book')">📖 Books</button>
            <button class="filter-pill ${this.activeTypeFilter === 'Article' ? 'active' : ''}" onclick="LibraryComponent.setType('Article')">📄 Articles</button>
            <button class="filter-pill ${this.activeTypeFilter === 'Magazine' ? 'active' : ''}" onclick="LibraryComponent.setType('Magazine')">📰 Magazines</button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="library-filter-bar">
          <div class="neo-search-bar" style="max-width: 500px;">
            <span>🔍</span>
            <input 
              type="text" 
              id="librarySearchInput" 
              placeholder="Search by title, author, topic, or ISBN..." 
              value="${this.searchQuery}"
              oninput="LibraryComponent.onSearch(this.value)"
            />
            ${this.searchQuery ? `<button class="neo-btn neo-btn-sm" onclick="LibraryComponent.onSearch('')">Clear</button>` : ''}
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="neo-btn neo-btn-sm neo-btn-accent" onclick="App.openRequestBookModal()">
              <span>✨</span> Request Book on Demand
            </button>
          </div>
        </div>
      </div>

      <!-- Catalog Grid -->
      <div class="catalog-grid">
        ${items.length === 0 ? `
          <div class="neo-card flex-center" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
            <div>
              <h3>🔎 No titles found matching "${this.searchQuery}"</h3>
              <p class="mt-sm mb-md">Try searching for a different keyword or request this title directly from library staff.</p>
              <button class="neo-btn neo-btn-primary" onclick="LibraryComponent.onSearch('')">Show All Catalog Items</button>
            </div>
          </div>
        ` : items.map(item => `
          <div class="catalog-card">
            <div class="catalog-cover">
              <img src="${item.cover}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'">
              <span class="neo-badge catalog-type-badge ${item.type === 'Book' ? 'neo-badge-yellow' : item.type === 'Article' ? 'neo-badge-mint' : 'neo-badge-lavender'}">
                ${item.type}
              </span>
            </div>
            <div class="catalog-body">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span class="neo-badge neo-badge-sky" style="font-size: 0.65rem;">${item.category}</span>
                <span class="mono" style="font-size: 0.75rem; font-weight: 700;">
                  ${item.availableCopies > 0 ? `✅ ${item.availableCopies} Left` : '❌ Out of Stock'}
                </span>
              </div>
              <h3 title="${item.title}">${item.title}</h3>
              <p class="catalog-meta">By ${item.author} (${item.year})</p>
              <p style="font-size: 0.8rem; color: #4B5563; line-height: 1.35; flex: 1;">
                ${item.description.substring(0, 110)}...
              </p>
              
              <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                <button class="neo-btn neo-btn-sm" style="flex: 1;" onclick="App.viewBookDetail('${item.id}')">Details</button>
                <button 
                  class="neo-btn neo-btn-sm neo-btn-primary" 
                  style="flex: 1.2;" 
                  onclick="App.borrowBook('${item.id}')"
                  ${item.availableCopies === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                  ${item.availableCopies > 0 ? 'Borrow' : 'Reserved'}
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  setType(type) {
    this.activeTypeFilter = type;
    App.refreshCurrentView();
  },

  onSearch(query) {
    this.searchQuery = query;
    App.refreshCurrentView();
    // Keep focus
    setTimeout(() => {
      const input = document.getElementById('librarySearchInput');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }, 50);
  }
};
