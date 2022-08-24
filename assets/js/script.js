var omdbAPI = "31aa90e4";
var titleEl = document.getElementById("#movietitle");
searchMovie= $("#searchmovies").val();

$("#searchBtn").on("click", function(){
console.log($("#searchmovies").val());
searchMovie = $("#searchmovies").val();
//console.log(movie);
getMovie()
});



function getMovie(){
var movieTitle = "http://www.omdbapi.com/?apikey=31aa90e4&t=" + searchMovie + "&plot=full&r=json" 


fetch(movieTitle)
.then(function(response){
    return response.json();

    
    
})
.then(function(data){
    var titleVal = data.Title
    var yearVal = data.Year
console.log(titleVal);
console.log(yearVal);


    })
   

};
