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
                this.$list = $('#list');
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
                const k = "lFF9Yxkitf2ugL6Waes2cFHNZ8UE1h5i";    // API Key
                const l = "10";  // Limit of results
                const reqURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${k}&limit=${l}`;
                
                $.ajax({    // Initialize AJAX request to GIPHY API
                    url: reqURL,
                    request: 'GET'
                }).done( res => {
                    console.log(res);
                    this.$list.html('');    // Empty the container before displaying requested items
                    for(let j = 0; j < res.data.length; j++) {  // Loop through the response to find the required info
                        let rating = `${res.data[j].rating}`;   // Get the rating for the current iteration
                        let img_src = `${res.data[j].images["480w_still"].url}`;    // Get the url for the static images of the current iteration
                        let gif_src = `${res.data[j].images.downsized.url}`;    // Get the url for the animated gif of the current iteration
                        
                        const rating_p = $(`<p class="topic-p">${rating}</p>`)  //Create a <p> to hold the rating
                        const static_img = $(`<img class="topic-img" src="${img_src}">`);   // Create <img> with src="static image"
                        const item_container = $(`<div class="item-container">`);   // Create a <div> to hold each <img> and <p>
                        
                        item_container.append(rating_p, static_img);    // Append the <img> and <p> to the container
                        this.$list.append(item_container);  // Attach the container to the page
                    }
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