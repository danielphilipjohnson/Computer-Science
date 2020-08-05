function sendJSON(lattitude, longitude){
  var longitude = longitude;
  var lattitude = lattitude;

  //set location
  var url = "https://api.darksky.net/forecast/8505eecc03a14ba6fd4681b00c1587ff/"+ lattitude +"," + longitude + "?callback=?";

  if(longitude === 1 && lattitude === 1){
    url = '';
  }
  $.getJSON(url, function(json){

    setCurrentWeather(json, json.currently);
    setHourly(json.hourly);
    setDaily(json.daily);
    dayDetails(json.daily);
    //setDailyWeather(json, json.daily);
  })  .done(function() {


    })
    .fail(function() {

      function cleanWeatherData(data) {
        var data = {
          "latitude": 47.20296790272209,
          "longitude": -123.41670367098749,
          "timezone": "America/Los_Angeles",
          "currently": {
            "time": 1453402675,
            "summary": "Rain",
            "icon": "rain",
            "nearestStormDistance": 0,
            "precipIntensity": 0.1685,
            "precipIntensityError": 0.0067,
            "precipProbability": 1,
            "precipType": "rain",
            "temperature": 48.71,
            "apparentTemperature": 46.93,
            "dewPoint": 47.7,
            "humidity": 0.96,
            "windSpeed": 4.64,
            "windBearing": 186,
            "visibility": 4.3,
            "cloudCover": 0.73,
            "pressure": 1009.7,
            "ozone": 328.35
          },
          "minutely": {
            "summary": "Rain for the hour.",
            "icon": "rain",
            "data": [
              {
                "time": 1453402620,
                "precipIntensity": 0.1715,
                "precipIntensityError": 0.0066,
                "precipProbability": 1,
                "precipType": "rain"
              }
            ]
          },
          "hourly": {
            "summary": "Rain throughout the day.",
            "icon": "rain",
            "data": [
              {
                "time": 1453399200,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.85,
                "precipType": "rain",
                "temperature": 48.16,
                "apparentTemperature": 46.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 4.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 1453399200,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.85,
                "precipType": "rain",
                "temperature": 48.16,
                "apparentTemperature": 46.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 4.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 1453399200,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.85,
                "precipType": "rain",
                "temperature": 48.16,
                "apparentTemperature": 46.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 4.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 1453399200,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.85,
                "precipType": "rain",
                "temperature": 48.16,
                "apparentTemperature": 46.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 4.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 1453399200,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.85,
                "precipType": "rain",
                "temperature": 48.16,
                "apparentTemperature": 46.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 4.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }, {
                "time": 145339900,
                "summary": "Rain",
                "icon": "rain",
                "precipIntensity": 0.1379,
                "precipProbability": 0.45,
                "precipType": "rain",
                "temperature": 78.16,
                "apparentTemperature": 96.41,
                "dewPoint": 46.89,
                "humidity": 0.95,
                "windSpeed": 12.47,
                "windBearing": 166,
                "visibility": 3.56,
                "cloudCover": 0.39,
                "pressure": 1009.97,
                "ozone": 328.71
              }
            ]
          },
          "daily": {
            "summary": "Light rain throughout the week, with temperatures bottoming out at 48°F on Sunday.",
            "icon": "rain",
            "data": [
              {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              }, {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              },
              {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              },
              {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              }, {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              }, {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              },
              {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              }, {
                "time": 1453363200,
                "summary": "Rain throughout the day.",
                "icon": "rain",
                "sunriseTime": 1453391560,
                "sunsetTime": 1453424361,
                "moonPhase": 0.43,
                "precipIntensity": 0.1134,
                "precipIntensityMax": 0.1722,
                "precipIntensityMaxTime": 1453392000,
                "precipProbability": 0.87,
                "precipType": "rain",
                "temperatureMin": 41.42,
                "temperatureMinTime": 1453363200,
                "temperatureMax": 53.27,
                "temperatureMaxTime": 1453417200,
                "apparentTemperatureMin": 36.68,
                "apparentTemperatureMinTime": 1453363200,
                "apparentTemperatureMax": 53.27,
                "apparentTemperatureMaxTime": 1453417200,
                "dewPoint": 46.79,
                "humidity": 0.95,
                "windSpeed": 4.26,
                "windBearing": 150,
                "visibility": 4.02,
                "cloudCover": 0.77,
                "pressure": 1009.35,
                "ozone": 326.69
              }
            ]
          },
          "alerts": [
            {
              "title": "Flood Watch for Mason, WA",
              "time": 1453375020,
              "expires": 1453407300,
              "description": "...FLOOD WATCH REMAINS IN EFFECT THROUGH LATE FRIDAY NIGHT...\nTHE FLOOD WATCH CONTINUES FOR\n* A PORTION OF NORTHWEST WASHINGTON...INCLUDING THE FOLLOWING\nCOUNTY...MASON.\n* THROUGH LATE FRIDAY NIGHT\n* A STRONG WARM FRONT WILL BRING HEAVY RAIN TO THE OLYMPICS\nTONIGHT THROUGH THURSDAY NIGHT. THE HEAVY RAIN WILL PUSH THE\nSKOKOMISH RIVER ABOVE FLOOD STAGE TODAY...AND MAJOR FLOODING IS\nPOSSIBLE.\n* A FLOOD WARNING IS IN EFFECT FOR THE SKOKOMISH RIVER. THE FLOOD\nWATCH REMAINS IN EFFECT FOR MASON COUNTY FOR THE POSSIBILITY OF\nAREAL FLOODING ASSOCIATED WITH A MAJOR FLOOD.\n",
              "uri": "http://alerts.weather.gov/cap/wwacapget.php?x=WA1255E4DB8494.FloodWatch.1255E4DCE35CWA.SEWFFASEW.38e78ec64613478bb70fc6ed9c87f6e6"
            }
          ]
        };
        var weatherJson = JSON.stringify(data);
        return weatherJson;
      }
      function weatherDataToJson(stringToConvert) {
        //implement evenutally
        var weatherData = JSON.parse(stringToConvert, (key, val) => {

          return val;
        });
        return weatherData;
      }

      var weatherString = cleanWeatherData();
      var parsedWeatherJson = weatherDataToJson(weatherString);

      setCurrentWeather(parsedWeatherJson, parsedWeatherJson.currently);
      setHourly(parsedWeatherJson.hourly);
      setDaily(parsedWeatherJson.daily);
      dayDetails(parsedWeatherJson.daily);
    })
    .always(function() {

    });
}


