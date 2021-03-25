const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    console.log(currentDay)
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
          <h2>Temperature: ${Math.round(currentDay.main.temp)}&deg;C</h2>
          <h2>Humidity: ${currentDay.main.humidity} %</h2>
          <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">
          <h2>Wind: ${currentDay.wind.speed} miles/h</h2>`
  }
  