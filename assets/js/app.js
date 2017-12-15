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