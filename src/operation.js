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

    operation.onCompletion = function onCompletion(onSuccess, onError) {
        const noop = function () {};

        operation.successReactions.push(onSuccess || noop);
        operation.errorReactions.push(onError);
    };

    operation.onFailure = function onFailure(onError) {
        operation.onCompletion(null, onError)
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
    operation.onCompletion(
        result => done(),
        error => done(error)
    );
});

test('pass multiple callbacks - all of them are called', function (done) {
    // initiate operation
    const operation = fetchCurrentCity();
    const multiDone = callDone(done).afterTwoCalls();

    // register callbacks
    operation.onCompletion(result => multiDone());
    operation.onCompletion(result => multiDone());
});

test('register only error handler, ignores success handler', function (done) {
    // initiate operation
    const operation = fetchCurrentCity();

    // register callbacks

    operation.onFailure(error => done(error));
    operation.onCompletion(result => done());
});

test('register only success handler, ignores error handler', function (done) {
    // TODO operation that can fail.
    const operation = fetchCurrentCity();

    // register callbacks

    operation.onCompletion(result => done("shouldn't succeed"));

    // trigger failure to make sure noop registered
    operation.onFailure(error => done(error));

});

