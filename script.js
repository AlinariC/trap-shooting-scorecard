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

function renderScorecard() {
  const count = parseInt(document.getElementById('shooterCount').value);
  const container = document.getElementById('scorecardContainer');
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const shooterDiv = document.createElement('div');
    shooterDiv.classList.add('shooter-entry');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = `Shooter ${i + 1}:`;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Shooter Name';

    const scoreGrid = document.createElement('div');
    scoreGrid.classList.add('score-grid');
    for (let j = 0; j < 25; j++) {
      const cell = document.createElement('button');
      cell.classList.add('score-cell');
      cell.textContent = '';
      cell.dataset.state = '';
      cell.onclick = () => {
        if (cell.dataset.state === '') {
          cell.textContent = '/';
          cell.dataset.state = 'hit';
          cell.classList.add('hit');
          cell.classList.remove('miss');
        } else if (cell.dataset.state === 'hit') {
          cell.textContent = 'O';
          cell.dataset.state = 'miss';
          cell.classList.add('miss');
          cell.classList.remove('hit');
        } else {
          cell.textContent = '';
          cell.dataset.state = '';
          cell.classList.remove('hit', 'miss');
        }
      };
      scoreGrid.appendChild(cell);
    }

    shooterDiv.appendChild(nameLabel);
    shooterDiv.appendChild(nameInput);
    shooterDiv.appendChild(scoreGrid);
    container.appendChild(shooterDiv);
  }
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