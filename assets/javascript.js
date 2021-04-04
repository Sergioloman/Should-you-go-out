//variables
var giphyKey = 'qde5re80EUg2L5yAKth9QabSkIrGiKWb'
var weatherKey = '324a506b2f6b0f1b44fde14916e4b006'

<<<<<<< HEAD
var submit = document.querySelector("#submit");
var refresh = document.querySelector(".button")

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
=======
//try nesting the functions so you can work on your values.
>>>>>>> 9eef92b20c5b7fc4da156bc062fc54aa52b0369f

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
            var descripTemp = data2.weather[0].description
            $("#weather-container").append("<p>" + descripTemp + "</p>");
            var mainTemp = data2.main.temp
            $("#weather-container").append("<p>" + "Temperature: " + mainTemp + " °F" + "</p>");

            var activity = "";
                /*
                POSSIBLE RESPONSES:
                goOut:
                ["recreational", "social",  "busywork"]
                stayIn:
                ["diy", "cooking", "relaxation", "music"]
                other:
                ["charity","education"]
                */
            if( mainTemp > 63 && mainTemp < 99  ){
                activity = 'social'
                console.log(activity)
            }else {
                activity = "recreational"
                console.log(activity)
            }
            return fetch("http://www.boredapi.com/api/activity?type=" + activity)

        })
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data3) {
            console.log(data3)

            $('#suggestion-container').empty()

            var suggestion = data3.activity
            $("#suggestion-container").append("<h4>" + suggestion + "</h4>")
            return fetch("https://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + suggestion + "&limit=25&offset=0&rating=pg&lang=en")
        })
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
        .catch(function (error) {
            console.log("404 data not found")
            return
        })
}
//Make Austin our default location
getWeather()

//submit function
$('#submit').on("click", function (event) {
    event.preventDefault();

    //get value from form
    var currentLocation = $("#location").val().trim();
    console.log(currentLocation);

    $("#location").val("");
    //call getWeather on click
    $(".hero").attr("class","hide")
    $(".page-content").removeAttr("class","hide")

    getWeather(currentLocation);
})

const herpformME = document.querySelector('.herp-form');
const form = document.querySelector('form');
const getName = document.querySelector('#name');
const getLocation = document.querySelector('#location');
const submitBtn =  document.querySelector('submit');



function nameDisplayCheck() {
    if (localStorage.getItem('name')) {
        let name = localStorage.getItem('name');
    }
}
function locationDisplayCheck() {
    if (localStorage.getItem('location')) {
        let location = localStorage.getItem('location');
    }
} 
