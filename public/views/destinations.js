function fetchWeatherData() {
  const apiKey = "4d8fb5b93d4af21d66a2948710284366";
  const cities = ['stockholm', 'london', 'tokyo', 'seoul', 'berlin'];

  // Fetch weather data for each city
  cities.forEach((city, index) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

        // Generate HTML for the city's weather information
        const cityHtml = `
          <div class="city">
            <h3 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h3>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src="${icon}" alt="${weather[0].description}">
              <figcaption>${weather[0].description}</figcaption>
            </figure>
          </div>
        `;

        // Append the first city's weather to '#current-destination', others to '#dream-destination'
        const targetElement = index === 0
          ? document.querySelector('#current-destination')
          : document.querySelector('#dream-destination');

        // Check if the container exists before appending
        if (targetElement) {
          targetElement.innerHTML += cityHtml;
        }
      })
      .catch(err => console.error(`Error fetching weather data for ${city}:`, err));
  });
}

// Export the destinations view
export default () => {
  // The HTML for the destinations page
  const viewHtml = /*html*/ `
    <section id="introText">
      <div id="introSection">
        <h2>Destinations</h2>
        <p>This page shows where I use the OpenWeatherMap API to get real-time weather data for different cities.</p>
        <p>It displays the current temperature and weather for two locations: my current destination and "dream destinations" — places I plan to visit in the future.</p>
        <p>This lets users see the current weather and get a sense of what the weather might be like in potential travel spots. The data updates each time the page is visited, showing the latest weather information. This project demonstrates how to use an API to handle live data and present it clearly on a webpage.</p>
      </div>
    </section>
    <section id="skills">
      <section class="ajax-section">
        <h2>Current Location:</h2>
        <div id="current-destination" class="container single-box"></div>
        <h3>Dream Destinations:</h3>
        <div id="dream-destination" class="container multi-box"></div>
      </section>
    </section>
  `;

  // Ensure weather data is fetched after the HTML is rendered
  setTimeout(fetchWeatherData, 0);

  return viewHtml;
};