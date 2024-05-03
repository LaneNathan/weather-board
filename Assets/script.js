var searched= [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey ='e8591d7b37c53d2741fdfd5e36865874';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#form-control');
var todayDisplay = document.querySelector('#searched-display-today');
var weekDisplay = document.querySelector('#week-display');
var searchHistory = document.querySelector('#searched-history-list');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function renderSearchHistory(){
    searchHistory.innerHTML = '';

    for(var i = searched.length - 1; i >= 0; i--){
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');

        btn.setAttribute('data-search', searched[i]);
        btn.textContent = searched[i];
        searchHistory.append(btn);
    }
}


function displayHistory(searches){
    if (searched.indexOf(searches) !== -1){
        return;
    }
    searched.push(searches);

    localStorage.setItem('search-history', JSON.stringify(searched));
    renderSearchHistory();
}


function connectSearchHistory(){
    var storedHistory = localStorage.getItem('search-history');
    if(storedHistory){
        searched = JSON.parse(storedHistory);
    }
    renderSearchHistory();
}

function currentWeekDisplay(city, weather){
    var date = dayjs().format('M/D/YYYY');

    var temperature = weather.main.temp;
    var windMph = weather.wind.speed;
    var humidity = weather.main.humidity;
    var iconLink = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
  
    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);

    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', iconLink);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempEl.textContent = `Temp: ${temperature}°F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, tempEl, windEl, humidityEl);

    todayDisplay.innerHTML = '';
    todayDisplay.append(card);
}

function displayForecastCard(forecast){
    var iconLink =  `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var temperature = forecast.main.temp;
    var humidity = forecast.main.humidity;
    var windMph = forecast.wind.speed;

    var column = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');

    column.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon,tempEl, windEl, humidityEl);

    column.setAttribute('class', 'col-md');
    column.classList.add('week-card');
    card.setAttribute('class','card bg-primary h-100 text-lightblue');
    cardBody.setAttribute('class', 'card-body p-2');
    cardTitle.setAttribute('class','card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
    weatherIcon.setAttribute('src', iconLink);
    weatherIcon.setAttribute('alt', iconDescription);
    tempEl.textContent = `Temp: ${temperature} °F`
    windEl.textContent = `Windspeed: ${windMph} MPH`
    humidityEl.textContent = `Humidity: ${humidity} %`;

    weekDisplay.append(col);
}