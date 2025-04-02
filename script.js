<script>
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
</script>