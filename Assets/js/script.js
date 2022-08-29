

// Case 0 - User is adding favorites for the first time nothing in local storage
// Case 1 - User has refreshed the page 
// Case 2 - User has refreshed the page and is adding more favorites
// Case 3 - User has added maximum number of favorites

var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_lomgkwyt";
var titleEl = document.getElementById("#movietitle");
var searchMovie= $("#searchmovies");

let favMovies= { personalSaves:[] };
let moveTitleGlobal = "";
let posterGlobal = "";


//After a refresh check to see if the local storage has values
let savedPosters = JSON.parse(localStorage.getItem('favMovies'));
if(savedPosters != null){
    console.log("Loading posters");
    favMovies = savedPosters;
    $("#favorites").empty();
    
    //Add items from local storage to personalized page
    
    for(var i = 0; i < savedPosters.personalSaves.length; i++){

        var liEl = document.createElement('p');
        liEl.innerHTML = `<img src="`  + savedPosters.personalSaves[i].poster + `">`;
        //imgaes display horizontal, need to fid a way to make them go to the next line when there is too many
        var imgEl = $("<img>").attr("src", savedPosters.personalSaves[i].poster);
        imgEl.css("display","inline") 
        imgEl.css("padding", "5px");
        imgEl.append(liEl)
        $("#favorites").append(imgEl)
        
        
    } 
    
    
    ;  
    $("#favorites").css("width", "200px"); 
    $("#favorites").css("display", "flex", "justify-content", "center");
   
}

//Get movie details and posters
$("#searchBtn").on("click", async function(event){
    event.stopPropagation();

    searchMovie = $("#searchmovies").val();
    $(".display-poster").css("display", "none")

    clearMovie()
    getMovie();
    getPosters();
});

//Add movies to the personalized page
$("#favBtn").on("click", function(event){
    event.stopPropagation();
    $("#favBtn").css('display', 'none');
    $(".added").css('display', 'block').addClass('added');

    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    personal.poster = posterGlobal;

    var notSaved = true;
    var liEl = document.createElement('p');
    $("#favorites").css("width", "200px");
    liEl.innerHTML =  `<img src="`  + personal.poster + `">`;
    var imgEl = $("<img>")//.attr("src", savedPosters.personalSaves[i].poster);
      imgEl.append(liEl);
    $("#favorites").append(imgEl)
    //$("#favorites").append(liEl);

    //Don't add items if they exist on the personalized page
    for (let i = 0; i < favMovies.personalSaves.length; i++) {

        if (personal.movieTitle === favMovies.personalSaves[i].movieTitle) {
            notSaved = false;
            break;
        }
    }

    //Save new items to local storage and place in memory
    if (notSaved){
        favMovies.personalSaves.push(personal);
        localStorage.setItem("favMovies", JSON.stringify(favMovies));
    }

    return true;
});

//API call for the posters that also adds items to the home page
async function getPosters(){
    var posterAPI = "https://imdb-api.com/en/API/Search/" + imdbAPIkey + "/" + searchMovie;

    await fetch(posterAPI)
        .then(function(response){
            return response.json();       
            
        })
        .then(function(data){
            var poster = data.results[0].image;
            var card = $("<div class='card'>")
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            card.append(TextDiv);

            $("#movie-poster").append(card);
            posterGlobal = data.results[0].image;
           
            return true;
        });

    return true;
};

//API call for movie details that also adds items to the home pages
async function getMovie(){
    var movieTitle = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json";

    await fetch(movieTitle)
        .then(function(response){
        return response.json();

    })
    
    .then(function(data){
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

        moveTitleGlobal = data.Title;

        TitleHeader.append(titleEl);
        TextDiv.append(summaryTab);
        TextDiv.append(plotEl);
        $("#movie-data").append(TextDiv);
        $("#movie-title").append(TitleHeader);

        if (ratingVal > 8){
            TextDiv.prepend(highRating);
        }
        else {
            TextDiv.prepend(ratingEl);
        }

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