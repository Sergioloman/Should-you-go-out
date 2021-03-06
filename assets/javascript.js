//variables
var giphyKey = 'qde5re80EUg2L5yAKth9QabSkIrGiKWb'
var weatherKey = '324a506b2f6b0f1b44fde14916e4b006'

function getWeather(location) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + weatherKey)
        .then(function (response2) {
            return response2.json();
        })
        .then(function (data2) {
            //Fetch LocalName value from Local Storage
            var localName = localStorage.getItem("name");

            //empty html before each fetch
            $("#weather-container").empty();

            //Current City name
            $("#weather-container").append("<h3>" + data2.name + "</h3>")

            //City weather icon
            var weatherCode = data2.weather[0].icon
            var imageLink = "https://openweathermap.org/img/wn/" + weatherCode + "@2x.png"
            $("#weather-container").append("<img id='weatherIcon' src=" + imageLink + ">");

            //Weather data// 

            //description
            var descripTemp = data2.weather[0].description
            $("#weather-container").append("<p>" + descripTemp + "</p>");
            //temperature
            var mainTemp = data2.main.temp
            $("#weather-container").append("<p>" + "Temperature: " + mainTemp + " °F" + "</p>");
            //humimidty
            var humidity = data2.main.humidity
            $("#weather-container").append("<p>" + "Humidity: " + humidity + " %" + "</p>");
            //wind
            var wind = data2.wind.speed
            $("#weather-container").append("<p>" + "Wind Speed: " + wind + " MPH" + "</p>");
            //overall condition ( this may include extreme weather as well)
            var genCondition = data2.weather[0].main

            //empy variable for Activity
            var activity = "";

            //Conditional: Linking weather parameters with activities
            if (mainTemp > 63 && mainTemp < 99 && genCondition !== "Rain" && genCondition !== "Extreme" && genCondition !== "Snow") {
                //setting value of var=activity to going out / possible categories: ["recreational", "social",  "busywork"]
                activity = 'social'

                // append Go Out 
                $('.title-container').empty()
                $('.title-container').append("<h1 class='page-title title'>" + "Yes! " + localName + ", seize the day!" + "<h1>")

            } else {
                // append Stay Inside
                $('.title-container').empty()
                $('.title-container').append("<h1 class='page-title title'>" + "Nah, " + localName + ", outdoors are overrated anyways!" + "<h1>")
                //setting value of var=activity to staying in / possible categories: ["diy", "cooking", "relaxation", "music"]
                activity = "relaxation"

            }
            return fetch("https://www.boredapi.com/api/activity?type=" + activity)

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data3) {
            //empty html container
            $('#suggestion-container').empty()
            //Variable suggestion will hold activity from BoredAPI
            var suggestion = data3.activity
            //Appending suggestion to html
            $("#suggestion-container").append("<h4>" + suggestion + "</h4>")
            //Passing suggestion from BoredAPI into the Giphy URL as a search parameter
            return fetch("https://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + suggestion + "&limit=25&offset=0&rating=pg&lang=en")
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //empty html container
            $('#gif-container').empty()

            //find the link for the gif's
            var imageUrl = data.data[0].images.original.url
            //append image using the var=imageURL
            $('#gif-container').append("<img id='gif' src=" + imageUrl + ">")
        })
        .catch(function (error) {
            console.log("404 data not found")
            return
        })
}

//submit function
$('#submit').on("click", function (event) {
    event.preventDefault();

    //get location value from form
    var currentLocation = $("#location").val().trim();
    $("#location").val("");

    //call getWeather on click
    $(".hero").attr("class", "hide")
    $(".hero-form").attr("class", "hide")
    $(".page-content").removeAttr("class", "hide")

    //setting city value to local storage
    localStorage.setItem("city", currentLocation)

    //setting Name value to local storage
    var userName = $('#name').val().trim()
    localStorage.setItem("name", userName)
    console.log(userName)

    //Calling our main function with input location/username
    getWeather(currentLocation);
})

//new suggestion function
$('.button').on("click", function (event) {

    //use values from Local Storage to call functions
    $('#name').val(localStorage.getItem("name"))
    getWeather(localStorage.getItem("city"))
})
