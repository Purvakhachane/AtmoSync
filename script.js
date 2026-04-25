const weatherKey = "ea1703e2af254a9a874161356262504";
const newsKey = "f033bf1e1e30cde0275a850834d4a27a"; // replace

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`;

  const res = await fetch(url);
  const data = await res.json();

  displayWeather(data);
  getNews(city);
}

function displayWeather(data) {
  document.getElementById("cityName").innerText =
    `${data.location.name}, ${data.location.country}`;

  document.getElementById("temperature").innerText =
    `Temp: ${data.current.temp_c}°C`;

  document.getElementById("condition").innerText =
    data.current.condition.text;

  document.getElementById("feelsLike").innerText =
    `Feels Like: ${data.current.feelslike_c}`;

  document.getElementById("humidity").innerText =
    `Humidity: ${data.current.humidity}%`;

  document.getElementById("wind").innerText =
    `Wind: ${data.current.wind_kph} km/h`;

  document.getElementById("weatherIcon").src =
    "https:" + data.current.condition.icon;

  showAnimation(data.current.condition.text);
}

// WEATHER ANIMATION
function showAnimation(condition) {
  const anim = document.getElementById("animation");
  anim.innerHTML = "";

  condition = condition.toLowerCase();

  if (condition.includes("sun")) {
    anim.innerHTML = `<div class="sun"></div>`;
  }

  else if (condition.includes("rain")) {
    for (let i = 0; i < 50; i++) {
      let drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = Math.random() * 100 + "%";
      anim.appendChild(drop);
    }
  }

  else if (condition.includes("snow")) {
    for (let i = 0; i < 30; i++) {
      let snow = document.createElement("div");
      snow.className = "snow";
      snow.innerText = "❄";
      snow.style.left = Math.random() * 100 + "%";
      anim.appendChild(snow);
    }
  }
}

// NEWS
async function getNews(city) {
  const url = `https://gnews.io/api/v4/search?q=${city}&token=${newsKey}`;

  const res = await fetch(url);
  const data = await res.json();

  const newsDiv = document.getElementById("news");

  newsDiv.innerHTML = data.articles.map(article => `
    <div class="news-card">
      <h3>${article.title}</h3>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    </div>
  `).join("");
}

// LOCATION
function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${lat},${lon}`;

    const res = await fetch(url);
    const data = await res.json();

    displayWeather(data);
    getNews(data.location.name);
  });
}