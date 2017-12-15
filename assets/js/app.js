(function($) {
    // Non-DOM-ready-required code here (scope-safe)
    $(function() {
        const giphy = {
            topics_array: ["dog", "cat", "otter", "bird", "dragon"],
            init() {
                this.dom_cache();
                this.event_binding();
                this.topics_btns();
            },
            dom_cache() {
                this.$btns_container = $('#btns-topics');
            }, 
            event_binding() {
                this.$btns_container.on('click', 'button.topics', this.get_gifs.bind(this));
            }, 
            topics_btns() { // Create and populate buttons for the topics_array
                this.$btns_container.html('');   // Make sure the container is empty
                for(let i = 0; i < this.topics_array.length; i++){
                    let btn = $(`<button class="topics" data-name="${this.topics_array[i]}">${this.topics_array[i]}</button>`); // Create a button for every topic in the array and passed the value/text to the data-name attr
                    this.$btns_container.append(btn);   // Show the buttons in the page
                }
            },
            get_gifs(e){
                const topic = $(e.target).attr('data-name');    // Get the data-name attr from the clicked button
                console.log(topic);
                const k = "lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";    // API Key
                const l = "10";  // Limit of results
                const r = "g";    // Rating
                const reqURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${k}&limit=${l}&g=${r}`;
                
                $.ajax({    // Initialize AJAX request to GIPHY API
                    url: reqURL,
                    request: 'GET'
                }).done( response => {
                    console.log(response);
                    
                });
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
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";
    // var queryStr = "";
    // $.ajax({
    //   url: queryURL,
    //   method: 'GET'
    // }).done(function(response) {
    //   let imgStill = response.data[0].images["480w_still"].url;

    //   //let gifSrc = response.data[0].embed_url; 
    //   let img = $('<img>').attr('src', imgStill);
    //   console.log(imgStill);
    //   $('#container').html(img);

    //   console.log(response);
    // });