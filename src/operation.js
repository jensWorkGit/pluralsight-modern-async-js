const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {

        const city = "New York, NY";
        callback(null, city);

    }, delayms)
}

function fetchCurrentCity() {
    var onSuccess;
    var onError;
    function setCallback(su, err) {
        onSuccess = su;
        onError = err;

        getCurrentCity(function (error, result) {
            if(error) {
                onError(error);
                return;
            }
            onSuccess(result);
        });
    }

    return {
        setCallback: setCallback
    }


}

function getWeather(city, callback) {
    setTimeout(function () {

        if(!city) {
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

        if(!city) {
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

test('fetchCurrentCity with separate success and error callbacks', function (done) {
    fetchCurrentCity(result => done(), error => done(error));
});

test('fetchCurrentCity pass the callback later on', function (done) {
    const operation = fetchCurrentCity();
    operation.setCallback(
        result => done(),
        error => done(error)
    );
});
