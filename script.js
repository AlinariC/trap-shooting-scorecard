function addName() {
  const name = document.getElementById('newName').value.trim();
  if (name === '') return;
  db.ref('roster').once('value', snapshot => {
    const list = snapshot.val() || [];
    if (!list.includes(name)) {
      list.push(name);
      db.ref('roster').set(list);
      document.getElementById('newName').value = '';
      loadRosterList();
    }
  });
}

function loadRosterList() {
  const listElement = document.getElementById('shooterList');
  if (!listElement) return;
  listElement.innerHTML = '';
  db.ref('roster').once('value', snapshot => {
    const list = snapshot.val() || [];
    list.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="#ff3b30" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>`;
      removeBtn.classList.add('icon-button');
      removeBtn.style.cssText = 'margin-left: 0.5rem; vertical-align: middle;';
      removeBtn.onclick = () => removeShooter(name);
      li.appendChild(removeBtn);
      listElement.appendChild(li);
    });
  });
}

function removeShooter(name) {
  db.ref('roster').once('value', snapshot => {
    const list = snapshot.val() || [];
    const updated = list.filter(n => n !== name);
    db.ref('roster').set(updated);
    loadRosterList();
  });
}

function addCoach() {
  const name = document.getElementById('newCoach').value.trim();
  if (name === '') return;
  db.ref('coaches').once('value', snapshot => {
    const list = snapshot.val() || [];
    if (!list.includes(name)) {
      list.push(name);
      db.ref('coaches').set(list);
      document.getElementById('newCoach').value = '';
      loadCoachList();
    }
  });
}

function loadCoachList() {
  const listElement = document.getElementById('coachList');
  if (!listElement) return;
  listElement.innerHTML = '';
  db.ref('coaches').once('value', snapshot => {
    const list = snapshot.val() || [];
    list.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="#ff3b30" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>`;
      removeBtn.classList.add('icon-button');
      removeBtn.style.cssText = 'margin-left: 0.5rem; vertical-align: middle;';
      removeBtn.onclick = () => removeCoach(name);
      li.appendChild(removeBtn);
      listElement.appendChild(li);
    });
  });
}

function removeCoach(name) {
  db.ref('coaches').once('value', snapshot => {
    const list = snapshot.val() || [];
    const updated = list.filter(n => n !== name);
    db.ref('coaches').set(updated);
    loadCoachList();
  });
}

window.onload = () => {
  if (document.getElementById('shooterList')) {
    loadRosterList();
  }
  if (document.getElementById('coachList')) {
    loadCoachList();
  }
  if (document.getElementById('shooterCount') && typeof renderScorecard === 'function') {
    renderScorecard();
  }
};