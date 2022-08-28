var omdbAPI = "31aa90e4";
var imdbAPIkey = "k_8rkm66bk";
var titleEl = document.getElementById("#movietitle");
var searchMovie= $("#searchmovies");
var favMovies= {

    personalSaves:[]
};

var personal = {
    movieTitle: "",
    poster: "",
};

var savedPosters = JSON.parse(localStorage.getItem('favMovies'));
console.log(favMovies.personalSaves);

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

            $("#favBtn").on("click", function(){
   
    

                    personal.movieTitle=$("#searchmovies").val();
                    personal.poster = data.results[0].image;
                    console.log(personal.poster);
                    console.log(personal);
                    console.log(favMovies.personalSaves);
                    favMovies.personalSaves.push(personal);
                    localStorage.setItem("favMovies", JSON.stringify(favMovies));
                    console.log(localStorage.getItem("favMovies"));
                
                    var liEl = document.createElement('li');
                    liEl.innerHTML = "<h2>"  + personal.movieTitle + "</h2>";
                    $("#favorites").append(liEl);

                    var savedPosters = JSON.parse(localStorage.getItem('favMovies'));
                    //console.log(savedPosters.personalSaves[0].movieTitle);
                    c//onsole.log(savedPosters.personalSaves[0].poster);

                    for(var i = 0; i < savedPosters.personalSaves.length; i++){
                        var liEl = document.createElement('li');
                        liEl.innerHTML = "<h2>"  + savedPosters.personalSaves[i].movieTitle + "</h2>";
                        
                        //var imgDiv = document.createElement('img');
                        //imgDiv.innerHTML = "<img>" + savedPosters.personalSaves[i].poster + "<img>";
                        
                         
                        
                        

                    } 
                    $("#favorites").append(liEl);
                    //$("#favorites").append(imgDiv);

                
                });
                


        });
};

$(document).ready(function(){
    if(savedPosters !== null){
        personal=savedPosters
    }
})

// $("#favBtn").on("click", function(){
   
    

//     personal.movieTitle=$("#searchmovies").val();
//     console.log(personal);
//     console.log(favMovies.personalSaves);
//     favMovies.personalSaves.push(personal);
//     localStorage.setItem("favMovies", JSON.stringify(favMovies));
//     console.log(localStorage.getItem("favMovies"));

//     var liEl = document.createElement('li');
//     liEl.innerHTML = "<h2>"  + personal.movieTitle + "</h2>";
//     $("#favorites").append(liEl);
 
     
// });



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

});

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
