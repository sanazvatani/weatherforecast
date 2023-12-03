function refereshWeather(response){
    let temperatureElement= document.querySelector("#weather-app-temperature");
    let temperature= response.data.temperature.current;
    let cityElement= document.querySelector("#weather-app-city");
    let descriptionElement= document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
    let timeshowElement= document.querySelector("#show-time");
    let date= new Date(response.data.time*1000);

    let iconElement= document.querySelector("#icon");

     iconElement.innerHTML= `<img  src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;


    console.log(response.data)

    timeshowElement.innerHTML=formatDate(date);
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML= `${response.data.wind.speed}km/h`;
    descriptionElement.innerHTML= response.data.condition.description;
    temperatureElement.innerHTML= Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date){
   
    let  minutes= date.getMinutes();
    let hours= date.getHours();
    let days= ["sunday", "monday", "tuesday", "wednseday", "thurseday", "friday", "saturday"];
    let day= days[date.getDay()];


    if (minutes<10) {
        minutes= `0${minutes}`;
    }

    return `${day} ${hours}: ${minutes}`;
}

function formatDay(timestamp){
    let date= new Date(timestamp*1000);//milisecond//
    let days= ["Sun", "Mon","Tue","wed","Thu", "Fri", "sat"];
    return days [date.getDay()];
}


function searchCity(city){
    //make Api call and update the interfrace
    //let apiKey= "b2a5adcct04b33178913oc335f405433";//
    let apiKey= "34cb2123ea9621703038bf8fbto0bdaf";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then( refereshWeather);
}

function getForecast(city){
    let apiKey="34cb2123ea9621703038bf8fbto0bdaf";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function handlesearchsubmit(event){
    event.preventDefault();
    let searchInput= document.querySelector("#search-city");
    //let cityElement= document.querySelector("#weather-app-city");
    //cityElement.innerHTML = searchInput.value;
    //basic search engine
    searchCity(searchInput.value);
}

function displayForecast (response){
    let forecastHtml="";

    response.data.daily.forEach(function(day, index){
        if (index<5){
            forecastHtml = 
            forecastHtml + 
            `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
           
            <img src="${day.condition.icon_url}" class="weather-forecast-icon">
           
            <div class="weather-forecast-temperatures">
                <strong>${Math.round(day.temperature.maximum)}°|</strong>
                <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>
        </div>`;
        }
    });


//loop

//function displayForecast (response){
   // console.log(response.date);
    //let days= ["Tue","wed","Thu", "Fri", "sat"];
   // let forecastHtml= ""; //i want to add html codes in it
     
    //days.forEach(function(day.index){
        //forecastHtml= //loop
        //forecastHtml+`
        //<div class="weather-forecast-day">
            //<div class="weather-forecast-date">Tue</div>
           
            //<img src="${day.condition.icon_url}" class="weather-forecast-icon">
           
            //<div class="weather-forecast-temperatures">
                //<strong>${math.round(day.temperature.maximum)}°</strong>
                //<div class="weather-forecast-temperature">${math.round(day.temperature.maximum)}°</div>
            //</div>
        //</div>`;
    //});//

    let forecastElement= document.querySelector("#forecast");
    forecastElement.innerHTML= forecastHtml;

}


let searchFormElement = document.querySelector("#weather-app-search");
searchFormElement.addEventListener("submit", handlesearchsubmit);

searchCity("lison"); //if reload the page it just go on to show the paris


