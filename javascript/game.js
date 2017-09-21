 $("#make-new-button").submit("click", function(event) {
      event.preventDefault();
      // alert("submitted")
      if ($("#new-tag").val().trim() === ""){
            $("#new-tag").attr("placeholder", "Please enter text!")
            setTimeout(setsearchText, 1500);
      } else {
            var TagText = $("#new-tag").val().trim()
            this.reset()
            console.log("New button will read: " + TagText)
            tagButtons.push(TagText)
            console.log(tagButtons);
      }

      renderButtons();
    });

 function setsearchText() {
      $("#new-tag").attr("placeholder", "Tag Search")
 }

 var tagButtons = ["kitten", "puppy", 
 "hamster", "cockatiel", "baby rat"];

function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#search-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < tagButtons.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.attr("class", "tagSearch");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", tagButtons[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(tagButtons[i]);
          // Adding the button to the HTML
          $("#search-buttons").append(a);
        }
      }



$(document).on("click", ".tagSearch", function(event){
      event.preventDefault();
      // alert("click");
      var tagInput = "q=" + $(this).attr("data-name");
      console.log(tagInput);
      var rating = "&rating=" + "g" + "&rating=" + "pg"
                  + "&rating=" + "pg-13"
       // This sets up the api query
      var apiURL = "https://api.giphy.com/v1/gifs/random?"
                  +"api_key=7c98ec4fbf91466d8f0ac9dcbd1200a9"
      var apiURL2 = "https://api.giphy.com/v1/gifs/search?" 

      var myapiKey = "&api_key=7c98ec4fbf91466d8f0ac9dcbd1200a9"

      var limit = $("#limit-value").text()
      console.log(limit)

      var limitSet = "&limit=" + limit
      
      var queryURL = apiURL2 + tagInput + myapiKey + limitSet;

      $.ajax({
            url: queryURL,
            method: "GET"
      }).done(function(response){
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item'>");

                  var rating = results[i].rating;

                  var p = $("<p>").text("Rating: " + rating);

                  var gifImage = $("<img>");
                  gifImage.attr("src", results[i].images.fixed_height_still.url);
                  gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                  gifImage.attr("data-animate", results[i].images.fixed_height.url);
                  gifImage.attr("data-state", "still");
                  gifImage.attr("class", "gif");
                  gifDiv.prepend(p);
                  gifDiv.prepend(gifImage);

                  $("#gif-display").prepend(gifDiv);
            }
      });
});

$(document).on("click", ".gif", function() {
      
      var state = $(this).attr("data-state")
      
      if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
      } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
      } 

    });

$(document).on("click", ".limit", function() {
      var newLimit = $(this).attr("value");
      console.log(newLimit);
      $("#limit-value").html(newLimit);

});



renderButtons();