var Utils = {
  cleanJsonDate: function (UNIX_timestamp, type) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var a = new Date(UNIX_timestamp * 1000);
    if(type === 'time'){
      var hours = a.getHours();
      var minutes = a.getMinutes();
      var seconds = a.getSeconds();
          // Will display time in 10:30:23 format
      return formattedTime = hours + ':' + minutes + ':' + seconds;
    }
    if(type === 'date'){
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();

      var time = date + ' ' + month + ' ' + year;
      return time;

    }
    else{

    }


  },
  icons: {
    'clear-day': 'wi-day-sunny',
    'clear-night': 'wi-night-clear',
    rain: 'wi-day-rain',
    snow: 'wi-day-snow',
    sleet: 'wi-day-sleet',
    wind: 'wi-day-windy',
    fog: 'wi-day-fog',
    cloudy: 'wi-cloudy',
    'partly-cloudy-day': 'wi-day-cloudy',
    'partly-cloudy-night': 'wi-night-alt-cloudy'
  },
  windDirections: {
    N: [
      0, 11.24,
    ],
    NNE: [
      11.25, 33.74,
    ],
    NE: [
      33.75, 56.24,
    ],
    ENE: [
      56.25, 78.74,
    ],
    E: [
      78.75, 101.24,
    ],
    ESE: [
      101.25, 123.74,
    ],
    SE: [
      123.75, 146.24,
    ],
    SSE: [
      146.25, 168.74,
    ],
    S: [
      168.75, 191.24,
    ],
    SSW: [
      191.25, 213.74,
    ],
    SW: [
      213.75, 236.24,
    ],
    WSW: [
      236.25, 258.74,
    ],
    W: [
      258.75, 281.24,
    ],
    WNW: [
      281.25, 303.74,
    ],
    NW: [
      303.75, 326.24,
    ],
    NNW: [
      326.25, 348.74,
    ],
  },
};
var Partials = {
  currentDay: '<div class="row"><div class="card current-day small-11  large-4 columns triangle-bottom"><h3 class="date">Sun 2<p><i class="wi wi-showers"></i></p></h3><div><div class="small-6 large-6 columns"><span class="temperature temperature-max">14</span><span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div><div class="small-6 large-6 columns"><span class="temperature temperature-min">14 </span><span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div></div><div class="weather status small-12 large-12 text-center columns"><p>Mostly Cloudy </p></div></div>',

  dailyBottom: '<div class="card small-5 %smallclass% large-2 ' + '%data%' + ' columns day triangle-bottom"><h3 class="date">%day%</h3><p><i class="wi %icon%"></i></p><div><div class="small-6 large-6 columns"><span class="temperature temperature-max">%apparentTemperatureMax%</span><span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div><div class="small-6 large-6 columns"><span class="temperature temperature-min">%apparentTemperatureMin%</span><span class="temperature-type"><i class="wi wi-degrees"></i></span></div></div><div class="weather status small-12 large-12 text-center columns"><p>Mostly Cloudy </p></div></div>',

};
// pass in degrees
function currentWindDirection(windValue) {
  // set weather icon
  if( windValue === undefined){
    return true;
  }
  var wind = windValue;
  for (var windDirection in Utils.windDirections) {


    if (wind > Utils.windDirections[windDirection][0] && wind < Utils.windDirections[windDirection][1]) {

      return windDirection;
    }
  }

  return undefined;
}
// set current weather
function setCurrentWeather(jsonObject, jsonCurrently) {
  var currently = jsonCurrently;
  var json = jsonObject;
  // Set Location
  function setLocation() {
    var location = json.timezone.split("/")[1].replace("_", " ");
    $('#location').text(location);

  }
  setLocation();

  // Set Time
  function setTime() {
    var time = currently.time;
    // Convert JSON DATE
    var currentTime = Utils.cleanJsonDate(time, 'time');



    $('#current-time').text(currentTime);
  }
  setTime();

  // set weather Type
  function setWeatherType() {
    var summary = currently.summary;

    //use icon set background
    //var weatherType = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind',
    //'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];
    console.log(currently.icon);
    if(currently.icon  === 'clear-night' || currently.icon  === 'partly-cloudy-night' ){
      var imageUrl = 'http://res.cloudinary.com/undreamtmayhem/image/upload/v1499114640/night-half-moon_gewzpj.jpg';
      $('body').css('background-image', 'url(' + imageUrl + ')');
    }
    else if(currently.icon  === 'cloudy' || currently.icon  === 'partly-cloudy-day' || currently.icon  === 'wind' ){
      var imageUrl = 'http://res.cloudinary.com/undreamtmayhem/image/upload/v1499118017/cloudy_wfangn.jpg';
      $('body').css('background-image', 'url(' + imageUrl + ')');
    }
    else if(currently.icon  === 'rain' || currently.icon  === 'partly-cloudy-day' ){
      var imageUrl = 'http://res.cloudinary.com/undreamtmayhem/image/upload/v1499118017/cloudy_wfangn.jpg';
      $('body').css('background-image', 'url(' + imageUrl + ')');
    }
    else {
      var imageUrl = 'http://res.cloudinary.com/undreamtmayhem/image/upload/v1499117911/sky-sunny-clouds-cloudy_a0ik9c.jpg';
      $('body').css('background-image', 'url(' + imageUrl + ')');
    }

    $('#weather-type').text(summary);
  }
  setWeatherType();

  function setApparentTemperature() {
    //evenutally convert temperature
    var apparentTemperature = Math.round(currently.apparentTemperature);

    $('#current-temperature').text(apparentTemperature);
  }
  setApparentTemperature();

  function setHumidity() {
    var humidity = currently.humidity * 100;
    $('#humidity').text(humidity);

  }
  setHumidity();

  function setWindSpeed() {
    var windSpeed = currently.windSpeed + " mph";
    $('#speed').text(windSpeed);
    var windBearing = currently.windBearing;
    var direction = currentWindDirection(windBearing);
    $('#direction').text(direction);
  }
  setWindSpeed();

  //barometer
  function setPressure() {
    var pressure = currently.pressure + ' millibars';

    $('#barometer').text(pressure);
  }
  setPressure();

  // set precipProbability
  function setPrecipProbability() {
    var precipProbability = currently.precipProbability * 100;
    $('#precipProbability').text(precipProbability);
  }
  setPrecipProbability();
  // set precipType
  function setPrecipType() {
    var precipType = currently.precipType;
    $('#precipType').text(precipType);
  }
  setPrecipType();
  // set visibility
  function visibility() {
    var visibility;
    if(currently.visibility === undefined){
      visibility = '10' + ' miles';
    }
     visibility = currently.visibility + ' miles';
    $('#visibility').text(visibility);
  }
  visibility();
}
// hourly
function setHourly(jsonHourly) {
  var hourly = jsonHourly;

  var summary = jsonHourly.summary;
  var data = jsonHourly.data;
  //Utils.icon
  //
  for (var i = 0; i < data.length; i++) {
    var apparentTemperature = Math.round(data[i].apparentTemperature);
    //Utils.icon[data[i].icon];
    var summary = data[i].summary;
    var precipProbability = data[i].precipProbability * 100;
    var time = data[i].time;
    var hourtime = Utils.cleanJsonDate(time, 'time');

    var windSpeed = data[i].windSpeed;
    var windBearing = data[i].windBearing;
    var windDirection;
    if(typeof windBearing === 'undefined'){
      windDirection = currentWindDirection(1);

    }
    else{
      windDirection = currentWindDirection(windBearing);
  
    }

    var classToApply;

    //for last item
    if (i === hourly.data.length - 1) {

      classToApply = "large-pull-1";
      smallClassToApply = "small-push-1";
    } else {

      classToApply = "large-push-1";
      smallClassToApply = "small-push-1";
    }
    //small-push-
    $('#hourly').append('<div class="card hour-card small-5 ' + smallClassToApply + ' large-3 ' + classToApply + ' columns">' + '<i class="wi ' + Utils.icons[data[i].icon] + ' "></i> ' + '<div class="hour"> ' + '<span class="temperature">' + apparentTemperature + '</span>' + '<span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div>' + '<div class="info">' + '<p class="precip-prob"> <i class="wi   wi-raindrop"></i> ' + precipProbability + '</p>' + '<p class="wind-direction"> <i class="wi wi-wind wi-towards-' + windDirection + '"></i>' + + ' ' + windSpeed + ' mph' + '</p>' + '<p class="summary">' + summary + '</p>' + '<p class="time">' + hourtime + '</p>' + '</div></div>');
  }
}
// daily
function setDaily(jsonDaily) {

  var daily = jsonDaily;
  var data = daily.data;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  for (var i = 0; i < daily.data.length - 1; i++) {
    var day = Utils.cleanJsonDate(data[i].time, 'date');
    //var cleanedDate = new Date(parseInt(data[i].time));
    //var day = days[cleanedDate.getDay()];
    var apparentTemperatureMin = Math.round(data[i].apparentTemperatureMin);
    var apparentTemperatureMax = Math.round(data[i].apparentTemperatureMax);
    var icon = Utils.icons[data[i].icon];
    var weatherStatus = data[i].weatherStatus;
    var summary = data[i].summary;

    if (i === 0) {
      //Replace the html partials
      var s = '<div class="row">' +
      '<div class="card current-day small-10 small-push-1 large-4  columns triangle-bottom">' +
        '<h3 class="date">' + day + '</h3>' +
          '<p><i class="wi ' + icon +'"></i></p><div><div class="small-6 large-6 columns">' +
              '<span class="temperature temperature-max">' + apparentTemperatureMax + '</span>' +
              '<span class="temperature-type"><i class="wi wi-degrees"></i></span></div>' +
              '<div class="small-6 large-6 columns">' +
                '<span class="temperature temperature-min">' + apparentTemperatureMin + '</span>' +
                '<span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div></div>' +
                '<div class="weather status small-12 large-12 text-center columns"><p>' + summary + '</p></div></div>';
      //  //Partials.currentDay
      $('#daily').after( s);
    }
    if (i === 1) {

      var s = '<div class="card day triangle-bottom small-5 small-push-1 next medium-6  large-3 columns ">' +
      '<h3 class="date">' + day + '</h3>' +
      '<p><i class="wi ' + icon + '"></i></p><div><div class="small-6 large-6 columns">' +
      '<span class="temperature temperature-max">' + apparentTemperatureMax + '</span>' +
      '<span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div><div class="small-6 large-6 columns">' +
      '<span class="temperature temperature-min">' + apparentTemperatureMin + '</span>' +
      '<span class="temperature-type"><i class="wi wi-degrees"> </i></span></div></div><div class="weather status small-12 large-12 text-center columns">' +
      '<p>' + summary + '</p></div></div>';

      $('.current-day').after( s);
    }
    if(i === 2){
      var s = '<div class="card day triangle-bottom small-5 small-pull-1 medium-6  large-3 columns ">' +
      '<h3 class="date">' + day + '</h3>' +
      '<p><i class="wi ' + icon + '"></i></p><div><div class="small-6 large-6 columns">' +
      '<span class="temperature temperature-max">' + apparentTemperatureMax + '</span>' +
      '<span class="temperature-type"> <i class="wi wi-degrees"> </i></span></div><div class="small-6 large-6 columns">' +
      '<span class="temperature temperature-min">' + apparentTemperatureMin + '</span>' +
      '<span class="temperature-type"><i class="wi wi-degrees"> </i></span></div></div><div class="weather status small-12 large-12 text-center columns">' +
      '<p>' + summary + '</p></div></div>';

      $('.next').after( s);

    }
    //bottom row
    if (i > 2 && i < 6) {
      var dayElement = Partials.dailyBottom.replace("%data%", 'large-push-1')
        .replace("%day%", day)
        .replace("%icon%", icon)
        .replace("%apparentTemperatureMax%", apparentTemperatureMax)
        .replace("%apparentTemperatureMin%", apparentTemperatureMin)
        .replace("%smallclass%", 'small-push-1');
      $('.second-row').append(dayElement);
    }
    if (i === 6) {
      var dayElement = Partials.dailyBottom.replace("%data%", 'large-pull-3')
      .replace("%day%", day)
      .replace("%day%", day)
      .replace("%icon%", icon)
      .replace("%apparentTemperatureMax%", apparentTemperatureMax)
      .replace("%apparentTemperatureMin%", apparentTemperatureMin)
      .replace("%smallclass%", 'small-pull-1');
      $('.second-row').append(dayElement);
    }
  }
}
//addtional details
function dayDetails(jsonDaily){

  var moonPhase = jsonDaily.data[0].moonPhase;
  var sunriseTime = jsonDaily.data[0].sunriseTime;
  var sunsetTime = jsonDaily.data[0].sunsetTime;
  var cloudCover = jsonDaily.data[0].cloudCover;

  // between 0 and .25 wi-moon-waxing-crescent-1
  // waxing gibbous 0.25 to 0.50
  // after full moon Waning gibbous 0.5 to 0.75
  // 0.75 to 1 waning-crescent
  var exactMoonPhases = {
    0.00: 'wi-moon-new',
    0.25: 'wi-moon-first-quarter',
    0.50: 'wi-moon-full',
    0.75: 'last quarter moon',
    1.00: 'wi-moon-new'
  }
    // need to make midpoints
  var moonPhases = [
    [[0.04, 'wi-moon-waxing-crescent-1'] , [0.08, 'wi-moon-waxing-crescent-2']],
    [[0.12, 'wi-moon-waxing-crescent-3'] , [0.16, 'wi-moon-waxing-crescent-4']],
    [[0.20, 'wi-moon-waxing-crescent-5'] , [0.24, 'wi-moon-waxing-crescent-6']],
    [[0.26, 'wi-moon-waxing-gibbous-1'] , [0.29, 'wi-moon-waxing-gibbous-2']],
    [[0.34, 'wi-moon-waxing-gibbous-3'] , [0.39, 'wi-moon-waxing-gibbous-4',]],
    [[0.44, 'wi-moon-waxing-gibbous-5'] , [0.49, 'wi-moon-waxing-gibbous-6']],
    [[0.54, 'wi-moon-waning-gibbous-1'] , [0.58, 'wi-moon-waning-gibbous-2']],
    [[0.62, 'wi-moon-waning-gibbous-3'] , [0.66, 'wi-moon-waning-gibbous-4']],
    [[0.70, 'wi-moon-waning-gibbous-5'] , [0.74, 'wi-moon-waning-gibbous-6']],
    [[0.79, 'wi-moon-waning-crescent-1'] , [0.83, 'wi-moon-waning-crescent-2']],
    [[0.87, 'wi-moon-waning-crescent-3'] , [0.91, 'wi-moon-waning-crescent-4']],
    [[0.95, 'wi-moon-waning-crescent-5'] , [0.99, 'wi-moon-waning-crescent-6']]
  ];


  function moonPhaseValidation(phaseValue){
    //exact phases
    var phaseValue = parseFloat(phaseValue.toFixed(2));

    if(phaseValue === 0.00 || phaseValue < 0.04 ){
      return exactMoonPhases[0.00];
    }
    if(phaseValue === 0.25){
      returnexactMoonPhases[phaseValue];
    }
    if(phaseValue === 0.50){
      return exactMoonPhases[phaseValue];
    }
    if(phaseValue === 0.75){
      return exactMoonPhases[phaseValue];
    }
    if(phaseValue === 1.00){
      return exactMoonPhases[phaseValue];
    }

    // TEST EXACT PHASES
    for(var _ = 0; _ < moonPhases.length; _ ++ ){
      var minValue = moonPhases[_][0][0];
      var minIcon = moonPhases[_][0][1];

      var maxValue = moonPhases[_][1][0];
      var maxIcon = moonPhases[_][1][1];

      // exact min max
      if(phaseValue === minValue){
        return minIcon;
      }
      // exact match max
      if(phaseValue === maxValue){
          return maxIcon;
      }

      if(phaseValue >= minValue && phaseValue <= maxValue){
        return minIcon;
      }
      if(phaseValue < minValue){
        return minIcon;
      }
  }}

  $('#sunrise').text(Utils.cleanJsonDate(sunriseTime, 'time'));
  $('#sunset').text(Utils.cleanJsonDate(sunsetTime, 'time'));
  var currentMoonPhase = moonPhaseValidation(moonPhase)
  $('#moon-phase').addClass(currentMoonPhase);

  $('#cloud-cover').text(cloudCover * 100 + '%');
}
