console.log("start");

let topics = ["pineapple", "apple", "strawberry"];

function gifDisplay() {

  $("#gifs").empty();

    var gif = $(this).attr("data-name");//works for topic buttons (incl newly added buttons)
    //var gif = $("#gif-input").val().trim();//works on submit, displayed topic buttons only read new submission

    let queryURL = "https://api.giphy.com/v1/gifs/search?q="
     + gif + "&limit=10&rating=&api_key=59tENANLRiecSxif7YqyoslTuXhBgrL7&"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        let results = response.data;
        
        let gifDiv = $("<div class='gif'>");

        //let data = response.data[];
        //console.log(data);
        for (let i=0; i<=results.length; i++)  {        

        let imageStill = results[i].images.original_still.url;
        let imageAnimate = results[i].images.original.url;
        let gifImage = $("<img>").attr("src", imageStill)
        .attr("data-still", imageStill.link(imageStill))
        .attr("data-animate", imageAnimate.link(imageAnimate))
        .attr("data-state", "still")
        .addClass("gifState");
        gifDiv.append(gifImage);

        $(".gifState").on("click", function() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", imageAnimate);
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", imageStill);
            $(this).attr("data-state", "still");
          }
        });

        let rating = results[i].rating;
        console.log(rating);
        let gifRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(gifRating);
      
        $("#gifs").append(gifDiv);
        };

        
      });

};

function gifNew() {


  var gif = $("#gif-input").val().trim();

  let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=59tENANLRiecSxif7YqyoslTuXhBgrL7&q=" + gif + "&limit=10&rating=&offset=0&lang=en"

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      let results = response.data;
      
      let gifDiv = $("<div class='gif'>");

      for (let i=0; i<=results.length; i++)  {        

      let imageStill = results[i].images.original_still.url;
      let imageAnimate = results[i].images.original.url;
      let gifImage = $("<img>").attr("src", imageStill)
      //.attr("data-still", imageStill.link(imageStill))
      //.attr("data-animate", imageAnimate.link(imageAnimate))
      .attr("data-state", "still")
      .addClass("gifState");
      gifDiv.append(gifImage);

      $(".gifState").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", imageAnimate);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", imageStill);
          $(this).attr("data-state", "still");
        }
      });

      let rating = results[i].rating;
      console.log(rating);
      let gifRating = $("<p>").text("Rating: " + rating);
      gifDiv.append(gifRating);
    
      $("#gifs").append(gifDiv);
      };

      
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

  var gif = $("#gif-input").val().trim();

  topics.push(gif);  
  buttons();
  $("#gifs").empty();
  //gifDisplay();
  gifNew();
});

$(document).on("click", ".gif-btn", gifDisplay);

buttons();