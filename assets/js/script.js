var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
searchMovie= $("#searchmovies").val();

$("#searchBtn").on("click", function(){
console.log($("#searchmovies").val());
searchMovie = $("#searchmovies").val();
//console.log(movie);
clearMovie()
getMovie();
getPosters();

});

function getPosters(){
    var posterAPI = "https://imdb-api.com/en/API/Search/" + imdbAPIkey + "/" + searchMovie;
    fetch(posterAPI)
.then(function(response){
    return response.json();

    
    
})
.then(function(data){
var poster = data.results[0].image;

console.log(poster);


var card = $("<div class='card'>")
var TextDiv = $("<div>")
imgEl=$("<img>").attr('src', poster).css('width', '156px');
TextDiv.append(imgEl)
card.append(TextDiv);
$("#movie-poster").append(card);
});

}




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
    var ratingVal = data.imdbRating
  
console.log(titleVal);
console.log(yearVal);
console.log(plotVal);
console.log(ratingVal );

var titleVal = data.Title
var yearVal = data.Year
var plotVal = data.Plot
var ratingVal = data.imdbRating
var card = $("<div class='card'>");
var cardDiv = $("<div>");
var TitleHeader = $("<h6>");
var TitleDiv = $("<div>");
var TextDiv = $("<div>");
var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
//var yearEl = $("<p>").text(yearVal);
var summaryTab =$("<p>").text("Summary: ");
var plotEl = $("<p>").text( plotVal);
var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");





TitleDiv.append(TitleHeader);
cardDiv.append(TitleDiv);
//TextDiv.append(titleEl );
//TextDiv.append(yearEl);
//TextDiv.append(ratingEl);
TextDiv.append(summaryTab);
TextDiv.append(plotEl);
card.append(cardDiv);
cardDiv.append(TextDiv);
$("#moive-title")
$("#movie-data").append(card);

movieTitle=$("<h4>").text(titleEl)
$("#moive-title").append(movieTitle);

if(ratingVal > 8){
TextDiv.prepend(highRating).before(titleEl);
}else{
    TextDiv.prepend(ratingEl).berfore(titleEl);
}
})

};




function clearMovie(){
    $("#movie-output").empty();
}


    


