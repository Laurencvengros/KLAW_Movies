var omdbAPIkey = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
var searchMovie = "";
var personalMainImage = $("#personalMainImg");

let favMovies= { personalSaves:[] };
let moveTitleGlobal = "";
let posterGlobal = "";
let pboxIndex = 0;
let loadingImage = "./assets/images/loading.gif"
let errorImage = "./assets/images/error.jpg"

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

//modal2 for Site Map
$("#siteMapBtn").on("click", async function(event){
    document.getElementById('modal2').classList.add(isVisible);
});

//Case 0 is it doesn't display when the site loaded
//Case 1 is user clicks on Add Favs and the Add button goes away and Added Favorite appears
//Case 2 user search for the same movie and the Added Favorites appears but the button doesn't appear



//Get movie details and posters
$("#searchBtn").on("click", async function(event){
    event.stopPropagation();
    var notSaved = false;

    // $("#favBtn").show();
    // $("#addedFav").hide();


    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);

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


    }
    else if ($("#selectVal").val() != "Recent Searches"){
        searchMovie = $("#selectVal").val();
    }
    else {
        console.log("Error Nothing selected for search");
    }

    
    if (searchMovie) {
        // clearMovie();

        if ($("input[type='radio']:checked").attr("id") === "imdbSearch"){
            getIMDBmovies();
        }
        else if($("input[type='radio']:checked").attr("id") === "omdbSearch"){
            getOMDBmovies();
        }
        else if ($("input[type='radio']:checked").attr("id") === "tmdbSearch"){
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

    $("#favBtn").hide();
    $("#addedFav").show();

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
        console.log(this.children[0])
        console.log(this.children[0].getAttribute("src"));
        console.log(!this.innerHTML.includes("add_favorites.jpg"));

        if (!this.innerHTML.includes("add_favorites.jpg")){
            personalMainImage.empty();
            personalMainImage.attr('src', this.children[0].getAttribute("src"));
        }
    
    });
}

//API call for the posters that also adds items to the home page
function getIMDBmovies(){
    
    var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/" + imdbAPIkey + "/?title=" + searchMovie;
    // console.log(imdbAPI);
        fetch(imdbAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var poster = data.results[0].image;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].description.split('(')[1].split('–')[0];
            var plotVal = data.results[0].plot;
            var ratingVal = data.results[0].imDbRating;
            var notSaved = true;

            for (let i = 0; i < favMovies.personalSaves.length; i++) {

                console.log(titleVal);
                console.log(favMovies.personalSaves[i].movieTitle);

                if (titleVal === favMovies.personalSaves[i].movieTitle) {
                    notSaved = false;
                    break;
                }
            }
        
            if (notSaved){
                $("#favBtn").show();
                $("#addedFav").hide();
            }
            else {
                $("#favBtn").hide();
                $("#addedFav").show();
            }

            $("#movieTitle").text(titleVal);
            $("#releaseYear").text(yearVal);
            $("#moviePoster").attr('src', poster);
            $("#moviePlot").text("Summary: " + plotVal);


            if (ratingVal > 8){
                $("#ratingEl").text("IMDB Rating: " + ratingVal);
            }
            else {
                $("#ratingEl").text("IMDB Rating: " + ratingVal + " (Highly Rated!)");
            }
            
            posterGlobal = poster;
            moveTitleGlobal = titleVal;
            // console.log(moveTitleGlobal + " " + posterGlobal);

           
            return true;
        });

    return true;
};

