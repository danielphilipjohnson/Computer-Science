// Temperture Converter
function convertFtoC(F) {
  //F - 32 x 5/9
  var celsius = Math.round((F - 32) * (5 / 9));
  return celsius;
}
function convertCtoF(C) {

  var farenheit = Math.round(C * (9 / 5) + 32);
  return farenheit;
}
function changeTemperature() {
  $('.farenheit').toggleClass('active-temp');
  $('.celsius').toggleClass('active-temp');
  var tempOptionVal = $('#set-temperature-type :selected').text();
  // if farenheit has the active class now set from celsius to farenheit
  var tempElems = $('.temperature');
  function setTempsAndUpdateUi(tempElements, tempFunc) {
    for (var tempElem of tempElements) {
      //get its value
      var tempMax = $(tempElem).text();
      //convert it
      var celsius = tempFunc(tempMax);
      //set it
      $(tempElem).text(celsius);
    }
  }
  // or selected item is opposite
  if ($('.farenheit').hasClass('active-temp')) {

    setTempsAndUpdateUi(tempElems, convertCtoF);
    // need to get select and farenheit option
    // $( elem ).attr( "checked" )

    //if
    var x = $('#set-temperature-type #farenheit').attr("selected", "selected");
    //
    var celsius = $('#set-temperature-type #celsius');
    celsius.removeAttr('selected');

  }
  if ($('.celsius').hasClass('active-temp')) {
    setTempsAndUpdateUi(tempElems, convertFtoC);
    var x = $('#set-temperature-type #celsius').attr("selected", "selected");
    var farenheit = $('#set-temperature-type #farenheit');
    farenheit.removeAttr('selected');
  }
}

// When F or C is clicked do the FOLLOWING
$('.temperature-type').on('click', function() {
  // if farenheit is active change it to not
  // and if celsius is not active set to active
  changeTemperature();
});

// When an option is selected from modal change temperature-type
$('#set-temperature').on('click', function() {

  var tempValue = $('#set-temperature-type :selected').val();
  if (tempValue === "celsius" && !$('.celsius').hasClass('active-temp')) {
    changeTemperature();

  }
  if (tempValue === "farenheit" && !$('.farenheit').hasClass('active-temp')) {
    changeTemperature();
  }

});

$('#set-location').on('click', function() {

  var location = $("#locations :selected").text();
  var locationLatLong = locations[location];
  var locationLong = locationLatLong.long;
  var locationLat = locationLatLong.lat;

  var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + locationLat + "," + locationLong;
  $.getJSON(geocodingAPI, function(json) {
    if (json.status == "OK") {
      var countryAddress = json.results[0].formatted_address.split(",");
      var country = countryAddress[countryAddress.length - 1];
      $('#location').text(location + " " + country);
    } else {
      alert("didnt work");
    }

  });

  sendJSON(locationLat, locationLong);

});

function runGeo() {
  if ('geolocation' in navigator) {
    /* geolocation is available */
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var rl = "https://ipinfo.io/json?callback=?";

      $.getJSON(rl, function(json) {
        $('#location').text(json.country + " " + json.region + " " + json.city);
      });
      sendJSON(latitude, longitude);
    };

    navigator.geolocation.getCurrentPosition(success, error);

    function error() {
      notifyMe('Gps is not enabled please select a location from the menu');
      sendJSON(1, 1);
    };

  } else {
    /* geolocation IS NOT available */
    console.log('not enabled');
    // edit and tell user to search for city
    notifyMe("Gps is not enabled please select a location from the menu");
    sendJSON(1, 1);

  }

}
// location

