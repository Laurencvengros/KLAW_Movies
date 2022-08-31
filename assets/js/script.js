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

//Get movie details and posters
$("#searchBtn").on("click", async function(event){
    event.stopPropagation();

    $("#movieTitle").empty
    $("#releaseYear").empty
    $("#moviePoster").attr('src', loadingImage);
    $("#moviePlot").empty


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
        $("#favBtn").show();

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
        // console.log(!this.innerHTML.includes("add_favorites.jpg"));
        if (!this.innerHTML.includes("add_favorites.jpg")){
            personalMainImage.empty();
            personalMainImage.append(this.innerHTML);
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
 
for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
};

for (const el of closeEls) {
    console.log(el);
    el.addEventListener("click", function() {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        console.log("Here");
    });
}
 
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
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
    $("#favBtn").show();
    searchMovie="Spirited Away";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster2").on("click", function(){
    // clearMovie()
    $("#favBtn").show();
    searchMovie="Independence Day";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster3").on("click", function(){
    // clearMovie()
    $("#favBtn").show();
    searchMovie="Insidious";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster4").on("click", function(){
    // clearMovie()
    $("#favBtn").show();
    searchMovie="The Devil Wears Prada";
    getTMDBmovies()
    // getMovie(searchMovie);
});

$("#poster5").on("click", function(){
    // clearMovie()
    $("#favBtn").show();
    searchMovie="The English Patient";
    getTMDBmovies()
    // getMovie(searchMovie);
});

