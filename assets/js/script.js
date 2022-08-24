var movieDBAPI = "ae8cbfc11d012e219d3b44e276a96f51";
movie= $("#searchmovies"); 
console.log(movie);

console.log($("#searchmovies"));


$("#searchmovies").on("click", function(){
var titleURL = "https://api.themoviedb.org/3/search/movie?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1&include_adult=false&query=" + "inception";
fetch(titleURL)
.then(function(response){
    response.json().then(function (data) {
        console.log(data);
        return data;
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

