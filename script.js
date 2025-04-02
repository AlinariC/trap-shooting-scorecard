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

  const scores = JSON.parse(localStorage.getItem('trapScores') || '[]');
  scores.push(data);
  localStorage.setItem('trapScores', JSON.stringify(scores));
  alert('Scorecard saved!');
}

function resetScorecard() {
  document.getElementById('eventDate').value = '';
  document.getElementById('fieldNumber').value = '';
  document.getElementById('scorekeeper').value = '';
  document.getElementById('teamName').value = '';
  renderScorecard();
}

function loadRoster(selectId) {
  const list = JSON.parse(localStorage.getItem('trapRoster') || '[]');
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">-- Select Shooter --</option>';
  list.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

window.onload = () => {
  renderScorecard();
};