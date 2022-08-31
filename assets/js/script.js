var omdbAPIkey = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
var searchMovie = "";
var personalMainImage = $("#personalMainImg");

let favMovies= { personalSaves:[] };
let moveTitleGlobal = "";
let posterGlobal = "";
let pboxIndex = 0;

//After a refresh check to see if the local storage has values
let savedPosters = JSON.parse(localStorage.getItem('favMovies'));

//Hide add favorites
$("#favBtn").hide();

if(savedPosters != null){
    // console.log("Loading posters");
    favMovies = savedPosters;
    // $("#favorites").empty();
    
    $("#pbox" + pboxIndex).empty();
    
    //Add items from local storage to personalized page
    for(var i = 0; i < savedPosters.personalSaves.length; i++){    
        $("#pbox" + pboxIndex).empty();
        $("#pbox" + pboxIndex).append(`<img src="`  + savedPosters.personalSaves[i].poster + `" style="max-width:100%;">`);
        pboxIndex++;    
    } 
}

//Get movie details and posters
$("#searchBtn").on("click", async function(event){
    event.stopPropagation();

    if ($("#searchmovies").val()) {
        searchMovie = $("#searchmovies").val();

        //append search history
        if ($("#selectVal").val() === "Recent Searches"){

            $("#selectVal").empty();
            $("#selectVal").append("<option>"+$("#searchmovies").val()+"</option>");

        }
        else {
            $("#selectVal").append("<option>"+$("#searchmovies").val()+"</option>");

        }
        // console.log("Here")
    }
    else if ($("#selectVal").val() != "Recent Searches"){
        searchMovie = $("#selectVal").val();
    }
    else {
        console.log("Error Nothing selected for search");
    }

    
    if (searchMovie) {
        clearMovie();
        $("#favBtn").show();
        $(".display-poster").css("display", "none");

        //set loading image
        var card = $("<div class='card'>");
        var TextDiv = $("<div>");
        var imgEl=$("<img>").attr('src',"./assets/images/loading.gif").css('height', '500px');
        TextDiv.append(imgEl);
        card.append(TextDiv);

        // console.log(TextDiv);

        if ($("input[type='radio']:checked").attr("id") === "imdbSearch"){
            // clearMovie();
            getIMDBmovies();
        }
        else if($("input[type='radio']:checked").attr("id") === "omdbSearch"){
            // clearMovie();
            getOMDBmovies();
        }
        else if ($("input[type='radio']:checked").attr("id") === "tmdbSearch"){
            // clearMovie();
            getTMDBmovies();
        }
        else{
            console.log("Error with gathering API search info from search form");
        }
    }
});

//Add movies to the personalized page
$("#favBtn").on("click", function(event){
    event.stopPropagation();

    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    personal.poster = posterGlobal;
    var notSaved = true;

    //Don't add items if they exist on the personalized page
    for (let i = 0; i < favMovies.personalSaves.length; i++) {

        if (personal.movieTitle === favMovies.personalSaves[i].movieTitle) {
            notSaved = false;
            break;
        }
    }

    //Save new items to local storage and place in memory
    if (notSaved){

        if (pboxIndex === 8) {
            //console.log("save after pbox 8 -- pbox is " + pboxIndex)
            favMovies.personalSaves.shift();
            favMovies.personalSaves.push(personal);
            localStorage.setItem("favMovies", JSON.stringify(favMovies));
            
            for (let i = 0; i < favMovies.personalSaves.length; i++){
                $("#pbox" + pboxIndex).empty();
                $("#pbox" + pboxIndex).append(`<img src="`  + favMovies.personalSaves[i].poster + `" style="max-width:100%;">`);
            }
           
        }
        else{
            // console.log("save before pbox 8 -- pbox is " + pboxIndex)
            favMovies.personalSaves.push(personal);
            localStorage.setItem("favMovies", JSON.stringify(favMovies));
            $("#pbox" + pboxIndex).empty();
            $("#pbox" + pboxIndex).append(`<img src="`  + personal.poster + `" style="max-width:100%;">`);
            pboxIndex++;
        }
        
    }

    return true;
});

for (let i = 0; i < 8; i++) {
    $("#pbox" + i).on("click", function(event){
        event.stopPropagation();
        // console.log(this.innerHTML);
        personalMainImage.empty();
        personalMainImage.append(this.innerHTML);
    
    });
}

