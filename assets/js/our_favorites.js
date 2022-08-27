var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
//searchMovie= $("#searchmovies").val();


// $("#searchBtn").on("click", function(){
// console.log($("#searchmovies").val());
// searchMovie = $("#searchmovies").val();
// $(".display-poster").css("display", "none")

//console.log(movie);
// clearMovie()
// getMovie();
// getPosters();

// });

$("#kelsie1").on("click", function(){
    clearMovie();
    searchMovie = "Uptown Girls";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#kelsie2").on("click", function(){
    clearMovie();
    searchMovie = "Ella Enchanted";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#kelsie3").on("click", function(){
    clearMovie();
    searchMovie = "New York Minute";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#kelsie4").on("click", function(){
    clearMovie();
    searchMovie = "The Lorax";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#kelsie5").on("click", function(){
    clearMovie();
    searchMovie = "The Social Network";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#lauren1").on("click", function(){
    clearMovie();
    searchMovie = "";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#lauren2").on("click", function(){
    clearMovie();
    searchMovie = "";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#lauren3").on("click", function(){
    clearMovie();
    searchMovie = "";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#lauren4").on("click", function(){
    clearMovie();
    searchMovie = "";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#lauren5").on("click", function(){
    clearMovie();
    searchMovie = "";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#drew1").on("click", function(){
    clearMovie();
    searchMovie = "Hitch";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#drew2").on("click", function(){
    clearMovie();
    searchMovie = "The Secret Life of Walter Mitty";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#drew3").on("click", function(){
    clearMovie();
    searchMovie = "The Green Mile";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#drew4").on("click", function(){
    clearMovie();
    searchMovie = "The Shawsahnk Redemption";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#drew5").on("click", function(){
    clearMovie();
    searchMovie = "Guardians of the Galaxy Vol. 2";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#will1").on("click", function(){
    clearMovie();
    searchMovie = "Back to the Future Part II";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#will2").on("click", function(){
    clearMovie();
    searchMovie = "Terminator 2";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#will3").on("click", function(){
    clearMovie();
    searchMovie = "Forest Gump";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#will4").on("click", function(){
    clearMovie();
    searchMovie = "Memento";
    getMovie(searchMovie);
    getPosters(searchMovie);
});

$("#will5").on("click", function(){
    clearMovie();
    searchMovie = "Black Panther";
    getMovie(searchMovie);
    getPosters(searchMovie);
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
imgEl=$("<img>").attr('src', poster).css('width', '156px');;
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