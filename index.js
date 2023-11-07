const apiKey = "18f48b3f4d47e7b354fe8e08faf4673b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const unitSwitchButton=document.getElementById('unitswitchbtn');

// Function to fetch and display weather information
// Function to fetch and display weather information
async function checkweather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
            alert("Please enter a valid city name.");
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Kmph";

        // Determine the temperature category based on the temperature
        let temperatureCategory = 'mild'; // Default
        if (data.main.temp <= 0) {
            temperatureCategory = 'cold';
        } else if (data.main.temp <= 10) {
            temperatureCategory = 'chilly';
        } else if (data.main.temp <= 20) {
            temperatureCategory = 'mild';
        } else if (data.main.temp <= 30) {
            temperatureCategory = 'warm';
        } else {
            temperatureCategory = 'hot';
        }

        // Apply the appropriate gradient to the card element
        const card = document.querySelector('.card');
        card.style.background = gradientColors[temperatureCategory];

        // Set the weather icon based on the weather condition
        setWeatherIcon(data.weather[0].main);
        
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.log("Either Bad Name ")
    }
}

// Define the temperature thresholds and corresponding gradient colors
const gradientColors = {
    cold: 'linear-gradient(135deg, #00feba, #5b548a)',
    chilly: 'linear-gradient(135deg, #00a4fe, #5b548a)',
    mild: 'linear-gradient(135deg, #fffd00, #5b548a)',
    warm: 'linear-gradient(135deg, #ffb000, #5b548a)',
    hot: 'linear-gradient(135deg, #ff6c00, #5b548a)'
};

// Function to set the weather icon based on the weather condition
function setWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case 'Clouds':
            weatherIcon.src = 'images/clouds.png';
            break;
        case 'Clear':
            weatherIcon.src = 'images/clear.png';
            break;
        case 'Rain':
            weatherIcon.src = 'images/rain.png';
            break;
        case 'Drizzle':
            weatherIcon.src = 'images/drizzle.png';
            break;
        case 'Humid':
            weatherIcon.src = 'images/humidity.png';
            break;
        case 'Mist':
            weatherIcon.src = 'images/mist.png';
            break;
        case 'Snow':
            weatherIcon.src = 'images/snow.png';
            break;
       
    }
}


// Display Mumbai weather by default
checkweather("Mumbai");

// Event listener to allow the user to search for other cities
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});
unitSwitchButton.addEventListener("click", () => {
    // Select the temperature element
    const tempElement = document.querySelector(".temp");
    
    // Log the temperature element and its innerHTML
    console.log(tempElement);
    console.log(tempElement.innerHTML);

    // Explicitly use the degree symbol (°) for splitting
    const [tempValue, tempUnit] = tempElement.innerHTML.split("°");

    // Log the parsed values
    console.log(tempValue, tempUnit);

    // Check the current unit and convert to the other unit
    if (tempUnit === "C") {
        // Convert to Fahrenheit and update the displayed temperature
        const tempInFahrenheit = (tempValue * 9/5) + 32;
        tempElement.innerHTML = Math.round(tempInFahrenheit) + "°F";
        console.log("Switched to °F:", tempInFahrenheit);
    } else if (tempUnit === "F") {
        // Convert to Celsius and update the displayed temperature
        const tempInCelsius = (tempValue - 32) * 5/9;
        tempElement.innerHTML = Math.round(tempInCelsius) + "°C";
        console.log("Switched to °C:", tempInCelsius);
    }
});