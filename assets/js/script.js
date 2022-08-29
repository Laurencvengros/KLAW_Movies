var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
var searchMovie= $("#searchmovies");
$("#homeSec").show();
$("#aboutSec").hide();
$("#personalizeSec").hide();
$("#top20Sec").hide();
$("#triviaSec").hide();


$("#homeBtn").on("click", function(){
    $("#homeSec").show();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").hide();
    $("#triviaSec").hide();

});

$("#aboutBtn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").show();
    $("#personalizeSec").hide();
    $("#top20Sec").hide();
    $("#triviaSec").hide();

});

$("#personalizeBtn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").show();
    $("#top20Sec").hide();
    $("#triviaSec").hide();

});

$("#top20Btn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").show();
    $("#triviaSec").hide();
    $("#displayFav").hide();

});

// Coding for each of the buttons within the top 20 section

$("#kelsie1").on("click", function(){
    clearMovie();
    searchMovie = "Uptown Girls";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie2").on("click", function(){
    clearMovie();
    searchMovie = "Ella Enchanted";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie3").on("click", function(){
    clearMovie();
    searchMovie = "New York Minute";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie4").on("click", function(){
    clearMovie();
    searchMovie = "The Lorax";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie5").on("click", function(){
    clearMovie();
    searchMovie = "The Social Network";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren1").on("click", function(){
    clearMovie();
    searchMovie = "Spirited Away";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren2").on("click", function(){
    clearMovie();
    searchMovie = "My Neighbor Totoro";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren3").on("click", function(){
    clearMovie();
    searchMovie = "Your Name";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren4").on("click", function(){
    clearMovie();
    searchMovie = "Sinister";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren5").on("click", function(){
    clearMovie();
    searchMovie = "As Above So Below";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew1").on("click", function(){
    clearMovie();
    searchMovie = "Hitch";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew2").on("click", function(){
    clearMovie();
    searchMovie = "The Secret Life of Walter Mitty";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew3").on("click", function(){
    clearMovie();
    searchMovie = "The Green Mile";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew4").on("click", function(){
    clearMovie();
    searchMovie = "Treasure Planet";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew5").on("click", function(){
    clearMovie();
    searchMovie = "Guardians of the Galaxy Vol. 2";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will1").on("click", function(){
    clearMovie();
    searchMovie = "Back to the Future Part II";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will2").on("click", function(){
    clearMovie();
    searchMovie = "Terminator 2";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will3").on("click", function(){
    clearMovie();
    searchMovie = "Forest Gump";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will4").on("click", function(){
    clearMovie();
    searchMovie = "Memento";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will5").on("click", function(){
    clearMovie();
    searchMovie = "Black Panther";
    getMovie(searchMovie);
    getPosters(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#favBack").on("click", function() {
    clearMovie();
    $("#kelsieFavs").show();
    $("#laurenFavs").show();
    $("#drewFavs").show();
    $("#willFavs").show();
    $("#displayFav").hide();
})

$("#triviaBtn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").hide();
    $("#triviaSec").show();

});

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