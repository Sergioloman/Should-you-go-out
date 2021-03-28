
function getImage(keyword){
    //get keyword valie
    var keyword = $("#input").val().trim()
    
    //get a G giphy 
    fetch("https://api.giphy.com/v1/gifs/search?api_key="+ giphyKey +"&q="+ keyword +"&limit=25&offset=0&rating=g&lang=en")
    .then(function(response){
        console.log(response)
       return response.json(); 
    })
    .then(function(data){
        console.log(data)

        //empty html container
        $('#gif-container').empty()
        
        //find the link for the gif's
        var imageUrl = data[0].images.original.url
        //append image
        $('#gif-container').append("<img id='gif' src=" + imageUrl + ">")
        
    })

}
getImage('running')

function getWeather(location){

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + weatherKey)
    .then(function(response2){
        console.log(response2)
        return response2.json(); 
     })
    .then(function(data2){
         console.log(data2)
        
         //empty html before each fetch
         $("#container").empty();

         //Current City name
         $("#container").append("<h3>" + data.name + "</h3>")

         //City weather icon
         var weatherCode = data.weather[0].icon
         var imageLink = "http://openweathermap.org/img/wn/" + weatherCode + "@2x.png"
         $("#container").append("<img id='weatherIcon' src=" + imageLink + ">");

         //Weather data
         $("#container").append("<p>" + data.weather[0].description + "</p><br>");
         $("#container").append("<p>" + "Temperature: " + data.main.temp + " °F" + "</p>");
        
     }).catch(function(error){
         alert("404 data not found")
         return
     })
   
}
getWeather('Austin')