//API call for the posters that also adds items to the home page
function getIMDBmovies(){
    
    var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/" + imdbAPIkey + "/?title=" + searchMovie;
    // console.log(imdbAPI);
        fetch(imdbAPI)
        // , { mode: "no-cors", headers: {
        //     "Content-Security-Policy" : "upgrade-insecure-requests",
        //     "Access-Control-Allow-Headers": "*"
        //   }
            
        // }
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            console.log(data);
            var poster = data.results[0].image;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].description;
            var plotVal = data.results[0].plot;
            var ratingVal = data.results[0].imDbRating;
            
            var TitleHeader = $("<h6>");
            var TextDiv = $("<div>");
            var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
            var summaryTab =$("<p>").text("Summary: ");
            var plotEl = $("<p>").text( plotVal);
            var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
            var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");

            TitleHeader.append(titleEl);
            TextDiv.append(summaryTab);
            TextDiv.append(plotEl);
            $("#movie-data").append(TextDiv);
            $("#movie-title").append(TitleHeader);

            var card = $("<div class='card'>")
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            card.append(TextDiv);

            $("#movie-poster").append(card);

            if (ratingVal > 8){
                TextDiv.prepend(highRating);
            }
            else {
                TextDiv.prepend(ratingEl);
            }
            
            posterGlobal = poster;
            moveTitleGlobal = titleVal;
            console.log(moveTitleGlobal + " " + posterGlobal);

           
            return true;
        });

    return true;
};

function getTMDBmovies(){
    var tmDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query="` + searchMovie + `"`;
    console.log(tmDBAPI);

    fetch(tmDBAPI)
    // , { headers: {
    //     "Content-Security-Policy" : "upgrade-insecure-requests",
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Request-Headers" : "*"
    //   }
    // })
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            var poster = "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].release_date;
            var plotVal = data.results[0].overview;
            var ratingVal = data.results[0].vote_average;
            
            var TitleHeader = $("<h6>");
            var TextDiv = $("<div>");
            var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
            var summaryTab =$("<p>").text("Summary: ");
            var plotEl = $("<p>").text( plotVal);
            var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
            var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");

            TitleHeader.append(titleEl);
            TextDiv.append(summaryTab);
            TextDiv.append(plotEl);
            $("#movie-data").append(TextDiv);
            $("#movie-title").append(TitleHeader);

            var card = $("<div class='card'>")
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            card.append(TextDiv);

            $("#movie-poster").append(card);

            if (ratingVal > 8){
                TextDiv.prepend(highRating);
            }
            else {
                TextDiv.prepend(ratingEl);
            }
            
            posterGlobal = poster;
            moveTitleGlobal = titleVal;
           
            return true;
        });

    return true;
};

//API call for movie details that also adds items to the home pages
function getOMDBmovies(){
    var omdbAPI = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json";
    console.log(omdbAPI);
    fetch(omdbAPI)
    // , { mode: "no-cors", headers: {
    //     "Content-Security-Policy" : "upgrade-insecure-requests",
    //     "Access-Control-Allow-Headers": "*"
    //   }
    // }
        .then(function(response){
        return response.json();

    })
    
    .then(function(data){
        var poster = data.Poster;
        var titleVal = data.Title;        
        var yearVal = data.Year;
        var plotVal = data.Plot;
        var ratingVal = data.imdbRating;
        var titleVal = data.Title;
        var yearVal = data.Year;
        var plotVal = data.Plot;
        var ratingVal = data.imdbRating;

        var TitleHeader = $("<h6>");
        var TextDiv = $("<div>");
        var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
        var summaryTab =$("<p>").text("Summary: ");
        var plotEl = $("<p>").text( plotVal);
        var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
        var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");

        var card = $("<div class='card'>")
        var TextDiv = $("<div>")
        imgEl=$("<img>").attr('src', poster).css('height', '500px');
        TextDiv.append(imgEl)
        card.append(TextDiv);
        $("#movie-poster").append(card);

        TitleHeader.append(titleEl);
        TextDiv.append(summaryTab);
        TextDiv.append(plotEl);
        $("#movie-data").append(TextDiv);
        $("#movie-title").append(TitleHeader);
        console.log(TitleHeader);
        console.log(TextDiv);
           
        if (ratingVal > 8){
            TextDiv.prepend(highRating);
        }
        else {
            TextDiv.prepend(ratingEl);
        }

        posterGlobal = poster;
        moveTitleGlobal = titleVal;

        return true;
    })

    return true;
};

//Clear movie details and posters form home page
function clearMovie(){
    $("#movie-title").empty();
    $("#movie-poster").empty();
    $("#movie-data").empty();
}


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

    clearMovie()
    $(".display-poster").css('display', "inline")

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

});

// start script for top 20 page

function favoriteMoviesTMDB(){
    var tmDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query="` + searchMovie + `"`;
    console.log(tmDBAPI);

    fetch(tmDBAPI)
    // , { headers: {
    //     "Content-Security-Policy" : "upgrade-insecure-requests",
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Request-Headers" : "*"
    //   }
    // })
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            var poster = "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].release_date;
            var plotVal = data.results[0].overview;
            var ratingVal = data.results[0].vote_average;
            
            var TitleHeader = $("<h6>");
            var TextDiv = $("<div>");
            var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
            var summaryTab =$("<p>").text("Summary: ");
            var plotEl = $("<p>").text( plotVal);
            var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
            var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");

            TitleHeader.append(titleEl);
            TextDiv.append(summaryTab);
            TextDiv.append(plotEl);
            $("#favorite-data").append(TextDiv);
            $("#favorite-title").append(TitleHeader);

            // var card = $("<div class='card'>")
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            // card.append(TextDiv);

            $("#favorite-poster").append(TextDiv);

            if (ratingVal > 8){
                TextDiv.prepend(highRating);
            }
            else {
                TextDiv.prepend(ratingEl);
            }
            
            posterGlobal = poster;
            moveTitleGlobal = titleVal;
           
            return true;
        });

    return true;
};

