
var imdbAPIkey = "k_pauylhuk";
var imdbInput = $("#imdbInput");

// var imdbTitle = $("#imdbTitle");
var mainDesc = $("#mainImgDesc");
var mainImage = $("#mainImg");
var carouselImg1 = $("#carouselImg1");
var carouselImg2 = $("#carouselImg2");
var carouselImg3 = $("#carouselImg3");
var imagesArray = [];
var carouselIndex = 1;
var carouselImgWidth = ` " width="150"></img>`;



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
            // console.log(data.results[0].title);
            // console.log(data.results[0].description);

            // imdbTitle.html("Movie: " + data.results[0].title);
            // mainDesc.html("Desciption: " + data.results[0].description);
            mainImage.html(`<img src=` + data.results[0].image + ` alt="` + data.results[0].description + `" width="275"></img>`);
            carouselImg1.html(`<img src=` + data.results[1].image + ` alt="` + data.results[1].description + carouselImgWidth);
            carouselImg2.html(`<img src=` + data.results[2].image + ` alt="` + data.results[2].description + carouselImgWidth);
            carouselImg3.html(`<img src=` + data.results[3].image + ` alt="` + data.results[3].description + carouselImgWidth);
            
            for (let i = 0; i < data.results.length; i++){

                imagesArray[i] = data.results[i].image;

            }
        
        }); 
    });
});

console.log(imagesArray);
console.log(imagesArray.length);

$("#rightBtn").on("click",function(event){
    event.preventDefault();

    
    carouselIndex++;
    console.log(carouselIndex);
    if (((imagesArray.length - 1) - carouselIndex) >= 2){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[carouselIndex+1] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[carouselIndex+2] + carouselImgWidth);
    }
    else if (((imagesArray.length - 1) - carouselIndex) === 1){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[carouselIndex+1] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[0] + carouselImgWidth);
    }
    else if (((imagesArray.length - 1) - carouselIndex) === 0){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[0] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[1] + carouselImgWidth);
        carouselIndex = -1;
    }
    else {
        
        console.log("Error carouselIndex out of scope right button.")
    }

    // carouselImg1.html(`<img src=` + imagesArray[1].image + ` " height=100 width=200></img>`);
    // carouselImg2.html(`<img src=` + imagesArray[2].image + ` " height=100 width=200></img>`);
    // carouselImg3.html(`<img src=` + imagesArray[3].image + ` " height=100 width=200></img>`);

});

$("#leftBtn").on("click",function(event){
    event.preventDefault();

    carouselIndex--;
    console.log(carouselIndex);
    
    if (carouselIndex === (imagesArray.length - 1)){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[0] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[1] + carouselImgWidth);
    }
    else if (carouselIndex === (imagesArray.length - 2) ){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[carouselIndex+1] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[0] + carouselImgWidth);
    
    }
    else if ( (imagesArray.length - 2)  > carouselIndex >= 0){
        
        carouselImg1.html(`<img src=` + imagesArray[carouselIndex] + carouselImgWidth);
        carouselImg2.html(`<img src=` + imagesArray[carouselIndex+1] + carouselImgWidth);
        carouselImg3.html(`<img src=` + imagesArray[carouselIndex+2] + carouselImgWidth);
        
        if (carouselIndex === 0){ carouselIndex = imagesArray.length; } 
    }
    else {
        
        console.log("Error carouselIndex out of scope left button.")
    }

});

$("#carouselImg1").on("click",function(event){
    event.preventDefault();

    console.log($("#carouselImg1 > img").attr("src"));
    $("#mainImg > img").attr("src",$("#carouselImg1 > img").attr("src"));

});

$("#carouselImg2").on("click",function(event){
    event.preventDefault();

    console.log($("#carouselImg2 > img").attr("src"));
    $("#mainImg > img").attr("src",$("#carouselImg2 > img").attr("src"));

});

$("#carouselImg3").on("click",function(event){
    event.preventDefault();

    console.log($("#carouselImg3 > img").attr("src"));
    $("#mainImg > img").attr("src",$("#carouselImg3 > img").attr("src"));

});
// console.log(rightBtn);
// console.log(leftBtn);




// var tmdbInput = $("#tmdbInput");
// var tmdbAPIkey = "ae8cbfc11d012e219d3b44e276a96f51";
// var tmdbTitle = $("#tmdbTitle");
// var tmdbOverview = $("#tmdbOverview");
// var tmdbImage = $("#tmdbImage");

// $("#tmdbBtn").on("click",function(event){
//     event.preventDefault();
//     // console.log(tmdbInput);
    
//     var tmdbURL = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPIkey + "&language=en-US&page=1&include_adult=false&query=" + tmdbInput.val();
//     console.log(tmdbURL);

//     fetch(tmdbURL)
//     .then(function(response){
//         response.json().then(function (data) {
//             console.log(data);
//             console.log(data.results[0].original_title);
//             console.log(data.results[0].overview);
//             console.log(tmdbTitle);
//             console.log(tmdbOverview);

//             tmdbTitle.html("Movie: " + data.results[0].original_title);
//             tmdbOverview.html("Overview: " + data.results[0].overview);

//         }); 
//     });
// });


//function getRecommendation(){
//var APIurlRecs = "https://api.themoviedb.org/3/movie/" + movie + "/similar?api_key=ae8cbfc11d012e219d3b44e276a96f51&language=en-US&page=1";
//fetch(APIurlRecs)
//.then(function(response){
    //return response.json();
//}

//)};

