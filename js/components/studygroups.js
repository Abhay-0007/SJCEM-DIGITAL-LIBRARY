/* ==========================================================================
   STUDY GROUPS COMPONENT - COLLABORATION & PEER DISCUSSIONS
   ========================================================================== */

const StudyGroupsComponent = {
  render() {
    const groups = store.getStudyGroups();

    return `
      <div class="neo-card mb-lg flex-between">
        <div>
          <h2 class="neo-card-title">👥 Study Groups & Classmate Collaborations</h2>
          <p style="font-weight: 600; color: #6B7280; font-size: 0.85rem; margin-top: 2px;">
            Join active study circles, share reading annotations, and organize group review sessions.
          </p>
        </div>
        <button class="neo-btn neo-btn-primary" onclick="App.openCreateStudyGroupModal()">
          <span>+</span> Create Study Group
        </button>
      </div>

      <div class="grid-3">
        ${groups.map(g => `
          <div class="study-room-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: 2.2rem; background: var(--neo-${g.color}); border: 2px solid #000; border-radius: 8px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                ${g.icon}
              </span>
              <span class="neo-badge neo-badge-${g.color}">${g.membersCount} MEMBERS</span>
            </div>

            <div>
              <h3 style="margin-bottom: 0.2rem;">${g.name}</h3>
              <p style="font-size: 0.8rem; font-weight: 700; color: #4B5563;">Topic: ${g.topic}</p>
            </div>

            <p style="font-size: 0.82rem; color: #374151; line-height: 1.4; flex: 1;">
              ${g.description}
            </p>

            <div style="background: var(--neo-gray-light); border: 1.5px solid #000; border-radius: 4px; padding: 0.5rem; font-size: 0.75rem;">
              <strong>📌 Pinned Resource:</strong><br>
              <span class="mono">${g.pinnedResource}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <div class="room-members-avatars">
                <div class="avatar-stack">AS</div>
                <div class="avatar-stack" style="background: #F472B6;">ER</div>
                <div class="avatar-stack" style="background: #FBBF24;">KS</div>
                <div class="avatar-stack" style="background: #60A5FA;">+${g.membersCount - 3}</div>
              </div>
              <button 
                class="neo-btn neo-btn-sm ${g.isJoined ? 'neo-btn-accent' : 'neo-btn-primary'}" 
                onclick="App.joinStudyGroup('${g.id}')"
              >
                ${g.isJoined ? '✓ In Room' : 'Join Room'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
