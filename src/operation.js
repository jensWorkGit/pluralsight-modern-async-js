const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {

        const city = "New York, NY";
        callback(null, city);

    }, delayms)
}

function fetchCurrentCity() {
    const operation = {};

    getCurrentCity(function (error, result) {
        if(error) {
            operation.onError(error);
            return;
        }
        operation.onSuccess(result);
    });

    operation.setCallbacks = function setCallbacks(onSuccess, onError) {
        operation.onSuccess = onSuccess;
        operation.onError = onError;
    };

    return operation;
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

//suite.only('operations')

// test('fetchCurrentCity with separate success and error callbacks', function (done) {
//     fetchCurrentCity(result => done(), error => done(error));
// });g

test('fetchCurrentCity pass the callback later on', function (done) {
    // initiate operation
    const operation = fetchCurrentCity();

    // register callbacks
    operation.setCallbacks(
        result => done(),
        error => done(error)
    );
});
