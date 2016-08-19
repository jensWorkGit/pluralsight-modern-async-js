const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {

        const city = "New York, NY";
        callback(null, city);

    }, delayms)
}

function fetchCurrentCity() {
    const operation = {
        successReactions: [],
        errorReactions: []
    };

    getCurrentCity(function (error, result) {
        if(error) {
            operation.errorReactions.forEach(r => r(error));

            // operation.errorReactions.forEach(function (errorReaction) {
            //     errorReaction(error);
            // });

            return;
        }
        //operation.onSuccess(result);

        operation.successReactions.forEach(r => r(result));
    });

    operation.setCallbacks = function setCallbacks(onSuccess, onError) {
        operation.successReactions.push(onSuccess);
        operation.errorReactions.push(onError);
    };

    operation.onFailure = function onFailure(onError) {
        operation.setCallbacks(null, onError)
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

suite.only('operations')

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

test('pass multiple callbacks - all of them are called', function (done) {
    // initiate operation
    const operation = fetchCurrentCity();
    const multiDone = callDone(done).afterTwoCalls();

    // register callbacks
    operation.setCallbacks(result => multiDone());
    operation.setCallbacks(result => multiDone());
});

test('pass multiple callbacks - all of them are called - pass errors', function (done) {
    // initiate operation
    const operation = fetchCurrentCity();
    const multiDone = callDone(done).afterTwoCalls();

    // register callbacks
    operation.setCallbacks(result => multiDone());
    //operation.setCallbacks(null, error => multiDone());

    operation.onFailure(error => multiDone());
});

