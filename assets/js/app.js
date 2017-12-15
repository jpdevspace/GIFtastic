(function($) {
    // Non-DOM-ready-required code here (scope-safe)
    $(function() {
        const giphy = {
            topics_array: ["dog", "cat", "otter", "bird", "dragon"],
            init() {

            },
            dom_cache: {

            }, 
            event_binding: {

            }, 
            topics_btns() {

            }
        }
        giphy.init();
    });
    
})(jQuery); 

    // Start with a short Array (for topics)
    // (function populate()) populate the array items to the topic-btns
    // if the topic-btn is clicked
        // (function)
        // make an AJAX call
        // Get the GIF for the corresponding topic-btn
        // display 10 static imgs in the page
        // if img is clicked and !animate 
            // change static image for animated gif
        // if img is clicked and animate
            // change animated gif to static img
    // if btn from the form is clicked
        // get input value
        // push it to the topic-array
        // (function populate()) populate items to the btns

    // Example queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";
    var queryStr = "";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      let imgStill = response.data[0].images["480w_still"].url;

      //let gifSrc = response.data[0].embed_url; 
      let img = $('<img>').attr('src', imgStill);
      console.log(imgStill);
      $('#container').html(img);

      console.log(response);
    });