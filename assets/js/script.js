var omdbAPI = "31aa90e4";
var titleEl = document.getElementById("#movietitle");
searchMovie= $("#searchmovies").val();

$("#searchBtn").on("click", function(){
console.log($("#searchmovies").val());
searchMovie = $("#searchmovies").val();
//console.log(movie);
clearMovie()
getMovie();

});



function getMovie(){
var movieTitle = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json" 


fetch(movieTitle)
.then(function(response){
    return response.json();

    
    
})
.then(function(data){
    var titleVal = data.Title
    var yearVal = data.Year
    var plotVal = data.Plot
console.log(titleVal);
console.log(yearVal);


var card = $("<div class='card'>");
var cardDiv = $("<div>");
var TitleHeader = $("<h6>");
var TitleDiv = $("<div>");
var TextDiv = $("<div>");
var titleEl = $("<p>").text(titleVal);
var yearEl = $("<p>").text(yearVal);
var plotEl = $("<p>").text(plotVal);



TitleDiv.append(TitleHeader);
cardDiv.append(TitleDiv);
TextDiv.append(titleEl);
TextDiv.append(yearEl);
TextDiv.append(plotEl);
card.append(cardDiv);
cardDiv.append(TextDiv);
$("#movie-output").append(card);

})
};


function clearMovie(){
    $("#movie-output").empty();
}
    


