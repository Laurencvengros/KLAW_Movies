var tmdbAPIkey = "ae8cbfc11d012e219d3b44e276a96f51";
var imdbAPIkey = "k_lomgkwyt";
var tmdbInput = $("#tmdbInput");
var imdbInput = $("#imdbInput");

var tmdbTitle = $("#tmdbTitle");
var tmdbOverview = $("#tmdbOverview");
var tmdbImage = $("#tmdbImage");

var imdbTitle = $("#imdbTitle");
var imdbDesc = $("#imdbDesc");
var imdbImage = $("#imdbImage");


$("#tmdbBtn").on("click",function(event){
    event.preventDefault();
    // console.log(tmdbInput);
    
    var tmdbURL = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPIkey + "&language=en-US&page=1&include_adult=false&query=" + tmdbInput.val();
    console.log(tmdbURL);

    fetch(tmdbURL)
    .then(function(response){
        response.json().then(function (data) {
            console.log(data);
            console.log(data.results[0].original_title);
            console.log(data.results[0].overview);
            console.log(tmdbTitle);
            console.log(tmdbOverview);

            tmdbTitle.html("Movie: " + data.results[0].original_title);
            tmdbOverview.html("Overview: " + data.results[0].overview);

        }); 
    });
});

$("#imdbBtn").on("click",function(event){
    event.preventDefault();
    // console.log(imdbInput);
    // console.log(imdbInput.val());
    
    var imdbURL = "https://imdb-api.com/en/API/Search/" + imdbAPIkey + "/" + imdbInput.val();
    console.log(imdbURL);

    fetch(imdbURL)
    .then(function(response){
        response.json().then(function (data) {
            console.log(data);
            console.log(data.results[0].title);
            console.log(data.results[0].description);

            imdbTitle.html("Movie: " + data.results[0].title);
            imdbDesc.html("Desciption: " + data.results[0].description);
            // <img src="http://openweathermap.org/img/wn/` + data.weather[0].icon +`@2x.png" alt="` + data.weather[0].description +`" height="50" width="50"></img>
            imdbImage.html(`<img src=` + data.results[0].image + ` alt="` + data.results[0].description + `" height=75 width=150></img>`);
        }); 
    });
});














//function getRecommendation(){
//var APIurlRecs = "https://api.themoviedb.org/3/movie/" + movie + "/similar?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1";
//fetch(APIurlRecs)
//.then(function(response){
    //return response.json();
//}

//)};