function favoriteMoviesIMDB(){
    
    var imdbAPI = "https://imdb-api.com/en/API/SearchMovie/k_a87jnn16/" + searchMovie;
    // console.log(imdbAPI);
        fetch(imdbAPI)
        // , { mode: "no-cors", headers: {
        //     "Content-Security-Policy" : "upgrade-insecure-requests",
        //     "Access-Control-Allow-Headers": "*"
        //   }
            
        // }
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            console.log(data);
            var poster = data.results[0].image;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].description;
            var plotVal = data.results[0].plot;
            var ratingVal = data.results[0].imDbRating;
            
            var TitleHeader = $("<h6>");
            var TextDiv = $("<div>");
            var titleEl = $("<p>").text(titleVal + " " + "(" + yearVal + ")");
            var summaryTab =$("<p>").text("Summary: ");
            var plotEl = $("<p>").text( plotVal);
            var ratingEl = $("<p>").text("IMDB Rating: " + ratingVal);
            var highRating =$("<p>").text("IMDB Rating: " + ratingVal + " " + " (Highly Rated!)");

            TitleHeader.append(titleEl);
            TextDiv.append(summaryTab);
            TextDiv.append(plotEl);
            $("#favorite-data").append(TextDiv);
            $("#favorite-title").append(TitleHeader);

            // var card = $("<div class='card'>")
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            // card.append(TextDiv);

            $("#favorite-poster").append(TextDiv);

            if (ratingVal > 8){
                TextDiv.prepend(highRating);
            }
            else {
                TextDiv.prepend(ratingEl);
            }
            
            posterGlobal = poster;
            moveTitleGlobal = titleVal;
            console.log(moveTitleGlobal + " " + posterGlobal);

           
            return true;
        });

    return true;
};

function clearFavorite(){
    $("#favorite-title").empty();
    $("#favorite-poster").empty();
    $("#favorite-data").empty();
}

$("#top20Btn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").show();
    $("#triviaSec").hide();
    $("#displayFav").hide();

});

$("#kelsie1").on("click", function(){
    clearFavorite();
    searchMovie = "Uptown Girls";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie2").on("click", function(){
    clearFavorite();
    searchMovie = "Ella Enchanted";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie3").on("click", function(){
    clearFavorite();
    searchMovie = "New York Minute";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie4").on("click", function(){
    clearFavorite();
    searchMovie = "The Lorax";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#kelsie5").on("click", function(){
    clearFavorite();
    searchMovie = "The Social Network";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren1").on("click", function(){
    clearFavorite();
    searchMovie = "Spirited Away";
    favoriteMoviesIMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren2").on("click", function(){
    clearFavorite();
    searchMovie = "My Neighbor Totoro";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren3").on("click", function(){
    clearFavorite();
    searchMovie = "Your Name";
    favoriteMoviesIMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren4").on("click", function(){
    clearFavorite();
    searchMovie = "Sinister";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#lauren5").on("click", function(){
    clearFavorite();
    searchMovie = "As Above So Below";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew1").on("click", function(){
    clearFavorite();
    searchMovie = "Hitch";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew2").on("click", function(){
    clearFavorite();
    searchMovie = "The Secret Life of Walter Mitty";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew3").on("click", function(){
    clearFavorite();
    searchMovie = "The Green Mile";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew4").on("click", function(){
    clearFavorite();
    searchMovie = "Treasure Planet";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#drew5").on("click", function(){
    clearFavorite();
    searchMovie = "Guardians of the Galaxy Vol. 2";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will1").on("click", function(){
    clearFavorite();
    searchMovie = "Back to the Future Part II";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will2").on("click", function(){
    clearFavorite();
    searchMovie = "Terminator 2";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will3").on("click", function(){
    clearFavorite();
    searchMovie = "Forest Gump";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will4").on("click", function(){
    clearFavorite();
    searchMovie = "Memento";
    favoriteMoviesTMDB(searchMovie);
    $("#kelsieFavs").hide();
    $("#laurenFavs").hide();
    $("#drewFavs").hide();
    $("#willFavs").hide();
    $("#displayFav").show();
});

$("#will5").on("click", function(){
    clearFavorite();
    searchMovie = "Black Panther";
    favoriteMoviesTMDB(searchMovie);
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

// function getMovie() {}

// End script for top 20 page

$("#triviaBtn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").hide();
    $("#triviaSec").show();

});

$("#poster1").on("click", function(){
    clearMovie()
    searchMovie="Spirited Away";
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

