function updateScore() {
  let total = 0;
  for (let i = 1; i <= 25; i++) {
    const val = document.getElementById("shot" + i).value;
    if (val === "/") total += 1;
  }
  document.getElementById("totalScore").textContent = total;
}
function clearForm() {
  for (let i = 1; i <= 25; i++) {
    document.getElementById("shot" + i).value = "";
  }
  document.getElementById("eventWeek").value = "";
  document.getElementById("fieldNumber").value = "";
  document.getElementById("scorekeeper").value = "";
  document.getElementById("teamName").value = "";
  document.getElementById("athleteName").value = "";
  updateScore();
}
