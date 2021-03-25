// Foursquare API Info
const clientId = '34UUSFD0MZLRSLRFSSHCF4D0K5QYIGYYQRN1Y0AMXPDOPBLJ';
const clientSecret = 'XI1LHWZZMEOVCCJVYRQPELVHA3MTTWXZOAWGPDQEXXICTYAG';
const url1 = 'https://api.foursquare.com/v2/venues/explore?near=';
const url2 = 'https://api.foursquare.com/v2/venues/';

// OpenWeather Info
const openWeatherKey = '3f7ff6c50748a60b4491e44faaa808ca';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//shuffles items in an array
function shuffle(sourceArray) {
  for (let i = 0; i < sourceArray.length - 1; i++) {
      let j = i + Math.floor(Math.random() * (sourceArray.length - i));
      let temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
      console.log(sourceArray[i])
  }
  return sourceArray;
}
//AJAX functions:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url1}${city}&limit=8&client_id=${clientId}&client_secret=${clientSecret}&v=20210325`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(x => x.venue);
      console.log(venues);
      return venues;
    }
  } catch(error){
    console.log(error);
  }
}

const getVenueDetails = async id => {
  const urlToFetch = `${url2}${id}?client_id=${clientId}&client_secret=${clientSecret}&v=20210325`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      details = jsonResponse.response.venue;
      return details;
    }
  } catch(error){console.log(error);}
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&units=metric&APPID=${openWeatherKey}`;
  try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
    }
  } catch(error){
    console.log(error);
    }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
      const venueImgSrc = `${venue.bestPhoto.prefix}128x128${venue.bestPhoto.suffix}`;
      let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
    .then(async venues => {
      let detailsArray = [];
      shuffle(venues);
      for(let i = 0; i < 5; i++){ //Can't use forEach
        detailsArray.push(await getVenueDetails(venues[i].id));
      }
      console.log(detailsArray);
      return renderVenues(detailsArray);
    });
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)