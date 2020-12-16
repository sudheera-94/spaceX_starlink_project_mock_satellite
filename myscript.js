$(document).ready(function () {

    function sendReducedHealth(data) {
        $.each(data, function (index, item) {
            if (item.healthPercentage >= 10) {
                item.healthPercentage = item.healthPercentage - 10;

                item.xCoordinate = item.xCoordinate + item.xVelocity;
                if (item.xCoordinate > 11) {
                    item.xCoordinate = (item.xCoordinate % 12);
                } else if (item.xCoordinate < 0) {
                    item.xCoordinate = item.xCoordinate % 12;
                    item.xCoordinate = 12 + item.xCoordinate;
                }

                item.yCoordinate = item.yCoordinate + item.yVelocity;
                if (item.yCoordinate > 11) {
                    item.yCoordinate = item.yCoordinate % 12;
                } else if (item.yCoordinate < 0) {
                    item.yCoordinate = item.yCoordinate % 12;
                    item.yCoordinate = 12 + item.yCoordinate;
                }

                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:8000/add/',
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
                url: "http://127.0.0.1:8000/add" + "?&format=json&jsoncallback=?",
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
        }, 4000);

});


