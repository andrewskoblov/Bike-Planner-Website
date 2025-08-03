City Bike Planner – CSCI 377 Final Project Submission

Group Members: Andrew Skoblov, Hanita Darfour, Freire Jonathan

---

WHAT THIS PROJECT DOES
This project is a city bike station planner web app. It calculates the shortest path between two bike stations using real-world coordinates and displays:
- Optimal biking routes with live map rendering
- Estimated biking time
- Live weather at the starting location
- Bike availability and station inventory per city

---

FILES TO SUBMIT (INCLUDED IN ZIP)

CityBikePlanner/
├── index.html         <-- Web interface and layout
├── style.css          <-- Styling, animations, layout
├── script.js          <-- Graph logic, routing, weather API
├── report.pdf         <-- Final design + algorithm analysis report
├── README.txt         <-- This file with full instructions

Compress this folder into:
CityBikePlanner.zip

---

HOW TO OPEN & RUN THE PROJECT

Option 1: Using Visual Studio Code (recommended)
1. Download and install Visual Studio Code: https://code.visualstudio.com/
2. Open the `CityBikePlanner` folder inside VS Code
3. Install the Live Server extension:
   - Click Extensions (left sidebar)
   - Search: Live Server
   - Click Install
4. Right-click `index.html` → Open with Live Server
5. The app will load in your browser with full functionality

Option 2: Run Manually in Any Browser
1. Open the `CityBikePlanner` folder
2. Double-click `index.html` (or right-click → Open with → Chrome/Firefox)
3. App runs entirely in your browser
4. Make sure you are connected to the internet (for APIs)

---

FEATURES
- Interactive web UI with map and animated bike
- Shortest route using Dijkstra's Algorithm
- Connectivity exploration using BFS
- OpenRouteService API for accurate biking routes
- OpenWeatherMap API to show current weather at start station
- Estimated ride time calculation (4 min/km)
- Dynamic bike station inventory (user can rent bikes)

---

FILE DESCRIPTIONS
- index.html: Contains all the app structure and dropdowns
- style.css: Modern styling, responsive layout, animation
- script.js: Main logic including:
  - Dijkstra’s algorithm
  - BFS logic
  - Station coordinates
  - Fetching real-time route and weather
  - DOM interactivity for renting/availability
- report.pdf: Final write-up including algorithm analysis, design decisions, testing, and results
- README.txt: Full setup and usage instructions (this file)

---

EXTERNAL CONNECTIONS
This project uses:
- OpenRouteService – for fetching real-world bike directions
- OpenWeatherMap – to retrieve live temperature + conditions

No login or database is required. Everything runs in-browser.

---

TECH REQUIREMENTS
- Works on Chrome, Firefox, Edge
- No backend setup needed
- Internet required for API calls

---
