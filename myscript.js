$(document).ready(function () {

    function sendReducedHealth(data) {
        $.each(data, function (index, item) {
            if (item.healthPercentage > 10) {
                item.healthPercentage = item.healthPercentage - 10
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:8002/healthCheck/',
                    data: item,
                    dataType: 'json',
                    encode: true
                }).done(function (data) {
                    console.log(data)
                });
            }
        })
    }

    var healthState = $(`#testContainer`),
        poll = function () {
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:8002/healthCheck" + "?&format=json&jsoncallback=?",
                contentType: "application/json",
                crossDomain: true,
                success: function (data) {
                    sendReducedHealth(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        pollInterval = setInterval(function () {
            poll();
        }, 20000);

    // poll(); // Runs immediately without delays
});


