const shooters = [];

function renderScorecard() {
  const count = parseInt(document.getElementById('shooterCount').value);
  const container = document.getElementById('scorecardContainer');
  container.innerHTML = '';
  shooters.length = 0;

  for (let i = 0; i < count; i++) {
    const shooterId = `shooter${i}`;
    shooters.push({ id: shooterId, score: Array(25).fill('') });

    const block = document.createElement('div');
    block.className = 'shooter-block';
    block.innerHTML = `
      <h2>Shooter ${i + 1}</h2>
      <label>Name:
        <select id="${shooterId}-name"></select>
      </label>
      <table class="score-table">
        <thead>
          <tr>${Array.from({ length: 25 }, (_, j) => `<th>${j + 1}</th>`).join('')}<th>Total</th></tr>
        </thead>
        <tbody>
          <tr>
            ${Array.from({ length: 25 }, (_, j) =>
              `<td><select onchange="updateScore('${shooterId}')" id="${shooterId}-shot${j}">
                <option value=""></option>
                <option value="/">/</option>
                <option value="O">O</option>
              </select></td>`
            ).join('')}
            <td id="${shooterId}-total">0</td>
          </tr>
        </tbody>
      </table>
    `;
    container.appendChild(block);
    loadRoster(`${shooterId}-name`);
  }
}

function updateScore(shooterId) {
  let total = 0;
  for (let i = 0; i < 25; i++) {
    const val = document.getElementById(`${shooterId}-shot${i}`).value;
    const cell = document.getElementById(`${shooterId}-shot${i}`);
    if (val === '/') {
      total++;
      cell.className = 'score-hit';
    } else if (val === 'O') {
      cell.className = 'score-miss';
    } else {
      cell.className = '';
    }
  }
  document.getElementById(`${shooterId}-total`).textContent = total;
}

function saveScorecard() {
  const data = {
    date: document.getElementById('eventDate').value,
    field: document.getElementById('fieldNumber').value,
    scorekeeper: document.getElementById('scorekeeper').value,
    team: document.getElementById('teamName').value,
    shooters: []
  };

  shooters.forEach((s, i) => {
    const shooter = {
      name: document.getElementById(`${s.id}-name`).value,
      shots: [],
      total: 0
    };
    for (let j = 0; j < 25; j++) {
      const val = document.getElementById(`${s.id}-shot${j}`).value;
      shooter.shots.push(val);
      if (val === '/') shooter.total++;
    }
    data.shooters.push(shooter);
  });

  // Push the data to Firebase
  db.ref('scores').once('value', snapshot => {
    const scores = snapshot.val() || [];
    scores.push(data);
    db.ref('scores').set(scores);
    alert('Scorecard saved to Firebase!');
  });
}

function resetScorecard() {
  document.getElementById('eventDate').value = '';
  document.getElementById('fieldNumber').value = '';
  document.getElementById('scorekeeper').value = '';
  document.getElementById('teamName').value = '';
  renderScorecard();
}

function loadRoster(selectId) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">-- Select Shooter --</option>';
  db.ref('roster').once('value', snapshot => {
    const list = snapshot.val() || [];
    list.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
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
  if (document.getElementById('shooterCount')) {
    renderScorecard();
  }
  if (document.getElementById('coachList')) {
    loadCoachList();
  }
};