displayMovies= ["Spirited Away", "End Game", "Sinister"]
$(".display-poster").on("click", function(){
    
    getMovie();
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
imgEl=$("<img>").attr('src', poster).css('width', '156px');;
TextDiv.append(imgEl)
card.append(TextDiv);
$("#movie-poster").append(card);

});

}




function getMovie(){
var movieTitle = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + $(".display-poster") + "&plot=full&r=json" 


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
getPosters();
};




function clearMovie(){
    $("#movie-title").empty();
    $("#movie-poster").empty();
    $("#movie-data").empty();
}


    

