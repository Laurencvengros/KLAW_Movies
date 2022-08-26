var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
var searchMovie= $("#searchmovies");


$("#searchBtn").on("click", function(){
console.log($("#searchmovies").val());
searchMovie = $("#searchmovies").val();
$(".display-poster").css("display", "none")

//console.log(movie);
clearMovie()
getMovie();
getPosters();

});
$("#poster1").on("click", function(){
    clearMovie()
    searchMovie="spirited Away";
    getMovie(searchMovie);
});

$("#poster2").on("click", function(){
    clearMovie()
    searchMovie="Independence Day";
    getMovie(searchMovie);
});

$("#poster3").on("click", function(){
    clearMovie()
    searchMovie="Insidious";
    getMovie(searchMovie);
});

$("#homeBtn").on("click", function(){
    clearMovie()
    $(".display-poster").css('display', "inline")
    
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
imgEl=$("<img>").attr('src', poster).css('height', '500px');
TextDiv.append(imgEl)
card.append(TextDiv);
$("#movie-poster").append(card);

});

}




function getMovie(){
var movieTitle = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json" 
console.log(searchMovie);


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
var TitleHeader = $("<h6>");
var TextDiv = $("<div>");
var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
var summaryTab =$("<p>").text("Summary: ");
var plotEl = $("<p>").text( plotVal);
var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");






TitleHeader.append(titleEl );
TextDiv.append(summaryTab);
TextDiv.append(plotEl);
$("#movie-data").append(TextDiv);
$("#movie-title").append(TitleHeader)



if(ratingVal > 8){
TextDiv.prepend(highRating);
}else{
    TextDiv.prepend(ratingEl);
}
})

};




function clearMovie(){
    $("#movie-title").empty();
    $("#movie-poster").empty();
    $("#movie-data").empty();
}

