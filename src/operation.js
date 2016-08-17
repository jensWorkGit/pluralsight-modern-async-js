const delayms = 1;

function getCurrentCity(callback) {
  setTimeout(function () {

    const city = "New York, NY";
    callback(null, city);

  }, delayms)
}

function fetchCurrentCity(onSuccess, onError) {
  getCurrentCity(function (error, result) {
    if(error) {
      onError(error);
      return;
    }
    onSuccess(result);
  })
    
}

function getWeather(city, callback) {
  setTimeout(function () {

    if (!city) {
      callback(new Error("City required to get weather"));
      return;
    }

    const weather = {
      temp: 50
    };

    callback(null, weather)

  }, delayms)
}

function getForecast(city, callback) {
  setTimeout(function () {

    if (!city) {
      callback(new Error("City required to get forecast"));
      return;
    }

    const fiveDay = {
      fiveDay: [60, 70, 80, 45, 50]
    };

    callback(null, fiveDay)

  }, delayms)
}

suite.only('operations')

test('fetchCurrentCity with separate success and error callbacks', function(done) {
  function onSuccess(result) {
      console.log(result);
  }
  
  function onError(error) {
      console.log(error);
  }


  //fetchCurrentCity(onSuccess, onError);
  //fetchCurrentCity(result => console.log(result), error => console.log(error));

  fetchCurrentCity(result => done(), error => done(error));
});
