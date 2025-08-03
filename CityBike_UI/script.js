let map;

const stationCoordinates = {
    "Central Park": [40.785091, -73.968285],
    "Times Square": [40.758896, -73.985130],
    "Brooklyn Bridge": [40.706086, -73.996864],
    "Wall Street": [40.707491, -74.011276],
    "Harlem": [40.811550, -73.946477]
};

function initMap() {
    map = L.map('map').setView([40.758896, -73.985130], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

async function calculateRoute() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const startCoord = stationCoordinates[start];
    const endCoord = stationCoordinates[end];

    if (startCoord && endCoord && map) {
        if (window.routeLine) map.removeLayer(window.routeLine);

        const distance = getDistance(startCoord, endCoord).toFixed(1);
        document.getElementById("route-summary").innerText =
            `Shortest path: ${start} → ${end} | Approx. Distance: ${distance} km`;

            const estimatedTimeMin = parseFloat(distance) * 4; // 4 minutes per km average biking pace
            document.getElementById("route-summary").innerHTML += `<br>⏱️ Estimated Ride Time: ${Math.round(estimatedTimeMin)} minutes`;

            fetchWeatherForStation(start);
            
        const coords = [[startCoord[1], startCoord[0]], [endCoord[1], endCoord[0]]]; // ORS expects [lng, lat]

        try {
            const response = await fetch("https://api.openrouteservice.org/v2/directions/cycling-regular/geojson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "5b3ce3597851110001cf6248788037073b134cb095428b6de4fb01f1" // your API key
                },
                body: JSON.stringify({ coordinates: coords })
            });

            const data = await response.json();

            window.routeLine = L.geoJSON(data, {
                style: { color: "blue", weight: 5 }
            }).addTo(map);

            map.fitBounds(window.routeLine.getBounds());

            // 🚴 Animate bike
            const bikeRide = document.getElementById("bikeRide");
            bikeRide.style.display = "block";
            bikeRide.style.animation = "none";
            void bikeRide.offsetWidth;
            bikeRide.style.animation = "rideLeft 4s linear forwards";

            setTimeout(() => {
                bikeRide.style.display = "none";
            }, 4000);

        } catch (error) {
            console.error("Route fetch failed:", error);
            alert("Couldn't retrieve route from OpenRouteService.");
        }
    }
}

function getDistance(coord1, coord2) {
    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

window.onload = initMap;

const bikeStations = {
    "New York": {
        count: 5,
        locations: {
            "Central Park": 10,
            "Times Square": 7,
            "Brooklyn Bridge": 5,
            "Wall Street": 3,
            "Harlem": 8
        }
    },
    "San Francisco": {
        count: 3,
        locations: {
            "Golden Gate": 6,
            "Downtown": 4,
            "Mission District": 5
        }
    },
    "Chicago": {
        count: 4,
        locations: {
            "Millennium Park": 8,
            "Navy Pier": 7,
            "The Loop": 6,
            "Hyde Park": 9
        }
    }
};

function populateStationDropdown() {
    const city = document.getElementById("rent-city").value;
    const stationDropdown = document.getElementById("rent-station");
    stationDropdown.innerHTML = '<option value="">Select Station</option>';

    if (bikeStations[city]) {
        const stations = bikeStations[city].locations;
        for (const station in stations) {
            const option = document.createElement("option");
            option.value = station;
            option.textContent = `${station} (${stations[station]} bikes)`;
            stationDropdown.appendChild(option);
        }
    }
}

function rentBike() {
    const city = document.getElementById("rent-city").value;
    const station = document.getElementById("rent-station").value;

    if (!city || !station) {
        document.getElementById("rent-output").innerHTML = "⚠️ Please select both a city and a station.";
        return;
    }

    const bikesAvailable = bikeStations[city].locations[station];

    if (bikesAvailable > 0) {
        bikeStations[city].locations[station] -= 1;
        document.getElementById("rent-output").innerHTML = `✅ Rented a bike from ${station}. Remaining: ${bikeStations[city].locations[station]} bikes.`;
        populateStationDropdown(); // refresh dropdown numbers
    } else {
        document.getElementById("rent-output").innerHTML = `❌ No bikes available at ${station}.`;
    }
}

const weatherApiKey = "ffbb9516a43fa92deea53027505e3882"; // your weather key

async function fetchWeatherForStation(stationName) {
    const coord = stationCoordinates[stationName];
    if (!coord) return;

    const [lat, lon] = coord;
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
        );
        const data = await res.json();

        document.getElementById("weather-city").textContent = `📍 ${data.name}`;
        document.getElementById("weather-temp").textContent = `🌡️ ${data.main.temp} °F`;
        document.getElementById("weather-desc").textContent = `🌥️ ${data.weather[0].description}`;
    } catch (err) {
        console.error("Weather fetch failed", err);
        document.getElementById("weather-desc").textContent = "Unable to fetch weather.";
    }
}
