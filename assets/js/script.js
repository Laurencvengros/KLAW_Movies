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
    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    personal.poster = posterGlobal;
    for (let i = 0; i < favMovies.personalSaves.length; i++) {
        
    if($("#searchmovies").val().toUpperCase()!== favMovies.personalSaves[i].movieTitle.toUpperCase()){
        console.log($("#searchmovies").val().toUpperCase());
        console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
        //$("#favBtn").show();
        $("#favBtn").css('display', 'inline');
        
        // $(".added").css('display', 'inline').addClass('added');
        // $("#favBtn").css('display', 'none').removeClass('added');
    }else{
        console.log($("#searchmovies").val().toUpperCase());
        console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
        // $("#favBtn").show();
        // $("#favBtn").css('display', 'inline')

        $(".added").css('display', 'inline').addClass('added');
        $("#favBtn").css('display', 'none').removeClass('added');
        
    }


    }
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
    $(".added").css('display', 'inline').addClass('added');
    $("#favBtn").css('display', 'none').removeClass('added');

    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    personal.poster = posterGlobal;
    var notSaved = true;



    //Don't add items if they exist on the personalized page
    for (let i = 0; i < favMovies.personalSaves.length; i++) {

        if (personal.movieTitle === favMovies.personalSaves[i].movieTitle) {
            notSaved = false;
            break;
            
        }else{
         
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
async function getIMDBmovies(){
    
    var imdbAPI = "https://imdb-api.com/API/AdvancedSearch/" + imdbAPIkey + "/?title=" + searchMovie;
    // console.log(imdbAPI);
        await fetch(imdbAPI)
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

          
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            $("#movie-poster").append(TextDiv);

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

async function getTMDBmovies(){
    var tmDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query="` + searchMovie + `"`;

    await fetch(tmDBAPI)
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

            
            var TextDiv = $("<div>")
            imgEl=$("<img>").attr('src', poster).css('height', '500px');
            TextDiv.append(imgEl)
            $("#movie-poster").append(TextDiv);

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
async function getOMDBmovies(){
    var omdbAPI = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json";
    console.log(omdbAPI);
    await fetch(omdbAPI)
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

        
        var TextDiv = $("<div>")
        imgEl=$("<img>").attr('src', poster).css('height', '500px');
        TextDiv.append(imgEl)
        $("#movie-poster").append(TextDiv);

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

    $("#favBtn").css('display', 'none');
    $(".added").css('display', 'none');

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
    $("#poster1").css("display", "none");
    $("#poster2").css("display", "none");
    $("#poster3").css("display", "none");
    getTMDBmovies();

    
    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    
    for (let i = 0; i < favMovies.personalSaves.length; i++) {
        
        if(searchMovie.toUpperCase()!== favMovies.personalSaves[i].movieTitle.toUpperCase()){
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
            $("#favBtn").show();
            $("#favBtn").css('display', 'inline')
        
        
        }else{
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
       

            $(".added").css('display', 'inline').addClass('added');
            $("#favBtn").css('display', 'none').removeClass('added');
        
        }


    }
});

$("#poster2").on("click", function(){
    clearMovie()
    searchMovie="Independence Day: RESURGENCE";
    $("#poster1").css("display", "none");
    $("#poster2").css("display", "none");
    $("#poster3").css("display", "none");
    getTMDBmovies();

    
    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;

    for (let i = 0; i < favMovies.personalSaves.length; i++) {
        
        if(searchMovie.toUpperCase()!== favMovies.personalSaves[i].movieTitle.toUpperCase()){
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
            $("#favBtn").show();
            $("#favBtn").css('display', 'inline')
        
        
        }else{
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
       

            $(".added").css('display', 'inline').addClass('added');
            $("#favBtn").css('display', 'none').removeClass('added');
        
        }


    }

   
});

$("#poster3").on("click", function(){
    clearMovie()
    searchMovie="Insidious";
    $("#poster1").css("display", "none");
    $("#poster2").css("display", "none");
    $("#poster3").css("display", "none");
    getTMDBmovies();

    personal = { movieTitle: "", poster: "" };
    personal.movieTitle = moveTitleGlobal;
    
    for (let i = 0; i < favMovies.personalSaves.length; i++) {
        
        if(searchMovie.toUpperCase()!== favMovies.personalSaves[i].movieTitle.toUpperCase()){
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
            $("#favBtn").show();
            $("#favBtn").css('display', 'inline')
        
        
        }else{
            console.log(searchMovie.toUpperCase());
            console.log(favMovies.personalSaves[i].movieTitle.toUpperCase());
       

            $(".added").css('display', 'inline').addClass('added');
            $("#favBtn").css('display', 'none').removeClass('added');
        
        }


    }
    
});




