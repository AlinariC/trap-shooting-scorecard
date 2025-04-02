document.getElementById('site-header').innerHTML = `
  <header>
    <img src="logo-new.png" alt="Reedsport Trap Shooters Logo" class="logo" style="width: 320px;" />
    <nav>
      <a href="index.html">Scorecard</a>
      <a href="roster.html">Roster</a>
      <a href="results.html">Results</a>
    </nav>
  </header>
`;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("Service Worker registration failed:", err));
}