var locations = {
  'Amsterdam': {
    lat: 52.370216,
    long: 4.895168
  },
  'Athens': {
    lat: 37.983810,
    long: 23.727539
  },
  'Atlanta': {
    lat: 33.748995,
    long: -84.387982
  },
  'Baghdad': {
    lat: 33.312806,
    long: 44.361488
  },
  'Bangkok': {
    lat: 13.756331,
    long: 100.501765
  },
  'Barcelona': {
    lat: 41.385064,
    long: 2.173403
  },
  'Beijing': {
    lat: 39.904200,
    long: 116.407396
  },
  'Berlin': {
    lat: 52.520007,
    long: 13.404954
  },
  'Brussels': {
    lat: 50.850346,
    long: 4.351721
  },
  'Buenos Aires': {
    lat: -34.603684,
    long: -58.381559
  },
  'Cambridge': {
    lat: 52.205337,
    long: 0.121817
  },
  'Cape Town': {
    lat: -33.924869,
    long: 18.424055
  },
  'Chennai': {
    lat: 13.082680,
    long: 80.270718
  },
  'Chicago': {
    lat: 41.878114,
    long: -87.629798
  },
  'Cologne': {
    lat: 50.937531,
    long: 6.960279
  },
  'Delhi': {
    lat: 28.704059,
    long: 77.102490
  },
  'Dubai': {
    lat: 25.204849,
    long: 55.270783
  },
  'Frankfurt': {
    lat: 50.110922,
    long: 8.682127
  },
  'Greater Minneapolis': {
    lat: 44.920118,
    long: -93.270655
  },
  'Hamburg': {
    lat: 53.551085,
    long: 9.993682
  },
  'Hanover': {
    lat: 38.719250,
    long: -85.462368
  },
  'Hong-Kong': {
    lat: 22.396428,
    long: 114.109497
  },
  'Honolulu': {
    lat: 21.306944,
    long: -157.858333
  },
  'Houston': {
    lat: 29.760427,
    long: -95.369803
  },
  'Indianapolis': {
    lat: 39.768403,
    long: -86.158068
  },
  'Istanbul': {
    lat: 41.008238,
    long: 28.978359
  },
  'Kansas': {
    lat: 39.011902,
    long: -98.484246
  },
  'Kolkata': {
    lat: 22.572646,
    long: 88.363895
  },
  'Lyon': {
    lat: 45.764043,
    long: 4.835659
  },
  'Melbourne': {
    lat: -37.813628,
    long: 144.963058
  },
  'Minneapolis Downtown': {
    lat: 44.977753,
    long: -93.265011
  },
  'Montreal': {
    lat: 45.501689,
    long: -73.567256
  },
  'Moscow': {
    lat: 55.755826,
    long: 37.617300
  },
  'Mumbai': {
    lat: 19.075984,
    long: 72.877656
  },
  'Munich': {
    lat: 48.135125,
    long: 11.581981
  },
  'Osaka': {
    lat: 34.693738,
    long: 135.502165
  },
  'Paris': {
    lat: 48.856614,
    long: 2.352222
  },
  'Pune': {
    lat: 18.520430,
    long: 73.856744
  },
  'Rio de Janeiro': {
    lat: -22.906847,
    long: -43.172896
  },
  'Rome': {
    lat: 41.902783,
    long: 12.496366
  },
  'San Diego': {
    lat: 32.715738,
    long: -117.161084
  },
  'San Francisco': {
    lat: 37.774929,
    long: -122.419416
  },
  'Shanghai': {
    lat: 31.230390,
    long: 121.473702
  },
  'Singapore': {
    lat: 1.352083,
    long: 103.819836
  },
  'Stuttgart': {
    lat: 48.775846,
    long: 9.182932
  },
  'Sydney': {
    lat: -33.868820,
    long: 151.209296
  },
  'Tokyo': {
    lat: 35.689487,
    long: 139.691706
  },
  'Toledo': {
    lat: 41.663938,
    long: -83.555212
  },
  'Toronto': {
    lat: 43.653226,
    long: -79.383184
  },
  'Washington D.C': {
    lat: 38.907192,
    long: -77.036871
  }
};

function notifyMe(msg) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification" // Let's check whether notification permissions have already been granted
    );
  } else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg // Otherwise, we need to ask the user for permission
    );
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}

//0%
//4% t0
var moonPhases = [
  'wi-moon-new',
  'wi-moon-waxing-crescent-1',
  'wi-moon-waxing-crescent-2',
  'wi-moon-waxing-crescent-3',
  'wi-moon-waxing-crescent-4',
  'wi-moon-waxing-crescent-5',
  'wi-moon-waxing-crescent-6',,
  //%25
  'i-moon-first-quarter',
  'wi-moon-waxing-gibbous-1',
  'wi-moon-waxing-gibbous-2',
  'wi-moon-waxing-gibbous-3',
  'wi-moon-waxing-gibbous-4',
  'wi-moon-waxing-gibbous-5',
  'wi-moon-waxing-gibbous-6',
  //%50
  'wi-moon-full',
  'wi-moon-waning-gibbous-1',
  'wi-moon-waning-gibbous-2',
  'wi-moon-waning-gibbous-3',
  'wi-moon-waning-gibbous-4',
  'wi-moon-waning-gibbous-5',
  'wi-moon-waning-gibbous-6',
  'wi-moon-third-quarter',
  'wi-moon-waning-crescent-1',
  'wi-moon-waning-crescent-2',
  'wi-moon-waning-crescent-3',
  'wi-moon-waning-crescent-4',
  'wi-moon-waning-crescent-5',
  'wi-moon-waning-crescent-6'
];

// make it a dictionary
var weatherIcons = ['wi-day-sunny', 'wi-day-cloudy', 'wi-day-fog', 'wi-day-rain', 'wi-day-hot']

//night weatherIcons
var nightIcons = ['wi-night-clear', 'wi-night-alt-cloudy', 'wi-night-alt-rain'];
$(document).foundation();

runGeo();
