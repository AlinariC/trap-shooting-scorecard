function renderScorecard() {
  const count = parseInt(document.getElementById('shooterCount').value);
  const container = document.getElementById('scorecardContainer');
  container.innerHTML = '';

  db.ref('roster').once('value', snapshot => {
    const shooters = snapshot.val() || [];

    const table = document.createElement('table');
    table.classList.add('scorecard-table');

    // Table header
    const header = document.createElement('tr');
    header.innerHTML = `<th>Shooter</th>`;
    for (let i = 1; i <= 25; i++) {
      const th = document.createElement('th');
      th.textContent = `R${i}`;
      header.appendChild(th);
    }
    header.innerHTML += `<th>Total</th>`;
    table.appendChild(header);

    for (let i = 0; i < count; i++) {
      const row = document.createElement('tr');

      // Shooter dropdown
      const shooterCell = document.createElement('td');
      const select = document.createElement('select');
      select.name = `shooter-${i}`;
      
      const blankOption = document.createElement('option');
      blankOption.value = '';
      blankOption.textContent = '';
      select.appendChild(blankOption);
      
      shooters.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
      shooterCell.appendChild(select);
      row.appendChild(shooterCell);

      let totalHits = 0;
      const scoreCells = [];

      for (let j = 0; j < 25; j++) {
        const td = document.createElement('td');
        const btn = document.createElement('button');
        btn.classList.add('score-cell');
        btn.style.minWidth = '50px';
        btn.style.minHeight = '50px';
        btn.style.margin = '6px';
        btn.textContent = '';
        btn.dataset.state = '';
        btn.onclick = () => {
          if (btn.dataset.state === '') {
            btn.textContent = '/';
            btn.dataset.state = 'hit';
            btn.classList.add('hit');
            btn.classList.remove('miss');
          } else if (btn.dataset.state === 'hit') {
            btn.textContent = 'O';
            btn.dataset.state = 'miss';
            btn.classList.add('miss');
            btn.classList.remove('hit');
          } else {
            btn.textContent = '';
            btn.dataset.state = '';
            btn.classList.remove('hit', 'miss');
          }
          updateTotal();
        };
        td.appendChild(btn);
        row.appendChild(td);
        scoreCells.push(btn);
      }

      const totalCell = document.createElement('td');
      totalCell.classList.add('total-cell');
      row.appendChild(totalCell);

      function updateTotal() {
        const total = scoreCells.filter(btn => btn.dataset.state === 'hit').length;
        totalCell.textContent = total;
      }

      table.appendChild(row);
    }

    container.appendChild(table);
  });
}

window.onload = () => {
  document.getElementById('shooterCount').value = '1';
  renderScorecard();
  document.getElementById('shooterCount').addEventListener('change', renderScorecard);
};