/* ==========================================================================
   DIGITAL INQUIRY COMPONENT - AI CHATBOT & SMART BOOK FINDER
   ========================================================================== */

const InquiryComponent = {
  chatHistory: [
    {
      sender: 'bot',
      text: '👋 Hello! I am **NookBot**, your Neobrutalist AI Library Assistant. Ask me to find books, check availability, summarize topics, or recommend your next read!'
    }
  ],

  render() {
    return `
      <div class="grid-2">
        <!-- AI Chatbot Window -->
        <div class="chat-window">
          <div class="chat-header">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">🤖</span>
              <strong>NookBot AI Assistant</strong>
            </div>
            <span class="neo-badge neo-badge-yellow">ONLINE 24/7</span>
          </div>

          <div class="chat-messages" id="chatMessagesContainer">
            ${this.chatHistory.map(msg => `
              <div class="chat-bubble ${msg.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}">
                ${msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
              </div>
            `).join('')}
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="chat-suggestions">
            <button class="chat-suggestion-chip" onclick="InquiryComponent.sendQuickPrompt('Recommend a fast-paced sci-fi book')">🚀 Fast-paced Sci-Fi</button>
            <button class="chat-suggestion-chip" onclick="InquiryComponent.sendQuickPrompt('How do library fines work?')">💸 Library Fines Rules</button>
            <button class="chat-suggestion-chip" onclick="InquiryComponent.sendQuickPrompt('Summarize The Midnight Library')">📖 Summarize Midnight Library</button>
            <button class="chat-suggestion-chip" onclick="InquiryComponent.sendQuickPrompt('Are study pods open today?')">🏢 Study Pod Hours</button>
          </div>

          <!-- Chat Input -->
          <form class="chat-input-bar" onsubmit="InquiryComponent.handleChatSubmit(event)">
            <input 
              type="text" 
              id="chatInput" 
              class="neo-input" 
              placeholder="Ask NookBot anything about books, fines, or topics..." 
              autocomplete="off" 
              style="padding: 0.5rem 0.85rem;"
            />
            <button type="submit" class="neo-btn neo-btn-primary">Send</button>
          </form>
        </div>

        <!-- Smart Book Finder Tool -->
        <div class="neo-card flex-between" style="flex-direction: column; align-items: stretch;">
          <div class="neo-card-header">
            <div class="neo-card-title">
              <span>🎯</span> Smart Book Finder
            </div>
            <span class="neo-badge neo-badge-mint">AI MATCH</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; flex: 1;">
            <p style="font-weight: 600; font-size: 0.88rem; color: #4B5563;">
              Answer 3 quick preferences and let our matching engine discover the ideal read for your current mood:
            </p>

            <div class="neo-input-group">
              <label class="neo-input-label">1. What's your current reading mood?</label>
              <select id="finderMood" class="neo-select">
                <option value="curious">Curious & Looking to Learn Systems/Tech</option>
                <option value="thoughtful">Thoughtful & Philosophical (What-ifs of Life)</option>
                <option value="epic">Immersive & Multi-generational Story</option>
                <option value="productive">Actionable Habit & Productivity boost</option>
              </select>
            </div>

            <div class="neo-input-group">
              <label class="neo-input-label">2. Preferred Length & Format</label>
              <select id="finderFormat" class="neo-select">
                <option value="quick">Short Read / Research Article (&lt; 50 pages)</option>
                <option value="medium">Standard Novel (250 - 350 pages)</option>
                <option value="epic_depth">Deep Masterpiece (400+ pages)</option>
              </select>
            </div>

            <button class="neo-btn neo-btn-accent" onclick="InquiryComponent.runBookFinder()">
              🔍 Find My Ideal Match
            </button>

            <!-- Result Box -->
            <div id="finderResultBox" style="display: none; margin-top: 0.75rem; background: var(--neo-cream); border: var(--border-medium); border-radius: var(--radius-sm); padding: 1rem;">
              <!-- Populated dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;
  },

  sendQuickPrompt(promptText) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = promptText;
      this.handleChatSubmit({ preventDefault: () => {} });
    }
  },

  handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    this.chatHistory.push({ sender: 'user', text: userText });
    this.updateChatDOM();

    // Generate smart simulated bot response
    setTimeout(() => {
      const response = this.generateBotResponse(userText);
      this.chatHistory.push({ sender: 'bot', text: response });
      this.updateChatDOM();
    }, 450);
  },

  generateBotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('fine') || q.includes('due') || q.includes('fee')) {
      return `💸 **Library Fine Policy:** Standard loans are 14 days. Overdue items incur **$0.50/day**. You can pay and clear fines anytime in the **Digital History** tab!`;
    }
    if (q.includes('midnight library') || q.includes('matt haig')) {
      return `📖 **The Midnight Library** by Matt Haig: Nora Seed finds a mystical library between life and death containing infinite books representing the lives she could have lived. Highly recommended! We have **4 copies available** in the catalog.`;
    }
    if (q.includes('sci-fi') || q.includes('robot') || q.includes('future') || q.includes('klara')) {
      return `🚀 For Sci-Fi, check out **Klara and the Sun** by Kazuo Ishiguro, or read the foundational research article **Attention Is All You Need** in our tech archive!`;
    }
    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('pod')) {
      return `🏢 **Library Hours:** Main Hall is open **8:00 AM – 10:00 PM** daily. Silent study pods are open **24/7** for registered students!`;
    }
    if (q.includes('atomic habits') || q.includes('habit') || q.includes('productive')) {
      return `⚡ **Atomic Habits** by James Clear is available! It focuses on 1% marginal gains and building systems instead of relying solely on willpower.`;
    }
    return `✨ I found several items matching "${query}" in our digital collection. You can browse the **Digital Library** or ask me about borrowing rules, study groups, or book summaries!`;
  },

  updateChatDOM() {
    const container = document.getElementById('chatMessagesContainer');
    if (container) {
      container.innerHTML = this.chatHistory.map(msg => `
        <div class="chat-bubble ${msg.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}">
          ${msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
        </div>
      `).join('');
      container.scrollTop = container.scrollHeight;
    }
  },

  runBookFinder() {
    const mood = document.getElementById('finderMood').value;
    const format = document.getElementById('finderFormat').value;
    const resultBox = document.getElementById('finderResultBox');

    let match = store.getCatalog()[0];
    if (mood === 'curious') {
      match = store.getCatalog().find(c => c.category.includes('Tech') || c.category.includes('AI')) || match;
    } else if (mood === 'thoughtful') {
      match = store.getCatalog().find(c => c.title.includes('Midnight')) || match;
    } else if (mood === 'epic') {
      match = store.getCatalog().find(c => c.title.includes('Pachinko')) || match;
    } else if (mood === 'productive') {
      match = store.getCatalog().find(c => c.title.includes('Atomic')) || match;
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <img src="${match.cover}" style="width: 55px; height: 75px; object-fit: cover; border: 2px solid #000; border-radius: 4px;">
        <div style="flex: 1;">
          <span class="neo-badge neo-badge-mint">98% COMPATIBILITY MATCH</span>
          <h4 style="margin: 0.2rem 0;">${match.title}</h4>
          <p style="font-size: 0.75rem; color: #6B7280;">By ${match.author} • ${match.pages} pages</p>
        </div>
      </div>
      <p style="font-size: 0.8rem; margin: 0.5rem 0;">${match.description}</p>
      <button class="neo-btn neo-btn-sm neo-btn-primary" style="width: 100%;" onclick="App.borrowBook('${match.id}')">
        🚀 Borrow This Recommended Book Now
      </button>
    `;
  }
};
