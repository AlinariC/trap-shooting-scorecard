# Reedsport Trap Shooters Scorekeeping App

A professional, touch-friendly web app built for trap shooting teams to track scores, manage rosters, and analyze performance — all optimized for iPad use during live matches.

## 🎯 Features

- 📋 Add and manage shooter and coach rosters
- 🎯 Tap-based score entry (green `/` for hit, red `O` for miss)
- 📅 Track date, field, team name, and scorekeeper
- 💾 Save results to Firebase (real-time database)
- 🔍 View past results, filtered by date
- 📈 Export functionality (CSV/PDF planned)
- 📊 Stats page (in development)
- 🔐 Admin controls with optional PIN protection
- ✅ Fully responsive — works on iPad, desktop, and mobile

## 🛠️ Technologies Used

- HTML, CSS, JavaScript
- Firebase Realtime Database
- Progressive Web App (PWA) support
- GitHub Pages for deployment

## 📱 Optimized For

- iPads (touch scoring)
- Mobile phones (responsive layout)
- Desktop (admin access, printing, CSV exports)

## 🔧 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/trap-shooting-scorecard.git
   ```

2. Add your Firebase config inside the HTML files (`index.html`, `roster.html`, `results.html`) using the snippet provided by Firebase Console.

3. Enable Firebase Realtime Database and set basic read/write rules (or use Firebase Auth if needed).

4. To test locally, open any HTML file in a browser.
   To deploy via GitHub Pages, push your changes to the `main` branch and enable GitHub Pages from the repo settings.

## 📂 Project Structure

```
trap-shooting-scorecard/
├── index.html           # Main scorecard interface
├── roster.html          # Shooter and coach management
├── results.html         # Searchable results viewer
├── script.js            # Core app logic (shared across pages)
├── style.css            # Global styles and responsive layout
├── header.js            # Shared logo/navigation header
├── manifest.json        # PWA metadata
├── serviceWorker.js     # Offline support for PWA
├── logo-new.png         # Team logo used in header
└── README.md            # Project documentation
```

## 🚧 Roadmap (Upcoming Features)

- [ ] CSV/PDF Export on Results Page
- [ ] Stats & Analytics Dashboard
- [ ] Event Scheduling & Match History
- [ ] Firebase Auth + Admin Mode
- [ ] Read-only mode toggle (for match day)
- [ ] Firebase rules hardening + backup support

## 👥 Built For

The Reedsport Trap Shooters team, local coaches, and volunteers.  
Designed by [Alinari Campbell](mailto:alinaricampbell@icloud.com) with assistance from AI.

## 🏁 License

MIT License — Free for personal or educational use.