function getTMDBmovies(){
    var tmDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query="` + searchMovie + `"`;

    fetch(tmDBAPI)
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            var poster = "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
            var titleVal = data.results[0].title;        
            var yearVal = data.results[0].release_date.split('-')[0];
            var plotVal = data.results[0].overview;
            var ratingVal = data.results[0].vote_average;
            var notSaved = true;

            for (let i = 0; i < favMovies.personalSaves.length; i++) {

                console.log(titleVal);
                console.log(favMovies.personalSaves[i].movieTitle);

                if (titleVal === favMovies.personalSaves[i].movieTitle) {
                    notSaved = false;
                    break;
                }
            }
        
            if (notSaved){
                $("#favBtn").show();
                $("#addedFav").hide();
            }
            else {
                $("#favBtn").hide();
                $("#addedFav").show();
            }

            $("#movieTitle").text(titleVal);
            $("#releaseYear").text(yearVal);
            $("#moviePoster").attr('src', poster);
            $("#moviePlot").text("Summary: " + plotVal);


            if (ratingVal > 8){
                $("#ratingEl").text("IMDB Rating: " + ratingVal);
            }
            else {
                $("#ratingEl").text("IMDB Rating: " + ratingVal + " (Highly Rated!)");
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
        var notSaved = true;

        for (let i = 0; i < favMovies.personalSaves.length; i++) {

            console.log(titleVal);
            console.log(favMovies.personalSaves[i].movieTitle);

            if (titleVal === favMovies.personalSaves[i].movieTitle) {
                notSaved = false;
                break;
            }
        }
    
        if (notSaved){
            $("#favBtn").show();
            $("#addedFav").hide();
        }
        else {
            $("#favBtn").hide();
            $("#addedFav").show();
        }

        $("#movieTitle").text(titleVal);
        $("#releaseYear").text(yearVal);
        $("#moviePoster").attr('src', poster);
        $("#moviePlot").text("Summary: " + plotVal);


        if (ratingVal > 8){
            $("#ratingEl").text("IMDB Rating: " + ratingVal);
        }
        else {
            $("#ratingEl").text("IMDB Rating: " + ratingVal + " (Highly Rated!)");
        }

        posterGlobal = poster;
        moveTitleGlobal = titleVal;

        return true;
    })

    return true;
};


//Modal Open and close functionality
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
 
// $("searchBtn").on("click", function() {
    
// });

for (const el of closeEls) {
    console.log(el);
    el.addEventListener("click", function() {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        console.log("Here");
    });
}
 
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.getElementById('para').classList.remove(isVisible);
  }
  
});

//Hamburger menu
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });


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

    // clearMovie()
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

$("#triviaBtn").on("click", function(){
    $("#homeSec").hide();
    $("#aboutSec").hide();
    $("#personalizeSec").hide();
    $("#top20Sec").hide();
    $("#triviaSec").show();

});

$("#poster1").on("click", function(){
    // clearMovie()
    // $("#favBtn").show();
    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);
    searchMovie="Spirited Away";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster2").on("click", function(){
    // clearMovie()
    // $("#favBtn").show();
    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);
    searchMovie="Independence Day";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster3").on("click", function(){
    // clearMovie()
    // $("#favBtn").show();
    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);
    searchMovie="Insidious";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster4").on("click", function(){
    // clearMovie()
    // $("#favBtn").show();
    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);
    searchMovie="The Devil Wears Prada";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster5").on("click", function(){
    // clearMovie()
    // $("#favBtn").show();
    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty

    document.getElementById('modal1').classList.add(isVisible);
    searchMovie="The English Patient";
    getTMDBmovies()
    // getMovie(searchMovie);
});

//Code for Favorites Section

function favoriteMoviesTMDB(){
    var tmDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query="` + searchMovie + `"`;
    console.log(tmDBAPI);

    fetch(tmDBAPI)
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
    clearFavorite();
    $("#kelsieFavs").show();
    $("#laurenFavs").show();
    $("#drewFavs").show();
    $("#willFavs").show();
    $("#displayFav").hide();
});

