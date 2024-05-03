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

