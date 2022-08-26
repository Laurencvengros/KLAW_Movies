var movieDBAPI = "ae8cbfc11d012e219d3b44e276a96f51";
//  console.log(movie);
var pastMovies = {
    movies:[]
  };
var tableBody = document.getElementById("pastSearches")

$(document).ready(function() {
  var getMovies = JSON.parse(localStorage.getItem("pastMovies"));
  if (getMovies !== null) {
    pastMovies = getMovies;
  }
  pastSearches();
})

console.log(pastMovies);

$("#searchBtn").on("click",function(event){
    event.preventDefault();
    searchMovie = $("#searchmovies").val(); 

    pastMovies.movies.push(searchMovie)    
    console.log(searchMovie);
    
    var titleURL = "https://api.themoviedb.org/3/search/movie?api_key=" + movieDBAPI + "&language=en-US&page=1&include_adult=false&query=" + searchMovie;
     console.log(titleURL);

    fetch(titleURL)
    .then(function(response){
        response.json().then(function (data) {
            console.log(data);
            return data;
        });
        
    });
  storeSearches();
  // pastSearches();
  var movieListEl = document.createElement("ul");
  var movieLiEl = document.createElement("li");
  movieLiEl.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+ pastMovies.movies[pastMovies.movies.length-1] +"'>" + pastMovies.movies[pastMovies.movies.length-1] + "</button>";  
  movieListEl.appendChild(movieLiEl);
  tableBody.appendChild(movieListEl);
});

$("body").delegate("list-group-item", "click", function() {
  searchMovie = $(this).text();
})

function storeSearches() {
  localStorage.setItem("pastMovies", JSON.stringify(pastMovies));
  console.log(localStorage);
}

function pastSearches() {
  // var savedSearches = JSON.parse(localStorage.getItem("pastMovies"));
  var movieListEl = document.createElement("ul");

  // movieLiEl.empty();
  movieListEl.classList.add("list-unstyled");
  movieListEl.classList.add("w-100")
  console.log(pastMovies.movies);

  for (var i = 0; i < pastMovies.movies.length; i++) {
    var movieLiEl = document.createElement("li");
    movieLiEl.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+ pastMovies.movies[i] +"'>" + pastMovies.movies[i] + "</button>";
    // console.log(movieLiEl)
    movieListEl.appendChild(movieLiEl)
  }

  
  tableBody.appendChild(movieListEl);
};









//function getRecommendation(){
//var APIurlRecs = "https://api.themoviedb.org/3/movie/" + movie + "/similar?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1";
//fetch(APIurlRecs)
//.then(function(response){
    //return response.json();
//}

//)};