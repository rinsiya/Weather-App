const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const refreshBtn = document.getElementById("refreshBtn");

const API_KEY = "4d6fc8fba1823301f8b0de98c519351d";

async function getWeather() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch weather.");
                }

                const data = await response.json();

                city.textContent = data.name;
                temp.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent =
                    data.weather[0].description;

                humidity.textContent =
                    `Humidity: ${data.main.humidity}%`;

                wind.textContent =
                    `Wind: ${data.wind.speed} m/s`;

            } catch (error) {
                alert(error.message);
            }

        },
        () => {
            alert("Location access denied.");
        }
    );
}

refreshBtn.addEventListener("click", getWeather);

window.addEventListener("load", getWeather);