//variables
var giphyKey = 'qde5re80EUg2L5yAKth9QabSkIrGiKWb'
var weatherKey = '324a506b2f6b0f1b44fde14916e4b006'



function getActivity(activity){
    /*
    POSSIBLE RESPONSES:
    ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    */
    fetch("http://www.boredapi.com/api/activity?type=" + activity )
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function(data3){
        console.log(data3)

        var suggestion = data3.activity
        $("#suggestion-container").append("<h4>" + suggestion + "</h4>")
    })
}
getActivity('recreational')

function getImage(keyword) {
    //get keyword value
    /* Here we will have to create an array of posible things to do according to conditions.
    like

    let favorable = [ running, hiking, etc ]
      
    let unfavorable = [ reading, painting, etc]

    later we make a logic :  if CURRENT TEMP < 60 then UNFAVORABLE random keyword
                                    or 
                                CURRENT TEMP > 60 then FAVORABLE random keyword
    */
    //get a PG giphy 
    fetch("https://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + keyword + "&limit=25&offset=0&rating=pg&lang=en")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            //empty html container
            $('#gif-container').empty()

            //find the link for the gif's // need logic for random GIF
            var imageUrl = data.data[0].images.original.url
            //append image
            $('#gif-container').append("<img id='gif' src=" + imageUrl + ">")
        })
}
getImage('hike')

function getWeather(location) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + weatherKey)
        .then(function (response2) {
            console.log(response2)
            return response2.json();
        })
        .then(function (data2) {
            console.log(data2)

            //empty html before each fetch
            $("#weather-container").empty();

            //Current City name
            $("#weather-container").append("<h3>" + data2.name + "</h3>")

            //City weather icon
            var weatherCode = data2.weather[0].icon
            var imageLink = "http://openweathermap.org/img/wn/" + weatherCode + "@2x.png"
            $("#weather-container").append("<img id='weatherIcon' src=" + imageLink + ">");

            //Weather data// what other conditions do we want?
            $("#weather-container").append("<p>" + data2.weather[0].description + "</p>");
            $("#weather-container").append("<p>" + "Temperature: " + data2.main.temp + " °F" + "</p>");
        })

        .catch(function (error) {
            alert("404 data not found")
            return
        })
}
//Make Austin our default location
getWeather('Austin')

//submit function
$('#submit').on("click", function (event) {
    event.preventDefault();

    //get value from form
    var currentLocation = $("#location").val().trim();
    console.log(currentLocation);

    $("#location").val("");
    //call getWeather on click
    getWeather(currentLocation);
})