var startQuiz = document.querySelector("#startTriviaQuiz");
var startQuizBtn = document.querySelector("#startGameTrivia");
var quizPage = document.querySelector("#quizPage");
var questionList = document.querySelector("#questionList");
var buttonA = document.querySelector("#A");
var buttonB = document.querySelector("#B");
var buttonC = document.querySelector("#C");
var buttonD = document.querySelector("#D");
var endGame = document.querySelector("#endGame");
var answerChoice = document.querySelector("#rightwrong");
var yourScore = document.querySelector("#yourScore");
var finalScore = document.querySelector("#finalscore");
var restartQuizBtn = document.querySelector("#restartQuiz");
var endQuizBtn = document.querySelector("#endQuiz");


var myImage = document.getElementById("#movieImageOne");
var questionIndex = 0;
var imageIndex = 1;
var correctAnswer;
var score = 0;
var text = document.createElement("text");

var imageArray = ['./assets/images/rent.png',
 './assets/images/brothersGrimm.png',
 './assets/images/it.png',
 './assets/images/schindlersList.png',
 './assets/images/halfBloodPrince.png'];

 function showImage()  {
    $("#movieImageOne").attr("src", imageArray[questionIndex]);

 }

var answersI = 0;
var answers = ["A","B","C","D"];

$("#A").on("click", function () {
    checkAnswer("A");
});

$("#B").on("click", function () {
    checkAnswer("B");
});

$("#C").on("click", function () {
    checkAnswer("C");
});

$("#D").on("click", function () {
    checkAnswer("D");
});

    
var quizQuestions = [
    {
        question: "What is the title of this movie?",

        A: "My Girl",
        B: "Rent",
        C: "The Perfect Storm",
        D: "Raising Helen",

        correctChoice: "B"
    },
    {
        question: "What year was 'The Brother's Grimm' released?",

        A: "2005",
        B: "2001",
        C: "1999",
        D: "2007",

        correctChoice: "A"
    },
    {
        question: "Who was the director the movie 'It'?",

        A: "Steven Spielberg",
        B: "Christoper Nolan",
        C: "David Fincher",
        D: "Andrés Muschietti",

        correctChoice: "D"
    },
    {
        question: "What year was 'Schindler's List' released?",

        A: "1994",
        B: "1992",
        C: "2005",
        D: "2000",

        correctChoice: "A"

    },
    {

        question: "Which Harry Potter movie is this?",

        A: "Chamber of Secrets",
        B: "Goblet of Fire",
        C: "Order of the Phoenix",
        D: "Half-Blood Prince",

        correctChoice: "D"

    }
];

var quizLength = quizQuestions.length

function startGame() {
    console.log("startGame");
    showImage();
    addQuizQuestions();
    questionIndex++;
    endGame.style.display = "none";
    quizPage.style.display = "block";
    

};

startQuizBtn.addEventListener("click", startGame);

function addQuizQuestions() {
    console.log(quizQuestions[questionIndex].question);
    var currentQuestion = quizQuestions[questionIndex];
    questionList.textContent = currentQuestion.question;
    buttonA.textContent = currentQuestion.A;
    buttonB.textContent = currentQuestion.B;
    buttonC.textContent = currentQuestion.C;
    buttonD.textContent = currentQuestion.D;
    
};

function checkAnswer (answer) {
    
    console.log(questionIndex);
    
    
    if (questionIndex-1<4) {
        
        correct = quizQuestions[questionIndex-1].correctChoice;
        if (answer === correct) {
            text.textContent = 'Correct';
            score++;
        } 
        else {
            text.textContent = 'Incorrect';
        }
        rightwrong.setAttribute("style", "display:Block");
        rightwrong.appendChild(text);
        showImage();
        addQuizQuestions();
        questionIndex++;
        

    }

    else {
        displayScore();
    }   
    

};


function displayScore(){
    $('#quizPage').hide();
    $('#endGame').show();
    finalScore.textContent = score + " out of " + quizLength;   
};

endQuizBtn.addEventListener("click", function(){
    endGame.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    score=0;
    questionIndex=0;
    text.textContent = "";
   
});

restartQuizBtn.addEventListener("click", function(){
    endGame.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    score=0;
    questionIndex=0;
    text.textContent = "";
    startGame();
   
});
