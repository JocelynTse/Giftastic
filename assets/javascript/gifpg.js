console.log("start");

let topics = ["pineapple", "apple", "strawberry"];

function gifDisplay() {

    var gif = $(this).attr("data-name");
    //var gif = $("#gif-input").val().trim();

    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=59tENANLRiecSxif7YqyoslTuXhBgrL7&q=" + gif + "&limit=1&rating=&offset=0&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        
        let gifDiv = $("<div class='gif'>");

        //let data = response.data[];
        //console.log(data);
        //for (let i=0; i<=data.length; i++)  {        

        let imageStill = response.data[0].images.original_still.url;
        let imageAnimate = response.data[0].images.original.url;
        let gifImage = $("<img>").attr("src", imageStill);
        gifDiv.append(gifImage);

        let rating = response.data[0].rating;
        console.log(rating);
        let gifRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(gifRating);
        //};
      
        $("#gifs").append(gifDiv);

        
      });

};

function buttons()  {
  $("#buttons").empty();  
  for (let i = 0; i < topics.length; i++) {

    let gifBtn = $("<button>");

    gifBtn.addClass("gif-btn");
    gifBtn.attr("data-name", topics[i]);
    gifBtn.text(topics[i]);
    $("#buttons").append(gifBtn);
  }
};

$("#add-gif").on("click", function(event)  {
  event.preventDefault();

  //$("#gifs").empty();

  var gif = $("#gif-input").val().trim();

  topics.push(gif);  
  buttons();
  $("#gifs").empty();
  gifDisplay();
});

$(document).on("click", ".gif-btn", gifDisplay);

buttons();